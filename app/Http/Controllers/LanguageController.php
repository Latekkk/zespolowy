<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App;
use Illuminate\Support\Facades\Log;

class LanguageController extends Controller
{

    public function index()

    {

        return view('lang');

    }



    /**

     * Display a listing of the resource.

     *

     * @return \Illuminate\Http\Response

     */

    public function change(Request $request)

    {
        session()->put('locale', request('language'));
        return back();

    }

}
