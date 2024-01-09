<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RadiResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'korisnik' => $this->korisnik,
            'firma' => $this->firma,
            'pozicija' => $this->pozicija,
            'datum_pocetka' => $this->datum_pocetka,
            
        ];
    }
}
