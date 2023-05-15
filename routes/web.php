<?php

use App\Http\Controllers\AdvertisementController;
use App\Http\Controllers\BadgeController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PointController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SignController;
use App\Http\Controllers\SquadController;
use App\Http\Controllers\MountainSectionController;
use App\Http\Controllers\StatuteController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [AdvertisementController::class, 'index'])->name('home');
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('advertisement', AdvertisementController::class)->middleware(['auth', 'verified'])->except('index');
Route::resource('badge', BadgeController::class)->middleware(['auth', 'verified'])->except('index');
Route::resource('sign', SignController::class)->middleware(['auth', 'verified'])->except('index');

Route::get('/badge', [BadgeController::class, 'index'])->name('badge.index');
Route::get('/sign', [SignController::class, 'index'])->name('sign.index');

Route::resource('point', PointController::class);

Route::resource('mountainSection', MountainSectionController::class)->middleware(['auth', 'verified'])->except('index');
Route::get('/mountainSection', [MountainSectionController::class, 'index'])->name('mountainSection.index');

Route::resource('contact', ContactController::class)->middleware(['auth', 'verified'])->except('index');
Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');

Route::get('/statute', [StatuteController::class, 'index'])->name('statute.index');
Route::resource('statute', StatuteController::class)->middleware(['auth', 'verified'])->except('index');

Route::get('/squad', [SquadController::class, 'index'])->name('squad.index');
Route::resource('squad', SquadController::class)->middleware(['auth', 'verified'])->except('index');

require __DIR__.'/auth.php';
