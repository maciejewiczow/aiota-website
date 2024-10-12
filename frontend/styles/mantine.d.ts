import { ThemeColors, ThemeOther } from './theme';

declare module '@mantine/core' {
    export interface MantineThemeOther extends ThemeOther {}
    export interface MantineThemeColorsOverride {
        colors: ThemeColors;
    }
}
