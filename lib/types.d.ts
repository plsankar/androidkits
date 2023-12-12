import { Prisma } from "@prisma/client";

type ProjectWithUser = Prisma.ProjectGetPayload<{
  include: { user: true };
}>;
