import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { trainingTaskValidationSchema } from 'validationSchema/training-tasks';
import { convertQueryToPrismaUtil } from 'server/utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getTrainingTasks();
    case 'POST':
      return createTrainingTask();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTrainingTasks() {
    const data = await prisma.training_task.findMany(convertQueryToPrismaUtil(req.query, 'training_task'));
    return res.status(200).json(data);
  }

  async function createTrainingTask() {
    await trainingTaskValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.training_task.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
