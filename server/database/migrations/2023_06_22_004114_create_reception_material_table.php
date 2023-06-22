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
        Schema::create('reception_material', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('reception_id');
            $table->unsignedBigInteger('materials_id');

            $table->foreign('reception_id')->references('id')->on('receptions')->onDelete('cascade');
            $table->foreign('materials_id')->references('id')->on('materials')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reception_material');
    }
};
