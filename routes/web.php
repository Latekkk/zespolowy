<?php

use App\Http\Controllers\AdvertisementController;
use App\Http\Controllers\BadgeController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PointController;
use App\Http\Controllers\ProfileController;
use app\Http\Controllers\RegisterController;
use App\Http\Controllers\SignController;
use App\Http\Controllers\SquadController;
use App\Http\Controllers\MountainSectionController;
use App\Http\Controllers\StatuteController;
use App\Http\Controllers\TranslationSwitcherController;
use App\Http\Controllers\TripController;
use App\Http\Controllers\TripToAcceptController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserMountainMainPartController;
use App\Http\Controllers\UserPointsController;
use App\Http\Controllers\UserPointsToAcceptController;
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


Route::get('/translationSwitcher', [TranslationSwitcherController::class, 'store'])->name('translationSwitcher');
Route::get('/', [AdvertisementController::class, 'index'])->name('home');
Route::get('/badge', [BadgeController::class, 'index'])->name('badge.index');
Route::get('/sign', [SignController::class, 'index'])->name('sign.index');
Route::get('/mountainSection', [MountainSectionController::class, 'index'])->name('mountainSection.index');
Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
Route::get('/statute', [StatuteController::class, 'index'])->name('statute.index');
Route::get('/squad', [SquadController::class, 'index'])->name('squad.index');
Route::get('/trip', [TripController::class, 'index'])->name('trip.index');

Route::resource('point', PointController::class);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    Route::middleware('verified')->group(function () {
        Route::resource('advertisement', AdvertisementController::class)->except('index');
        Route::resource('badge', BadgeController::class)->except('index');
        Route::resource('sign', SignController::class)->except('index');
        Route::resource('mountainSection', MountainSectionController::class)->except('index');
        Route::resource('contact', ContactController::class)->except('index');
        Route::resource('statute', StatuteController::class)->except('index');
        Route::resource('squad', SquadController::class)->except('index');
        Route::resource('user', UserController::class);
        Route::resource('trip', TripController::class)->except('index');
        Route::resource('userPoints', UserPointsController::class);
        Route::resource('userMountainMainPartController', UserMountainMainPartController::class)->only('store');
        Route::resource('userPointsToAccept', UserPointsToAcceptController::class)->parameter('userPointsToAccept', 'userPoints');
    });
});





require __DIR__.'/auth.php';
