import hexToHsl from 'hex-to-hsl'

import { colors } from './colors'
import { Theme, ThemeColor } from './Theme'
import * as defaultTheme from './theme.module.scss'

const setDocumentVariableValue = ({ name, value }) => document.documentElement.style.setProperty(`--${name}`, value)

const createThemeColor = ({ name, value }: ThemeColor) => {
  const [hue, saturation, lightness] = hexToHsl(value)

  setDocumentVariableValue({ name: `${name}-h`, value: hue })
  setDocumentVariableValue({ name: `${name}-s`, value: `${saturation}%` })
  setDocumentVariableValue({ name: `${name}-l`, value: `${lightness}%` })
}

export const getDocumentBodyVariableByName = (name) => getComputedStyle(document.body).getPropertyValue(`--${name}`)

export const setTheme = (variables: Partial<Theme>) => {
  const theme = {
    ...defaultTheme,
    ...variables,
  }

  createThemeColor({ name: colors.headerColor, value: theme.headerColor })
  createThemeColor({ name: colors.headerContrastColor, value: theme.headerContrastColor })

  createThemeColor({ name: colors.primaryColor, value: theme.primaryColor })
  createThemeColor({ name: colors.primaryContrastColor, value: theme.primaryContrastColor })

  createThemeColor({ name: colors.backgroundMainColor, value: theme.backgroundMainColor })
  createThemeColor({
    name: colors.backgroundMainContrastColor,
    value: theme.backgroundMainContrastColor,
  })
}

export const setDefaultTheme = () => setTheme(defaultTheme as Partial<Theme>)
