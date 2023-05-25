<?php

namespace App\Http\Controllers;

use App\Helpers\ToastHelper;
use App\Http\Requests\UserPointsRequest;
use App\Models\UserPoints;
use App\Repositories\UserPointsRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class UserPointsController extends Controller
{
    protected UserPointsRepository $repository;

    public function __construct(UserPointsRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index(): Response
    {
        return Inertia::render('UserPointsPoints/Index', [
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('UserPointsPoints/Form', [
        ]);

    }

    public function edit(UserPoints $userPoints): Response
    {
        return Inertia::render('UserPointsPoints/Form', [
            'userPoints' => $userPoints,
            'roles' => ['userPoints', 'admin']
        ]);
    }

    public function update(UserPoints $userPoints, UserPointsRequest $userPointsRequest): RedirectResponse
    {
        $this->repository->update($userPointsRequest, $userPoints);

        return redirect()->route('userPoints.index')->with(ToastHelper::update('userPoints'));
    }

    public function store(UserPointsRequest $userPointsRequest): RedirectResponse
    {
        $this->repository->create($userPointsRequest);

        return redirect()->route('userPoints.index')->with(ToastHelper::create('userPoints'));
    }


    //api

    public function getAll(): JsonResponse
    {
        $params = request()->query();
        $userPointsName = $params['userPointsName'] ?? null;
        if ($userPointsName !== null) {
            $userPoints = UserPoints::where('name', 'like', '%' . $userPointsName . '%')
                ->orderBy($params['sort'] ?? 'id', (int)$params['sortOrder'] >= 0 ? 'asc' : 'desc')
                ->paginate((int)$params['paginate'] ?? 15)
                ->appends(request()->query());
        } else {
            $userPoints = UserPoints::orderBy($params['sort'] ?? 'id', (int)$params['sortOrder'] >= 0 ? 'asc' : 'desc')
                ->paginate((int)$params['paginate'] ?? 15)
                ->appends(request()->query());
        }

        return response()->json($userPoints);
    }

    public function removeAPI(UserPoints $userPoints): JsonResponse
    {
        $this->repository->remove($userPoints);
        return response()->json(['status' => 'ok']);
    }
}
