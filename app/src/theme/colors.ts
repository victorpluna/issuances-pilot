import { Color, Theme } from './Theme'

type ThemeKeys = keyof Theme

export const colors: { [key in ThemeKeys]: Color } = {
  primaryColor: 'primary-color',
  primaryContrastColor: 'primary-contrast-color',
  headerColor: 'header-color',
  headerContrastColor: 'header-contrast-color',
  backgroundMainColor: 'background-main-color',
  backgroundMainContrastColor: 'background-main-contrast-color',
}
