<?php

namespace Database\Factories;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Radi>
 */
class RadiFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'korisnik_id' => User::factory(),
            'firma_id' => random_int(1,5), //imamo 5 firmi u bazi
            'pozicija' => $this->faker->jobTitle,
            'datum_pocetka' => Carbon::now()->subDays(rand(1, 365)),
        ];
    }
}
