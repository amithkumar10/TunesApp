// import React from "react";
// import { Container, Row, Col, Card } from "react-bootstrap";
// import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
// import AppNavbar from "./assets/components/AppNavbar";

// const About = () => {
//   return (
//     <>
//       <AppNavbar />
//       <Container className="mt-5">
//         <Row className="justify-content-center">
//           <Col md={8}>
//             <Card className="text-center p-4">
//               <Card.Body>
//                 <Card.Title>About This Website</Card.Title>
//                 <Card.Text>
//                   This website is a platform where users can log in, upload
//                   their favorite songs, search for friends' accounts, and like
//                   their friends' favorite songs. Built using modern web
//                   technologies, it provides a seamless and interactive
//                   experience for music enthusiasts.
//                 </Card.Text>
//                 <Card.Text>
//                   <strong>Technologies Used:</strong> React, Node.js, Express,
//                   MongoDB, React-Bootstrap
//                 </Card.Text>
//                 <div className="d-flex justify-content-center mt-4">
//                   <a href="https://github.com/amithkumar10" target="_blank">
//                     <FaGithub size={40} className="mx-3" />
//                   </a>
//                   <a
//                     href="https://www.linkedin.com/in/amithkumar-p-radhakrishnan-7179b8283/"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <FaLinkedin size={40} className="mx-3" />
//                   </a>
//                   <a
//                     href="https://www.instagram.com/amithkumar_10/"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <FaInstagram size={40} className="mx-3" />
//                   </a>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default About;

import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Link,
  Center,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import AppNavbar from "./assets/components/AppNavbar";

const About = () => {
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const iconColor = useColorModeValue("gray.600", "gray.300");

  return (
    <>
      <AppNavbar />
      <Box
        bgGradient="linear(to-r, black, gray.800)"
        py={10}
        px={5}
        minHeight="100vh"
      >
        <Container maxW="container.md">
          <Center>
            <Box
              bg={cardBg}
              color={textColor}
              p={10}
              borderRadius="md"
              boxShadow="lg"
              textAlign="center"
            >
              <VStack spacing={5}>
                <Heading as="h1" size="xl">
                  About This Website
                </Heading>
                <Text fontSize="lg">
                  This website is a platform where users can log in, upload
                  their favorite songs, search for friends' accounts, and like
                  their friends' favorite songs. Built using modern web
                  technologies, it provides a seamless and interactive
                  experience for music enthusiasts.
                </Text>
                <Text fontSize="lg">
                  <strong>Technologies Used:</strong> React, Node.js, Express,
                  MongoDB, React-Bootstrap
                </Text>
                <HStack spacing={5} mt={5}>
                  <Link href="https://github.com/amithkumar10" isExternal>
                    <Icon as={FaGithub} w={10} h={10} color={iconColor} />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/amithkumar-p-radhakrishnan-7179b8283/"
                    isExternal
                  >
                    <Icon as={FaLinkedin} w={10} h={10} color={iconColor} />
                  </Link>
                  <Link
                    href="https://www.instagram.com/amithkumar_10/"
                    isExternal
                  >
                    <Icon as={FaInstagram} w={10} h={10} color={iconColor} />
                  </Link>
                </HStack>
              </VStack>
            </Box>
          </Center>
        </Container>
      </Box>
    </>
  );
};

export default About;
