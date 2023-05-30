import * as yup from 'yup';
import { academyValidationSchema } from 'validationSchema/academies';
import { coachValidationSchema } from 'validationSchema/coaches';
import { communicationValidationSchema } from 'validationSchema/communications';
import { parentValidationSchema } from 'validationSchema/parents';
import { playerValidationSchema } from 'validationSchema/players';

export const userValidationSchema = yup.object().shape({
  roq_user_id: yup.string().required(),
  tenant_id: yup.string().required(),
  academy: yup.array().of(academyValidationSchema),
  coach: yup.array().of(coachValidationSchema),
  communication_communication_receiver_idTouser: yup.array().of(communicationValidationSchema),
  communication_communication_sender_idTouser: yup.array().of(communicationValidationSchema),
  parent: yup.array().of(parentValidationSchema),
  player: yup.array().of(playerValidationSchema),
});
