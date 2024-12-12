<?php

namespace App\Http\Controllers;

use App\Http\Resources\RadiResource;
use App\Http\Resources\UserResource;
use App\Models\Radi;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RadiController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'korisnik_id' => 'required|integer',
            'firma_id' => 'required|integer',
            'pozicija' => 'required|string|max:255',
            'datum_pocetka' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $radi = Radi::create($request->all());
        return response()->json(['radi' => new RadiResource($radi)], 201);
    }
    public function index($firma_id)
    {
        // Join tabele `users` i `radi`, i filtriraj prema `firma_id`
        $users = User::join('radis', 'users.id', '=', 'radis.korisnik_id')
            ->where('radis.firma_id', $firma_id)
            ->select('users.*', 'radis.pozicija', 'radis.datum_pocetka')
            ->get();

        $result = $users->map(function ($user) {
            return [
                'id' => $user->id,
                'ime' => $user->ime,
                'prezime' => $user->prezime,
                'email' => $user->email,
                'uloga' => $user->uloga,
                'one_drive_token' => $user->one_drive_token,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
                'pozicija' => $user->pozicija,
                'datum_pocetka' => $user->datum_pocetka,
            ];
        });

        return response()->json(['users' => $result], 200);
    }
    public function destroy($firma_id, $korisnik_id)
    {
        $radi = Radi::where('firma_id', $firma_id)
            ->where('korisnik_id', $korisnik_id)
            ->first();

        if (!$radi) {
            return response()->json(['message' => 'Radi not found'], 404);
        }

        $radi->delete();

        return response()->json(['message' => 'Radi deleted'], 200);
    }
}
