import { CustomFieldsState } from '../states/CustomField'

export interface StarRatingProps {
  id: string
  setter: Dispatch<SetStateAction<CustomFieldsState>>
  data: Partial<CustomFieldsState>
}
