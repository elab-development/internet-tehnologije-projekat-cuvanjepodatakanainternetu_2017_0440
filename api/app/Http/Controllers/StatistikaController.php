<?php

namespace App\Http\Controllers;

use App\Models\Fajl;
use App\Models\Radi;
use App\Models\User;
use Illuminate\Http\Request;

class StatistikaController extends Controller
{
    public function getStatistics()
    {
        // Ukupan broj korisnika
        $totalUsers = User::count();

        // Broj vlasnika
        $totalOwners = User::where('uloga', 'vlasnik')->count();

        // Broj zaposlenih
        $totalEmployees = User::where('uloga', 'zaposleni')->count();

        // Procenat vlasnika
        $percentageOwners = $totalUsers > 0 ? ($totalOwners / $totalUsers) * 100 : 0;

        // Procenat zaposlenih
        $percentageEmployees = $totalUsers > 0 ? ($totalEmployees / $totalUsers) * 100 : 0;

        // Ukupan broj fajlova
        $totalFiles = Fajl::count();

        // Broj fajlova po firmi
        $filesPerCompany = Radi::join('fajls', 'radis.firma_id', '=', 'fajls.firma_id')
            ->selectRaw('radis.firma_id, COUNT(fajls.id) as total_files')
            ->groupBy('radis.firma_id')
            ->get();

        return response()->json([
            'total_users' => $totalUsers,
            'percentage_owners' => $percentageOwners,
            'percentage_employees' => $percentageEmployees,
            'total_files' => $totalFiles,
            'files_per_company' => $filesPerCompany
        ], 200);
    }
}
