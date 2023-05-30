import { useState } from 'react';
import AppLayout from 'layout/app-layout';
import Link from 'next/link';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text, Button } from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getParents, deleteParentById } from 'apiSdk/parents';
import { ParentInterface } from 'interfaces/parent';
import { Error } from 'components/error';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';

function ParentListPage() {
  const { data, error, isLoading, mutate } = useSWR<ParentInterface[]>(
    () => '/parents',
    () =>
      getParents({
        relations: ['user', 'player'],
      }),
  );

  const [deleteError, setDeleteError] = useState(null);

  const handleDelete = async (id: string) => {
    setDeleteError(null);
    try {
      await deleteParentById(id);
      await mutate();
    } catch (error) {
      setDeleteError(error);
    }
  };

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Parent
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Link href={`/parents/create`}>
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
                  <Th>Parent ID</Th>
                  <Th>User ID</Th>
                  <Th>Player ID</Th>

                  <Th>Edit</Th>
                  <Th>View</Th>
                  <Th>Delete</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr key={record.id}>
                    <Td>{record.id}</Td>
                    <Td>
                      <Link href={`/users/view/${record.user?.id}`}>{record.user?.roq_user_id}</Link>
                    </Td>
                    <Td>
                      <Link href={`/players/view/${record.player?.id}`}>{record.player?.user_id}</Link>
                    </Td>

                    <Td>
                      <Link href={`/parents/edit/${record.id}`} passHref legacyBehavior>
                        <Button as="a">Edit</Button>
                      </Link>
                    </Td>
                    <Td>
                      <Link href={`/parents/view/${record.id}`} passHref legacyBehavior>
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
  entity: 'parent',
  operation: AccessOperationEnum.READ,
})(ParentListPage);
