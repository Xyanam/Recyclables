<?php

namespace App\Http\Controllers;

use App\Models\Materials;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class MaterialsController extends Controller
{
    public function getMaterials()
    {
        return Materials::all();
    }

    public function newMaterial(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'class_material' => 'required',
            'name' => 'required',
            'cash_price' => 'required',
            'card_price' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $class_material = $request->input('class_material');
        $name = $request->input('name');
        $cash_price = $request->input('cash_price');
        $card_price = $request->input('card_price');

        DB::table('materials')->insertGetId([
            'class_material' => $class_material,
            'name' => $name,
            'cash_price' => $cash_price,
            'card_price' => $card_price
        ]);

        $materials = DB::table('materials')->get();
        return $materials;
    }
    public function deleteMaterial($id)
    {
        DB::table('materials')->where('id', $id)->delete();
        $materials = DB::table('materials')->get();
        return $materials;
    }
    public function updateMaterial(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'class_material' => 'required',
            'name' => 'required',
            'cash_price' => 'required',
            'card_price' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $class_material = $request->input('class_material');
        $name = $request->input('name');
        $cash_price = $request->input('cash_price');
        $card_price = $request->input('card_price');

        DB::table('materials')->where('id', $id)->update([
            'class_material' => $class_material,
            'name' => $name,
            'cash_price' => $cash_price,
            'card_price' => $card_price
        ]);

        $materials = DB::table('materials')->get();
        return $materials;
    }
}
