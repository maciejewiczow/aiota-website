import { gql, TypedDocumentNode } from '@apollo/client';
import { BlockComponent } from '~/blocks/types';
import { WordPressBlockViewer } from '~/components/WordPressBlockViewer';
import { LayoutSlotFragment } from '~/models/graphql.generated';

export const layoutSlotFragment: TypedDocumentNode<LayoutSlotFragment> = gql`
    fragment LayoutSlot on CustomLayoutSlot {
        attributes {
            areaId
        }
    }
`;

export const LayoutSlot: BlockComponent<'CustomLayoutSlot'> = ({ block }) => (
    <WordPressBlockViewer blocks={block.innerBlocks} />
);
