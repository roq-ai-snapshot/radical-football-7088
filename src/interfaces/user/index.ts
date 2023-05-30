import { AcademyInterface } from 'interfaces/academy';
import { CoachInterface } from 'interfaces/coach';
import { CommunicationInterface } from 'interfaces/communication';
import { ParentInterface } from 'interfaces/parent';
import { PlayerInterface } from 'interfaces/player';

export interface UserInterface {
  id?: string;
  roq_user_id: string;
  tenant_id: string;
  academy?: AcademyInterface[];
  coach?: CoachInterface[];
  communication_communication_receiver_idTouser?: CommunicationInterface[];
  communication_communication_sender_idTouser?: CommunicationInterface[];
  parent?: ParentInterface[];
  player?: PlayerInterface[];

  _count?: {
    academy?: number;
    coach?: number;
    communication_communication_receiver_idTouser?: number;
    communication_communication_sender_idTouser?: number;
    parent?: number;
    player?: number;
  };
}
