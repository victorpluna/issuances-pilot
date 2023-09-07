export interface Theme {
  primaryColor: string
  primaryContrastColor: string
  headerColor: string
  headerContrastColor: string
  backgroundMainColor: string
  backgroundMainContrastColor: string
}

export interface ThemeColor {
  name: Color
  value: string
}

export type Color =
  | 'primary-color'
  | 'primary-contrast-color'
  | 'header-color'
  | 'header-contrast-color'
  | 'background-main-color'
  | 'background-main-contrast-color'
