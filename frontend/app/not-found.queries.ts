import { gql, TypedDocumentNode } from '@apollo/client';
import { GetAllNodesWithTitlesQuery } from '~/models/graphql.generated';

export const allNodesWithTitleQuery: TypedDocumentNode<GetAllNodesWithTitlesQuery> = gql`
    query GetAllNodesWithTitles {
        contentNodes {
            edges {
                node {
                    uri
                    ... on NodeWithTitle {
                        title
                    }
                }
            }
        }
    }
`;
