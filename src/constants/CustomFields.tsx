import { CustomField } from '@/types/CustomField'
import { StarRating, UploadFile } from '@/components'
import { UploadFileProps } from '@/types/components/UploadFile'
import { StarRatingProps } from '@/types/components/StarRating'

export const components: { [key in CustomField]: (props: any) => JSX.Element } = {
  [CustomField.File]: (props: UploadFileProps) => <UploadFile {...props} />,
  [CustomField.StarRating]: (props: StarRatingProps) => <StarRating {...props} />,
  [CustomField.TextArea]: () => <textarea />
}
