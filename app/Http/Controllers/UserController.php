<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        // $query = User::query();

        // $sort_field = request('sort_field', 'role');
        // $sort_direction = request('sort_direction', 'asc');

        // $users = $query->orderBy($sort_field, $sort_direction)
        //                 ->paginate(10)
        //                 ->onEachSide(1)
        //                 ->withQueryString();

        // return inertia('User/Index', [
        //     'users' => UserResource::collection($users),
        //     'queryParams' => request()->query() ?: null,
        // ]);
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
    public function edit(User $user)
    {
        return Inertia::render('User/Edit');
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
    public function destroy(User $user)
    {

        if(Auth::user() == $user) {
            Auth::guard('web')->logout();

            $user->delete();

            request()->session()->invalidate();

            request()->session()->regenerateToken();

            return redirect('welcome')->with('status', 'Your account has been archived. To restore, contact S1 or Corps Commander.');
        }

        $user->delete();

        return redirect()->back()->with('success', 'User was successfully archived!');
    }

    public function restore($id) {

        $user = User::onlyTrashed()->find($id);
        $user->restore();

        return back()->with('success', 'User was successfully restored!');
    }

    public function forceDelete($id) 
    {
        $user = User::onlyTrashed()->find($id);
        $user->forceDelete();

        return back()->with('success', 'User was permanently deleted!');
    }
}
