import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
    NormalizedCacheObject,
} from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import possibleTypes from '~/possibleTypes.json';

export const { getClient } = registerApolloClient(
    () => new ApolloClient({
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
            link: createHttpLink({
                uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/index.php?graphql`,
            }),
        }),
) as { getClient: () => ApolloClient<NormalizedCacheObject> };
