import { ReactNode } from 'react';
import { Box, chakra, Container, Stack, Text, useColorModeValue, VisuallyHidden } from '@chakra-ui/react';
import { FaGithub, FaTwitter } from "react-icons/fa";

const SocialButton = ({ children, label, href } : {
    children: ReactNode;
    label: string;
    href: string;
}) => {
    return (
        <chakra.button
            bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
            rounded={'full'}
            w={8}
            h={8}
            cursor={'pointer'}
            as={'a'}
            href={href}
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}
            _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
            }}>
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    );
};

export default function Footer() {
    return (
        <Box
            w={"full"}
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}>
            <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}>
                <Text>Quick Text Chat Project © 2022<br />All rights reserved by @398noetan</Text>
                <Stack direction={'row'} spacing={6}>
                    <SocialButton label={'GitHub'} href={'https://github.com/398noe/quick-text-chat'}>
                        <FaGithub />
                    </SocialButton>
                    <SocialButton label={'Twitter'} href={'https://twitter.com/398noetan'}>
                        <FaTwitter />
                    </SocialButton>
                </Stack>
            </Container>
        </Box>
    );
}