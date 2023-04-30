import prisma from "$lib/prisma";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export async function GET() {
  const fees = await prisma.fee.findMany({
    include: { user: { select: { name: true } } },
    orderBy: { id: "desc" },
  });

  return json(fees);
}

export const POST: RequestHandler = async (event) => {
  const { comment, amount, userId, addedBy } = await event.request.json();

  const createdFee = await prisma.fee.create({
    data: {
      comment: comment,
      amount: amount,
      userId: userId,
      addedBy: addedBy,
    },
  });

  return json({ success: true });
};
