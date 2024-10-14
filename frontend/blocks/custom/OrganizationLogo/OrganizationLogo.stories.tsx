import type { Meta, StoryObj } from '@storybook/react';
import { LogoDataProvider } from '~/context/LogoData';
import { OrganizationLogo as OrganizationLogoComponent } from './OrganizationLogo';

interface StoryArgs {
    width: number;
    height: number;
}

const meta: Meta<StoryArgs> = {
    component: ({ width, height }) => (
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
                    attributes: {
                        __typename: 'CustomOrganizationLogoAttributes',
                        width,
                        height,
                    },
                }}
            />
        </LogoDataProvider>
    ),
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const OrganizationLogo: Story = {
    args: {
        width: 120,
        height: 300,
    },
};
