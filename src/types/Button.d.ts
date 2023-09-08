export interface Props {
  onClick?: any
  type?: 'reset' | 'button' | 'submit'
  className?: string
  children: React.ReactNode
  props?: {
    [key: string]: any
  }
}
