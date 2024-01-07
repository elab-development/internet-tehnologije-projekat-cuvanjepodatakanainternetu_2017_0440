<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Firma extends Model
{
    use HasFactory;

    protected $fillable = [
        'naziv', 'adresa', 'vlasnik_id','PIB','logo'
    ];

    // Veza sa korisnicima - zaposlenima
    public function zaposleni()
    {
        return $this->hasMany(User::class);
    }

    // Veza sa fajlovima
    public function fajlovi()
    {
        return $this->hasMany(Fajl::class);
    }

    // Veza sa korisnicima - vlasnik
    public function vlasnik()
    {
        return $this->belongsTo(User::class,'vlasnik_id');
    }

}
