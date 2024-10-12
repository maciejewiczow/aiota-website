import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ExternalLink as ExternalLinkComponent } from './ExternalLink';

interface StoryArgs {
    linkAppearance: boolean;
    blank: boolean;
    content: string;
}

const meta: Meta<StoryArgs> = {
    component: ({ linkAppearance, content, blank }) => (
        <ExternalLinkComponent
            block={{
                __typename: 'CustomExternalLink',
                clientId: null,
                parentClientId: null,
                name: null,
                renderedHtml: null,
                attributes: {
                    __typename: 'CustomExternalLinkAttributes',
                    blank,
                    link: 'https://google.com',
                    linkAppearance,
                },
                innerBlocks: [
                    {
                        __typename: 'CoreParagraph',
                        clientId: null,
                        parentClientId: null,
                        name: null,
                        renderedHtml: null,
                        attributes: {
                            __typename: 'CoreParagraphAttributes',
                            content,
                            fontSize: 'medium',
                        },
                    },
                ],
            }}
        />
    ),
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const ExternalLink: Story = {
    args: {
        linkAppearance: true,
        blank: true,
        content: 'External link',
    },
};
