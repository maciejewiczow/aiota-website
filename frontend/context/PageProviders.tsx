'use client';

import React, { PropsWithChildren, useMemo } from 'react';
import { GetSeedNodeQuery } from '~/models/graphql.generated';
import {
    AvailableTranslationsProvider,
    TranslationData,
    TranslationsContext,
} from './AvailableTranslations';

interface PageProvidersProps extends PropsWithChildren {
    seedQuery: GetSeedNodeQuery;
}

export const PageProviders: React.FC<PageProvidersProps> = ({
    children,
    seedQuery,
}) => {
    const translationsData = useMemo<TranslationsContext>(() => {
        if (seedQuery.nodeByUri?.__typename === 'Page') {
            return [
                {
                    isCurrent: true,
                    languageCode: seedQuery.nodeByUri.language?.code ?? 'PL',
                    uri: seedQuery.nodeByUri.uri ?? '/',
                },
                ...(seedQuery.nodeByUri.translations?.map<TranslationData>(
                    trans => ({
                        isCurrent: false,
                        languageCode: trans?.language?.code ?? 'Unkown',
                        uri: trans?.uri ?? '/',
                    }),
                ) ?? []),
            ];
        }

        return [];
    }, [seedQuery.nodeByUri]);

    return (
        <AvailableTranslationsProvider value={translationsData}>
            {children}
        </AvailableTranslationsProvider>
    );
};
