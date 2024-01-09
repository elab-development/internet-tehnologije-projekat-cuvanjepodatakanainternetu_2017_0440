<?php

namespace App\Http\Controllers;

use App\Http\Resources\RadiResource;
use App\Models\Radi;
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
        $radi = Radi::where('firma_id', $firma_id)->get();
        return response()->json(['radi' => RadiResource::collection($radi)], 200);
    }
}
