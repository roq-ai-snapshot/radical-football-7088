import AppLayout from 'layout/app-layout';
import Link from 'next/link';
import React, { useState } from 'react';
import { Text, Box, Spinner, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button } from '@chakra-ui/react';
import { getTrainingTaskById } from 'apiSdk/training-tasks';
import { Error } from 'components/error';
import { TrainingTaskInterface } from 'interfaces/training-task';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';

function TrainingTaskViewPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<TrainingTaskInterface>(
    () => (id ? `/training-tasks/${id}` : null),
    () =>
      getTrainingTaskById(id, {
        relations: ['player', 'coach'],
      }),
  );

  const [deleteError, setDeleteError] = useState(null);

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Training Task Detail View
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Text fontSize="md" fontWeight="bold">
              Task Name: {data?.task_name}
            </Text>
            <Text fontSize="md" fontWeight="bold">
              Status: {data?.status}
            </Text>
            <Text fontSize="md" fontWeight="bold">
              Player: <Link href={`/players/view/${data?.player?.id}`}>{data?.player?.user_id}</Link>
            </Text>
            <Text fontSize="md" fontWeight="bold">
              Coach: <Link href={`/coaches/view/${data?.coach?.id}`}>{data?.coach?.user_id}</Link>
            </Text>
          </>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'training_task',
  operation: AccessOperationEnum.READ,
})(TrainingTaskViewPage);
