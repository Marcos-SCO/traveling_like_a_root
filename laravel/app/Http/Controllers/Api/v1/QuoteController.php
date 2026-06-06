<?php

namespace App\Http\Controllers\Api\v1;

use App\Enums\TravelZone;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Validation\Rule;

use App\Service\QuoteService;

use App\Http\Requests\QuoteRequest;

class QuoteController extends Controller
{

    public function __construct(private QuoteService $quoteService) {}

    public function index(Request $request)
    {
        // --- IGNORE ---

        return response()->json(['message' => 'starting point']);
    }

    public function store(QuoteRequest $request)
    {
        $calculateTotal = $this->quoteService->calculateTotal($request->validated());

        return response()->json($calculateTotal);
    }
}
