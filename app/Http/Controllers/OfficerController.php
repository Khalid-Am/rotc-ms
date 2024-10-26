<?php

namespace App\Http\Controllers;

use App\Models\Officer;
use App\Http\Requests\StoreOfficerRequest;
use App\Http\Requests\UpdateOfficerRequest;
use App\Http\Resources\OfficerResource;
use App\Models\Attendance;
use Carbon\Carbon;
use Illuminate\Contracts\Database\Eloquent\Builder;

class OfficerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $query = Officer::query();

        $sort_field = request("sort_field", 'created_at');
        $sort_direction = request("sort_direction", 'asc');

        if(request("search")){
            $query->where("firstName", "like", "%" . request("search") . "%")
                ->orWhere("middleName", "like", "%" . request("search") . "%")
                ->orWhere("lastName", "like", "%" . request("search") . "%")
                ->orWhere("student_id", "like", "%" . request("search" . "%"));
        };

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
        $officer->delete();

        return to_route("officer.index");
    }
}
