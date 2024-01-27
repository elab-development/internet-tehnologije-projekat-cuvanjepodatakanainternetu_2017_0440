<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FajlController;
use App\Http\Controllers\FirmaController;
use App\Http\Controllers\RadiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
Route::resource('firme', FirmaController::class);
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);



Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->get('/user', [AuthController::class, 'user']);

//
Route::resource('fajlovi', FajlController::class);;
Route::middleware('auth:sanctum')->get('fajlovi/pretraga', [FajlController::class,'pretrazi']);
//Route::middleware('auth:sanctum')->

Route::middleware('auth:sanctum')->prefix('radi')->group(function () {
    Route::post('/', [RadiController::class, 'store']);
    Route::get('/{firma_id}', [RadiController::class, 'index']);
});

 
