<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\PointController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MountainsSectionController;

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

Route::get('/mountainsSection', [MountainsSectionController::class, 'getAll'])->name('api.mountainsSection.index');
Route::delete('/mountainsSection/{mountainsSection}', [MountainsSectionController::class, 'removeAPI'])->name('api.mountainsSection.destroy');
Route::put('/mountainsSection/{mountainsSection}/edit', [MountainsSectionController::class, 'updateAPI'])->name('api.mountainsSection.edit');
Route::post('/mountainsSection/{mountainsSection}', [MountainsSectionController::class, 'createAPI'])->name('api.mountainsSection.create');
