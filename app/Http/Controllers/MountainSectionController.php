<?php

namespace App\Http\Controllers;

use App\Http\Requests\MountainSectionRequest;
use App\Models\MountainSection;
use App\Models\Point;
use App\Repositories\MountainSectionRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class MountainSectionController extends Controller
{

    protected MountainSectionRepository $repository;

    public function __construct(MountainSectionRepository $mountainSectionRepository)
    {
        $this->repository = $mountainSectionRepository;
    }


    public function index(): Response
    {
        return Inertia::render('MountainSection/Index', [
            'mountainSections' => MountainSection::paginate(5)
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('MountainSection/Form', [
            'points' => Point::all(),
        ]);
    }

    public function show(MountainSection $mountainSection): Response
    {
        return Inertia::render('MountainSection/index', [
            'mountainSections' => $mountainSection
        ]);
    }

    public function edit(MountainSection $mountainSection): Response
    {
        return Inertia::render('MountainSection/Form', [
            'mountainSection' => $mountainSection,
            'points' => Point::all(),
        ]);
    }

    public function update(MountainSection $mountainSection, MountainSectionRequest $mountainSectionRequest): RedirectResponse
    {
        $this->repository->update($mountainSectionRequest, $mountainSection);

        return redirect()->route('mountainSection.index')->with(['toast' => ['message' => __('mountainSection.create.toast'), 'type' => 'success']]);
    }

    public function store(MountainSectionRequest $request): RedirectResponse
    {
        $this->repository->create($request);

        return redirect()->route('mountainSection.index')->with(['toast' => ['message' => __('mountainSection.create.toast'), 'type' => 'success']]);
    }
    public function getAll(): JsonResponse
    {
        $params = request()->query();
        $mountainSection = MountainSection::orderBy($params['sort']?? 'id', (int)$params['sortOrder'] >= 0? 'asc' : 'desc' )-> paginate((int)$params['paginate'] ?? 15)->appends(request()->query());
        return response()->json($mountainSection);
    }

    public function removeAPI(MountainSection $mountainSection): JsonResponse
    {
        $this->repository->remove($mountainSection);
        return response()->json(['status' => 'ok']);
    }

}
