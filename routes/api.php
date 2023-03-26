<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\PointController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PathController;
use App\Http\Controllers\API\PassportAuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('register', [PassportAuthController::class, 'register']);
Route::post('login', [PassportAuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::get('get-user', [PassportAuthController::class, 'userInfo']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/contacts', [ContactController::class, 'getAll'])->name('api.contacts.index')->middleware('auth:api');
Route::delete('/contacts/{contact}', [ContactController::class, 'removeAPI'])->name('api.contacts.destroy')->middleware('auth:api');
Route::post('/contacts/{contact}/response', [ContactController::class, 'setResponseFromApi'])->name('api.contacts.response')->middleware('auth:api');
Route::get('/points', [PointController::class, 'getAll'])->name('api.points.index')->middleware('auth:api');
Route::delete('/points/{point}', [PointController::class, 'removeAPI'])->name('api.points.destroy')->middleware('auth:api');
Route::get('/paths', [PathController::class, 'getAll'])->name('api.paths.index')->middleware('auth:api');
Route::delete('/paths/{path}', [PathController::class, 'removeAPI'])->name('api.paths.destroy')->middleware('auth:api');
