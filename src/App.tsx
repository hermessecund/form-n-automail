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
        <Box position={'relative'} display='flex' h='90vh'>
          <Routes>
            <Route path='/' element={<Form code={0} />}/>
            <Route path='/done' element={<Form code={1} />}/>
            <Route path='/err' element={<Form code={2} />}/>
            <Route path='/*' element={<Form code={3} />}/>
          </Routes>
        <Blur
            position={'fixed'}
            overflow='hidden'
            top={-10}
            left={-10}
            style={{ filter: 'blur(60px)', transform: 'scale(2)'  }}
            />
        </Box>
        <Box 
          display='flex' 
          justifyContent={'center'} 
          h='10vh'>
          <Heading 
            cursor={'pointer'}
            _hover={{ color:"limegreen" }}
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}>
            <a 
              href='https://github.com/suntoes/form-n-automail' 
              target={'_blank'} 
              rel="noreferrer">
              
              <FiGithub />
            </a>
          </Heading>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
