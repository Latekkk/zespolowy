<?php

namespace App\Policies;

use App\Enums\UserRolesEnum;
use App\Models\Advertisement;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Auth;

class AdvertisementPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param User $user
     * @return Response|bool
     */
    public function viewAny(User $user): Response|bool
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
    public function create(): Response|bool
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
     * Determine whether the user can update the model.
     *
     * @param User $user
     * @param Advertisement $advertisement
     * @return Response|bool
     */
    public function update(): Response|bool
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
     *
     * @param User $user
     * @param Advertisement $advertisement
     * @return Response|bool
     */
    public function delete(User $user, Advertisement $advertisement): Response|bool
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
     *
     * @param User $user
     * @param Advertisement $advertisement
     * @return Response|bool
     */
    public function restore(User $user, Advertisement $advertisement): Response|bool
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
     *
     * @param User $user
     * @param Advertisement $advertisement
     * @return Response|bool
     */
    public function forceDelete(User $user, Advertisement $advertisement): Response|bool
    {
        switch (Auth::user()->role) {
            case UserRolesEnum::ADMIN->value:
                return true;
            default:
                return false;
        }
    }
}
