import z from "zod";

export const fitlerSchema = z.object({
    query: z.string().optional().default(""),
    page: z.number().default(1),
    sort: z.enum(["default", "name", "rating", "lastupdated"]).default("default"),
    order: z.enum(["asc", "desc"]).default("asc"),
});

export type ArchiveFitler = z.infer<typeof fitlerSchema>;

export const DEFAULT_FILTER: ArchiveFitler = {
    page: 1,
    query: "",
    sort: "default",
    order: "asc",
};
