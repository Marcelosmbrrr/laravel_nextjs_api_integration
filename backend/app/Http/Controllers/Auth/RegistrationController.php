<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\Auth\RegistrationRequest;
use App\Models\User;
use App\Notifications\Auth\RegistrationNotification;

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

            dd("ok");
            
            $user = $this->model->create([
                "name" => $request->name,
                "email" => $request->email,
                "password" => Hash::make($request->password),
                "role_id" => 1
            ]);

            // Notify
            $user->notify(new RegistrationNotification());
            
            return response(["message" => "Registration successful!"], 201);
        } catch (\Exception $e) {
            return response(["message" => $e->getMessage()], 500);
        }
    }
}
