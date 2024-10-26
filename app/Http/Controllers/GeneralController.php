<?php

namespace App\Http\Controllers;

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

        return inertia('Dashboard', [
            'pendingCount' => $pendingCount, 
            'in_progressCount' => $in_progressCount, 
            'completedCount' => $completedCount, 
            'tasksCount' => $tasksCount,
        ]);
    }

    public function welcome() {

        return inertia('Landing/Welcome', [
            'hasLogin' => Route::has('login'),
            'successMessage' => session('success'),
            'errorMessage' => session('error')
        ]);
    }
}
