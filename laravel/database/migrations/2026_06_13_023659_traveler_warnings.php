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
        Schema::create('traveler_warnings', function (Blueprint $table) {
            $table->id();
            
            // $table->foreignId('quote_id')->constrained('quotes')->cascadeOnDelete();
            $table->foreignId('quote_id');

            $table->foreignId('traveler_id')->constrained('travelers')->cascadeOnDelete();

            $table->string('warning_message');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('traveler_warnings');
    }
};
