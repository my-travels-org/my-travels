import { Link } from '@/types/Constants'
import { FooterLinks } from '@/types/components/Footer'

export const navbarLinks: Link[] = [
  {
    name: 'Inicio',
    path: '/',
    isProtected: false
  },
  {
    name: 'Categorías',
    path: '/categories',
    isProtected: false
  },
  {
    name: 'Para ti',
    path: '/for-you',
    isProtected: true
  },
  {
    name: 'Descubre',
    path: '/discover',
    isProtected: true
  },
  {
    name: 'Mis viajes',
    path: '/my-travels',
    isProtected: true
  }
]

export const footerLinks: FooterLinks[] = [
  {
    title: 'Empresa',
    links: [
      {
        name: 'Inicio',
        path: '/'
      },
      {
        name: 'Nosotros',
        path: '/info_footer/aboutUs'
      },
      {
        name: 'Contacto',
        path: '/enConstruccionPage'
      }
    ]
  },
  {
    title: 'Ayuda',
    links: [
      {
        name: 'Preguntas frecuentes',
        path: '/info_footer/questions'
      },
      {
        name: 'Soporte',
        path: '/enConstruccionPage'
      },
      {
        name: 'Términos y Condiciones',
        path: '/info_footer/terms-and-conditions'
      }
    ]
  },
  {
    title: 'Social',
    links: [
      {
        name: 'Facebook',
        path: '/enConstruccionPage'
      },
      {
        name: 'Twitter',
        path: '/enConstruccionPage'
      },
      {
        name: 'Instagram',
        path: '/enConstruccionPage'
      }
    ]
  }
]
