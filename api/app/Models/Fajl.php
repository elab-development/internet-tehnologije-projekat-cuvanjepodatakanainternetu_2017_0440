<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fajl extends Model
{
    use HasFactory;
    protected $fillable = [
        'naziv', 'tip', 'velicina', 'one_drive_path', 'prava_pristupa', 'korisnik_id', 'firma_id'
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
