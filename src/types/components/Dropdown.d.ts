import { Option } from '../Option'
import { TextAreaProps } from './TextArea'

export interface DropdownProps extends TextAreaProps {
  options: Option[]
  isMultiple?: boolean
}
