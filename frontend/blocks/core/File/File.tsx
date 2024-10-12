import { gql, TypedDocumentNode } from '@apollo/client';
import { BlockComponent } from '~/blocks/types';
import { CoreFileFragment } from '~/models/graphql.generated';
import classes from './File.module.css';

export const coreFileFragment: TypedDocumentNode<CoreFileFragment> = gql`
    fragment CoreFile on CoreFile {
        attributes {
            fileName
            href
        }
    }
`;

export const File: BlockComponent<'CoreFile'> = ({ block: { attributes } }) => (
    <a
        href={attributes?.href ?? undefined}
        className={classes.root}
        download
    >
        {attributes?.fileName}
    </a>
);
