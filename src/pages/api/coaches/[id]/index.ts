import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { coachValidationSchema } from 'validationSchema/coaches';
import { convertQueryToPrismaUtil } from 'server/utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getCoachById();
    case 'PUT':
      return updateCoachById();
    case 'DELETE':
      return deleteCoachById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCoachById() {
    const data = await prisma.coach.findFirst(convertQueryToPrismaUtil(req.query, 'coach'));
    return res.status(200).json(data);
  }

  async function updateCoachById() {
    await coachValidationSchema.validate(req.body);
    const data = await prisma.coach.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteCoachById() {
    const data = await prisma.coach.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
