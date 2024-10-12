import { gql, TypedDocumentNode } from '@apollo/client';
import { coreFileFragment } from '~/blocks/core/File';
import { coreHeadingFragment } from '~/blocks/core/Heading';
import { coreParagraphFragment } from '~/blocks/core/Paragraph/Paragraph';
import { externalLinkFragment } from '~/blocks/custom/ExternalLink';
import { floatingLanguageSwitcherFragment } from '~/blocks/custom/FloatingLanguageSwitcher/FloatingLanguageSwitcher.queries';
import { fullHeightPageFragment } from '~/blocks/custom/FullHeightPage/FullHeightPage.queries';
import { internalLinkFragment } from '~/blocks/custom/InternalLink';
import { layoutSlotFragment } from '~/blocks/custom/LayoutSlot';
import { testBlockFragment } from '~/blocks/custom/TestBlock';
import { GetEditorBlocksByUriQuery } from '~/models/graphql.generated';

export const getEditorBlocksByUri: TypedDocumentNode<GetEditorBlocksByUriQuery> = gql`
    ${coreParagraphFragment}
    ${coreHeadingFragment}
    ${testBlockFragment}
    ${layoutSlotFragment}
    ${fullHeightPageFragment}
    ${externalLinkFragment}
    ${internalLinkFragment}
    ${coreFileFragment}
    ${floatingLanguageSwitcherFragment}

    query GetEditorBlocksByUri($uri: String!) {
        nodeByUri(uri: $uri) {
            id
            ... on NodeWithEditorBlocks {
                editorBlocks(flat: true) {
                    __typename
                    clientId
                    parentClientId
                    name
                    renderedHtml
                    ...CoreParagraph
                    ...TestBlock
                    ...LayoutSlot
                    ...FullHeightPage
                    ...CoreHeading
                    ...ExternalLink
                    ...InternalLink
                    ...CoreFile
                    ...FloatingLanguageSwitcher
                }
            }
        }
    }
`;

export type EditorBlock = Defined<
    Defined<
        Extract<
            Defined<GetEditorBlocksByUriQuery['nodeByUri']>,
            { __typename: 'Page' | 'Post' }
        >['editorBlocks']
    >[number]
>;
