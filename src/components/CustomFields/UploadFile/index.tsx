'use client'

import Image from 'next/image'

import { UploadFileProps } from '@/types/components/UploadFile'
import styles from './UploadFile.module.scss'
import { useEffect } from 'react'

export default function UploadFile ({
  id,
  buttonName = 'Subir archivo',
  accept,
  multiple = true,
  previewFiles,
  formMethods: { register, watch, setError }
}: UploadFileProps): JSX.Element {
  const registerData = register(id)
  const files = watch(id) as File[]

  useEffect(() => {
    if (files === undefined) {
      setError(id, { type: 'required', message: 'No se encontró el valor' })
    }
  }, [files])

  return (
    <div className={styles.container}>
      <input
        id={id}
        type='file'
        accept={accept}
        multiple={multiple}
        hidden
        {...registerData}

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
