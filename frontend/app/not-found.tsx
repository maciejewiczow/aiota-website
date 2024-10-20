/* eslint-disable react/jsx-no-literals */
import { ColorSchemeScript } from '@mantine/core';
import { Metadata } from 'next';
import { getClient } from '~/api/apolloClient';
import { seedQuery } from '~/api/queries/seedQuery';
import { LangAwareHtml } from '~/components/LangAwareHtml';
import { WordpressTemplateViewer } from '~/components/WordpressTemplateViewer';
import { PageProviders } from '~/context/PageProviders';
import { getSeoMetadata } from '~/utils/getSeoMetadata';
import { allNodesWithTitleQuery } from './not-found.queries';
import classes from './not-found.module.css';

const get404PageUri = async () => {
    const {
        data: { contentNodes },
    } = await getClient().query({
        query: allNodesWithTitleQuery,
    });

    return contentNodes?.edges.find(({ node }) => node.title === '404')?.node
        .uri;
};

const Default404: React.FC = () => (
    <html lang="en">
        <head>
            <ColorSchemeScript />
        </head>
        <body>
            <main className={classes.root}>
                <section className={classes.wrapper}>
                    <h1 className={classes.number}>404</h1>
                    <span className={classes.separator} />
                    <h2 className={classes.text}>Not found</h2>
                </section>
            </main>
        </body>
    </html>
);

export async function generateMetadata(): Promise<Metadata> {
    const notFoundPageUri = await get404PageUri();

    if (!notFoundPageUri) {
        return {
            title: 'Not found',
        };
    }

    return await getSeoMetadata(notFoundPageUri);
}

export default async function NotFoundPage() {
    const page404Uri = await get404PageUri();

    if (!page404Uri) {
        return <Default404 />;
    }

    const { data: seedQueryData } = await getClient().query({
        query: seedQuery,
        variables: {
            uri: page404Uri,
        },
    });

    return (
        <LangAwareHtml path={page404Uri}>
            <PageProviders seedQuery={seedQueryData}>
                <WordpressTemplateViewer
                    seedQuery={seedQueryData}
                    uri={page404Uri}
                />
            </PageProviders>
        </LangAwareHtml>
    );
}
