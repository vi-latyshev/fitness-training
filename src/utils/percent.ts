export const percent = (start: number, current: number) => (
    Math.round(((current - start) / start) * 100 * 100) / 100
);
