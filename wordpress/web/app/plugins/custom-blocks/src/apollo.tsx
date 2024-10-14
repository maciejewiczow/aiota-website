import { ComponentType, PropsWithChildren, useMemo } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { useBlockProps } from '@wordpress/block-editor';
import { store } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
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

export const ClientProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const wpUrl: string | undefined = useSelect(
        // @ts-expect-error this function is not present in the typings
        select => select(store).getSite()?.url,
        [],
    );
    const blockProps = useBlockProps();
    const apolloClient = useMemo(() => getClient(wpUrl), [wpUrl]);

    if (!apolloClient) {
        return <div {...blockProps}>Loading...</div>;
    }

    return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export const withClientProvider = <T,>(
    Component: ComponentType<T>,
    // eslint-disable-next-line react/no-multi-comp
): React.FC<T> => function WithClientProvider(props) {
        return (
            <ClientProvider>
                {/* @ts-expect-error lols */}
                <Component {...props} />
            </ClientProvider>
        );
    };
