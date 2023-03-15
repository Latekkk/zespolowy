<?php

namespace App\Policies;

use App\Models\Advertisement;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

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

    /**
     * Determine whether the user can view the model.
     *
     * @param User $user
     * @param Advertisement $advertisement
     * @return Response|bool
     */
    public function view(User $user, Advertisement $advertisement): Response|bool
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
        dd('xD');
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param User $user
     * @param Advertisement $advertisement
     * @return Response|bool
     */
    public function update(User $user, Advertisement $advertisement): Response|bool
    {
        return true;
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
        return true;
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
        return true;
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
        return true;
    }
}
