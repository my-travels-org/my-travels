import { Link } from '../Constants'

type FooterLink = Omit<Link, 'isProtected'>
export interface FooterLinks {
  title: string
  links: FooterLink[]
}

export interface FooterProps {
  sections: FooterLinks[]
}
