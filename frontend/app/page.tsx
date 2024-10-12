import { Metadata } from 'next';
import { getClient } from '~/api/apolloClient';
import { seedQuery } from '~/api/queries/seedQuery';
import { WordpressTemplateViewer } from '~/components/WordpressTemplateViewer';
import { PageProviders } from '~/context/PageProviders';
import { getSeoMetadata } from '~/utils/getSeoMetadata';

export function generateMetadata(): Promise<Metadata> {
    return getSeoMetadata('/');
}

export default async function RootPage() {
    const { data } = await getClient().query({
        query: seedQuery,
    });

    return (
        <PageProviders seedQuery={data}>
            <WordpressTemplateViewer
                seedQuery={data}
                uri="/"
            />
        </PageProviders>
    );
}
