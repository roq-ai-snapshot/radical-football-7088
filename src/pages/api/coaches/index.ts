import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { coachValidationSchema } from 'validationSchema/coaches';
import { convertQueryToPrismaUtil } from 'server/utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getCoaches();
    case 'POST':
      return createCoach();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCoaches() {
    const data = await prisma.coach.findMany(convertQueryToPrismaUtil(req.query, 'coach'));
    return res.status(200).json(data);
  }

  async function createCoach() {
    await coachValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.player?.length > 0) {
      const create_player = body.player;
      body.player = {
        create: create_player,
      };
    } else {
      delete body.player;
    }
    if (body?.training_task?.length > 0) {
      const create_training_task = body.training_task;
      body.training_task = {
        create: create_training_task,
      };
    } else {
      delete body.training_task;
    }
    const data = await prisma.coach.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
