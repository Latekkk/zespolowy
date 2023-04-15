<?php

namespace App\Policies;

use App\Models\Advertisement;
use App\Models\MountainsSection;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class MountainsSectionPolicy
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
    public function view(User $user, MountainsSection $mountainsSection): bool
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
        return true;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param User $user
     * @param MountainsSection $mountainsSection
     * @return Response|bool
     */
    public function update(User $user, MountainsSection $mountainsSection): Response|bool
    {
        return true;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, MountainsSection $mountainsSection): bool
    {
        return true;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, MountainsSection $mountainsSection): bool
    {
        return true;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, MountainsSection $mountainsSection): bool
    {
        return true;
    }
}
