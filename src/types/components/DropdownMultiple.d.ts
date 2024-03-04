import { UseFormReturn } from 'react-hook-form'
import { DropdownProps } from './Dropdown'

export interface DropdownMultipleProps extends DropdownProps {
  formMethods: Pick<UseFormReturn, 'setValue' | 'clearErrors' | 'setError' | 'watch' | 'formState'>
}
