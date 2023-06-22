<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReceptionController extends Controller
{

    public function getReception()
    {
        $receptions = DB::table('reception')
            ->join('reception_material', 'reception.id', '=', 'reception_material.reception_id')
            ->join('materials', 'reception_material.materials_id', '=', 'materials.id')
            ->select('reception.id', 'reception.order_id', 'reception.Impurity', 'reception.weightStart', 'reception.weightEnd', 'reception.totalWeight', DB::raw('GROUP_CONCAT(materials.name) as materials'))
            ->groupBy('reception.id', 'reception.order_id', 'reception.Impurity', 'reception.weightStart', 'reception.weightEnd', 'reception.totalWeight')
            ->get();

        $receptions = $receptions->map(function ($item) {
            $item->materials = explode(',', $item->materials);
            return $item;
        });

        return $receptions;
    }

    public function addNewReception(Request $request)
    {
        $order_id = $request->input('order_id');
        $Impurity = $request->input('Impurity');
        $weightStart = $request->input('weightStart');
        $weightEnd = $request->input('weightEnd');
        $totalWeight = $request->input('totalWeight');
        $materials = $request->input('materials');

        $reception_id = DB::table('reception')->insertGetId([
            'order_id' => $order_id,
            'Impurity' => $Impurity,
            'weightStart' => $weightStart,
            'weightEnd' => $weightEnd,
            'totalWeight' => $totalWeight
        ]);

        foreach ($materials as $material_id) {
            DB::table('reception_material')->insert([
                'reception_id' => $reception_id,
                'materials_id' => $material_id
            ]);
        }

        $receptions = DB::table('reception')
            ->join('reception_material', 'reception.id', '=', 'reception_material.reception_id')
            ->join('materials', 'reception_material.materials_id', '=', 'materials.id')
            ->select('reception.id', 'reception.order_id', 'reception.Impurity', 'reception.weightStart', 'reception.weightEnd', 'reception.totalWeight', DB::raw('GROUP_CONCAT(materials.name) as materials'))
            ->groupBy('reception.id', 'reception.order_id', 'reception.Impurity', 'reception.weightStart', 'reception.weightEnd', 'reception.totalWeight')
            ->get();

        $receptions = $receptions->map(function ($item) {
            $item->materials = explode(',', $item->materials);
            return $item;
        });

        return $receptions;
    }
    public function deleteReception($reception_id)
    {
        DB::table('reception_material')->where('reception_id', $reception_id)->delete();
        DB::table('reception')->where('id', $reception_id)->delete();


        $receptions = DB::table('reception')
            ->join('reception_material', 'reception.id', '=', 'reception_material.reception_id')
            ->join('materials', 'reception_material.materials_id', '=', 'materials.id')
            ->select('reception.id', 'reception.order_id', 'reception.Impurity', 'reception.weightStart', 'reception.weightEnd', 'reception.totalWeight', DB::raw('GROUP_CONCAT(materials.name) as materials'))
            ->groupBy('reception.id', 'reception.order_id', 'reception.Impurity', 'reception.weightStart', 'reception.weightEnd', 'reception.totalWeight')
            ->get();

        $receptions = $receptions->map(function ($item) {
            $item->materials = explode(',', $item->materials);
            return $item;
        });

        return $receptions;
    }
}
