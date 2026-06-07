<?php

namespace App\Http\Controllers\Api\v1;

use App\Enums\TravelZone;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Validation\Rule;

use App\Service\QuoteService;

use App\Http\Requests\QuoteRequest;
use App\Http\Resources\QuoteResource;
use App\Models\Quote;
use App\Service\QuotePersistenceService;

class QuoteController extends Controller
{

    public function __construct(private QuoteService $quoteService, private QuotePersistenceService $quotePersistenceService) {}

    public function index(Request $request)
    {
        $quotes = Quote::query()
            ->when($request->travel_zone, function ($query) use ($request) {
                $query->where('travel_zone', $request->travel_zone);
            })
            ->latest('id')
            ->cursorPaginate(10);

        return response()->json($quotes);
    }

    public function show(int $id)
    {
        $quote = Quote::with('travelers.additionals')
            ->findOrFail($id);

        return response()->json(new QuoteResource($quote));
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
