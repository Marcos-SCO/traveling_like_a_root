<?php

use App\Http\Controllers\Api\v1\QuoteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::get('/', [QuoteController::class, 'index']);
    Route::post('/quote', [QuoteController::class, 'store']);
});
