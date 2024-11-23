<?php

namespace App\Providers;

use App\Models\Officer;
use App\Models\Task;
use App\Models\User;
use App\Observers\OfficerObserver;
use App\Observers\TaskObserver;
use App\Observers\UserObserver;
use App\Policies\TaskPolicy;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {

    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Officer::observe(OfficerObserver::class);
        User::observe(UserObserver::class);
        Task::observe(TaskObserver::class);
        Vite::prefetch(concurrency: 3);
    }
}
