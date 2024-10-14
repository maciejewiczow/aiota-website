import { gql } from '@apollo/client';
import { BlockComponent } from '~/blocks/types';
import { useLogoData } from '~/context/LogoData';
// import classes from './PageLogo.module.css';

export const organizationLogoFragment = gql`
    fragment OrganizationLogo on CustomOrganizationLogo {
        attributes {
            width
            height
        }
    }
`;

export const OrganizationLogo: BlockComponent<'CustomOrganizationLogo'> = ({
    block: { attributes },
}) => {
    const data = useLogoData();

    return (
        data.schema?.logo?.sourceUrl && (
            <img
                width={attributes?.width ?? undefined}
                height={attributes?.height ?? undefined}
                src={data.schema?.logo?.sourceUrl}
                alt={data.schema?.logo?.altText ?? ''}
            />
        )
    );
};
