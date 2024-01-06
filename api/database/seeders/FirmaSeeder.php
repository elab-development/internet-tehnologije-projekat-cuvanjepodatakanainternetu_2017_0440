<?php

namespace Database\Seeders;

use App\Models\Firma;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FirmaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $firme = [
            [
                'naziv' => 'Firma1',
                'adresa' => 'Adresa1',
                'vlasnik_id' => rand(1, 10),
                'PIB' => rand(100000000, 999999999),
                'logo' => 'logo1.png',
            ],
            [
                'naziv' => 'Firma2',
                'adresa' => 'Adresa2',
                'vlasnik_id' => rand(1, 10),
                'PIB' => rand(100000000, 999999999),
                'logo' => 'logo2.png',
            ],
            [
                'naziv' => 'Firma3',
                'adresa' => 'Adresa3',
                'vlasnik_id' => rand(1, 10),
                'PIB' => rand(100000000, 999999999),
                'logo' => 'logo3.png',
            ],
            [
                'naziv' => 'Firma4',
                'adresa' => 'Adresa4',
                'vlasnik_id' => rand(1, 10),
                'PIB' => rand(100000000, 999999999),
                'logo' => 'logo4.png',
            ],
            [
                'naziv' => 'Firma5',
                'adresa' => 'Adresa5',
                'vlasnik_id' => rand(1, 10),
                'PIB' => rand(100000000, 999999999),
                'logo' => 'logo5.png',
            ],
        ];
        
        foreach ($firme as $firma) {
             Firma::create($firma);
        }
    }
}
