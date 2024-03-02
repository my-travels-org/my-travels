import { UseFormReturn } from 'react-hook-form'

export enum CustomField {
  File = 'file',
  StarRating = 'starRating',
  TextArea = 'textArea',
  Dropdown = 'dropdown',
  DropdownMultiple = 'dropdownMultiple'
}

export interface CustomFieldProps {
  id: string
  formMethods: UseFormReturn
}
