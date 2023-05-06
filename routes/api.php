<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\PointController;
use App\Http\Controllers\TripController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MountainSectionController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/contacts', [ContactController::class, 'getAll'])->name('api.contacts.index');
Route::delete('/contacts/{contact}', [ContactController::class, 'removeAPI'])->name('api.contacts.destroy');
Route::post('/contacts/{contact}/response', [ContactController::class, 'setResponseFromApi'])->name('api.contacts.response');


Route::get('/points', [PointController::class, 'getAll'])->name('api.points.index');
Route::delete('/points/{point}', [PointController::class, 'removeAPI'])->name('api.points.destroy');

Route::get('/mountainsSection', [MountainSectionController::class, 'getAll'])->name('api.mountainsSection.index');
Route::delete('/mountainsSection/{mountainsSection}', [MountainSectionController::class, 'removeAPI'])->name('api.mountainSection.destroy');
Route::put('/mountainsSection/{mountainsSection}/edit', [MountainSectionController::class, 'updateAPI'])->name('api.mountainSection.edit');
Route::post('/mountainsSection/{mountainsSection}', [MountainSectionController::class, 'createAPI'])->name('api.mountainSection.create');

Route::get('/trip', [TripController::class, 'getAll'])->name('api.trip.index');
Route::delete('/trip/{trip}', [TripController::class, 'removeAPI'])->name('api.trip.destroy');
Route::put('/trip/{trip}/edit', [TripController::class, 'updateAPI'])->name('api.trip.edit');
Route::post('/trip/{trip}', [TripController::class, 'createAPI'])->name('api.trip.create');
