<?php

namespace App\Http\Controllers\Api\v1;

use App\Enums\TravelZone;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Carbon\Carbon;
use App\Support\TravelerRateCalculator;
use App\Support\AdditionalsRate;

use App\Enums\AdditionalCoverage;

use App\Support\GroupDiscountCalculator;

class QuoteController extends Controller
{
    public function index(Request $request)
    {
        // --- IGNORE ---

        return response()->json(['message' => 'starting point']);
    }

    public function calculateChargedDays($startDate, $endDate)
    {
        $start = new \DateTime($startDate);
        $end = new \DateTime($endDate);
        $interval = $start->diff($end);
        $completeInterval = $interval->days + 1;

        return $completeInterval > 5 ? $completeInterval : 5;
    }

    public function warningsForAdditionalAdventure(string $additional, int $age, array $travelerData): array
    {
        $addVentureSportEnumValue = mb_strtoupper(AdditionalCoverage::ADVENTURE_SPORTS->value);

        $isAdditionalAdventureSports = mb_strtoupper($additional) === $addVentureSportEnumValue;

        if ($isAdditionalAdventureSports && ($age < 18 || $age > 64)) {
            return [
                'can_apply' => false,
                'warning' =>
                "{$addVentureSportEnumValue} não aplicada para {$travelerData['name']}: fora da faixa etária permitida (18-64)."
            ];
        }

        return [
            'can_apply' => true,
            'warning' => null,
        ];
    }

    public function calculateTravelerIndividualCost($travelerData, $travelZoneDailyRate, $tripStartDate, $chargedDays)
    {
        $tripStartDate = Carbon::parse($tripStartDate);
        $birthDate = Carbon::parse($travelerData['birth_date']);
        $age = (int) round($birthDate->diffInYears($tripStartDate));

        $ageMultiplier = TravelerRateCalculator::ageMultiplier($birthDate, $tripStartDate);

        $base = $travelZoneDailyRate * $chargedDays;
        $subTotal = $base * $ageMultiplier;

        $additionals = $travelerData['additionals'] ?? [];
        $warnings = [];
        $appliedAdditionals = [];

        foreach ($additionals as $additional) {

            $adventureSportValidation = $this->warningsForAdditionalAdventure(
                $additional,
                $age,
                $travelerData
            );

            if (!$adventureSportValidation['can_apply']) {
                $warnings[] = $adventureSportValidation['warning'];
                continue;
            }

            $subTotal += AdditionalsRate::cost($additional, $subTotal, $chargedDays);

            $appliedAdditionals[] = $additional;
        }

        return [
            'name' => $travelerData['name'],
            'age' => $age,
            'subtotal' => $subTotal,
            'applied_additionals' => $appliedAdditionals,
            'warnings' => $warnings
        ];
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'travel_zone'          => 'required|string',
            'start_date'           => 'required|date',
            'end_date'             => 'required|date',

            'travelers'            => 'required|array|min:1',
            'travelers.*.name'       => 'required|string|max:255',
            'travelers.*.birth_date' => 'required|date',
            'travelers.*.additionals' => 'nullable|array',
        ]);

        $travelZone = TravelZone::from($validated['travel_zone']);

        $travelers = $validated['travelers'];
        $travelersCount = count($travelers);

        $startDate = $validated['start_date'];
        $endDate = $validated['end_date'];

        $chargedDays = $this->calculateChargedDays($startDate, $endDate);

        $travelersCost = array_map(
            fn($traveler) => $this->calculateTravelerIndividualCost(
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
