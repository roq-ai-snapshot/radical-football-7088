import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createTrainingTask } from 'apiSdk/training-tasks';
import { Error } from 'components/error';
import { trainingTaskValidationSchema } from 'validationSchema/training-tasks';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { PlayerInterface } from 'interfaces/player';
import { CoachInterface } from 'interfaces/coach';
import { getPlayers } from 'apiSdk/players';
import { getCoaches } from 'apiSdk/coaches';
import { TrainingTaskInterface } from 'interfaces/training-task';

function TrainingTaskCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: TrainingTaskInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createTrainingTask(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<TrainingTaskInterface>({
    initialValues: {
      task_name: '',
      status: '',
      player_id: (router.query.player_id as string) ?? null,
      coach_id: (router.query.coach_id as string) ?? null,
    },
    validationSchema: trainingTaskValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Training Task
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="task_name" mb="4" isInvalid={!!formik.errors?.task_name}>
            <FormLabel>Task Name</FormLabel>
            <Input type="text" name="task_name" value={formik.values?.task_name} onChange={formik.handleChange} />
            {formik.errors.task_name && <FormErrorMessage>{formik.errors?.task_name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="status" mb="4" isInvalid={!!formik.errors?.status}>
            <FormLabel>Status</FormLabel>
            <Input type="text" name="status" value={formik.values?.status} onChange={formik.handleChange} />
            {formik.errors.status && <FormErrorMessage>{formik.errors?.status}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<PlayerInterface>
            formik={formik}
            name={'player_id'}
            label={'Player'}
            placeholder={'Select Player'}
            fetcher={getPlayers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record.user_id}
              </option>
            )}
          />
          <AsyncSelect<CoachInterface>
            formik={formik}
            name={'coach_id'}
            label={'Coach'}
            placeholder={'Select Coach'}
            fetcher={getCoaches}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record.user_id}
              </option>
            )}
          />
          <Button isDisabled={!formik.isValid || formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'training_task',
  operation: AccessOperationEnum.CREATE,
})(TrainingTaskCreatePage);
