<?php

namespace App\Http\Controllers\Api\v1;

use App\Enums\TravelZone;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Support\GroupDiscountCalculator;
use App\Support\CalculateChargedDays;

use Illuminate\Validation\Rule;

use App\Service\QuoteService;

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

        $travelZone = TravelZone::from(mb_strtolower($validated['travel_zone']));

        $travelers = $validated['travelers'];
        $travelersCount = count($travelers);

        $startDate = $validated['start_date'];
        $endDate = $validated['end_date'];

        $chargedDays = CalculateChargedDays::getDays($startDate, $endDate);

        $travelersCost = array_map(
            fn($traveler) => $this->quoteService->calculateTravelerIndividualCost(
                $traveler,
                $travelZone->dailyRate(),
                $startDate,
                $chargedDays
            ),
            $travelers
        );


        $totalGroupCost = array_sum(array_map(function ($travelerCost) {
            return $travelerCost['subtotal'];
        }, $travelersCost));

        $groupPercentageDiscount =
            GroupDiscountCalculator::percentage($travelersCount);

        $totalEnd = $totalGroupCost - ($totalGroupCost * $groupPercentageDiscount);

        $travelersFormattedData =  array_map(function ($traveler) {
            return [
                'name' => $traveler['name'],
                'age' =>  $traveler['age'],
                'subtotal' => round($traveler['subtotal'], 2),
                'applied_additionals' => $traveler['applied_additionals'],
            ];
        }, $travelersCost);

        $filteredWarnings = array_filter(
            array_map(function ($travelerCost) {
                return $travelerCost['warnings'] ?? null;
            }, $travelersCost)
        );
        $allWarningMessages = !empty($filteredWarnings)
            ? array_merge(...array_map('array_values', $filteredWarnings))
            : [];

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
