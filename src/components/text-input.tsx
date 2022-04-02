import { Input, Textarea } from "@chakra-ui/react"

export const TextInputs = ( name, setName, email, setEmail, text, setText ) => {
    return(
        <>
            <Input
              name='name'
              id='name'
              placeholder="Name"
              bg={'gray.100'}
              border={0}
              color={'gray.500'}
              _placeholder={{
                color: 'gray.500',
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              isRequired={true}
            />
            <Input
              name='email'
              id='email'
              placeholder="youremail@example.com"
              bg={'gray.100'}
              border={0}
              color={'gray.500'}
              _placeholder={{
                color: 'gray.500',
              }}
              isRequired={true}
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Textarea
              name='text'
              id='text'
              placeholder="Any text"
              bg={'gray.100'}
              border={0}
              color={'gray.500'}
              _placeholder={{
                color: 'gray.500',
              }}
              value={text}
              onChange={(e) => setText(e.target.value)}
              isRequired={true}
            />
        </>
    )
}