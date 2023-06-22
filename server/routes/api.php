<?php

use App\Http\Controllers\MaterialsController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\ReceptionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::get('/orders', [OrdersController::class, 'getOrders']);
Route::post('/orders', [OrdersController::class, 'newOrder']);
Route::delete('/orders/{id}', [OrdersController::class, 'deleteOrder']);
Route::put('/orders/{id}', [OrdersController::class, 'updateOrder']);

Route::get('/materials', [MaterialsController::class, 'getMaterials']);
Route::post('/materials', [MaterialsController::class, 'newMaterial']);
Route::delete('/materials/{id}', [MaterialsController::class, 'deleteMaterial']);
Route::put('/materials/{id}', [MaterialsController::class, 'updateMaterial']);

Route::get('/reception', [ReceptionController::class, 'getReception']);
Route::post('/reception', [ReceptionController::class, 'addNewReception']);
Route::delete('/reception/{id}', [ReceptionController::class, 'deleteReception']);
