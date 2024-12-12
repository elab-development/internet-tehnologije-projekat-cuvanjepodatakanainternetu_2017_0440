<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FajlResource extends JsonResource
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
            'naziv' => $this->naziv,
            'tip' => $this->tip,
            'velicina' => $this->velicina,
            'one_drive_path' => $this->one_drive_path,
            'prava_pristupa' => $this->prava_pristupa,
            'korisnik' => $this->korisnik,
            'firma' => $this->firma,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            
        ];
    }
}
