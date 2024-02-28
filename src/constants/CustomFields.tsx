import { Dropdown, StarRating, TextArea, UploadFile } from '@/components/CustomFields'
import { CustomField, CustomFieldProps } from '@/types/CustomField'
import { UploadFileProps } from '@/types/components/UploadFile'
import { TextAreaProps } from '@/types/components/TextArea'
import { DropdownProps } from '@/types/components/Dropdown'

export const components: { [key in CustomField]: (props: any) => JSX.Element } = {
  [CustomField.File]: (props: UploadFileProps) => <UploadFile {...props} />,
  [CustomField.StarRating]: (props: CustomFieldProps) => <StarRating {...props} />,
  [CustomField.TextArea]: (props: TextAreaProps) => <TextArea {...props} />,
  [CustomField.Dropdown]: (props: DropdownProps) => <Dropdown {...props} />
}
