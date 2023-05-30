import { ParentInterface } from 'interfaces/parent';
import { PerformanceDataInterface } from 'interfaces/performance-data';
import { TrainingTaskInterface } from 'interfaces/training-task';
import { UserInterface } from 'interfaces/user';
import { AcademyInterface } from 'interfaces/academy';
import { CoachInterface } from 'interfaces/coach';

export interface PlayerInterface {
  id?: string;
  user_id: string;
  academy_id: string;
  coach_id: string;
  parent?: ParentInterface[];
  performance_data?: PerformanceDataInterface[];
  training_task?: TrainingTaskInterface[];
  user?: UserInterface;
  academy?: AcademyInterface;
  coach?: CoachInterface;
  _count?: {
    parent?: number;
    performance_data?: number;
    training_task?: number;
  };
}
