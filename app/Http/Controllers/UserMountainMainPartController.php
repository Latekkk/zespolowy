<?php

namespace App\Http\Controllers;

use App\Helpers\ToastHelper;
use App\Models\UserMountainMainPart;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class UserMountainMainPartController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        UserMountainMainPart::create([
            'user_id' => $request->input('user_id'),
            'mountain_main_part_id' => $request->input('mountain_main_part_id'),
            'granted' => Auth::id(),
            'created_at' => Carbon::now(),
        ]);


        return to_route('user.edit',$request->input('user_id') )->with(ToastHelper::create('UserMountainMainPart'));
    }
}
