import { z } from 'zod';
import isISO8601 from 'validator/es/lib/isISO8601';

const isPast = (value: string) => new Date(value).valueOf() < Date.now().valueOf();

export const zISO8601 = z.string().refine(isISO8601);
export const zPastISO8601 = z.string().refine(value => isISO8601(value) && isPast(value));
