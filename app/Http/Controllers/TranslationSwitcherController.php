<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;

class TranslationSwitcherController extends Controller
{
    public function store(Request $request)
    {
        if (Session::has('language')) {
            $language = Session::get('language');
            App::setLocale($language);

        } else {
            App::setLocale($request->input('lang'));
        }

        $request->session()->put('language', $request->input('lang'));


        return Redirect::back();
    }
}
