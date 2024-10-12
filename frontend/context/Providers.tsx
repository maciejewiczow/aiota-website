'use client';

import { PropsWithChildren } from 'react';
import { MantineProvider } from '@mantine/core';
import { GetInitialDataQuery } from '~/models/graphql.generated';
import { BlockMappingProvider } from './BlockMapping';
import { LogoDataProvider } from './LogoData';
// import { theme } from '~/styles/theme';

interface ProvidersProps extends PropsWithChildren {
    logoData: GetInitialDataQuery['seo'];
}

export const Providers: React.FC<ProvidersProps> = ({ children, logoData }) => (
    // TODO: uncomment when theme is filled with values
    <MantineProvider /* theme={theme} */>
        <BlockMappingProvider>
            <LogoDataProvider value={logoData}>{children}</LogoDataProvider>
        </BlockMappingProvider>
    </MantineProvider>
);
