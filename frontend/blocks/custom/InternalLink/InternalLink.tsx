import { gql, TypedDocumentNode } from '@apollo/client';
import { BlockComponent } from '~/blocks/types';
import { InternalLink as InternalLinkComponent } from '~/components/InternalLink';
import { WordPressBlockViewer } from '~/components/WordPressBlockViewer';
import { InternalLinkFragment } from '~/models/graphql.generated';

export const internalLinkFragment: TypedDocumentNode<InternalLinkFragment> = gql`
    fragment InternalLink on CustomInternalLink {
        attributes {
            link
            linkAppearance
        }
    }
`;

export const InternalLink: BlockComponent<'CustomInternalLink'> = ({
    block: { attributes, innerBlocks },
}) => attributes?.link && (
        <InternalLinkComponent
            href={attributes.link}
            hoverUnderline={!!attributes.linkAppearance}
        >
            <WordPressBlockViewer blocks={innerBlocks} />
        </InternalLinkComponent>
    );
