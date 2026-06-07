<?php

namespace App\Http\Controllers\Api\v1;

use App\Enums\TravelZone;
use App\Http\Controllers\Controller;
use App\Http\Requests\QuoteIndexRequest;
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

    public function index(QuoteIndexRequest $request)
    {
        $quotes = Quote::query()
            ->when(
                $request->travel_zone,
                fn($query, $travelZone) =>
                $query->where('travel_zone', $travelZone)
            )
            ->when(
                $request->start_date,
                fn($query, $startDate) =>
                $query->whereDate('start_date', '>=', $startDate)
            )
            ->when(
                $request->end_date,
                fn($query, $endDate) =>
                $query->whereDate('end_date', '<=', $endDate)
            )
            ->when(
                $request->start_date || $request->end_date,
                fn($query) =>
                $query->orderBy('start_date')->orderBy('id'),
                fn($query) =>
                $query->latest('end_date')
            )
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
