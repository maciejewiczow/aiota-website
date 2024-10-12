import { gql, TypedDocumentNode } from '@apollo/client';
import { FloatingLanguageSwitcherFragment } from '~/models/graphql.generated';

export const floatingLanguageSwitcherFragment: TypedDocumentNode<FloatingLanguageSwitcherFragment> = gql`
    fragment FloatingLanguageSwitcher on CustomFloatingLanguageSwitcher {
        attributes {
            corner
        }
    }
`;
