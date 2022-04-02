import { InputGroup, Input } from '@chakra-ui/react'

import { BaseSyntheticEvent, ReactNode, useRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type FileUploadProps = {
    register: UseFormRegisterReturn
    accept?: string
    func: Function
    valid: Function
    multiple?: boolean
    children?: ReactNode
  }
  
export const ImageUpload = (props: FileUploadProps) => {
  const { register, accept, func, valid, children } = props
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { ref, ...rest } = register as {ref: (instance: HTMLInputElement |null) => void}

  const handleClick = () => inputRef.current?.click()

  return (
      <InputGroup 
        onClick={handleClick} 
        onChange={(e:BaseSyntheticEvent)=>{
          const file:File = e.target.files[0];
          func(file.name);
          const fsMb = file.size / (1024 * 1024);
          const MAX_FILE_SIZE = 10;
          if(fsMb > MAX_FILE_SIZE) return valid(false);
          valid(true);
        }
      }>
        <Input
          type={'file'}
          accept={accept}
          {...rest}
          ref={(e) => {
            ref(e)
            inputRef.current = e
          }}
          style={{ zIndex:'0', position:'relative'}}
        />
        <>
          {children}
        </>
      </InputGroup>
  )
}

export const VideoUpload = (props: FileUploadProps) => {
  const { register, accept, func, valid, children } = props
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { ref, ...rest } = register as {ref: (instance: HTMLInputElement |null) => void}

  const handleClick = () => inputRef.current?.click()

  return (
      <InputGroup 
        onClick={handleClick} 
        onChange={(e:BaseSyntheticEvent)=>{
          const file:File = e.target.files[0];
          func(file.name);
          const fsMb = file.size / (1024 * 1024);
          const MAX_FILE_SIZE = 10;
          if(fsMb > MAX_FILE_SIZE) return valid(false);
          valid(true);
        }
      }>
        <Input
          type={'file'}
          accept={accept}
          {...rest}
          ref={(e) => {
            ref(e)
            inputRef.current = e
          }}
          style={{ zIndex:'0', position:'relative'}}
        />
        <>
          {children}
        </>
      </InputGroup>
  )
}
