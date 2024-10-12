import { gql, TypedDocumentNode } from '@apollo/client';
import { GetAllNodeUrisQuery } from '~/models/graphql.generated';

export const allNodeUrisQuery: TypedDocumentNode<GetAllNodeUrisQuery> = gql`
    query GetAllNodeUris {
        contentNodes {
            edges {
                node {
                    uri
                }
            }
        }
    }
`;
