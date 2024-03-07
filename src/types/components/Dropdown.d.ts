import { UseFormReturn } from 'react-hook-form'
import { CustomFieldProps } from '../CustomField'
import { Option } from '../Option'

export interface DropdownProps extends CustomFieldProps {
  options: Option[] | Record<string, string[]>
  formMethods: Pick<UseFormReturn, 'setValue' | 'clearErrors' | 'setError' | 'watch'>
  dependsOn?: string
}
