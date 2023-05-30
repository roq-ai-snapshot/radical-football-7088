import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { userValidationSchema } from 'validationSchema/users';
import { convertQueryToPrismaUtil } from 'server/utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getUsers();
    case 'POST':
      return createUser();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getUsers() {
    const data = await prisma.user.findMany(convertQueryToPrismaUtil(req.query, 'user'));
    return res.status(200).json(data);
  }

  async function createUser() {
    await userValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.academy?.length > 0) {
      const create_academy = body.academy;
      body.academy = {
        create: create_academy,
      };
    } else {
      delete body.academy;
    }
    if (body?.coach?.length > 0) {
      const create_coach = body.coach;
      body.coach = {
        create: create_coach,
      };
    } else {
      delete body.coach;
    }
    if (body?.communication_communication_receiver_idTouser?.length > 0) {
      const create_communication_communication_receiver_idTouser = body.communication_communication_receiver_idTouser;
      body.communication_communication_receiver_idTouser = {
        create: create_communication_communication_receiver_idTouser,
      };
    } else {
      delete body.communication_communication_receiver_idTouser;
    }
    if (body?.communication_communication_sender_idTouser?.length > 0) {
      const create_communication_communication_sender_idTouser = body.communication_communication_sender_idTouser;
      body.communication_communication_sender_idTouser = {
        create: create_communication_communication_sender_idTouser,
      };
    } else {
      delete body.communication_communication_sender_idTouser;
    }
    if (body?.parent?.length > 0) {
      const create_parent = body.parent;
      body.parent = {
        create: create_parent,
      };
    } else {
      delete body.parent;
    }
    if (body?.player?.length > 0) {
      const create_player = body.player;
      body.player = {
        create: create_player,
      };
    } else {
      delete body.player;
    }
    const data = await prisma.user.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
