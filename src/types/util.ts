import { z } from "zod";
import isISO8601 from "validator/es/lib/isISO8601";

const isPast = (value: string) => new Date(value).valueOf() < Date.now().valueOf();

export const zISO8601 = z.string().refine(isISO8601, { message: "ISO8601形式の日付を指定してください" });
export const zPastISO8601 = zISO8601.refine(isPast, { message: "過去の日付を指定してください" });
