'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import { UploadFileProps } from '@/types/components/UploadFile'
import styles from './UploadFile.module.scss'
import { CustomFieldsState } from '@/types/states/CustomField'

export default function UploadFile ({
  id,
  buttonName = 'Subir archivo',
  accept,
  multiple = true,
  previewFiles,
  setter,
  data
}: UploadFileProps): JSX.Element {
  const [files, setFiles] = useState<FileList>()

  useEffect(() => {
    const element = id as keyof typeof data
    if (data[element] !== undefined) {
      setFiles(data[element] as FileList)
    }
  }, [])

  return (
    <div className={styles.container}>
      <input
        id={id}
        type='file'
        accept={accept}
        multiple={multiple}
        hidden
        onInput={(e) => {
          const target = e.target as HTMLInputElement
          const files = target.files
          if (files !== null) {
            setter((prev: Partial<CustomFieldsState>) => ({ ...structuredClone(prev), [id]: files }))
            setFiles(files)
          }
        }}
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
