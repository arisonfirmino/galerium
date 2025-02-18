import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { db } from "@/app/lib/prisma";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/app/components/ui/pagination";

const PaginationControls = async () => {
  const session = await getServerSession(authOptions);

  const users = await db.user.findMany({
    where: { id: { not: session?.user.id } },
    orderBy: { created_at: "desc" },
  });

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink href={`/${session?.user.username}`}>1</PaginationLink>
        </PaginationItem>

        {users.map((user, index) => (
          <PaginationItem key={user.id}>
            <PaginationLink href={`/${user.username}`}>
              {index + 2}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControls;
