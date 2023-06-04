<?php

namespace App\Http\Controllers;

use App\Enums\UserRolesEnum;
use App\Helpers\ToastHelper;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserMountainMainPartResource;
use App\Models\MountainMainPart;
use App\Models\MountainRanges;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{

    protected UserRepository $repository;

    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index(): Response
    {
        return Inertia::render('User/Index', [
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('User/Form', [
            'roles' => UserRolesEnum::toArray(),
        ]);


//        TODO:: Mikołaj napisz tu jakie role są xD
    }

    public function edit(User $user): Response
    {
        $user->load('userMountainMainParts');

        $excludedMountainRanges = $user->userMountainMainParts()->pluck('mountain_main_part_id')->all();
        $allMountainRanges = MountainMainPart::whereNotIn('id', $excludedMountainRanges)->get();

        return Inertia::render('User/Form', [
            'user' => $user,
            'user_mountain_main_parts' => UserMountainMainPartResource::collection($user->userMountainMainParts),
            'mountain_main_parts' => $allMountainRanges,
            'roles' => UserRolesEnum::toArray(),
        ]);
    }

    public function update(User $user, UserRequest $userRequest): RedirectResponse
    {
        $this->repository->update($userRequest, $user);

        return redirect()->route('user.index')->with(ToastHelper::update('user'));
    }

    public function store(UserRequest $userRequest): RedirectResponse
    {
        $this->repository->create($userRequest);

        return redirect()->route('user.index')->with(ToastHelper::create('user'));
    }


    //api

    public function getAll(): JsonResponse
    {
        $params = request()->query();
        $userName = $params['userName'] ?? null;
        if ($userName !== null) {
            $users = User::where('name', 'like', '%' . $userName . '%')
                ->orderBy($params['sort'] ?? 'id', (int)$params['sortOrder'] >= 0 ? 'asc' : 'desc')
                ->paginate((int)$params['paginate'] ?? 15)
                ->appends(request()->query());
        } else {
            $users = User::orderBy($params['sort'] ?? 'id', (int)$params['sortOrder'] >= 0 ? 'asc' : 'desc')
                ->paginate((int)$params['paginate'] ?? 15)
                ->appends(request()->query());
        }

        return response()->json($users);
    }

    public function removeAPI(User $user): JsonResponse
    {
        $this->repository->remove($user);
        return response()->json(['status' => 'ok']);
    }
}
