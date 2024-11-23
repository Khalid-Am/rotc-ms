<?php

namespace App\Observers;

use App\Models\User;

class UserObserver
{
    /**
     * Handle the User "created" event.
     */
    public function created(User $user): void
    {
        activity()->performedOn($user)
                    ->useLog('user')
                    ->causedBy(auth()->user())
                    ->withProperties(['role' => auth()->user()->role])
                    ->log('Created a user');
    }

    /**
     * Handle the User "updated" event.
     */
    public function updated(User $user): void
    {

        if(($user->wasChanged('deleted_at') && is_null($user->deleted_at)) || $user->wasChanged('remember_token')){
            return;
        }

        activity()->performedOn($user)
                    ->useLog('user')
                    ->causedBy(auth()->user())
                    ->withProperties(['role' => auth()->user()->role])
                    ->log('Updated a user');
    }

    /**
     * Handle the User "deleted" event.
     */
    public function deleted(User $user): void
    {

        if($user->isForceDeleting()){
            return;
        }

        if(!auth()->user() || $user->role == auth()->user()->role) {
            return;
        }

        activity()->performedOn($user)
                    ->useLog('user')
                    ->causedBy(auth()->user())
                    ->withProperties(['role' => auth()->user()->role])
                    ->log('Archived a user');
    }

    /**
     * Handle the User "restored" event.
     */
    public function restored(User $user): void
    {
        activity()->performedOn($user)
                    ->useLog('user')
                    ->causedBy(auth()->user())
                    ->withProperties(['role' => auth()->user()->role])
                    ->log('Restored an archived user');
    }

    /**
     * Handle the User "force deleted" event.
     */
    public function forceDeleted(User $user): void
    {
        activity()->performedOn($user)
                    ->useLog('user')
                    ->causedBy(auth()->user())
                    ->withProperties(['role' => auth()->user()->role])
                    ->log('Deleted a user');
    }
}
