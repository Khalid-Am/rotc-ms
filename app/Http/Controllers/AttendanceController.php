<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Officer;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'student_id' => ['required', 'exists:officers,student_id']
        ], 
        ['student_id.required' => 'Student Id is required.',
        'student_id.exists' => 'Invalid student id.']);

        $officer = Officer::where('student_id', $request->student_id)->first();

        $now = Carbon::now();

        // Determine if it's morning or afternoon
        // Morning Span
        $startOfSpan = $now->copy()->startOfDay();
        $endOfSpan = $now->copy()->setTime(12, 0, 0)->subSecond();

        // Afternoon span
        if ($now->hour >= 12) { 
            $startOfSpan = $now->copy()->setTime(12, 0, 0);
            $endOfSpan = $now->copy()->endOfDay();
        }

        $alreadySigned = Attendance::where('officer_id', $officer->id)
            ->whereBetween('signed_at', [$startOfSpan, $endOfSpan])
            ->exists();

        if ($alreadySigned) {
            return back()->with('error', 'You have already signed attendance for this time span.');
        }

        Attendance::create([
            'officer_id' => $officer->id,
            'signed_at' => now(),
        ]);

        return back()->with('success', 'Attendance signed successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
