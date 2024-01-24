import { Link } from '@/types/Constants'

export const links: Link[] = [
  {
    name: 'Inicio',
    path: '/',
    requireAuth: false
  },
  {
    name: 'Categorías',
    path: '/categories',
    requireAuth: false
  },
  {
    name: 'Para ti',
    path: '/for-you',
    requireAuth: true
  },
  {
    name: 'Descubre',
    path: '/discover',
    requireAuth: true
  }
]
