import {
    Box,
    Stack,
    Heading,
    Text,
    Container,
    Button,
    SimpleGrid,
    FormControl,
    FormErrorMessage,
    Icon
  } from '@chakra-ui/react';
  
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiImage, FiVideo } from 'react-icons/fi';

import { ImageUpload, VideoUpload, validateImage, validateVideo } from './media-input';
import { TextInputs } from './text-input'

type FormValues = {
  [key:string]: FileList
}

export default function Form({code}) {
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [img, setImg] = useState('Upload Image');
  const [vid, setVid] = useState('Upload Video');
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()
  const onSubmit = handleSubmit(({img_, vid_}) => console.log({name:name, text:text, email:email, img:img_[0], vid:vid_[0]}))
  const seshStatus = sessionStorage.getItem('suntoes-form')

  useEffect(():any=>{
    if(code === 1) {
      sessionStorage.clear()
      sessionStorage.setItem('suntoes-form', 'done');
    }
  },[])

  if(code===1 || seshStatus === 'done') return (
    <Stack spacing={{ base: 10, md: 20 }} marginTop={'30vh'} marginLeft={'10vw'}>
        <Heading
          lineHeight={1.1}
          fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
          An email has been{' '}
          <Text
            as={'span'}
            bgGradient="linear(to-r, red.400,pink.400)"
            bgClip="text">
            sent.
          </Text>
        </Heading>
    </Stack>
  )

  if(code===2) return (
    <Stack spacing={{ base: 10, md: 20 }} marginTop={'30vh'} marginLeft={'10vw'}>
        <Heading
          lineHeight={1.1}
          fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
          Something just{' '}
          <Text
            as={'span'}
            bgGradient="linear(to-r, red.400,pink.400)"
            bgClip="text">
            went wrong.
          </Text>
        </Heading>
    </Stack>
  )

  if(code===3) return (
    <Stack spacing={{ base: 10, md: 20 }} marginTop={'30vh'} marginLeft={'10vw'}>
        <Heading
          lineHeight={1.1}
          fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
          Such URL does{' '}
          <Text
            as={'span'}
            bgGradient="linear(to-r, red.400,pink.400)"
            bgClip="text">
            not exist.
          </Text>
        </Heading>
    </Stack>
  )

  return (
    <Container
      as={SimpleGrid}
      maxW={'7xl'}
      columns={{ base: 1, md: 2 }}
      spacing={{ base: 10, lg: 32 }}
      py={{ base: 10, sm: 20, lg: 32 }}>
      <Stack spacing={{ base: 10, md: 20 }}>
        <Stack
        bg={'gray.50'}
        rounded={'xl'}
        p={{ base: 4, sm: 6, md: 8 }}
        spacing={{ base: 8 }}
        maxW={{ lg: 'lg' }}>
        <Stack spacing={4}>
          <Heading
            color={'gray.800'}
            lineHeight={1.1}
            fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
            Fill up{' '}
            <Text
              as={'span'}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text">
              &
            </Text>
            {' '}it'll be sent right back to your mail
          </Heading>
          <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
           chakra-ui, multer & nodemailer demo by suntoes
          </Text>
        </Stack>
        <Box mt={10}>
          <form 
            method="POST" 
            action="/upload" 
            encType="multipart/form-data" >
          <Stack spacing={4}>
            {TextInputs( name, setName, email, setEmail, text, setText )}
            <FormControl isInvalid={!!errors.img_}>
              <ImageUpload
                accept={'image/*'}
                register={register('img_', { validate: validateImage })}
                func={setImg}
              >
                <Button leftIcon={<Icon as={FiImage} />} fontFamily={'heading'} bg={'gray.200'} color={'gray.800'} w={'100%'}>
                  {img}
                </Button>
              </ImageUpload>
              <FormErrorMessage>
                {errors.img_ && errors?.img_.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.vid_}>
              <VideoUpload
                accept={'video/*'}
                register={register('vid_', { validate: validateVideo })}
                func={setVid}
              >
                <Button leftIcon={<Icon as={FiVideo} />} fontFamily={'heading'} bg={'gray.200'} color={'gray.800'} w={'100%'}>
                  {vid}
                </Button>
              </VideoUpload>
              <FormErrorMessage>
                {errors.vid_ && errors?.vid_.message}
              </FormErrorMessage>
            </FormControl>
          </Stack>
          <Button
            type='submit'
            fontFamily={'heading'}
            mt={8}
            w={'full'}
            bgGradient="linear(to-r, red.400,pink.400)"
            color={'white'}
            _hover={{
              bgGradient: 'linear(to-r, red.400,pink.400)',
              boxShadow: 'xl',
            }}>
            Submit
          </Button>
          </form>
        </Box>
      </Stack>
      </Stack>
      
    </Container>
  );
}