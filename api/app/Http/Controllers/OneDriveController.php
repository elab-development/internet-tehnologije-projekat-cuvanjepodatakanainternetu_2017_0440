<?php
 
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class OneDriveController extends Controller
{
    private $tenantId = '40cadee3-afbe-4139-8eb7-65baea0b60e3';
    private $clientId = '292f14a5-8f0e-4450-8385-99eb9c566ab6';
    private $clientSecret = 'JbC8Q~Om-eLZb83w2fA.g6NGzQVGGbHTxQwZqapb';

    public function getToken()
    {
        $response = Http::asForm()->post("https://login.microsoftonline.com/{$this->tenantId}/oauth2/v2.0/token", [
            'grant_type' => 'client_credentials',
            'client_id' => $this->clientId,
            'client_secret' => $this->clientSecret,
            'scope' => 'https://graph.microsoft.com/.default',
        ]);

        if ($response->successful()) {
            return response()->json($response->json());
        } else {
            Log::error('Unable to retrieve token', ['response' => $response->json()]);
            return response()->json(['error' => 'Unable to retrieve token', 'details' => $response->json()], 500);
        }
    }

    public function getFiles(Request $request)
    {
        $token = $request->bearerToken();
        $userId = '175e58ed-e4fd-4ec7-b607-0a98e510df9d'; // Zamenite sa pravim korisničkim ID

        $response = Http::withToken($token)->get("https://graph.microsoft.com/v1.0/users/{$userId}/drive/root/children");

        if ($response->successful()) {
            return response()->json($response->json());
        } else {
            return response()->json(['error' => 'Unable to retrieve files', 'details' => $response->json()], 500);
        }
    }
}
