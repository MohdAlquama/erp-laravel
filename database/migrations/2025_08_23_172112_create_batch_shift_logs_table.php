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
        Schema::create('batch_shift_logs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('student_id'); // student who was moved
            $table->unsignedBigInteger('admin_id');   // admin who made the change
            $table->unsignedBigInteger('old_batch_id'); // previous batch
            $table->unsignedBigInteger('new_batch_id'); // new batch
            $table->string('old_session'); // previous session
            $table->string('new_session'); // new session
            $table->timestamps();

            // Add indexes & foreign keys if needed
            $table->index('student_id');
            $table->index('admin_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('batch_shift_logs');
    }
};
