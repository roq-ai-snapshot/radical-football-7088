import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { playerValidationSchema } from 'validationSchema/players';
import { convertQueryToPrismaUtil } from 'server/utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getPlayers();
    case 'POST':
      return createPlayer();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPlayers() {
    const data = await prisma.player.findMany(convertQueryToPrismaUtil(req.query, 'player'));
    return res.status(200).json(data);
  }

  async function createPlayer() {
    await playerValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.parent?.length > 0) {
      const create_parent = body.parent;
      body.parent = {
        create: create_parent,
      };
    } else {
      delete body.parent;
    }
    if (body?.performance_data?.length > 0) {
      const create_performance_data = body.performance_data;
      body.performance_data = {
        create: create_performance_data,
      };
    } else {
      delete body.performance_data;
    }
    if (body?.training_task?.length > 0) {
      const create_training_task = body.training_task;
      body.training_task = {
        create: create_training_task,
      };
    } else {
      delete body.training_task;
    }
    const data = await prisma.player.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
