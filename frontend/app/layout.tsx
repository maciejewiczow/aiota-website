import { PropsWithChildren } from 'react';
import { ColorSchemeScript } from '@mantine/core';
import cx from 'classnames';
import { Merriweather, Merriweather_Sans } from 'next/font/google';
import { getClient } from '~/api/apolloClient';
import { Providers } from '~/context/Providers';
import { initialQuery } from './layout.queries';
import '@mantine/core/styles.css';
import '~/styles/global.css';

const headingFont = Merriweather({
    subsets: ['latin', 'latin-ext'],
    weight: '400',
    display: 'swap',
    variable: '--font-heading',
});

const normalFont = Merriweather_Sans({
    subsets: ['latin', 'latin-ext'],
    display: 'swap',
});

export default async function RootLayout({ children }: PropsWithChildren) {
    const client = getClient();
    const {
        data: { favicon, seo: logoData },
    } = await client.query({
        query: initialQuery,
    });

    return (
        <html
            lang="en"
            className={cx(headingFont.variable, normalFont.className)}
        >
            <head>
                <ColorSchemeScript />
                {favicon?.sourceUrl && (
                    <link
                        rel="icon"
                        href={favicon?.sourceUrl}
                        sizes="any"
                    />
                )}
            </head>
            <body suppressHydrationWarning>
                <Providers logoData={logoData}>{children}</Providers>
            </body>
        </html>
    );
}
