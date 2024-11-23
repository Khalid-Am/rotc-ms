<?php

use App\Http\Controllers\GeneralController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\OfficerController;
use App\Http\Controllers\PdfController;
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
    Route::post('user/{id}/restore', [UserController::class, 'restore'])->name('user.restore');
    Route::post('user/{id}/force_delete', [UserController::class, 'forceDelete'])->name('user.force_delete');
    Route::resource('user', UserController::class);
    Route::get('activity_log', [LogController::class, 'index'])->name('activity.log');

    Route::get('generate_officers_list', [PdfController::class, 'generate_officers_list'])->name('officers_list.pdf');
    Route::get('generate_1cl_list', [PdfController::class, 'generate_1cl_list'])->name('1cl_list.pdf');
    Route::get('generate_2cl_list', [PdfController::class, 'generate_2cl_list'])->name('2cl_list.pdf');
    Route::get('generate_3cl_list', [PdfController::class, 'generate_3cl_list'])->name('3cl_list.pdf');
    Route::get('generate_cocc_list', [PdfController::class, 'generate_cocc_list'])->name('cocc_list.pdf');
    Route::get('generate_attendance_list', [PdfController::class, 'generate_attendance_list'])->name('attendance_list.pdf');
    
    Route::get('/attendance', function () {
        return view('PDFs.attendances.attendance_list', ['data' => ['title' => '', 'date' => 'November 26, 2024', 'attendanceList' => []]]);
    });

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
