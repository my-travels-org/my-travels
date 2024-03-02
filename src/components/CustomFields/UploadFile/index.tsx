'use client'

import Image from 'next/image'

import { UploadFileProps } from '@/types/components/UploadFile'
import styles from './UploadFile.module.scss'

export default function UploadFile ({
  id,
  buttonName = 'Subir archivo',
  accept,
  multiple = true,
  previewFiles,
  formMethods: { register, watch, setValue }
}: UploadFileProps): JSX.Element {
  const { onChange, ...rest } = register(id)
  const files = watch(id) as FileList

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files !== null) {
      setValue(id, e.target.files)
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
        onChange={handleFiles}
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
