import type { Meta, StoryObj } from '@storybook/react';
import { HeadingBlock as HeadingComponent } from './Heading';

interface StoryArgs {
    content: string;
    level: number;
    fontSize: string;
}

const meta: Meta<StoryArgs> = {
    component: ({ content, level, fontSize }) => (
        <HeadingComponent
            block={{
                __typename: 'CoreHeading',
                clientId: null,
                parentClientId: null,
                name: null,
                renderedHtml: null,
                attributes: {
                    __typename: 'CoreHeadingAttributes',
                    content,
                    level,
                    fontSize,
                },
            }}
        />
    ),
    argTypes: {
        level: { control: 'select', options: [1, 2, 3, 4, 5] },
        fontSize: {
            control: 'select',
            options: ['small', 'medium', 'large', 'x-large'],
        },
    },
    args: {
        content: 'My beautifull heading',
        level: 1,
        fontSize: 'large',
    },
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const Heading: Story = {
    args: {},
};
