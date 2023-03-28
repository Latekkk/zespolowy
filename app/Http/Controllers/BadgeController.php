<?php

namespace App\Http\Controllers;

use App\Exceptions\PhotoExceptions\PhotoSaveException;
use App\Exceptions\PhotoExceptions\PhotoUpdateException;
use App\Helpers\ToastHelper;
use App\Http\Requests\BadgeRequest;
use App\Models\Badge;
use App\Repositories\BadgeRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BadgeController extends Controller
{
    protected BadgeRepository $repository;

    public function __construct(BadgeRepository $badgeRepository)
    {
        $this->repository = $badgeRepository;
    }


    public function index(): Response
    {
        return Inertia::render('Badge/Index', [
            'badges'=> Badge::with('photos')->get()
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Badge/Form');
    }

    public function show(Badge $badge): Response
    {
        return Inertia::render('Badge/index', [
            'badge' => $badge
        ]);
    }

    public function edit(Badge $badge): Response
    {
        return Inertia::render('Badge/Form', [
            'badge' => $badge
        ]);
    }

    /**
     * @throws PhotoUpdateException
     */
    public function update(Badge $badge, BadgeRequest $badgeRequest): RedirectResponse
    {
        $this->repository->update($badgeRequest, $badge->load('photos'));

        return redirect()->route('home')->with(ToastHelper::update('badge'));
    }

    /**
     * @throws PhotoSaveException
     */
    public function store(BadgeRequest $request): RedirectResponse
    {
        $this->repository->create($request);

        return redirect()->route('badge.index')->with(ToastHelper::create('badge'));
    }


}
