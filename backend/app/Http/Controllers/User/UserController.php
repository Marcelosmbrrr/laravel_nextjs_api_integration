<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {

            $users = User::with("role")->get();

            if (!$users) {
                throw new \Exception("404");
            }

            return response(["message" => "", "users" => $users]);
        } catch (\Exception $e) {
            if ($e->getMessage() === "404") {
                return response(["message" => "No users founded", "users" => []], 404);
            } else {
                return response(["message" => $e->getMessage(), "users" => []], 500);
            }
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        //
    }
}
