<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ime' => 'required|string|max:255',
            'prezime' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
            
            'uloga' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $user = \App\Models\User::create([
            'ime' => $request->input('ime'),
            'prezime' => $request->input('prezime'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            
            'uloga' => $request->input('uloga'),
        ]);

        return response()->json(['user' => new UserResource($user)], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only(['email', 'password']);
      
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('token-name')->plainTextToken;
            return response()->json(['token' => $token, 'user' => new UserResource($user)], 200);
        }
    
        return response()->json(['message' => 'Invalid credentials'], 401);
    }
    

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out'], 200);
    }
    public function user(Request $request)
    {
        return response()->json(['user' => new UserResource($request->user())], 200);
    }
}
