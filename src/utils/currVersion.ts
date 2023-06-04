const nowTime = Date.now();
export const currVersion = (href: string): string => `${href}?v=${nowTime}`;
