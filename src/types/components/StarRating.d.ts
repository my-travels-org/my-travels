import { CustomFieldProps } from '../CustomField'
import { CustomFieldsState } from '../states/CustomField'

export interface StarRatingProps extends CustomFieldProps {
  id: string
  setter: Dispatch<SetStateAction<CustomFieldsState>>
  data: Partial<CustomFieldsState>
}
