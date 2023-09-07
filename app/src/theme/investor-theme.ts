import { useEffect } from 'react'

import { setTheme } from './set-theme'
import { Theme } from './Theme'

export const investorTheme: Theme = {
  primaryColor: '#f6a820',
  primaryContrastColor: '#212121',
  headerColor: '#fff',
  headerContrastColor: '#bdbdbd',
  backgroundMainColor: '#292d33',
  backgroundMainContrastColor: '#FFFFFF',
}

export const setInvestorTheme = () => setTheme(investorTheme)

export const useInvestorTheme = () => useEffect(setInvestorTheme, [])
