import type { Actions, PageServerLoad } from "./$types";
import prisma from "$lib/prisma";

export const load: PageServerLoad = async () => {
  return {
    leaderboard: await prisma.$queryRaw`SELECT R.id, R.name, R.count,
       (SELECT COUNT(*) FROM 
        (SELECT U.id, U.name, COUNT(*) AS count
         FROM Fee F
         JOIN User U ON F.userId = U.id
         GROUP BY userId, name) AS T
        WHERE T.count > R.count) + 1 AS userRank
FROM
  (SELECT U.id AS id, U.name AS name, COUNT(*) AS count
   FROM Fee F
   JOIN User U ON F.userId = U.id
   GROUP BY userId, name) AS R
ORDER BY R.count DESC;`,
  };
};
