import prisma from "$lib/prisma";
import { json } from "@sveltejs/kit";

export async function GET() {
  const feed = await prisma.fee.findMany({
    include: { user: { select: { name: true, id: true } } },
    orderBy: { id: "desc" },
  });

  return json(feed);
}
