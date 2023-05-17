<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\PointController;
use App\Http\Controllers\UserController;
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


Route::get('/users', [UserController::class, 'getAll'])->name('api.users.index');
Route::delete('/users/{user}', [UserController::class, 'removeAPI'])->name('api.users.destroy');

Route::get('/mountainsSection', [MountainSectionController::class, 'getAll'])->name('api.mountainsSection.index');
Route::delete('/mountainsSection/{mountainsSection}', [MountainSectionController::class, 'removeAPI'])->name('api.mountainSection.destroy');
Route::put('/mountainsSection/{mountainsSection}/edit', [MountainSectionController::class, 'updateAPI'])->name('api.mountainSection.edit');
Route::post('/mountainsSection/{mountainsSection}', [MountainSectionController::class, 'createAPI'])->name('api.mountainSection.create');
