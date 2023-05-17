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
            'trips' => Trip::with('mountainSections')->paginate(5),
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
        $trip->load('mountainSections');
        return Inertia::render('Trip/index', [
            'trip' => $trip,
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

        $mountainSections = $request->input('requestData.mountainSections');
        MountainSectionTrip::where('trip_id', $trip->id)->delete();

        foreach ($mountainSections as $mountainSectionData) {
            $mountainSectionId = $mountainSectionData['id'];

            $mountainSectionTrip = new MountainSectionTrip();
            $mountainSectionTrip->trip_id = $trip->id;
            $mountainSectionTrip->mountain_section_id = $mountainSectionId;
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
    public function getPoints(Trip $trip): JsonResponse
    {
        $mountainSections = DB::table('mountain_section_trip')
            ->where('trip_id', $trip->id)
            ->join('mountain_sections', 'mountain_section_trip.mountain_section_id', '=', 'mountain_sections.id')
            ->join('points as start_point', 'mountain_sections.start_point_id', '=', 'start_point.id')
            ->join('points as end_point', 'mountain_sections.end_point_id', '=', 'end_point.id')
            ->select(
                'start_point.id as start_point_id',
                'start_point.lat as start_point_lat',
                'start_point.lng as start_point_lng',
                'start_point.name as start_point_name',
                'end_point.id as end_point_id',
                'end_point.lat as end_point_lat',
                'end_point.lng as end_point_lng',
                'end_point.name as end_point_name'
            )
            ->get();

        $points = [];
        foreach ($mountainSections as $section) {
            $startPoint = new Point();
            $startPoint->id = $section->start_point_id;
            $startPoint->lat = $section->start_point_lat;
            $startPoint->lng = $section->start_point_lng;
            $startPoint->name = $section->start_point_name;

            $endPoint = new Point();
            $endPoint->id = $section->end_point_id;
            $endPoint->lat = $section->end_point_lat;
            $endPoint->lng = $section->end_point_lng;
            $endPoint->name = $section->end_point_name;

            $points[] = [
                'start_point' => $startPoint,
                'end_point' => $endPoint,
            ];
        }

        return response()->json($points);
    }
}
