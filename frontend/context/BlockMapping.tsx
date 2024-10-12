'use client';

import React, { PropsWithChildren } from 'react';
import { blockMapping } from '~/blocks';

const blockMappingContext = React.createContext(blockMapping);

export const useBlockMapping = () => React.useContext(blockMappingContext);

export const BlockMappingProvider: React.FC<PropsWithChildren> = ({
    children,
}) => (
    <blockMappingContext.Provider value={blockMapping}>
        {children}
    </blockMappingContext.Provider>
);
