export interface APIErrorJSON<E extends Object = Object> {
    message: string;
    errors?: E;
    code: number;
}

/**
 * https://github.com/tutorbookapp/tutorbook/blob/3f6d19450cc44577024e68d18e0a5618914b3583/lib/model/error.ts
 */
export class APIError extends Error {
    constructor(
        message: string,
        readonly code: number = 500,
        readonly errors?: Object,
        public internalError?: Object,
    ) {
        super(message);
    }

    toJSON(): APIErrorJSON {
        return {
            message: this.message,
            errors: this.errors,
            code: this.code,
        };
    }
}
