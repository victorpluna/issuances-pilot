import { RouteProps } from 'react-router-dom'
import { Issuances } from '../pages/issuer/Issuances'


export const routePaths = {
  root: '/',
}

export const routes: RouteProps[] = [
  {
    path: routePaths.root,
    component: Issuances,
  },
]
