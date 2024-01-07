<?php

namespace App\Http\Controllers;

use App\Http\Resources\FirmaResource;
use App\Models\Firma;
use Illuminate\Http\Request;
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
        return response()->json(['firme' => FirmaResource::collection( $firme)], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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

        $firma = Firma::create($request->all());
        return response()->json(['firma' => $firma], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Firma  $firma
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $firma = Firma::find($id);

        if (!$firma) {
            return response()->json(['message' => 'Firma not found'], 404);
        }

        return response()->json(['firma' => $firma], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Firma  $firma
     * @return \Illuminate\Http\Response
     */
    public function edit(Firma $firma)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Firma  $firma
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

        $firma->update($request->all());
        return response()->json(['firma' => $firma], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Firma  $firma
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $firma = Firma::find($id);

        if (!$firma) {
            return response()->json(['message' => 'Firma not found'], 404);
        }

        $firma->delete();
        return response()->json(['message' => 'Firma deleted'], 200);
    }
}
