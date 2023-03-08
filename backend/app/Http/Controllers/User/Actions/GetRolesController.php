<?php

namespace App\Http\Controllers\User\Actions;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Role;

class GetRolesController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        try {

            $roles = Role::all();

            return response(["message" => "", "roles" => $roles], 200);
        } catch (\Exception $e) {
            if ($e->getMessage() === "404") {
                return response(["message" => "No roles found."], 404);
            } else {
                return response(["message" => $e->getMessage()], 500);
            }
        }
    }
}
