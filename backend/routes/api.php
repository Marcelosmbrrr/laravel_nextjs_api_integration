<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\{
    LoginController,
    LogoutController,
    RegistrationController,
    GetAuthenticatedUserDataController
};
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\Role\RoleController;

Route::post("/login", LoginController::class);
Route::post("/registration", RegistrationController::class);
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::apiResource("/user", UserController::class);
    Route::apiResource("/role", RoleController::class);
    Route::get("/auth-data", GetAuthenticatedUserDataController::class);
    Route::post("/logout", LogoutController::class);
});
