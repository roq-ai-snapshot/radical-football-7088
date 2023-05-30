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
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useFormik, FormikHelpers } from 'formik';
import { getTrainingTaskById, updateTrainingTaskById } from 'apiSdk/training-tasks';
import { Error } from 'components/error';
import { trainingTaskValidationSchema } from 'validationSchema/training-tasks';
import { TrainingTaskInterface } from 'interfaces/training-task';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { PlayerInterface } from 'interfaces/player';
import { CoachInterface } from 'interfaces/coach';
import { getPlayers } from 'apiSdk/players';
import { getCoaches } from 'apiSdk/coaches';

function TrainingTaskEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<TrainingTaskInterface>(
    () => (id ? `/training-tasks/${id}` : null),
    () => getTrainingTaskById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: TrainingTaskInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateTrainingTaskById(id, values);
      mutate(updated);
      resetForm();
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<TrainingTaskInterface>({
    initialValues: data,
    validationSchema: trainingTaskValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Edit Training Task
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {formError && <Error error={formError} />}
        {isLoading || (!formik.values && !error) ? (
          <Spinner />
        ) : (
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
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'training_task',
  operation: AccessOperationEnum.UPDATE,
})(TrainingTaskEditPage);
