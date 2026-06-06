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
        Schema::create('travelers', function (Blueprint $table) {
            $table->id();

            $table->foreignId('quote_id')->constrained()->onDelete('cascade');

            $table->string('name');
            $table->date('birth_date');

            $table->unsignedTinyInteger('age_at_trip')->default(0);
            $table->decimal('age_multiplier', 5, 2)->default(1);

            $table->decimal('base_amount', 12, 2)->default(0);

            $table->decimal('additionals_amount', 12, 2)->default(0);

            $table->decimal('subtotal_amount', 12, 2)->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('travelers');
    }
};
