<?php

namespace App\Http\Controllers;

use App\Helpers\ToastHelper;
use App\Http\Requests\TripRequest;
use App\Models\MountainSection;
use App\Models\MountainSectionTrip;
use App\Models\Trip;
use App\Repositories\TripRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class TripController extends Controller
{

    protected TripRepository $repository;

    public function __construct(TripRepository $tripRepository)
    {
        $this->repository = $tripRepository;
    }


    public function index(): Response
    {
        return Inertia::render('Trip/Index', [
            'Trip' => Trip::paginate(5),
            'mountainSectionTrip' => MountainSectionTrip::all(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Trip/Form', [
            'mountainSection' => MountainSection::all(),
        ]);
    }

    public function show(Trip $trip): Response
    {
        return Inertia::render('Trip/index', [
            'Trip' => $trip
        ]);
    }

    public function edit(Trip $trip): Response
    {
        $trip->load('mountainSections');
        return Inertia::render('Trip/Form', [
            'trip' => $trip,
            'mountainSection' => MountainSection::all(),
        ]);
    }

    public function store(TripRequest $request): RedirectResponse
    {
        $trip = new Trip();
        $trip->name = $request->input('name');
        $inputDate = $request->input('date');
        $formattedDate = Carbon::createFromFormat('Y-m-d\TH:i:s.u\Z', $inputDate)->format('Y-m-d');
        $trip->date = $formattedDate;
        $trip->save();

        $mountainSections = $request->input('mountainSections');
        foreach ($mountainSections as $mountainSectionData) {
            $mountainSection = new MountainSection();
            $mountainSection->id = $mountainSectionData['id'];

            $mountainSectionTrip = new MountainSectionTrip();
            $mountainSectionTrip->trip_id = $trip->id;
            $mountainSectionTrip->mountain_section_id = $mountainSection->id;
            $mountainSectionTrip->save();
        }
        return redirect()->route('trip.index')->with(ToastHelper::update('trip'));
    }



    public function update(TripRequest $request, Trip $trip): RedirectResponse
    {
        $trip->name = $request->input('name');
        $inputDate = $request->input('date');
        $formattedDate = Carbon::createFromFormat('Y-m-d\TH:i:s.u\Z', $inputDate)->format('Y-m-d');
        $trip->date = $formattedDate;
        $trip->save();

        $mountainSections = $request->input('mountainSections');
        foreach ($mountainSections as $mountainSectionData) {
            $mountainSectionId = $mountainSectionData['id'];
            $mountainSection = MountainSection::find($mountainSectionId);

            if (!$mountainSection) {
                $mountainSection = new MountainSection();
                $mountainSection->id = $mountainSectionId;
                // Ustaw inne właściwości dla nowo utworzonego obiektu $mountainSection
            }

            $mountainSectionTrip = new MountainSectionTrip();
            $mountainSectionTrip->trip_id = $trip->id;
            $mountainSectionTrip->mountain_section_id = $mountainSection->id;
            $mountainSectionTrip->save();
        }

        return redirect()->route('trip.index')->with(ToastHelper::update('trip'));
    }

    public function getAll(): JsonResponse
    {
        $params = request()->query();
        $trip = Trip::orderBy($params['sort']?? 'id', (int)$params['sortOrder'] >= 0? 'asc' : 'desc' )-> paginate((int)$params['paginate'] ?? 15)->appends(request()->query());
        return response()->json($trip);
    }

    public function removeAPI(Trip $trip): JsonResponse
    {
        $this->repository->remove($trip);
        return response()->json(['status' => 'ok']);
    }

}
