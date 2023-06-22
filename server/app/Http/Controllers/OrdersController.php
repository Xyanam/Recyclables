<?php

namespace App\Http\Controllers;

use App\Models\Orders;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class OrdersController extends Controller
{
    public function getOrders()
    {
        return Orders::all();
    }

    public function newOrder(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'orderDate' => 'required',
            'phone' => 'required',
            'recyclables' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $date = $request->input('orderDate');
        $phone = $request->input('phone');
        $recyclables = $request->input('recyclables');

        DB::table('orders')->insertGetId([
            'orderDate' => $date,
            'phone' => $phone,
            'recyclables' => $recyclables
        ]);

        $orders = DB::table('orders')->get();
        return $orders;
    }

    public function deleteOrder($id)
    {
        DB::table('orders')->where('id', $id)->delete();
        $orders = DB::table('orders')->get();
        return $orders;
    }

    public function updateOrder(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'orderDate' => 'required',
            'phone' => 'required',
            'recyclables' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $date = $request->input('orderDate');
        $phone = $request->input('phone');
        $recyclables = $request->input('recyclables');

        DB::table('orders')->where('id', $id)->update([
            'orderDate' => $date,
            'phone' => $phone,
            'recyclables' => $recyclables
        ]);

        $orders = DB::table('orders')->get();
        return $orders;
    }
}
