import type { Meta, StoryObj } from '@storybook/react';
import { File as FileComponent } from './File';

interface StoryArgs {
    fileName: string;
    href: string;
}

const meta: Meta<StoryArgs> = {
    component: ({ fileName, href }) => (
        <FileComponent
            block={{
                __typename: 'CoreFile',
                clientId: null,
                parentClientId: null,
                name: null,
                renderedHtml: null,
                attributes: {
                    __typename: 'CoreFileAttributes',
                    fileName,
                    href,
                },
            }}
        />
    ),
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const File: Story = {
    args: {
        fileName: 'Filename',
        href: '',
    },
};
