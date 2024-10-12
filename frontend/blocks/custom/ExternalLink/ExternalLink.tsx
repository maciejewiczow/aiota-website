import { ComponentProps } from 'react';
import { gql, TypedDocumentNode } from '@apollo/client';
import cx from 'classnames';
import { BlockComponent } from '~/blocks/types';
import { WordPressBlockViewer } from '~/components/WordPressBlockViewer';
import { ExternalLinkFragment } from '~/models/graphql.generated';
import classes from './ExternalLink.module.css';

export const externalLinkFragment: TypedDocumentNode<ExternalLinkFragment> = gql`
    fragment ExternalLink on CustomExternalLink {
        attributes {
            link
            linkAppearance
            blank
        }
    }
`;

export const ExternalLink: BlockComponent<'CustomExternalLink'> = ({
    block: { attributes, innerBlocks },
}) => {
    const additionalProps: ComponentProps<'a'> = attributes?.blank
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {};

    return (
        attributes?.link && (
            <a
                className={cx(
                    classes.root,
                    attributes.linkAppearance && classes.link,
                )}
                href={attributes.link}
                {...additionalProps}
            >
                <WordPressBlockViewer blocks={innerBlocks} />
            </a>
        )
    );
};
