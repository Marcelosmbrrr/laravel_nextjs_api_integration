<?php

return [

    'paths' => ['*'], // from api/*

    'allowed_methods' => ['*'],

    'allowed_origins' => [env("FRONTEND_URL"), "localhost:3000"], // from *

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true, // from false

];

?>
