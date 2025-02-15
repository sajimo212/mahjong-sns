export const newestFirst = (a: string, b: string) => Date.parse(b) - Date.parse(a);
export const oldestFirst = (a: string, b: string) => Date.parse(a) - Date.parse(b);
