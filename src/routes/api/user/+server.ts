import prisma from "$lib/prisma";
import { json } from "@sveltejs/kit";

export async function GET() {
  const feed = await prisma.user.findMany({});

  return json(feed);
}

export const POST: RequestHandler = async (event) => {
  const { name } = await event.request.json();

  const createdPost = await prisma.user.create({
    data: {
      name: name,
    },
  });

  return json({ success: true });
};
