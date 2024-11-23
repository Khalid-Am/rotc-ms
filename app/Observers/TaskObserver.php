<?php

namespace App\Observers;

use App\Models\Task;

class TaskObserver
{
    /**
     * Handle the Task "created" event.
     */
    public function created(Task $task): void
    {
        activity()->performedOn($task)
                    ->useLog('task')
                    ->causedBy(auth()->user())
                    ->withProperties(['role' => auth()->user()->role])
                    ->log('Created a task');
    }

    /**
     * Handle the Task "updated" event.
     */
    public function updated(Task $task): void
    {

        if($task->wasChanged('deleted_at') && is_null($task->deleted_at)) {
            return;
        }

        activity()->performedOn($task)
                    ->useLog('task')
                    ->causedBy(auth()->user())
                    ->withProperties(['role' => auth()->user()->role, 'title' => $task->title])
                    ->log('Updated a task');
    }

    /**
     * Handle the Task "deleted" event.
     */
    public function deleted(Task $task): void
    {

        if($task->isForceDeleting()){
            return;
        }

        if($task->postedBy->role == auth()->user()->role) {
            return;
        }

        activity()->performedOn($task)
                    ->useLog('task')
                    ->causedBy(auth()->user())
                    ->withProperties(['role' => auth()->user()->role, 'title' => $task->title])
                    ->log('Archived a task');
    }

    /**
     * Handle the Task "restored" event.
     */
    public function restored(Task $task): void
    {
        activity()->performedOn($task)
                    ->useLog('task')
                    ->causedBy(auth()->user())
                    ->withProperties(['role' => auth()->user()->role, 'title' => $task->title])
                    ->log('Restored an archived task');
    }

    /**
     * Handle the Task "force deleted" event.
     */
    public function forceDeleted(Task $task): void
    {
        activity()->performedOn($task)
                    ->useLog('task')
                    ->causedBy(auth()->user())
                    ->withProperties(['role' => auth()->user()->role, 'title' => $task->title])
                    ->log('Deleted a task');
    }
}
