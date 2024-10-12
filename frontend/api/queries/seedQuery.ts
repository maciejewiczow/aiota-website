import { gql, TypedDocumentNode } from '@apollo/client';
import {
    GetSeedNodeQuery,
    GetSeedNodeQueryVariables,
} from '~/models/graphql.generated';

export const seedQuery: TypedDocumentNode<
    GetSeedNodeQuery,
    GetSeedNodeQueryVariables
> = gql`
    query GetSeedNode($uri: String! = "/") {
        nodeByUri(uri: $uri) {
            __typename
            uri
            id
            ... on DatabaseIdentifier {
                databaseId
            }
            ... on MediaItem {
                id
                mimeType
            }
            ... on ContentType {
                name
                isFrontPage
                # This is currently broken. The home page (blog page) can not be
                # resolved when set to a custom page until the below issue is resolved.
                # Link: https://github.com/wp-graphql/wp-graphql/issues/2514
                isPostsPage
            }
            ... on TermNode {
                isTermNode
                slug
                taxonomyName
            }
            ... on ContentNode {
                isContentNode
                slug
                contentType {
                    node {
                        name
                    }
                }
                template {
                    templateName
                }
            }
            ... on Page {
                isFrontPage
                isPostsPage
                language {
                    id
                    code
                }
                translations {
                    id
                    uri
                    language {
                        id
                        code
                    }
                }
            }
        }
    }
`;
