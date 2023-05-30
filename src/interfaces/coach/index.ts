import { PlayerInterface } from 'interfaces/player';
import { TrainingTaskInterface } from 'interfaces/training-task';
import { UserInterface } from 'interfaces/user';
import { AcademyInterface } from 'interfaces/academy';

export interface CoachInterface {
  id?: string;
  user_id: string;
  academy_id: string;
  player?: PlayerInterface[];
  training_task?: TrainingTaskInterface[];
  user?: UserInterface;
  academy?: AcademyInterface;
  _count?: {
    player?: number;
    training_task?: number;
  };
}
