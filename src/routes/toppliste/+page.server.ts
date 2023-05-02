import type { Actions, PageServerLoad } from "./$types";
import prisma from "$lib/prisma";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
  return {
    leaderboard:
      await prisma.$queryRaw`SELECT R.id, R.name, COALESCE(R.count, 0) AS count,
       (SELECT COUNT(*) FROM 
        (SELECT U.id, U.name, COUNT(F.userId) AS count
         FROM User U
         LEFT JOIN Fee F ON F.userId = U.id
         GROUP BY U.id, U.name) AS T
        WHERE T.count > COALESCE(R.count, 0)) + 1 AS userRank
FROM
  (SELECT U.id AS id, U.name AS name, COUNT(F.userId) AS count
   FROM User U
   LEFT JOIN Fee F ON F.userId = U.id
   GROUP BY U.id, U.name) AS R
ORDER BY R.count DESC;`,
  };
};

export const actions: Actions = {
  createUser: async ({ request }) => {
    const { name } = Object.fromEntries(await request.formData()) as {
      name: string;
    };

    try {
      await prisma.user.create({
        data: {
          name,
        },
      });
    } catch (err) {
      console.error(err);
      return fail(500, { message: `Klarte ikke å lage bruker ${name}` });
    }

    return {
      message: `La til ${name}`,
    };
  },
};
