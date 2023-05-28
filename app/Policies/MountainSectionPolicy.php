<?php

namespace App\Policies;

use App\Enums\UserRolesEnum;
use App\Models\MountainSection;
use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Auth;

class MountainSectionPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, MountainSection $mountainSection): bool
    {
        return true;
    }

    public function index(): Response|bool
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param User $user
     * @return Response|bool
     */
    public function create():  Response|bool
    {
        switch (Auth::user()->role) {
            case UserRolesEnum::ADMIN->value:
            case UserRolesEnum::SQUADUSER->value:
            case UserRolesEnum::PATHUSER->value:
                return true;
            default:
                return false;
        }
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param User $user
     * @param MountainSection $mountainSection
     * @return Response|bool
     */
    public function update(): Response|bool
    {
        switch (Auth::user()->role) {
            case UserRolesEnum::ADMIN->value:
            case UserRolesEnum::SQUADUSER->value:
            case UserRolesEnum::PATHUSER->value:
                return true;
            default:
                return false;
        }
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(): bool
    {
        switch (Auth::user()->role) {
            case UserRolesEnum::ADMIN->value:
            case UserRolesEnum::SQUADUSER->value:
            case UserRolesEnum::PATHUSER->value:
                return true;
            default:
                return false;
        }
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(): bool
    {
        switch (Auth::user()->role) {
            case UserRolesEnum::ADMIN->value:
            case UserRolesEnum::SQUADUSER->value:
            case UserRolesEnum::PATHUSER->value:
                return true;
            default:
                return false;
        }
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(): bool
    {
        switch (Auth::user()->role) {
            case UserRolesEnum::ADMIN->value:
                return true;
            default:
                return false;
        }
    }
}
