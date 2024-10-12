import { gql, TypedDocumentNode } from '@apollo/client';
import { GetInitialDataQuery } from '~/models/graphql.generated';

export const initialQuery: TypedDocumentNode<GetInitialDataQuery> = gql`
    query GetInitialData {
        favicon {
            sourceUrl
        }
        seo {
            schema {
                logo {
                    sourceUrl
                    altText
                }
            }
        }
    }
`;
