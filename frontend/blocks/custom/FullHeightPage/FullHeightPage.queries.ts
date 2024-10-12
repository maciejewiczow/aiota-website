import { gql, TypedDocumentNode } from '@apollo/client';
import { FullHeightPageFragment } from '~/models/graphql.generated';

export const fullHeightPageFragment: TypedDocumentNode<FullHeightPageFragment> = gql`
    fragment FullHeightPage on CustomFullHeightPage {
        attributes {
            allowScrollOnMobile
        }
    }
`;
