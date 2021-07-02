import { getSession } from "next-auth/client";
import prisma from "@lib/prisma";
import { NextApiRequest, NextApiResponse } from "next-auth/_utils";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { title, content } = req.body;

  const session = await getSession({ req });
  if (!session) {
    res.status(403).send("Access Denied");
  } else {
    const result = await prisma.post.create({
      data: {
        title: title,
        content: content,
        author: { connect: { email: session?.user?.email } },
      },
    });
    res.json(result);
  }
}
