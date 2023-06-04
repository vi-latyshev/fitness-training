export const percent = (start: number, current: number): number => (
    Math.round(((current - start) / start) * 100 * 100) / 100
);
