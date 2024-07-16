<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $korisnici = [
            [
                'ime' => 'Pera',
                'prezime' => 'Perić',
                'email' => 'pera@gmail.com',
                'password' => bcrypt('lozinka1'), 
                'uloga' => 'korisnik',
                'one_drive_token' => 'token1'
            ],
            [
                'ime' => 'Zika',
                'prezime' => 'Zikić',
                'email' => 'zika@gmail.com',
                'password' => bcrypt('lozinka2'),
                'uloga' => 'korisnik',
                'one_drive_token' => 'token2'
            ],
            [
                'ime' => 'Marko',
                'prezime' => 'Marković',
                'email' => 'marko@gmail.com',
                'password' => bcrypt('lozinka3'),
                'uloga' => 'korisnik',
                'one_drive_token' => 'token3'
            ],
            [
                'ime' => 'Jelena',
                'prezime' => 'Jovanović',
                'email' => 'jelena@gmail.com',
                'password' => bcrypt('lozinka4'),
                'uloga' => 'korisnik',
                'one_drive_token' => 'token4'
            ],
            [
                'ime' => 'Milan',
                'prezime' => 'Milinković',
                'email' => 'milan@gmail.com',
                'password' => bcrypt('lozinka5'),
                'uloga' => 'vlasnik',
                'one_drive_token' => 'token5'
            ],
            [
                'ime' => 'Ana',
                'prezime' => 'Anić',
                'email' => 'ana@gmail.com',
                'password' => bcrypt('lozinka6'),
                'uloga' => 'zaposleni',
                'one_drive_token' => 'token6'
            ],
            [
                'ime' => 'Stefan',
                'prezime' => 'Stefanović',
                'email' => 'stefan@gmail.com',
                'password' => bcrypt('lozinka7'),
                'uloga' => 'zaposleni',
                'one_drive_token' => 'token7'
            ],
            [
                'ime' => 'Milica',
                'prezime' => 'Milić',
                'email' => 'milica@gmail.com',
                'password' => bcrypt('lozinka8'),
                'uloga' => 'zaposleni',
                'one_drive_token' => 'token8'
            ],
            [
                'ime' => 'Nenad',
                'prezime' => 'Nenadić',
                'email' => 'nenad@gmail.com',
                'password' => bcrypt('lozinka9'),
                'uloga' => 'vlasnik',
                'one_drive_token' => 'token9'
            ],
            [
                'ime' => 'Maja',
                'prezime' => 'Majić',
                'email' => 'maja@gmail.com',
                'password' => bcrypt('lozinka10'),
                'uloga' => 'zaposleni',
                'one_drive_token' => 'token10'
            ],
            [
                'ime' => 'Admin',
                'prezime' => 'Adminić',
                'email' => 'admin@gmail.com',
                'password' => bcrypt('adminpassword'),
                'uloga' => 'admin',
                'one_drive_token' => 'admintoken'
            ],
        ];

        foreach ($korisnici as $korisnik) {
            User::create($korisnik);
        }

        User::factory(10)->create();
    }
}
