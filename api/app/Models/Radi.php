<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Radi extends Model
{ 

    //ovaj model povezuje korisnika i firmu i cuva info o tome koji zaposleni radi u kojoj firmi na kojoj poziciji
    use HasFactory;
    protected $fillable = [
         'korisnik_id', 'firma_id', 'pozicija','datum_pocetka'
    ];

    // Veza sa korisnikom
    public function korisnik()
    {
        return $this->belongsTo(User::class);
    }

    // Veza sa firmom
    public function firma()
    {
        return $this->belongsTo(Firma::class);
    }


}
