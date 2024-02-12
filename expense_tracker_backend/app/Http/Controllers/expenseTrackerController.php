<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Dotenv\Validator;
use Illuminate\Http\Request;

class expenseTrackerController extends Controller
{
    public function index()
    {
        //$categories = Transaction::all();
        $data = Transaction::orderBy('created_at', 'desc')->get();
        return response()->json($data);
    }

    //delete Transaction
    public function delete($id)
    {
        $data = Transaction::find($id);

        if (!$data) return "Data of id " . $id . " does not exist.";

        $result = $data->delete();
        if ($result) {
            return ['Result' => 'successfully deleted data of id ' . $id];
        } else {
            return ['Result' => 'Failed. Try again!'];
        }
    }

    //create Transaction
    public function create(Request $req)
    {
        // Validation rules
        $req->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string',
            'amount' => 'required|numeric|min:0',
        ]);

        $data = new Transaction();

        $data->name = $req->name;
        $data->type = $req->type;
        $data->amount = $req->amount;

        $result = $data->save();
        if ($result) {
            return ['Result' => 'success'];
        } else {
            return ['Result' => 'failed'];
        }
    }
}
