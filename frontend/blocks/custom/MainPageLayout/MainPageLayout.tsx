import { BlockComponent } from '~/blocks/types';
import { WordPressBlockViewer } from '~/components/WordPressBlockViewer';
import { getLayoutSlotByAreaId } from '~/utils/getLayoutSlotByAreaId';
import classes from './MainPageLayout.module.css';

export const MainPageLayout: BlockComponent<'CustomMainPageLayout'> = ({
    block,
}) => {
    const logo = getLayoutSlotByAreaId(block.innerBlocks, 'logo');
    const header = getLayoutSlotByAreaId(block.innerBlocks, 'header');
    const socials = getLayoutSlotByAreaId(block.innerBlocks, 'socials');
    const emails = getLayoutSlotByAreaId(block.innerBlocks, 'emails');

    return (
        <section className={classes.root}>
            {logo && (
                <div className={classes.logo}>
                    <WordPressBlockViewer blocks={[logo]} />
                </div>
            )}
            {header && (
                <div className={classes.header}>
                    <WordPressBlockViewer blocks={[header]} />
                </div>
            )}
            {socials && (
                <div className={classes.socials}>
                    <WordPressBlockViewer blocks={[socials]} />
                </div>
            )}
            {emails && (
                <div className={classes.emails}>
                    <WordPressBlockViewer blocks={[emails]} />
                </div>
            )}
        </section>
    );
};
