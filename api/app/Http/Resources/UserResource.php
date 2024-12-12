<?php

namespace App\Http\Resources;

use App\Models\Radi;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
      // Pronađi firmu u kojoj je korisnik zaposlen
      $firmaId = Radi::where('korisnik_id', $this->id)->pluck('firma_id')->first();

      return [
          'id' => $this->id,
          'ime' => $this->ime,
          'prezime' => $this->prezime,
          'email' => $this->email,
          'firma_id' => $firmaId,
          'uloga' => $this->uloga,
          'one_drive_token' => $this->one_drive_token,
          'created_at' => $this->created_at,
          'updated_at' => $this->updated_at,
      ];
    }
}
