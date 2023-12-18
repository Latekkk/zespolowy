<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class RegisterController extends Controller
{
    //

    public function store(RegisterRequest $request): \Illuminate\Http\RedirectResponse
    {

        $user = User::create([
            "name" => $request->input('name'),
            "email" => $request->input('email'),
            "password" => $request->input('password'),
            "role" => $request->input('role')
        ]);

        Auth::login($user->id);
        return redirect()->route('dashboard');


    }
}
