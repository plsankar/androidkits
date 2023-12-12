import { Prisma } from "@prisma/client";

export type ProjectWithUser = Prisma.ProjectGetPayload<{
    include: { user: true };
}>;
