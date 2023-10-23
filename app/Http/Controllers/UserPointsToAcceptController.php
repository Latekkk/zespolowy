<?php

namespace App\Http\Controllers;

use App\Helpers\ToastHelper;
use App\Http\Requests\UserPointsToAcceptRequest;
use App\Models\DocumentToRead;
use App\Models\Trip;
use App\Models\User;
use App\Models\UserPoints;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserPointsToAcceptController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

//        $this->authorize('viewAny', UserPointsToAcceptPolicy::class);
        $perPage =  \request()?->input('paginate') ?? 15;
        $sort =\request()?->input('sort') ?? 'status';
        $sortOrder =\request()?->input('sortOrder') ?? 'asc';

        $appends = ['sort' => $sort, 'sortOrder' => $sortOrder];

        $userPointsToAccept = UserPoints::with(['user','mountainSection','approvedBy'])->orderBy($sort, $sortOrder)->paginate($perPage)->appends($appends);

        return Inertia::render('UserPointsToAccept/Index', [
            'data' => $userPointsToAccept,
            ...$appends
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserPointsToAcceptRequest $request)
    {
        $userPoint = UserPoints::find($request->userPoint);
        $userPoint->status = $request->status;
        $userPoint->approvedBy()->associate(Auth::user());
        $userPoint->save();
        return to_route('userPointsToAccept.index', ['toast' => ToastHelper::update('UserPointToAccept')]);
    }

    /**
     * Display the specified resource.
     */
    public function show(UserPoints $userPoints)
    {
        $userPoints->load(['user','mountainSection','approvedBy', 'pathUser']);
        return Inertia::render('UserPointsToAccept/Show', [
            'userPoint' => $userPoints,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UserPoints $userPoints)
    {
        $userPoints->load(['user','mountainSection','approvedBy']);

        return Inertia::render('UserPointsToAccept/Edit', [
            'userPoint' => $userPoints,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserPoints $userPoints)
    {
        if (!$userPoints->delete()) {
            abort(404);
        }

        return redirect()->back()->with(ToastHelper::remove('UserPoints'));

    }
}
