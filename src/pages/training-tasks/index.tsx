import { useState } from 'react';
import AppLayout from 'layout/app-layout';
import Link from 'next/link';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text, Button } from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getTrainingTasks, deleteTrainingTaskById } from 'apiSdk/training-tasks';
import { TrainingTaskInterface } from 'interfaces/training-task';
import { Error } from 'components/error';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';

function TrainingTaskListPage() {
  const { data, error, isLoading, mutate } = useSWR<TrainingTaskInterface[]>(
    () => '/training-tasks',
    () =>
      getTrainingTasks({
        relations: ['player', 'coach'],
      }),
  );

  const [deleteError, setDeleteError] = useState(null);

  const handleDelete = async (id: string) => {
    setDeleteError(null);
    try {
      await deleteTrainingTaskById(id);
      await mutate();
    } catch (error) {
      setDeleteError(error);
    }
  };

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Training Task
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Link href={`/training-tasks/create`}>
          <Button colorScheme="blue" mr="4">
            Create
          </Button>
        </Link>
        {error && <Error error={error} />}
        {deleteError && <Error error={deleteError} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Task Name</Th>
                  <Th>Status</Th>
                  <Th>Player</Th>
                  <Th>Coach</Th>

                  <Th>Edit</Th>
                  <Th>View</Th>
                  <Th>Delete</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr key={record.id}>
                    <Td>{record.task_name}</Td>
                    <Td>{record.status}</Td>
                    <Td>
                      <Link href={`/players/view/${record.player?.id}`}>{record.player?.user_id}</Link>
                    </Td>
                    <Td>
                      <Link href={`/coaches/view/${record.coach?.id}`}>{record.coach?.user_id}</Link>
                    </Td>

                    <Td>
                      <Link href={`/training-tasks/edit/${record.id}`} passHref legacyBehavior>
                        <Button as="a">Edit</Button>
                      </Link>
                    </Td>
                    <Td>
                      <Link href={`/training-tasks/view/${record.id}`} passHref legacyBehavior>
                        <Button as="a">View</Button>
                      </Link>
                    </Td>
                    <Td>
                      <Button onClick={() => handleDelete(record.id)}>Delete</Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </AppLayout>
  );
}
export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'training_task',
  operation: AccessOperationEnum.READ,
})(TrainingTaskListPage);
