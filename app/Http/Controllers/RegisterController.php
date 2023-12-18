<?php

namespace App\Http\Controllers;

use App\Enums\UserRolesEnum;
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
            "role" => UserRolesEnum::USER->value
        ]);

        Auth::login($user);
        return redirect()->route('home');
    }
}
