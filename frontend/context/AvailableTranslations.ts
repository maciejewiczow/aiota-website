import React, { useContext } from 'react';
import invariant from 'tiny-invariant';

export interface TranslationData {
    uri: string;
    languageCode: string;
    isCurrent: boolean;
}

export type TranslationsContext = TranslationData[];

const translationsContext = React.createContext<
    TranslationsContext | undefined
>(undefined);

export const useAvailableTranslations = (): TranslationsContext => {
    const translations = useContext(translationsContext);

    invariant(translations, 'Missing translations context');

    return translations;
};

export const AvailableTranslationsProvider = translationsContext.Provider;
