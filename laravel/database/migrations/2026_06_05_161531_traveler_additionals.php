<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('traveler_additionals', function (Blueprint $table) {
            $table->id();

            $table->foreignId('traveler_id')->constrained()->onDelete('cascade');

            $table->string('coverage_code');

            $table->decimal('amount', 12, 2)->default(0);

            $table->timestamps();

            $table->unique(['traveler_id', 'coverage_code']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('traveler_additionals');
    }
};
