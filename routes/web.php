<?php

use App\Http\Controllers\GeneralController;
use App\Http\Controllers\OfficerController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::redirect('/', 'welcome');

Route::middleware(['auth', 'verified'])->group(function() {
    Route::get('/dashboard', [GeneralController::class, 'dashboard'])->name('dashboard');
    Route::post('officer/{id}/restore', [OfficerController::class, 'restore'])->name('officer.restore');
    Route::post('officer/{id}/force_delete', [OfficerController::class, 'forceDelete'])->name('officer.force_delete');
    Route::resource('officer', OfficerController::class);
    Route::post('task/{id}/restore', [TaskController::class, 'restore'])->name('task.restore');
    Route::post('task/{id}/force_delete', [TaskController::class, 'forceDelete'])->name('task.force_delete');
    Route::resource('task', TaskController::class);
    Route::resource('user', UserController::class);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
