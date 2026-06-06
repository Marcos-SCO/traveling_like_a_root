<?php

namespace App\Http\Controllers\Api\v1;

use App\Enums\TravelZone;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Validation\Rule;

use App\Service\QuoteService;
use App\Service\TravelerQuoteCalculator;


class QuoteController extends Controller
{

    public function __construct(private QuoteService $quoteService) {}

    public function index(Request $request)
    {
        // --- IGNORE ---

        return response()->json(['message' => 'starting point']);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'travel_zone'          => ['required', 'string', Rule::Enum(TravelZone::class)],
            'start_date'           => 'required|date',
            'end_date'             => 'required|date',

            'travelers'            => 'required|array|min:1',
            'travelers.*.name'       => 'required|string|max:255',
            'travelers.*.birth_date' => 'required|date',
            'travelers.*.additionals' => 'nullable|array',
        ]);

        $calculateTotal = $this->quoteService->calculateTotal($validated);

        return response()->json($calculateTotal);
    }
}
