import type { Meta, StoryObj } from '@storybook/react';
import { LogoDataProvider } from '~/context/LogoData';
import { OrganizationLogo as OrganizationLogoComponent } from './OrganizationLogo';

interface StoryArgs {}

const meta: Meta<StoryArgs> = {
    component: () => (
        <LogoDataProvider
            value={{
                __typename: 'SEOConfig',
                schema: {
                    __typename: 'SEOSchema',
                    logo: {
                        __typename: 'MediaItem',
                        altText: 'Shrek',
                        sourceUrl:
                            'https://postacie.com.pl/environment/cache/images/500_500_productGfx_908/Shrek-01b.jpg',
                    },
                },
            }}
        >
            <OrganizationLogoComponent
                block={{
                    __typename: 'CustomOrganizationLogo',
                    clientId: null,
                    parentClientId: null,
                    name: null,
                    renderedHtml: null,
                }}
            />
        </LogoDataProvider>
    ),
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const OrganizationLogo: Story = {
    args: {},
};
