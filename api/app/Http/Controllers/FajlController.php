<?php

namespace App\Http\Controllers;

use App\Http\Resources\FajlResource;
use App\Models\Fajl;
use App\Models\Radi;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class FajlController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        $firmaId = Radi::where('korisnik_id', $user->id)->pluck('firma_id')->first();
        $fajlovi = Fajl::where('firma_id', $firmaId)->get();

        return response()->json(['fajlovi' => FajlResource::collection($fajlovi)], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'prava_pristupa' => 'required|string|max:255',
            'file' => 'required|file',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $user = Auth::user();
        $firma_id =  Radi::where('korisnik_id', $user->id)->pluck('firma_id')->first();

        if (!$firma_id) {
            return response()->json(['error' => 'User does not belong to any firm'], 400);
        }

        $file = $request->file('file');
        $folderPath = "uploads/{$firma_id}";
        $path = $file->store($folderPath);

        $naziv = $file->getClientOriginalName();
        $tip = $file->getClientMimeType();
        $velicina = $file->getSize();
        $one_drive_path = "{$folderPath}/{$naziv}";

        $fajl = Fajl::create([
            'naziv' => $naziv,
            'tip' => $tip,
            'velicina' => $velicina,
            'one_drive_path' => $one_drive_path,
            'prava_pristupa' => $request->input('prava_pristupa'),
            'korisnik_id' => $user->id,
            'firma_id' => $firma_id,
        ]);

        return response()->json(['fajl' => $fajl], 201);
    }

    public function show($id)
    {
        $fajl = Fajl::find($id);

        if (!$fajl) {
            return response()->json(['message' => 'Fajl not found'], 404);
        }

        return response()->json(['fajl' => new FajlResource($fajl)], 200);
    }

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

    public function destroy($id)
    {
        $fajl = Fajl::find($id);

        if (!$fajl) {
            return response()->json(['message' => 'Fajl not found'], 404);
        }

        Storage::delete($fajl->one_drive_path);
        $fajl->delete();

        return response()->json(['message' => 'Fajl deleted'], 200);
    }

    public function pretrazi(Request $request)
    {
        $query = Fajl::query();
        $user = Auth::user();
        $firma_id = $user->firma_id;

        if ($request->has('tip')) {
            $query->where('tip', $request->input('tip'));
        }

        if ($request->has('naziv')) {
            $query->where('naziv', 'LIKE', '%' . $request->input('naziv') . '%');
        }

        $query->where('firma_id', $firma_id);

        $fajlovi = $query->get();

        return response()->json(['fajlovi' => FajlResource::collection($fajlovi)], 200);
    }
}
