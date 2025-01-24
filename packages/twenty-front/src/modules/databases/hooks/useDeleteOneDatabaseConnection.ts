import { useMutation } from '@apollo/client';
import { getOperationName } from '@apollo/client/utilities';

import { DELETE_ONE_DATABASE_CONNECTION } from '@/databases/graphql/mutations/deleteOneDatabaseConnection';
import { GET_MANY_DATABASE_CONNECTIONS } from '@/databases/graphql/queries/findManyDatabaseConnections';
import { useApolloMetadataClient } from '@/object-metadata/hooks/useApolloMetadataClient';
import {
  DeleteServerMutation,
  DeleteServerMutationVariables,
  RemoteServerIdInput,
} from '~/generated-metadata/graphql';

export const useDeleteOneDatabaseConnection = () => {
  const apolloMetadataClient = useApolloMetadataClient();

  const [mutate] = useMutation<
    DeleteServerMutation,
    DeleteServerMutationVariables
  >(DELETE_ONE_DATABASE_CONNECTION, {
    client: apolloMetadataClient,
  });

  const deleteOneDatabaseConnection = async (input: RemoteServerIdInput) => {
    return await mutate({
      variables: {
        input,
      },
      awaitRefetchQueries: true,
      refetchQueries: [getOperationName(GET_MANY_DATABASE_CONNECTIONS) ?? ''],
    });
  };

  return {
    deleteOneDatabaseConnection,
  };
};
