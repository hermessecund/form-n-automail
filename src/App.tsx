import Form from './components/form';
import { Blur } from './components/blur';
import { Box, ChakraProvider, Heading } from '@chakra-ui/react';
import { theme } from './theme'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FiGithub } from 'react-icons/fi';

function App() {
  return (
    <ChakraProvider theme={theme} >
      <Router>
        <Box display='flex' flexDirection={'column'} h='100%'>
        <Box position={'relative'} display='flex' minH={'90vh'} h='100%'>
          <Routes>
            <Route path='/' element={<Form code={0} />}/>
            <Route path='/done' element={<Form code={1} />}/>
            <Route path='/err' element={<Form code={2} />}/>
            <Route path='/*' element={<Form code={3} />}/>
          </Routes>
        </Box>
        <Box 
          display='flex' 
          justifyContent={'center'} 
          minH='10vh'
          >
          <Heading 
            cursor={'pointer'}
            _hover={{ color:"limegreen" }}
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
            style={{padding: '10px'}}
            >
            <a 
              href='https://github.com/suntoes/form-n-automail' 
              target={'_blank'} 
              rel="noreferrer">
              <FiGithub />
            </a>
          </Heading>
        </Box>
        </Box>
        <Blur
            position={'fixed'}
            overflow='hidden'
            top={-10}
            left={-10}
            style={{ filter: 'blur(60px)', transform: 'scale(2)'  }}
            />
      </Router>
    </ChakraProvider>
  );
}

export default App;
