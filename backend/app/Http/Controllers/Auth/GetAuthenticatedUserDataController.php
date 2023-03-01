<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class GetAuthenticatedUserDataController extends Controller
{
    public function __invoke(Request $request)
    {
        return response(["user" => auth()->user(), "message" => ""], 200);
    }
}
