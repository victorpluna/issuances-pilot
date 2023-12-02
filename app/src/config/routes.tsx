import { RouteProps } from 'react-router-dom'
import { Soulbounds } from '../pages/issuer/Soulbounds'


export const routePaths = {
  root: '/',
}

export const routes: RouteProps[] = [
  {
    path: routePaths.root,
    component: Soulbounds,
  },
]
