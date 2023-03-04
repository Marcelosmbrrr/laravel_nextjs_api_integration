import * as React from 'react';
import { parseCookies } from 'nookies';
import { env } from '@/next.config';
import { axios } from "../services/api";

// Generate CSRF token
// https://laravel.com/docs/9.x/sanctum#csrf-protection

export class TokenCSRFProvider {

    async execute() {
        try {
            await axios.get(`${env.API_URL}/sanctum/csrf-cookie`);

            const { "XSRF-TOKEN": token_csrf } = parseCookies();

            return token_csrf;
        } catch (e) {
            throw e;
        }
    }

}