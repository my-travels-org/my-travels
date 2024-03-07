import { DropdownProps } from './Dropdown'

export type DropdownMultipleProps = Pick<DropdownProps, 'formMethods' | 'id'> & {
  options: Option[]
  max?: number
}
