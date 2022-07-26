declare namespace NodeJS {
    interface ProcessEnv {
        /**
         * -------- next.config.js
         */

        /**
         * also .env =true, but only with phase === PHASE_PRODUCTION_BUILD
         */
        readonly IS_PRODUCTION: boolean;
        /**
         * also .env =true
         */
        readonly HOST: string;
        readonly DOMAIN: string;
        /**
         * webpack-bundle-analyzer
         *
         * @see @next/bundle-analyzer
         * @link https://github.com/vercel/next.js/tree/canary/packages/next-bundle-analyzer
         */
        readonly ANALYZE: boolean;
        /**
         * Json Web Token expires in seconds
         */
        readonly JWT_EXPIRES_IN: string;

        /**
         * -------- .env
         */
        /**
         * is secure host? (https:)
         */
        readonly IS_HOST_SECURE: boolean;

        /**
         * Redis url
         */
        readonly REDIS_URL: string;
        /**
         * Json Web Token secret
         */
        readonly JWT_SECRET: string;

        readonly ADMIN_USERNAME: string;
        readonly ADMIN_PASS: string;
        readonly ADMIN_ROLE: string;
    }
}
