export const newestFirst = (a: string, b: string) => new Date(b).valueOf() - new Date(a).valueOf();
