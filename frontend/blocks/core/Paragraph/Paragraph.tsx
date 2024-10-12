import { gql, TypedDocumentNode } from '@apollo/client';
import cx from 'classnames';
import { BlockComponent } from '~/blocks/types';
import { CoreParagraphFragment } from '~/models/graphql.generated';
import { fontSize } from '../constants';
import classes from './Paragraph.module.css';

export const coreParagraphFragment: TypedDocumentNode<CoreParagraphFragment> = gql`
    fragment CoreParagraph on CoreParagraph {
        attributes {
            content
            fontSize
        }
    }
`;

export const ParagraphBlock: BlockComponent<'CoreParagraph'> = ({ block }) => (
    <p
        className={cx(classes.root, {
            [classes.xLarge]: block.attributes?.fontSize === fontSize.xl,
            [classes.large]: block.attributes?.fontSize === fontSize.lg,
            [classes.medium]: block.attributes?.fontSize === fontSize.md,
            [classes.small]: block.attributes?.fontSize === fontSize.sm,
        })}
        dangerouslySetInnerHTML={{ __html: block.attributes?.content ?? '' }}
    />
);
