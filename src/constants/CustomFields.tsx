import { CustomField } from '@/types/CustomField'
import { UploadFile } from '@/components'
import { UploadFileProps } from '@/types/components/UploadFile'

export const components: { [key in CustomField]: (props: any) => JSX.Element } = {
  [CustomField.File]: (props: UploadFileProps) => <UploadFile {...props} />,
  [CustomField.StarRating]: () => <div />
}
