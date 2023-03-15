<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdvertisementRequest;
use App\Models\Advertisement;
use App\Repositories\AdvertisementRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdvertisementController extends Controller
{
    protected AdvertisementRepository $repository;

    public function __construct(AdvertisementRepository $advertisementRepository)
    {
        $this->repository = $advertisementRepository;
    }


    public function index(): Response
    {
        return Inertia::render('Advertisement/Index', [
            'advertisements' => Advertisement::paginate(5)
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Advertisement/Create');
    }

    public function store(AdvertisementRequest $request): RedirectResponse
    {
        $this->repository->create($request);

        return redirect()->route('home')->with(['toast' => ['message' => __('advertisement.create.toast'), 'type' => 'success']]);
    }
}
