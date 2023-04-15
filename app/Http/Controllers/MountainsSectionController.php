<?php

namespace App\Http\Controllers;

use App\Http\Requests\MountainsSectionRequest;
use App\Models\MountainsSection;
use App\Models\Point;
use App\Repositories\MountainsSectionRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class MountainsSectionController extends Controller
{

    protected MountainsSectionRepository $repository;

    public function __construct(MountainsSectionRepository $mountainsSectionRepository)
    {
        $this->repository = $mountainsSectionRepository;
    }


    public function index(): Response
    {
        return Inertia::render('MountainsSection/Index', [
            'mountainsSection' => MountainsSection::paginate(5)
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('MountainsSection/Form', [
            'points' => Point::all(),
        ]);
    }

    public function show(MountainsSection $mountainsSection): Response
    {
        return Inertia::render('MountainsSection/index', [
            'mountainsSection' => $mountainsSection
        ]);
    }

    public function edit(MountainsSection $mountainsSection): Response
    {
        return Inertia::render('MountainsSection/Form', [
            'mountainsSection' => $mountainsSection,
            'points' => Point::all(),
        ]);
    }

    public function update(MountainsSection $mountainsSection, MountainsSectionRequest $mountainsSectionRequest): RedirectResponse
    {
        $this->repository->update($mountainsSectionRequest, $mountainsSection);

        return redirect()->route('mountainsSection.index')->with(['toast' => ['message' => __('mountainsSection.create.toast'), 'type' => 'success']]);
    }

    public function store(MountainsSectionRequest $request): RedirectResponse
    {
        $this->repository->create($request);

        return redirect()->route('mountainsSection.index')->with(['toast' => ['message' => __('mountainsSection.create.toast'), 'type' => 'success']]);
    }
    public function getAll(): JsonResponse
    {
        $params = request()->query();
        $mountainsSection = MountainsSection::orderBy($params['sort']?? 'id', (int)$params['sortOrder'] >= 0? 'asc' : 'desc' )-> paginate((int)$params['paginate'] ?? 15)->appends(request()->query());
        return response()->json($mountainsSection);
    }

    public function removeAPI(MountainsSection $mountainsSection): JsonResponse
    {
        $this->repository->remove($mountainsSection);
        return response()->json(['status' => 'ok']);
    }

}
