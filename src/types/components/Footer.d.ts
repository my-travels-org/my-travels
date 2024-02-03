import { Link } from '../Constants'

export interface FooterLinks {
  title: string
  links: Link[]
}

export interface FooterProps {
  sections: FooterLinks[]
}
