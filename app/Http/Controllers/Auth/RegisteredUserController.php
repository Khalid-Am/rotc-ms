<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\OfficerResource;
use App\Models\Officer;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {

        $query = Officer::query();

        if(request('search')) {
            $query->where('lastName', 'like', '%' . request('search') . '%')
                    ->orWhere('firstName', 'like', '%' . request('search') . '%');
        }

        $officers = OfficerResource::collection($query->orderBy('lastName')
                                                        ->orderBy('firstName')
                                                        ->get())->toArray(request());

        return Inertia::render('Auth/Register', [
            'officers' => $officers,
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'officer_id' => ['required', 'exists:officers,id'],
            'role' => ['required', Rule::in(['corps', 's1', 's2', 's3', 's4', 's7'])],
            'username' => ['required', 'string', 'lowercase', 'max:255', Rule::unique(User::class)->whereNull('deleted_at')],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'officer_id' => $request->officer_id,
            'username' => $request->username,
            'role' => $request->role,
            'password' => Hash::make($request->password),
        ]);

        return to_route('dashboard');
    }
}
