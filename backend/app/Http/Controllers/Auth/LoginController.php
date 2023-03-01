<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Http\Requests\Auth\LoginRequest;

class LoginController extends Controller
{
    public User $model;

    function __construct(User $model)
    {
        $this->model = $model;
    }

    public function __invoke(LoginRequest $request)
    {
        try {

            if (!Auth::attempt($request->only(['email', 'password']))) {
                throw new \Exception("Invalid credentials");
            }

            $permissions = [];
            if (auth()->user()->role->id === 1) {
                $permissions = ['users:all', 'roles:all'];
            } else {
                $permissions = ['users:read', 'roles:read'];
            }

            $timezone = new \DateTimeZone('America/Sao_Paulo');
            $now = new \DateTime('now', $timezone);
            $expiresAt = $now->add(new \DateInterval('PT1M'));
            $token = auth()->user()->createToken("auth-token", $permissions, $expiresAt)->plainTextToken;

            // Notify

            return response()->json([
                "user" => auth()->user(),
                "authtoken" => $token,
                "message" => "Successful login!"
            ]);
        } catch (\Exception $e) {
            if ($e->getMessage() === "Invalid credentials") {
                return response(["message" => $e->getMessage()], 404);
            } else {
                return response(["message" => $e->getMessage()], 500);
            }
        }
    }
}
