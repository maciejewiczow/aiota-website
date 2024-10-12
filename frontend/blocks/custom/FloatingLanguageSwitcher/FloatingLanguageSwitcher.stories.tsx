import type { Meta, StoryObj } from '@storybook/react';
import { AvailableTranslationsProvider } from '~/context/AvailableTranslations';
import { FloatingLanguageSwitcher as FloatingLanguageSwitcherComponent } from './FloatingLanguageSwitcher';

interface StoryArgs {
    corner: string;
    currentTranslation: string;
}

const meta: Meta<StoryArgs> = {
    component: ({ corner, currentTranslation }) => (
        <AvailableTranslationsProvider
            value={[
                {
                    isCurrent: currentTranslation === 'PL',
                    languageCode: 'PL',
                    uri: '/',
                },
                {
                    isCurrent: currentTranslation === 'EN',
                    languageCode: 'EN',
                    uri: '/',
                },
            ]}
        >
            <FloatingLanguageSwitcherComponent
                block={{
                    __typename: 'CustomFloatingLanguageSwitcher',
                    clientId: null,
                    parentClientId: null,
                    name: null,
                    renderedHtml: null,
                    attributes: {
                        __typename: 'CustomFloatingLanguageSwitcherAttributes',
                        corner,
                    },
                }}
            />
        </AvailableTranslationsProvider>
    ),
    argTypes: {
        corner: {
            control: 'select',
            options: ['top-left', 'top-right', 'bottom-right', 'bottom-left'],
        },
    },
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const FloatingLanguageSwitcher: Story = {
    args: {
        corner: 'top-right',
        currentTranslation: 'PL',
    },
};
