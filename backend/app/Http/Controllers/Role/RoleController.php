<?php

namespace App\Http\Controllers\Role;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Role;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {

            $roles = Role::all();

            if (!$roles) {
                throw new \Exception("404");
            }

            return response(["message" => "", "roles" => $roles]);
        } catch (\Exception $e) {
            if ($e->getMessage() === "404") {
                return response(["message" => "No roles founded", "roles" => []], 404);
            } else {
                return response(["message" => $e->getMessage(), "roles" => []], 500);
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
    public function destroy(string $id)
    {
        //
    }
}
