import { BlockComponent } from '~/blocks/types';
import { useLogoData } from '~/context/LogoData';
// import classes from './PageLogo.module.css';

export const OrganizationLogo: BlockComponent<
    'CustomOrganizationLogo'
> = () => {
    const data = useLogoData();

    return (
        data.schema?.logo?.sourceUrl && (
            <img
                src={data.schema?.logo?.sourceUrl}
                alt={data.schema?.logo?.altText ?? ''}
            />
        )
    );
};
