'use client';

import React from 'react';
import invariant from 'tiny-invariant';
import { GetInitialDataQuery } from '~/models/graphql.generated';

const logoDataContext = React.createContext<
    GetInitialDataQuery['seo'] | undefined
>(undefined);

export const useLogoData = () => {
    const data = React.useContext(logoDataContext);

    invariant(data, 'Missing LogoDataProvider in the tree structure');

    return data;
};

export const LogoDataProvider = logoDataContext.Provider;
