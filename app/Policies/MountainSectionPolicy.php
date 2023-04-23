<?php

namespace App\Policies;

use App\Models\MountainSection;
use App\Models\User;
use Illuminate\Auth\Access\Response;

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
     * @param MountainSection $mountainSection
     * @return Response|bool
     */
    public function update(User $user, MountainSection $mountainSection): Response|bool
    {
        return true;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, MountainSection $mountainSection): bool
    {
        return true;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, MountainSection $mountainSection): bool
    {
        return true;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, MountainSection $mountainSection): bool
    {
        return true;
    }
}
