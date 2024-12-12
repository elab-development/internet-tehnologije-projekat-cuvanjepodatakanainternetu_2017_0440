<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fajls', function (Blueprint $table) {
            $table->id();
            $table->string('naziv');
            $table->string('tip');
            $table->integer('velicina');
            $table->string('one_drive_path');
            $table->string('prava_pristupa');
            $table->unsignedBigInteger('korisnik_id');
            $table->unsignedBigInteger('firma_id')->nullable();
            $table->timestamps();
        
           
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('fajls');
    }
};
