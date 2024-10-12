import type { Meta, StoryObj } from '@storybook/react';
import { ParagraphBlock as ParagraphBlockComponent } from './Paragraph';

interface StoryArgs {
    text: string;
    fontSize: string;
}

const meta: Meta<StoryArgs> = {
    component: ({ text, fontSize }) => (
        <ParagraphBlockComponent
            block={{
                __typename: 'CoreParagraph',
                clientId: null,
                parentClientId: null,
                name: null,
                renderedHtml: null,
                attributes: {
                    __typename: 'CoreParagraphAttributes',
                    content: text,
                    fontSize,
                },
            }}
        />
    ),
    argTypes: {
        fontSize: {
            control: 'select',
            options: ['small', 'medium', 'large', 'x-large'],
        },
    },
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const Paragraph: Story = {
    args: {
        text: 'Lorem ipsum cośtam coś test',
    },
};
