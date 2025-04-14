<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RestoManager;

Route::get('/', function () {
    return view('welcome');
});

Route::prefix('api')->group(function () {
    //Manage Restaurant routes
    Route::get('/menus', [RestoManager::class, 'index']);
    Route::post('/menus', [RestoManager::class, 'store']);
    Route::get('/menus/{id}', [RestoManager::class, 'show']);
    Route::put('/menus/{id}', [RestoManager::class, 'update']);
    Route::delete('/menus/{id}', [RestoManager::class, 'destroy']);

    Route::get('/restaurants', [RestoManager::class, 'indexRestaurants']);
    Route::post('/restaurants', [RestoManager::class, 'storeRestaurant']);
    Route::get('/restaurants/{id}', [RestoManager::class, 'showRestaurant']);
    Route::put('/restaurants/{id}', [RestoManager::class, 'updateRestaurant']);
    Route::delete('/restaurants/{id}', [RestoManager::class, 'destroyRestaurant']);
});