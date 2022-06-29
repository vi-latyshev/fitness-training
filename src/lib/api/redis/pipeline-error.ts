type ExecResult<RT = unknown> = [Error | null, RT];

export const handlePipeline = <RT = string>(execResults: ExecResult<RT>[] | null): RT[] => {
    if (execResults === null) {
        return [];
    }
    const errors: Error[] = [];
    const results: RT[] = [];

    for (let i = 0; i < execResults.length; i += 1) {
        const [error, result] = execResults[i];
        if (error !== null) {
            errors.push(error);
        }
        results.push(result);
    }

    if (errors.length > 0) {
        const message = errors.map((err) => err.message).join('; ');
        throw new Error(message);
    }

    return results;
};
