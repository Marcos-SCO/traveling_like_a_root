<?php

namespace App\Http\Controllers\Api\v1;

use App\Enums\TravelZone;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Support\GroupDiscountCalculator;
use App\Support\CalculateChargedDays;

use Illuminate\Validation\Rule;

use App\Service\QuoteService;
use App\Service\TravelerQuoteCalculator;

use Carbon\Carbon;

class QuoteController extends Controller
{

    public function __construct(private QuoteService $quoteService, private TravelerQuoteCalculator $travelerQuoteCalculator) {}

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

        $travelZone = TravelZone::from(mb_strtolower($validated['travel_zone']));

        $travelers = $validated['travelers'];
        $travelersCount = count($travelers);

        $startDate = Carbon::parse($validated['start_date']);
        $endDate = Carbon::parse($validated['end_date']);

        $chargedDays = CalculateChargedDays::getDays($startDate, $endDate);

        $travelersCost = $this->travelerQuoteCalculator->travelersCost($travelers, $travelZone, $startDate, $chargedDays);

        $totalGroupCost = $this->travelerQuoteCalculator->totalGroupCost($travelersCost);

        $groupPercentageDiscount =
            GroupDiscountCalculator::percentage($travelersCount);

        $totalEnd = $totalGroupCost - ($totalGroupCost * $groupPercentageDiscount);

        $travelersFormattedData =
            $this->travelerQuoteCalculator->travelersFormattedData($travelersCost);

        $allWarningMessages =
            $this->travelerQuoteCalculator->warningMessages($travelersCost);

        $response = [
            'charged_days' => $chargedDays,
            'travelers' => $travelersFormattedData,
            'warnings' =>  $allWarningMessages,
            'group_discount_percentage' => $groupPercentageDiscount * 100,
            'total_amount' => round($totalEnd, 2),
        ];

        return response()->json($response);
    }
}
