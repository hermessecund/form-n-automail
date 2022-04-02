import { InputGroup } from '@chakra-ui/react'

import { ReactNode, useRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type FileUploadProps = {
    register: UseFormRegisterReturn
    accept?: string
    func: Function
    multiple?: boolean
    children?: ReactNode
  }
  
export const ImageUpload = (props: FileUploadProps) => {
  const { register, accept, func, children } = props
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { ref, ...rest } = register as {ref: (instance: HTMLInputElement |null) => void}

  const handleClick = () => inputRef.current?.click()

  return (
      <InputGroup onClick={handleClick} onChange={(e:any)=>func(String(e.target.value).split('\\')[2])}>
        <input
          name='img'
          type={'file'}
          hidden
          accept={accept}
          {...rest}
          ref={(e) => {
            ref(e)
            inputRef.current = e
          }}
        />
        <>
          {children}
        </>
      </InputGroup>
  )
}

export const VideoUpload = (props: FileUploadProps) => {
  const { register, accept, func, children } = props
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { ref, ...rest } = register as {ref: (instance: HTMLInputElement |null) => void}

  const handleClick = () => inputRef.current?.click()

  return (
      <InputGroup onClick={handleClick} onChange={(e:any)=>func(String(e.target.value).split('\\')[2])}>
        <input
          name='vid'
          type={'file'}
          hidden
          accept={accept}
          {...rest}
          ref={(e) => {
            ref(e)
            inputRef.current = e
          }}
        />
        <>
          {children}
        </>
      </InputGroup>
  )
}

export const validateImage = (value: FileList) => {
    if (value.length < 1) {
      return 'Image is required'
    }
    for (const file of Array.from(value)) {
      const fsMb = file.size / (1024 * 1024)
      const MAX_FILE_SIZE = 5
      if (fsMb > MAX_FILE_SIZE) {
        return 'Max image size is 5mb'
      }
    }
    return true
  }

export const validateVideo = (value: FileList) => {
  if (value.length < 1) {
    return 'Video is required'
  }
  for (const file of Array.from(value)) {
    const fsMb = file.size / (1024 * 1024)
    const MAX_FILE_SIZE = 10
    if (fsMb > MAX_FILE_SIZE) {
      return 'Max video size 10mb'
    }
  }
  return true
}
