import { Prisma } from "@prisma/client";

type ProjectWithUser = Prisma.ProjectGetPayload<{
    include: { user: true };
}>;

declare module "rehype-add-classes";
declare module "@microflash/rehype-starry-night";
declare module "rehype-urls";
