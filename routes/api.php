<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\PointController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PathController;

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

Route::get('/path', [PathController::class, 'getAll'])->name('api.paths.index');
Route::delete('/path/{path}', [PathController::class, 'removeAPI'])->name('api.paths.destroy');
Route::put('/path/{path}/edit', [PathController::class, 'updateAPI'])->name('api.path.edit');
Route::post('/path/{path}', [PathController::class, 'createAPI'])->name('api.path.create');
