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

import { ImageUpload, VideoUpload } from './media-input';
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
  const [imgValid, setImgValid] = useState(true);
  const [vidValid, setVidValid] = useState(true);
  const { register } = useForm<FormValues>()
  const seshStatus = sessionStorage.getItem('suntoes-form')

  useEffect(():any=>{
    if(code === 1) {
      sessionStorage.clear()
      sessionStorage.setItem('suntoes-form', 'done');
    }
  },[])

  if((code===1) || seshStatus === 'done') return (
    <Stack spacing={{ base: 10, md: 20 }} marginTop={'30vh'} marginLeft={'10vw'}>
        <Heading
          lineHeight={1.1}
          zIndex={9}
          fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
          One time form{' '}
          <Text
            as={'span'}
            bgGradient="linear(to-r, red.400,pink.400)"
            bgClip="text">
            done.
          </Text>{' '}
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
        bg={'rgba(249, 249, 249, 0.7)'}
        rounded={'xl'}
        p={{ base: 4, sm: 6, md: 8 }}
        spacing={{ base: 8 }}
        maxW={{ lg: 'lg' }}>
        <Stack spacing={4}>
          <Heading
            color={'#555'}
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
          <Text color={'#555'} fontSize={{ base: 'sm', sm: 'md' }}>
           chakra-ui, multer & nodemailer demo by suntoes
          </Text>
        </Stack>
        <Box mt={10}>
          <form 
            method="POST" 
            action="/upload" 
            encType="multipart/form-data" 
          >
          <Stack spacing={4}>
            {TextInputs( name, setName, email, setEmail, text, setText )}
            <FormControl 
              isInvalid={!imgValid} 
              isRequired>
              <ImageUpload
                accept={'image/*'}
                register={register('img_')}
                func={setImg}
                valid={setImgValid}
              >
                <Button
                  position={'absolute'}
                  zIndex={1}
                  leftIcon={<Icon as={FiImage} />} 
                  fontFamily={'heading'} bg={'gray.200'} color={"#555"} w={'100%'}
                >
                  {img}
                </Button>
              </ImageUpload>
              <FormErrorMessage>
                'must be less than 5mb'
              </FormErrorMessage>
            </FormControl>
            <FormControl 
              isInvalid={!vidValid} 
              isRequired>
              <VideoUpload
                accept={'video/*'}
                register={register('vid_')}
                func={setVid}
                valid={setVidValid}
              >
                <Button 
                  position={'absolute'}
                  zIndex={1}
                  type="button" 
                  leftIcon={<Icon as={FiVideo} />} 
                  fontFamily={'heading'} bg={'gray.200'} color={'#555'} w={'100%'}>
                  {vid}
                </Button>
              </VideoUpload>
              <FormErrorMessage>
              'must be less than 10mb'
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
            }}
            isDisabled={!imgValid || !vidValid}
            >
            Submit
          </Button>
          </form>
        </Box>
      </Stack>
      </Stack>
      
    </Container>
  );
}