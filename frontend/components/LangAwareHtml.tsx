import { ComponentProps, PropsWithChildren } from 'react';
import { gql, TypedDocumentNode } from '@apollo/client';
import { ColorSchemeScript } from '@mantine/core';
import cx from 'classnames';
import { Merriweather, Merriweather_Sans } from 'next/font/google';
import { getClient } from '~/api/apolloClient';
import { Providers } from '~/context/Providers';
import {
    GetInitialDataQuery,
    GetInitialDataQueryVariables,
} from '~/models/graphql.generated';

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

export interface LangAwareHtmlProps
    extends Omit<ComponentProps<'html'>, 'lang'>,
        PropsWithChildren {
    path: string;
}

export const getLangQuery: TypedDocumentNode<
    GetInitialDataQuery,
    GetInitialDataQueryVariables
> = gql`
    query GetInitialData($path: String!) {
        nodeLang: nodeByUri(uri: $path) {
            ... on Page {
                language {
                    code
                }
            }
            ... on Post {
                language {
                    code
                }
            }
        }
        favicon {
            sourceUrl
        }
        seo {
            schema {
                logo {
                    sourceUrl
                    altText
                    mediaDetails {
                        width
                        height
                    }
                }
            }
        }
    }
`;

export const LangAwareHtml: React.FC<LangAwareHtmlProps> = async ({
    path,
    children,
    className,
    ...props
}) => {
    const { data } = await getClient().query({
        query: getLangQuery,
        variables: {
            path,
        },
    });

    const lang =
        data.nodeLang?.__typename === 'Post' ||
        data.nodeLang?.__typename === 'Page'
            ? data.nodeLang.language?.code ?? 'pl'
            : 'pl';

    return (
        <html
            lang={lang.toLowerCase()}
            className={cx(
                headingFont.variable,
                normalFont.className,
                className,
            )}
            {...props}
        >
            <head>
                <ColorSchemeScript />
                {data.favicon?.sourceUrl && (
                    <link
                        rel="icon"
                        href={data.favicon?.sourceUrl}
                        sizes="any"
                    />
                )}
            </head>
            <body suppressHydrationWarning>
                <Providers logoData={data.seo}>{children}</Providers>
            </body>
        </html>
    );
};
