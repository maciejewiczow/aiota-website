import React from 'react';
import { gql, TypedDocumentNode } from '@apollo/client';
import cx from 'classnames';
import { BlockComponent } from '~/blocks/types';
import { CoreHeadingFragment } from '~/models/graphql.generated';
import { fontSize } from '../constants';
import classes from './Heading.module.css';

export const coreHeadingFragment: TypedDocumentNode<CoreHeadingFragment> = gql`
    fragment CoreHeading on CoreHeading {
        attributes {
            content
            level
            fontSize
        }
    }
`;

const levels = [1, 2, 3, 4, 5] as const;

const defaultLevel = 2;

export const HeadingBlock: BlockComponent<'CoreHeading'> = ({ block }) => {
    const level = getLevel(block.attributes?.level);

    return React.createElement(
        `h${level}`,
        {
            className: cx(classes.root, {
                [classes.xLarge]: block.attributes?.fontSize === fontSize.xl,
                [classes.large]: block.attributes?.fontSize === fontSize.lg,
                [classes.medium]: block.attributes?.fontSize === fontSize.md,
                [classes.small]: block.attributes?.fontSize === fontSize.sm,
            }),
        },
        block.attributes?.content,
    );
};

function getLevel(level: number | null | undefined) {
    if (!level) {
        return defaultLevel;
    }

    if (!(levels as readonly number[]).includes(level)) {
        return level as (typeof levels)[number];
    }

    return defaultLevel;
}
