<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Activitylog\Models\Activity;

class LogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $activityLogs = auth()->user()->role === 'corps' ? 
                                            Activity::where('log_name', '!=', 'task')
                                                    ->latest()
                                                    ->take(10)
                                                    ->get() : 
                                            Activity::where('causer_id', auth()->user()->id)
                                                    ->latest()
                                                    ->take(10)
                                                    ->get() ;

        return Inertia::render('Log/Index', [
            'activityLogs' => $activityLogs,
        ]);
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
        //
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
