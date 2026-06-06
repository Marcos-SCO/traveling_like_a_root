<?php

namespace App\Http\Controllers\Api\v1;

use App\Enums\TravelZone;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Validation\Rule;

use App\Service\QuoteService;

use App\Http\Requests\QuoteRequest;
use App\Service\QuotePersistenceService;

class QuoteController extends Controller
{

    public function __construct(private QuoteService $quoteService, private QuotePersistenceService $quotePersistenceService) {}

    public function index(Request $request)
    {
        // --- IGNORE ---

        return response()->json(['message' => 'starting point']);
    }

    public function store(QuoteRequest $request)
    {
        $calculateData = $this->quoteService->calculateTotal($request->validated());

        $this->quotePersistenceService
            ->persist(
                $request->validated(),
                $calculateData
            );

        $formattedCalculatedArrayResponse = $this->quoteService->formattedCalculatedArrayResponse($calculateData);

        return response()->json($formattedCalculatedArrayResponse);
    }
}
