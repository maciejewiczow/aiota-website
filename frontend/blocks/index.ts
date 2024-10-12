import { File } from './core/File';
import { HeadingBlock } from './core/Heading';
import { ParagraphBlock } from './core/Paragraph/Paragraph';
import { AGHColorsBackground } from './custom/AGHColorsBackground';
import { DottedHorizontalList } from './custom/DottedHorizontalList';
import { ErrorPageLayout } from './custom/ErrorPageLayout';
import { ExternalLink } from './custom/ExternalLink';
import { FloatingLanguageSwitcher } from './custom/FloatingLanguageSwitcher';
import { FullHeightPage } from './custom/FullHeightPage';
import { InternalLink } from './custom/InternalLink';
import { LayoutSlot } from './custom/LayoutSlot';
import { MainPageLayout } from './custom/MainPageLayout';
import { OrganizationLogo } from './custom/OrganizationLogo';
import { TestBlock } from './custom/TestBlock';
import { BlockMap } from './types';

export const blockMapping: BlockMap = {
    CoreParagraph: ParagraphBlock,
    CoreHeading: HeadingBlock,
    CustomTest: TestBlock,
    CustomAghColorsBackground: AGHColorsBackground,
    CustomOrganizationLogo: OrganizationLogo,
    CustomLayoutSlot: LayoutSlot,
    CustomFullHeightPage: FullHeightPage,
    CustomMainPageLayout: MainPageLayout,
    CustomExternalLink: ExternalLink,
    CustomInternalLink: InternalLink,
    CustomDottedHorizontalList: DottedHorizontalList,
    CoreFile: File,
    CustomFloatingLanguageSwitcher: FloatingLanguageSwitcher,
    CustomErrorPageLayout: ErrorPageLayout,
};
