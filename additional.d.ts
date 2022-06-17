declare namespace NodeJS {
    interface ProcessEnv {
        /**
         * -------- next.config.js
         */

        /**
         * also .env =true
         */
        readonly IS_PRODUCTION: boolean;
        /**
         * also .env =true, but only with IS_PRODUCTION = false
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
    }
}
