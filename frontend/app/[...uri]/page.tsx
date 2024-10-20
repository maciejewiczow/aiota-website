import { notFound } from 'next/navigation';
import { getClient } from '~/api/apolloClient';
import { seedQuery } from '~/api/queries/seedQuery';
import { LangAwareHtml } from '~/components/LangAwareHtml';
import { WordpressTemplateViewer } from '~/components/WordpressTemplateViewer';
import { PageProviders } from '~/context/PageProviders';
import { getSeoMetadata } from '~/utils/getSeoMetadata';
import { isTruthy } from '~/utils/isTruthy';
import { allNodeUrisQuery } from './page.queries';

interface Params {
    uri: string[];
}

const emptyResultUri = '84887ca1-2faa-5a16-8b42-2a1a740955da_empty_result';

export async function generateStaticParams(): Promise<Params[]> {
    const { data } = await getClient().query({
        query: allNodeUrisQuery,
    });

    const result =
        data.contentNodes?.edges
            .map<Params>(({ node }) => ({
                uri: node.uri?.split('/').filter(isTruthy) ?? [],
            }))
            .filter(({ uri }) => uri.length > 0) ?? [];

    // Workaround for and issue with next, the build breaks when this function returns an empty array
    if (result.length === 0) {
        return [{ uri: [emptyResultUri] }];
    }

    return result;
}

export async function generateMetadata({
    params: { uri },
}: {
    params: Params;
}) {
    return await getSeoMetadata('/' + uri.join('/'));
}

export default async function NodeByUriPage({
    params: { uri },
}: {
    params: Params;
}) {
    const uriString = '/' + uri.join('/');

    const { data } = await getClient().query({
        query: seedQuery,
        variables: {
            uri: uriString,
        },
    });

    if (!data.nodeByUri) {
        return notFound();
    }

    return (
        <LangAwareHtml path={uriString}>
            <PageProviders seedQuery={data}>
                <WordpressTemplateViewer
                    seedQuery={data}
                    uri={uriString}
                />
            </PageProviders>
        </LangAwareHtml>
    );
}
