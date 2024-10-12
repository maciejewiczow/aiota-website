import { ApolloClient, InMemoryCache } from '@apollo/client';
import possibleTypes from '../possibleTypes.json';

export const getClient = (url: string | undefined) => (url
        ? new ApolloClient({
              uri: `${url}/index.php?graphql`,
              cache: new InMemoryCache({
                  possibleTypes,
                  typePolicies: {
                      RootQuery: {
                          queryType: true,
                      },
                      RootMutation: {
                          mutationType: true,
                      },
                  },
              }),
          })
        : undefined);
