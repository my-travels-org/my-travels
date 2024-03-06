import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from 'use-places-autocomplete'
import { toast } from 'sonner'
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from '@reach/combobox'
import '@reach/combobox/styles.css'
import { PlaceAutocompleteProps } from '@/types/components/PlaceAutocomplete'

export default function PlacesAutocomplete ({ setSelected }: PlaceAutocompleteProps): JSX.Element {
  const {
    ready,
    value,
    setValue,
    suggestions: {
      status,
      data
    },
    clearSuggestions
  } = usePlacesAutocomplete()

  const handleSelect = async (address: string): Promise<void> => {
    setValue(address, false)
    clearSuggestions()

    try {
      const results = await getGeocode({ address })
      const { lat, lng } = await getLatLng(results[0])
      setSelected({ lat, lng })
    } catch (error) {
      toast.error('Error al seleccionar la dirección, intente de nuevo.')
    }
  }

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className='combobox-input'
        placeholder='Busca una dirección'
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === 'OK' && data.map(({ place_id: placeId, description }) => <ComboboxOption key={placeId} value={description} />)}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  )
}
