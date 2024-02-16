import { SetStateAction } from 'react'
import { CustomFieldsState } from '../states/CustomField'

export interface UploadFileProps {
  id: string
  accept: string
  buttonName?: string
  multiple?: boolean
  previewFiles: boolean
  setter: Dispatch<SetStateAction<CustomFieldsState>>
  data: Partial<CustomFieldsState>
}
