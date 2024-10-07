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
        Schema::create('officers', function (Blueprint $table) {
            $table->id();
            $table->string('student_id')->unique()->nullable();
            $table->string('rank')->nullable();
            $table->enum('class', ['1cl', '2cl', '3cl', '4cl'])->nullable();
            $table->string('firstName');
            $table->string('middleName')->nullable();
            $table->string('lastName');
            $table->string('program')->nullable();
            $table->string('major')->nullable();
            $table->date('birthdate')->nullable();
            $table->string('religion')->nullable();
            $table->enum('blood_type', ['a+', 'a-', 'b+', 'b-', 'ab+', 'ab-', 'o+', 'o-', 'unknown'])->nullable();
            $table->string('province')->nullable();
            $table->string('region')->nullable();
            $table->integer('height_cm')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('officers');
    }
};
