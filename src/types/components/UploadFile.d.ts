import { CustomFieldProps } from '../CustomField'
import { UseFormReturn } from 'react-hook-form'

export interface UploadFileProps extends CustomFieldProps {
  accept: string
  buttonName?: string
  multiple?: boolean
  previewFiles: boolean
  formMethods: Pick<UseFormReturn, 'register' | 'watch' | 'setError'>
}
