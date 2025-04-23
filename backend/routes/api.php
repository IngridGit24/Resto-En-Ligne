<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\MenuController;

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/
Route::post('/register', [UsersController::class, 'register']);
Route::post('/login', [UsersController::class, 'login']);
Route::middleware('auth:api')->post('/logout', [UsersController::class, 'logout']);

/*
|--------------------------------------------------------------------------
| User Management Routes (Protected)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:api')->group(function () {
    Route::get('/users', [UsersController::class, 'getUsers']);
    Route::get('/users/{id}', [UsersController::class, 'getUser']);
    Route::put('/users/{id}', [UsersController::class, 'updateUser']);
    Route::delete('/users/{id}', [UsersController::class, 'deleteUser']);
});

/*
|--------------------------------------------------------------------------
| Restaurant Routes (Protected)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:api')->group(function () {
    Route::get('/restaurants', [RestaurantController::class, 'getRestaurants']);
    Route::get('/restaurants/{id}', [RestaurantController::class, 'getRestaurant']);
    Route::post('/restaurants', [RestaurantController::class, 'addRestaurant']);
    Route::put('/restaurants/{id}', [RestaurantController::class, 'updateRestaurant']);
    Route::delete('/restaurants/{id}', [RestaurantController::class, 'deleteRestaurant']);
});

/*
|--------------------------------------------------------------------------
| Menu Routes (Protected)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:api')->group(function () {
    Route::get('/menus', [MenuController::class, 'getMenus']);
    Route::get('/menus/{id}', [MenuController::class, 'getMenu']);
    Route::post('/menus', [MenuController::class, 'addMenu']);
    Route::put('/menus/{id}', [MenuController::class, 'updateMenu']);
    Route::delete('/menus/{id}', [MenuController::class, 'deleteMenu']);
});

/*
|--------------------------------------------------------------------------
| Add /api/me route for authenticated user details
|--------------------------------------------------------------------------
*/
Route::middleware('auth:api')->get('/me', [UsersController::class, 'me']);
