<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Attendance;
use App\Models\Officer;
use App\Models\Task;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

class GeneralController extends Controller
{
    public function dashboard() {

        $pendingCount = Auth::user()->tasks()->where('status', 'pending')->count();
        $in_progressCount = Auth::user()->tasks()->where('status', 'in_progress')->count();
        $completedCount = Auth::user()->tasks()->where('status', 'completed')->count();
        $tasksCount = Auth::user()->tasks()->count();

        $attendances = [];

        if(request('attendance_date')) {
            $attendances = Attendance::with('signedBy')
            ->whereDate('signed_at',  request('attendance_date'))
            ->where('officer_id', '!=', 1)
            ->get();
        }

        $query = User::when(request()->has('archived'), function ($query) {
            $query->onlyTrashed();
        });

        $users = $query->where('id', '>', 1)
                            ->orderBy('role', 'asc')
                            ->paginate(10) 
                            ->onEachSide(1)
                            ->withQueryString();


        $userCount = User::count();
        $officerCount = Officer::count();

        return inertia('Dashboard/Dashboard', [
            'pendingCount' => $pendingCount, 
            'in_progressCount' => $in_progressCount, 
            'completedCount' => $completedCount, 
            'tasksCount' => $tasksCount,
            'users' => UserResource::collection($users),
            'userCount' => $userCount,
            'officerCount' => $officerCount - 1,
            'isNotCorps' => Auth::user()->role !== 'corps',
            'isStaff1' => Auth::user()-> role === 's1',
            'attendanceList' => $this->process_attendance($attendances),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    public function welcome() {

        $query = Task::join('users', 'tasks.posted_by', '=', 'users.id')
                            ->whereNot('tasks.status', 'completed');

        $sort_field = request("sort_field", 'created_at');
        $sort_direction = request("sort_direction", 'desc');
        $userRole = request('user-role', 's1');

        if(request("search")){
            $query->where("title", "like", "%" . request("search") . "%");
        };

        if($userRole) {
            $query->where('users.role', $userRole);
        }

        $tasks = $query->select('tasks.*')
                        ->distinct()
                        ->orderBy($sort_field, $sort_direction)
                        ->paginate(3)
                        ->withQueryString();


        return inertia('Landing/Welcome', [
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            'hasLogin' => Route::has('login'),
            'status' => session('status'),
        ]);
    }

    private function process_attendance($attendances) {

        $attendanceSummary = [];

        foreach($attendances as $attendance) {
            
            $userID = $attendance->signedBy->id;
            $fullname = $attendance->signedBy->firstName . ' ' . $attendance->signedBy->middleName . ' ' . $attendance->signedBy->lastName;
            $attendanceDate = Carbon::parse($attendance->signed_at);

            if(!isset($attendanceSummary[$userID])) {

                $attendanceSummary[$userID] = [
                    'id' => $userID,
                    'fullname' => $fullname,
                    'date' => $attendanceDate->format('Y-m-d'),
                    'morning' => null,
                    'afternoon' => null,
                ];
            };

            $isMorning = $attendanceDate->format('H') < 12;

            if($isMorning) {
                $attendanceSummary[$userID]['morning'] = "{$attendanceDate->hour}{$attendanceDate->minute}H";
            }else {
                $attendanceSummary[$userID]['afternoon'] = "{$attendanceDate->hour}{$attendanceDate->minute}H";
            }

        }

        return array_values($attendanceSummary);
    }
}
