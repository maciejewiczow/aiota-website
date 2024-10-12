/* eslint-disable react/jsx-no-literals */
import { gql, TypedDocumentNode } from '@apollo/client';
import Link from 'next/link';
import { BlockComponent } from '~/blocks/types';
import { TestBlockFragment } from '~/models/graphql.generated';
import classes from './TestBlock.module.css';

export const testBlockFragment: TypedDocumentNode<TestBlockFragment> = gql`
    fragment TestBlock on CustomTest {
        attributes {
            toggleTest
            linkTest
            numberTest
            numberWithRangeTest
            rangeTest
            test
        }
    }
`;

export const TestBlock: BlockComponent<'CustomTest'> = ({ block }) => (
    <div className={classes.root}>
        <div>
            Toggle test - {block.attributes?.toggleTest ? 'true' : 'false'}
        </div>
        <div>Number test - {block.attributes?.numberTest}</div>
        <div>
            Number with range test - {block.attributes?.numberWithRangeTest}
        </div>
        <div>
            <Link href={block.attributes?.linkTest ?? '/'}>Link test</Link>
        </div>
        <div
            className={classes.colorBox}
            style={{ background: block.attributes?.test ?? 'white' }}
        >
            Color test
        </div>
        <div>Range test - {block.attributes?.rangeTest}</div>
    </div>
);
