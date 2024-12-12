<?php

namespace App\Http\Controllers;

use App\Http\Resources\FirmaResource;
use App\Models\Firma;
use App\Models\User; // Dodajte ovaj import
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB; // Dodajte ovaj import
use Illuminate\Support\Facades\Validator;

class FirmaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $firme = Firma::all();
        return response()->json(['firme' => FirmaResource::collection($firme)], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'naziv' => 'required|string|max:255',
            'adresa' => 'required|string|max:255',
            'vlasnik_id' => 'required|integer',
            'PIB' => 'required|string|max:15',
            'logo' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        DB::beginTransaction();
        try {
            $firma = Firma::create($request->all());

            // Ažurirajte ulogu vlasnika
            $vlasnik = User::find($request->input('vlasnik_id'));
            if ($vlasnik) {
                $vlasnik->uloga = 'vlasnik';
                $vlasnik->save();
            }

            DB::commit();
            return response()->json(['firma' => new FirmaResource($firma)], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error creating firma', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $firma = Firma::find($id);

        if (!$firma) {
            return response()->json(['message' => 'Firma not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'naziv' => 'required|string|max:255',
            'adresa' => 'required|string|max:255',
            'vlasnik_id' => 'required|integer',
            'PIB' => 'required|string|max:15',
            'logo' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        DB::beginTransaction();
        try {
            $firma->update($request->all());
            DB::commit();
            return response()->json(['firma' => new FirmaResource($firma)], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error updating firma', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $firma = Firma::find($id);

        if (!$firma) {
            return response()->json(['message' => 'Firma not found'], 404);
        }

        DB::beginTransaction();
        try {
            $vlasnikId = $firma->vlasnik_id;
            $firma->delete();

            // Proverite da li vlasnik ima još firmi
            $brojFirmi = Firma::where('vlasnik_id', $vlasnikId)->count();
            if ($brojFirmi == 0) {
                $vlasnik = User::find($vlasnikId);
                if ($vlasnik) {
                    $vlasnik->uloga = 'zaposleni';
                    $vlasnik->save();
                }
            }

            DB::commit();
            return response()->json(['message' => 'Firma deleted'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error deleting firma', 'error' => $e->getMessage()], 500);
        }
    }

    public function getFirmeByVlasnik($vlasnik_id)
    {
        $firme = Firma::where('vlasnik_id', $vlasnik_id)->get();

        if ($firme->isEmpty()) {
            return response()->json(['message' => 'No firms found for this owner'], 404);
        }

        return response()->json(['firme' => FirmaResource::collection($firme)], 200);
    }

    
}
