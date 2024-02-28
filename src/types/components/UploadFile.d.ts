import { CustomFieldProps } from '../CustomField'

export interface UploadFileProps extends CustomFieldProps {
  accept: string
  buttonName?: string
  multiple?: boolean
  previewFiles: boolean
}
