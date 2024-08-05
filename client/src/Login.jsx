import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppNavbar from "./assets/components/AppNavbar";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Added state for error message
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous error message
    axios
      .post("http://localhost:3000/login", { email, password }) // Removed `name` from request payload
      .then((result) => {
        console.log(result);
        if (result.data.message === "Success") {
          navigate(`/${result.data.email}`);
        }
      })
      .catch((err) => {
        if (err.response) {
          // The request was made and the server responded with a status code that falls out of the range of 2xx
          if (err.response.status === 401) {
            setErrorMessage("Incorrect password");
          } else if (err.response.status === 404) {
            setErrorMessage("User not found. Redirecting to Signup Page...");
            setTimeout(() => {
              navigate("/register");
            }, 5000); // Redirect after delay to show the error message
          } else {
            setErrorMessage(err.response.data);
          }
        } else if (err.request) {
          // The request was made but no response was received
          console.log(err.request);
          setErrorMessage("No response from the server. Please try again.");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", err.message);
          setErrorMessage("An error occurred. Please try again.");
        }
        console.log(err.config);
      });
  };

  return (
    <>
      <AppNavbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center">Login</h2>
                {errorMessage && ( // Conditional rendering of error message
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter your email"
                      onChange={(e) => setEmail(e.target.value)}
                      required // Added `required` attribute
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter your password"
                      onChange={(e) => setPassword(e.target.value)}
                      required // Added `required` attribute
                    />
                  </div>
                  <div className="d-flex justify-content-between">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block mt-4"
                    >
                      Login
                    </button>
                    <Link
                      to="/register"
                      className="btn btn-secondary btn-block mt-4"
                    >
                      Sign up
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Container,
//   Flex,
//   VStack,
//   Heading,
//   FormControl,
//   FormLabel,
//   Input,
//   Button,
//   Text,
//   Image,
//   Alert,
//   AlertIcon,
// } from "@chakra-ui/react";
// import AppNavbar from "./assets/components/AppNavbar";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();

//   axios.defaults.withCredentials = true;

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setErrorMessage("");
//     axios
//       .post("http://localhost:3000/login", { email, password })
//       .then((result) => {
//         if (result.data.message === "Success") {
//           navigate(`/${result.data.email}`);
//         }
//       })
//       .catch((err) => {
//         if (err.response) {
//           if (err.response.status === 401) {
//             setErrorMessage("Incorrect password");
//           } else if (err.response.status === 404) {
//             setErrorMessage("User not found. Redirecting to Signup Page...");
//             setTimeout(() => {
//               navigate("/register");
//             }, 5000);
//           } else {
//             setErrorMessage(err.response.data);
//           }
//         } else if (err.request) {
//           setErrorMessage("No response from the server. Please try again.");
//         } else {
//           setErrorMessage("An error occurred. Please try again.");
//         }
//       });
//   };

//   return (
//     <>
//       <Box
//         bgGradient="linear(to-r, black, gray.800)"
//         minHeight="100vh"
//         display="flex"
//         alignItems="center"
//         justifyContent="center"
//         p={4}
//       >
//         <Container maxW="container.xl" p={0}>
//           <Flex
//             direction={{ base: "column", md: "row" }}
//             align="center"
//             justify=" space-evenly"
//             spacing={4}
//             gap={6}
//           >
//             {/* Left Side */}
//             <Flex
//               direction="column"
//               align="center"
//               justify="center"
//               flex="1"
//               display={{ base: "none", md: "flex" }}
//               height="500px" // Adjusted height
//               maxW="20rem"
//             >
//               <Image
//                 src="https://via.placeholder.com/600" // Replace with your image URL
//                 alt="Login Illustration"
//                 borderRadius="md"
//                 mb={4}
//                 boxSize="full"
//                 objectFit="cover"
//               />
//               <Text
//                 fontSize="lg"
//                 color="white"
//                 textAlign="center"
//                 maxW="80%"
//                 mx="auto"
//               >
//                 Welcome back! Please log in to access your account.
//               </Text>
//             </Flex>

//             {/* Right Side - Login Form */}
//             <Flex
//               direction="column"
//               align="center"
//               flex="1"
//               border="1px"
//               borderColor="gray.300"
//               bg="transperant" // Transparent background
//               p={8}
//               borderRadius="md"
//               boxShadow="md"
//               height="500px" // Adjusted height
//               maxW="20rem"
//               justifyContent="space-evenly"
//             >
//               <Flex gap="3" align="center">
//                 <Heading as="h2" textColor="white" size="lg" mb={4}>
//                   Tunes
//                 </Heading>
//                 <Image
//                   src="https://images.vexels.com/content/131548/preview/music-note-circle-icon-851b3f.png"
//                   alt="Music Note"
//                   boxSize="60px"
//                 />
//               </Flex>

//               {errorMessage && (
//                 <Alert status="error" mb={4}>
//                   <AlertIcon />
//                   {errorMessage}
//                 </Alert>
//               )}
//               <form onSubmit={handleSubmit}>
//                 <VStack spacing={4} align="stretch">
//                   <FormControl id="email" isRequired>
//                     <FormLabel textColor="white">Email</FormLabel>
//                     <Input
//                       type="email"
//                       placeholder="Enter your email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                     />
//                   </FormControl>
//                   <FormControl id="password" isRequired>
//                     <FormLabel textColor="white">Password</FormLabel>
//                     <Input
//                       type="password"
//                       placeholder="Enter your password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                     />
//                   </FormControl>
//                 </VStack>
//               </form>
//               <Box width="full" alignItems="center" justifyContent="center">
//                 <Button type="submit" colorScheme="blue" size="lg" width="full">
//                   Login
//                 </Button>
//               </Box>
//             </Flex>
//           </Flex>
//           <Button
//             colorScheme="gray"
//             size="lg"
//             variant="outline"
//             onClick={() => navigate("/register")}
//             textColor="white"
//           >
//             Sign up
//           </Button>
//         </Container>
//       </Box>
//     </>
//   );
// };

// export default Login;
