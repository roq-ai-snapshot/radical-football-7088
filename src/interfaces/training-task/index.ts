import { PlayerInterface } from 'interfaces/player';
import { CoachInterface } from 'interfaces/coach';

export interface TrainingTaskInterface {
  id?: string;
  player_id: string;
  coach_id: string;
  task_name: string;
  status: string;

  player?: PlayerInterface;
  coach?: CoachInterface;
  _count?: {};
}
