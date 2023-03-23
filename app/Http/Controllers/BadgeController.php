<?php

namespace App\Http\Controllers;

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

    public function update(Badge $badge, BadgeRequest $badgeRequest): RedirectResponse
    {
        $this->repository->update($badgeRequest, $badge);

        return redirect()->route('home')->with(['toast' => ['message' => __('badge.create.toast'), 'type' => 'success']]);
    }

    public function store(BadgeRequest $request): RedirectResponse
    {
        $this->repository->create($request);

        return redirect()->route('home')->with(['toast' => ['message' => __('badge.create.toast'), 'type' => 'success']]);
    }


}
