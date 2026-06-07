<?php

use App\Http\Controllers\Api\v1\QuoteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::post('/quote', [QuoteController::class, 'store']);
    
    Route::get('/quote/{id}', [QuoteController::class, 'show']);

    Route::get('/quotes', [QuoteController::class, 'index']);
});
