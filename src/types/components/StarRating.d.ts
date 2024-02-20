import { CustomFieldsState } from '../states/CustomField'

export interface StarRatingProps {
  setter?: Dispatch<SetStateAction<CustomFieldsState>>
  data: Partial<CustomFieldsState>
}
