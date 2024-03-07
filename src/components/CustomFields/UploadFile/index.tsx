'use client'

import Image from 'next/image'

import { UploadFileProps } from '@/types/components/UploadFile'
import styles from './UploadFile.module.scss'
import { useEffect, useRef } from 'react'

export default function UploadFile ({
  id,
  buttonName = 'Subir archivo',
  accept,
  multiple = true,
  previewFiles,
  formMethods: { register, watch, setError, setValue, clearErrors }
}: UploadFileProps): JSX.Element {
  const { onChange, ...rest } = register(id)
  const files = watch(id) as File[]
  const hasBeenEdited = useRef(false)

  useEffect(() => {
    if (!hasBeenEdited.current) return
    if (files.length === 0) {
      setError(id, { type: 'required', message: 'Sube por lo menos una imagen' })
    } else {
      clearErrors(id)
    }
  }, [files])

  const handleFileChanges = (e: React.ChangeEvent<HTMLInputElement>): void => {
    hasBeenEdited.current = true
    if (e.target.files !== null) {
      const files = Array.from(e.target.files)

      setValue(id, files)
    }
  }

  return (
    <div className={styles.container}>
      <input
        id={id}
        type='file'
        accept={accept}
        multiple={multiple}
        hidden
        onChange={handleFileChanges}
        {...rest}

      />
      <label htmlFor={id} className={styles.container_input}>
        {buttonName}
      </label>
      {
        files !== null && previewFiles && (
          <ul className={styles.container_preview}>
            {files !== undefined && Array.from(files).map((file, i) => (
              <li key={i}>
                {
                  file.type.includes('image')
                    ? (
                      <Image src={URL.createObjectURL(file)} alt={file.name} width={250} height={250} />
                      )
                    : (
                      <a
                        href={URL.createObjectURL(file)}
                        target='_blank'
                        rel='noreferrer'
                      >
                        {file.name}
                      </a>
                      )
                }
              </li>
            ))}
          </ul>
        )
      }
    </div>
  )
}
