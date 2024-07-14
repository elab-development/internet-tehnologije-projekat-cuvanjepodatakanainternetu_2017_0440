<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FajlController;
use App\Http\Controllers\FirmaController;
use App\Http\Controllers\RadiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OneDriveController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::post('/onedrive/token', [OneDriveController::class, 'getToken']);
Route::get('/onedrive/files', [OneDriveController::class, 'getFiles']);
Route::get('/onedrive/user', [OneDriveController::class, 'getUserId']); 



Route::resource('firme', FirmaController::class);
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::get('/vlasnici', [AuthController::class, 'getAllUsers'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->get('/user', [AuthController::class, 'user']);
Route::get('/firme/vlasnik/{vlasnik_id}', [FirmaController::class, 'getFirmeByVlasnik'])->middleware('auth:sanctum');
// Dodavanje nove rute za dobijanje zaposlenih određene firme
Route::get('/firma/{firma_id}/zaposleni', [RadiController::class, 'index'])->middleware('auth:sanctum');
Route::middleware('auth:sanctum')->resource('fajlovi', FajlController::class);;
Route::middleware('auth:sanctum')->get('fajlovi/pretraga', [FajlController::class,'pretrazi']);
//Route::middleware('auth:sanctum')->
Route::delete('/firma/{firma_id}/zaposleni/{korisnik_id}', [RadiController::class, 'destroy']);

Route::middleware('auth:sanctum')->prefix('radi')->group(function () {
    Route::post('/', [RadiController::class, 'store']);
    Route::get('/{firma_id}', [RadiController::class, 'index']);
    Route::get('/firme/broj-zaposlenih', [FirmaController::class, 'getEmployeeCount']);
});

 
