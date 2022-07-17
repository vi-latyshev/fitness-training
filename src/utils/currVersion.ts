const nowTime = Date.now();
export const currVersion = (href: string) => `${href}?v=${nowTime}`;
