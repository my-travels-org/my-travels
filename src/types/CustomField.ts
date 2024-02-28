import { Dispatch, SetStateAction } from 'react'
import { CustomFieldsState } from './states/CustomField'

export enum CustomField {
  File = 'file',
  StarRating = 'starRating',
  TextArea = 'textArea',
  Dropdown = 'dropdown'
}

export interface CustomFieldProps {
  id: string
  setter: Dispatch<SetStateAction<CustomFieldsState>>
  data: Partial<CustomFieldsState>
}
