<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Auth\RegistrationRequest;
use App\Models\User;

class RegistrationController extends Controller
{
    public User $model;

    function __construct(User $model)
    {
        $this->model = $model;
    }

    public function __invoke(RegistrationRequest $request)
    {
        try {
            $user = $this->model->create($request->validated());

            // Notify
            
            return response(["message" => "Registration successful!"], 201);
        } catch (\Exception $e) {
            return response(["message" => $e->getMessage()], 500);
        }
    }
}
