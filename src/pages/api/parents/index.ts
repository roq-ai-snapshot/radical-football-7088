import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { parentValidationSchema } from 'validationSchema/parents';
import { convertQueryToPrismaUtil } from 'server/utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getParents();
    case 'POST':
      return createParent();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getParents() {
    const data = await prisma.parent.findMany(convertQueryToPrismaUtil(req.query, 'parent'));
    return res.status(200).json(data);
  }

  async function createParent() {
    await parentValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.parent.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
