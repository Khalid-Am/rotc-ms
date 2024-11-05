<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Auth::user()->tasks();

        $sort_field = request("sort_field", 'created_at');
        $sort_direction = request("sort_direction", 'desc');

        if(request("search")){
            $query->where("title", "like", "%" . request("search") . "%");
        };

        if(request("status")){
            $query->where("status", request("status"));
        };

        if(request('posted_at')) {
            if(request('posted_at') === 'week') {
                $query->where('posted_at', '<=', now()->subWeek());
            }

            if(request('posted_at') === 'latest') {
                $query->where('posted_at', '>=', now()->subWeek());
            }
        }

        if(request('due_date')){
            if(request('due_date') === 'past_due') {
                $query->where('due_date', '<',now()->subDay());
            }

            if(request('due_date') === 'today') {
                $query->whereDate('due_date',now());
            }

            if (request('due_date') === 'this_week') {
                $query->whereBetween('due_date', [now()->startOfWeek(), now()->endOfWeek()]);
            }

            if(request('due_date') === 'next_week') {
                $query->whereDate('due_date', now()->addWeek());
            }
        }

        $tasks = $query->orderBy($sort_field, $sort_direction)
                        ->paginate(5)
                        ->onEachSide(1)
                        ->withQueryString();

        return inertia('Task/Index', [
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
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
    public function store(StoreTaskRequest $request)
    {
        $user = Auth::user();

        $data = $request->validated();
        $data['posted_at'] = now();

        $user->tasks()->create($data);

        return to_route('task.index');

    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();

        $task->update($data);

        return to_route("task.index");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();

        return to_route("task.index");
    }
}
