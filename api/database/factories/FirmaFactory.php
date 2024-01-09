<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Firma>
 */
class FirmaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'naziv' => $this->faker->company,
            'adresa' => $this->faker->address,
            'vlasnik_id' => random_int(1,5),
            'PIB' => $this->faker->unique()->numerify('##########'),  
            'logo' => 'putanja/do/loga',  
        ];
    }
}
