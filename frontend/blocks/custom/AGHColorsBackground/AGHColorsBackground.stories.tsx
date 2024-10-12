import type { Meta, StoryObj } from '@storybook/react';
import { AGHColorsBackground as AGHColorsBackgroundComponent } from './AGHColorsBackground';

interface StoryArgs {
    content: string;
}

const meta: Meta<StoryArgs> = {
    component: ({ content }) => (
        <AGHColorsBackgroundComponent
            block={{
                __typename: 'CustomAghColorsBackground',
                clientId: null,
                parentClientId: null,
                name: null,
                renderedHtml: null,
                innerBlocks: [
                    {
                        __typename: 'CoreParagraph',
                        attributes: {
                            __typename: 'CoreParagraphAttributes',
                            content,
                            fontSize: 'x-large',
                        },
                        clientId: null,
                        parentClientId: null,
                        name: null,
                        renderedHtml: null,
                    },
                ],
            }}
        />
    ),
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const AGHColorsBackground: Story = {
    args: {
        content: 'Test',
    },
};
