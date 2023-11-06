<?php

namespace App\Policies;

use App\Enums\UserRolesEnum;
use App\Models\Point;
use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Auth;

class UserPolicy
{
    /**
     * Create a new policy instance.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Point $point): bool
    {
        switch (Auth::user()->role) {
            case UserRolesEnum::ADMIN->value:
            case UserRolesEnum::SQUADUSER->value:
                return true;
            default:
                return false;
        }
    }

    public function index(): Response|bool
    {
        switch (Auth::user()->role) {
            case UserRolesEnum::ADMIN->value:
            case UserRolesEnum::SQUADUSER->value:
                return true;
            default:
                return false;
        }
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user): bool
    {
        switch (Auth::user()->role) {
            case UserRolesEnum::ADMIN->value:
            case UserRolesEnum::SQUADUSER->value:
                return true;
            default:
                return false;
        }
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user): bool
    {
        switch (Auth::user()->role) {
            case UserRolesEnum::ADMIN->value:
            case UserRolesEnum::SQUADUSER->value:
                return true;
            default:
                return false;
        }
    }



    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Point $point): bool
    {
        switch (Auth::user()->role) {
            case UserRolesEnum::ADMIN->value:
            case UserRolesEnum::SQUADUSER->value:
                return true;
            default:
                return false;
        }
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user): bool
    {
        switch (Auth::user()->role) {
            case UserRolesEnum::ADMIN->value:
            case UserRolesEnum::SQUADUSER->value:
                return true;
            default:
                return false;
        }
    }
}
