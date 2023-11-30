import { RouteProps } from 'react-router-dom'
import { MySoulbounds } from '../pages/issuer/MySoulbounds/MySoulbounds'


export const routePaths = {
  root: '/',
}

export const routes: RouteProps[] = [
  {
    path: routePaths.root,
    component: MySoulbounds,
  },
]
