<?php

namespace App\Repositories;

use App\Enums\UserRolesEnum;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserRepository
{
    protected User $model;

    public function __construct(User $model)
    {
        $this->model = $model;
    }
    public function create(UserRequest $request): void
    {
        $user = $this->getUserFromRequest($request);
        $user->save();
    }

    public function update(UserRequest $request, User $user): void
    {
        $user->update($this->getUserFromRequest($request, true));

    }

    public function remove(User $user): void
    {
        $user->delete();
    }

    private function getUserFromRequest($request, $update = false): User|array
    {
        $data = [
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'role' => $request?->input('role') ?? UserRolesEnum::USER ,
        ];
        if($request->has('password')) {
            $data = [...$data,  'password' => $request->input('password')];
        }
        if ($update) {
            return $data;
        }
        return new User($data);
    }

}
