<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Idea;
use Validator;

class IdeasController extends Controller
{
    public function get()
    {
        return Idea::all()->sortBy('title')->values();
    }

    public function post(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|unique:ideas|max:255',
            'description' => 'required'
        ]);

        if ($validator->fails()) {
            return response('All titles must be unique', 301);
        }

        $idea = Idea::create($request->all());
        return response()->json($idea, 201);
    }
}
