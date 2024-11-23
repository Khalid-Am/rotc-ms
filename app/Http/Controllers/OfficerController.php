<?php

namespace App\Http\Controllers;

use App\Models\Officer;
use App\Http\Requests\StoreOfficerRequest;
use App\Http\Requests\UpdateOfficerRequest;
use App\Http\Resources\OfficerResource;
use App\Models\Attendance;
use Carbon\Carbon;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;


class OfficerController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Officer::class);

        $query = Officer::query()
                            ->where('id', '!=', auth()->user()->officer->id)
                            ->where('id', '!=', 1)
                            ->when(request()->has('archived'), function ($query) {
                                $query->onlyTrashed();
                            });

        $sort_field = request("sort_field", 'created_at');
        $sort_direction = request("sort_direction", 'asc');

        if (request("search")) {
            $query->where(function ($query) {
                $searchTerm = request("search");
                $query->where("firstName", "like", "%{$searchTerm}%")
                    ->orWhere("middleName", "like", "%{$searchTerm}%")
                    ->orWhere("lastName", "like", "%{$searchTerm}%")
                    ->orWhere("student_id", "like", "%{$searchTerm}%")
                    ->orWhere("class", "like", "%{$searchTerm}%")
                    ->orWhere("rank", "like", "%{$searchTerm}%");
            });
        }

        $officers = $query->orderBy($sort_field, $sort_direction)
                            ->paginate(5)
                            ->onEachSide(1)
                            ->withQueryString();

        return inertia('Officer/Index', [
            'officers' => OfficerResource::collection($officers),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Officer/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOfficerRequest $request)
    {
        $data = $request->validated();
        Officer::create($data);

        return to_route("officer.index");
    }

    /**
     * Display the specified resource.
     */
    public function show(Officer $officer)
    {
        
        $attendances = $officer->attendances()->latest()->paginate(10);
    
        // Transform the collection while keeping pagination metadata
        $attendances->getCollection()->transform(function ($attendance) {
            // Format the signed_at date and time
            $attendance->date = Carbon::parse($attendance->signed_at)->format('Y-m-d'); // Format as YYYY-MM-DD
            $attendance->time = Carbon::parse($attendance->signed_at)->format('H:i:s'); // Format as HH:MM:SS
            return $attendance;
        });

        // dd($attendances);

        return inertia('Officer/Show', [
            'officer' => new OfficerResource($officer),
            'attendances' => $attendances,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Officer $officer)
    {
        return inertia('Officer/Edit', [
            'officer' => new OfficerResource($officer),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOfficerRequest $request, Officer $officer)
    {
        $data = $request->validated();
        $officer->update($data);

        return to_route("officer.show", $officer);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Officer $officer)
    {

        if(Auth::user()->officer && Auth::user()->officer->id == $officer->id) {
            $officer->delete();

            Auth::guard('web')->logout();

            request()->session()->invalidate();

            request()->session()->regenerateToken();

            return redirect()->route('welcome')->with('status', 'Your session has expired. Please log in again');
        }

        $officer->delete();

        return back()->with('success', 'Officer was archived!');
    }

    public function restore($id)
    {
        $officer = Officer::onlyTrashed()->find($id);
        $officer->restore();

        return back()->with('success', 'Officer was successfully restored!');
    }

    public function forceDelete($id) 
    {
        $officer = Officer::onlyTrashed()->find($id);
        $officer->forceDelete();

        return back()->with('success', 'Officer was permanently deleted!');
    }
}
