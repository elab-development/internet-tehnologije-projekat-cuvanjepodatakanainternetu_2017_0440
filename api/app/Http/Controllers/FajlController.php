<?php

namespace App\Http\Controllers;

use App\Http\Resources\FajlResource;
use App\Models\Fajl;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FajlController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $fajlovi = Fajl::all();
        return response()->json(['fajlovi' => FajlResource::collection(
            $fajlovi
        )], 200);
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
            'prava_pristupa' => 'required|string|max:255',
            'korisnik_id' => 'required|integer',
            'firma_id' => 'required|integer',
            'file' => 'required|file',  
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

       
        $file = $request->file('file');
        $path = $file->store('uploads');  

        
        $naziv = $file->getClientOriginalName();
        $tip = $file->getClientMimeType();
        $velicina = $file->getSize();
        $one_drive_path = 'putanja/do/foldera/' . $naziv;  

        
        $fajl = Fajl::create([
            'naziv' => $naziv,
            'tip' => $tip,
            'velicina' => $velicina,
            'one_drive_path' => $one_drive_path,
            'prava_pristupa' => $request->input('prava_pristupa'),
            'korisnik_id' => $request->input('korisnik_id'),
            'firma_id' => $request->input('firma_id'),
        ]);

        return response()->json(['fajl' => $fajl], 201);
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Fajl  $fajl
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $fajl = Fajl::find($id);

        if (!$fajl) {
            return response()->json(['message' => 'Fajl not found'], 404);
        }

        return response()->json(['fajl' => new FajlResource($fajl)], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Fajl  $fajl
     * @return \Illuminate\Http\Response
     */
    public function edit(Fajl $fajl)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Fajl  $fajl
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $fajl = Fajl::find($id);

        if (!$fajl) {
            return response()->json(['message' => 'Fajl not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'prava_pristupa' => 'required|string|max:255',
          
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        
        $fajl->prava_pristupa = $request->input('prava_pristupa');
        

        $fajl->save();

        return response()->json(['fajl' => new FajlResource($fajl)], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Fajl  $fajl
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $fajl = Fajl::find($id);

        if (!$fajl) {
            return response()->json(['message' => 'Fajl not found'], 404);
        }
  
        $fajl->delete();

        return response()->json(['message' => 'Fajl deleted'], 200);
    }



    public function pretrazi(Request $request)
{
    $query = Fajl::query();

 
    if ($request->has('tip')) {
        $query->where('tip', $request->input('tip'));
    }

 
    if ($request->has('firma_id')) {
        $query->where('firma_id', $request->input('firma_id'));
    }

 
    if ($request->has('korisnik_id')) {
        $query->where('korisnik_id', $request->input('korisnik_id'));
    }

 
    if ($request->has('naziv')) {
        $query->where('naziv', 'LIKE', '%' . $request->input('naziv') . '%');
    }

    $fajlovi = $query->get();
    
    return response()->json(['fajlovi' => FajlResource::collection($fajlovi)], 200);
}

}
