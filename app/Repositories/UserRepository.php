<?php

namespace App\Repositories;

use App\Http\Requests\UserRequest;
use App\Models\User;

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
            'password' => $request->input('password'),
            'role' => $request->input('role')
        ];

        if ($update) {
            return $data;
        }
        return new User($data);
    }

}
