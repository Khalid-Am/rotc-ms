<?php

namespace App\Observers;

use App\Models\Officer;

class OfficerObserver
{
    /**
     * Handle the Officer "created" event.
     */
    public function created(Officer $officer): void
    {
        activity()->performedOn($officer)
                    ->useLog('officer')
                    ->causedBy(auth()->user())
                    ->withProperties(['role' => auth()?->user()->role])
                    ->log('Created an officer');
    }

    /**
     * Handle the Officer "updated" event.
     */
    public function updated(Officer $officer): void
    {

        if ($officer->wasChanged('deleted_at') && is_null($officer->deleted_at)) {
            return;
        }

        activity()->performedOn($officer)
                    ->useLog('officer')
                    ->causedBy(auth()->user())
                    ->withProperties(['role' => auth()->user()->role])
                    ->log('Updated an officer');
    }

    /**
     * Handle the Officer "deleted" event.
     */
    public function deleted(Officer $officer): void
    {

        if($officer->isForceDeleting()) {
            return;
        }

        activity()->performedOn($officer)
                    ->useLog('officer')
                    ->causedBy(auth()->user())
                    ->withProperties(['role' => auth()->user()->role])
                    ->log('Archived an officer');
    }

    /**
     * Handle the Officer "restored" event.
     */
    public function restored(Officer $officer): void
    {
        activity()->performedOn($officer)
                    ->useLog('officer')
                    ->causedBy(auth()->user())
                    ->withProperties(['role' => auth()->user()->role])
                    ->log('Restored an archived officer');
    }

    /**
     * Handle the Officer "force deleted" event.
     */
    public function forceDeleted(Officer $officer): void
    {
        activity()->performedOn($officer)
                    ->useLog('officer')
                    ->causedBy(auth()->user())
                    ->withProperties(['role' => auth()->user()->role])
                    ->log('Deleted an officer');
    }
}
