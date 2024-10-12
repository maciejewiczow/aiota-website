import type { Meta, StoryObj } from '@storybook/react';
import { DottedHorizontalList as DottedHorizontalListComponent } from './DottedHorizontalList';

interface StoryArgs {
    items: string[];
}

const meta: Meta<StoryArgs> = {
    component: ({ items }) => (
        <DottedHorizontalListComponent
            block={{
                __typename: 'CustomDottedHorizontalList',
                clientId: null,
                parentClientId: null,
                name: null,
                renderedHtml: null,
                innerBlocks: items.map(item => ({
                    __typename: 'CoreParagraph',
                    clientId: null,
                    parentClientId: null,
                    name: null,
                    renderedHtml: null,
                    attributes: {
                        __typename: 'CoreParagraphAttributes',
                        content: item,
                        fontSize: 'medium',
                    },
                })),
            }}
        />
    ),
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const DottedHorizontalList: Story = {
    args: {
        items: ['Item 1', 'Item 2', 'Item 3'],
    },
};
