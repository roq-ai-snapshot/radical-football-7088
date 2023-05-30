import * as yup from 'yup';

export const trainingTaskValidationSchema = yup.object().shape({
  task_name: yup.string().required(),
  status: yup.string().required(),
  player_id: yup.string().nullable().required(),
  coach_id: yup.string().nullable().required(),
});
