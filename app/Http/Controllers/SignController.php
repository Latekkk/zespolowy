<?php

namespace App\Http\Controllers;

use App\Http\Requests\SignRequest;
use App\Models\Sign;
use App\Repositories\SignRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;


class SignController extends Controller
{
    protected SignRepository $repository;

    public function __construct(SignRepository $signRepository)
    {
        $this->repository = $signRepository;
    }


    public function index(): Response
    {
        return Inertia::render('Sign/Index', [
            
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Sign/Form');
    }

    public function show(Sign $sign): Response
    {
        return Inertia::render('Sign/index', [
            'sign' => $sign
        ]);
    }

    public function edit(Sign $sign): Response
    {
        return Inertia::render('Sign/Form', [
            'sign' => $sign
        ]);
    }

    public function update(Sign $sign, SignRequest $signRequest): RedirectResponse
    {
        $this->repository->update($signRequest, $sign);

        return redirect()->route('home')->with(['toast' => ['message' => __('sign.create.toast'), 'type' => 'success']]);
    }

    public function store(SignRequest $request): RedirectResponse
    {
        $this->repository->create($request);

        return redirect()->route('home')->with(['toast' => ['message' => __('sign.create.toast'), 'type' => 'success']]);
    }


}
