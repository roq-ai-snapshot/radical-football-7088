import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { trainingTaskValidationSchema } from 'validationSchema/training-tasks';
import { convertQueryToPrismaUtil } from 'server/utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getTrainingTaskById();
    case 'PUT':
      return updateTrainingTaskById();
    case 'DELETE':
      return deleteTrainingTaskById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTrainingTaskById() {
    const data = await prisma.training_task.findFirst(convertQueryToPrismaUtil(req.query, 'training_task'));
    return res.status(200).json(data);
  }

  async function updateTrainingTaskById() {
    await trainingTaskValidationSchema.validate(req.body);
    const data = await prisma.training_task.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteTrainingTaskById() {
    const data = await prisma.training_task.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
