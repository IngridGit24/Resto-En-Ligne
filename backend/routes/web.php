<?php

use App\Http\Controllers\RestoManager;
use Illuminate\Support\Facades\Route;

Route::get('/', [RestoManager::class, 'welcome']);

require __DIR__.'/auth.php';
