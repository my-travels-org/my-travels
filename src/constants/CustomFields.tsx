import { Checkbox, Dropdown, StarRating, TextArea, UploadFile } from '@/components/CustomFields'
import { CustomField } from '@/types/CustomField'
import { UploadFileProps } from '@/types/components/UploadFile'
import { TextAreaProps } from '@/types/components/TextArea'
import { DropdownProps } from '@/types/components/Dropdown'
import { StarRatingProps } from '@/types/components/StarRating'
import { DropdownMultipleProps } from '@/types/components/DropdownMultiple'
import DropdownMultiple from '@/components/CustomFields/DropdownMultiple'
import { MapProps } from '@/types/components/Map'
import Map from '@/components/Map'
import { CheckboxProps } from '@/types/components/Checkbox'

export const components: { [key in CustomField]: (props: any) => JSX.Element } = {
  [CustomField.File]: (props: UploadFileProps) => {
    const { register, watch, setError, setValue, clearErrors } = props.formMethods
    return <UploadFile {...props} formMethods={{ register, watch, setError, setValue, clearErrors }} />
  },
  [CustomField.StarRating]: (props: StarRatingProps) => {
    const { setValue, watch, clearErrors } = props.formMethods
    return <StarRating {...props} formMethods={{ setValue, watch, clearErrors }} />
  },
  [CustomField.TextArea]: (props: TextAreaProps) => {
    const { register } = props.formMethods
    return <TextArea {...props} formMethods={{ register }} />
  },
  [CustomField.Dropdown]: (props: DropdownProps) => {
    const { setValue, clearErrors, setError, watch } = props.formMethods
    return <Dropdown {...props} formMethods={{ clearErrors, setValue, setError, watch }} />
  },
  [CustomField.DropdownMultiple]: (props: DropdownMultipleProps) => {
    const { setValue, clearErrors, setError, watch } = props.formMethods
    return <DropdownMultiple {...props} formMethods={{ clearErrors, setValue, setError, watch }} />
  },
  [CustomField.Map]: (props: MapProps) => {
    const { setValue, watch } = props.formMethods
    return <Map {...props} formMethods={{ setValue, watch }} />
  },
  [CustomField.Checkbox]: (props: CheckboxProps) => {
    return <Checkbox {...props} formMethods={props.formMethods} />
  }
}
