import { extendTheme } from "@chakra-ui/react";

interface StyleObject {
  [key: string]:{
    [key: string]: string | number;
  }
}

export const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: '#f0e7db',
        color: '#555'
      }
    })
  },
})