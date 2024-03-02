import { UseFormReturn } from 'react-hook-form'
import { CustomFieldProps } from '../CustomField'
import { Option } from '../Option'

export interface DropdownProps extends CustomFieldProps {
  options: Option[]
  formMethods: Pick<UseFormReturn, 'setValue' | 'clearErrors' | 'setError'>
}
