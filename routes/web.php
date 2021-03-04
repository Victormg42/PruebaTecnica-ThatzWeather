<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TiempoController;

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

/*Route::get('/', function () {
    return view('welcome');
});*/
Route::get('/', [TiempoController::class, 'home']);
Route::get('consulta', [TiempoController::class, 'consulta']);
Route::post('InsertOrUpdate', [TiempoController::class, 'InsertOrUpdate']);
Route::post('readTop', [TiempoController::class, 'readTop']);