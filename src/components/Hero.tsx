import {
  Heading,
  Button,
  Text,
  Container,
  Center,
  WrapItem,
  Wrap,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  function handleAddNewCreatorNavigation() {
    navigate("/add-creator");
  }

  function handleViewAllCreatorsNavigation() {
    navigate("/");
  }

  return (
    <>
      <Container
        maxW="full"
        height="calc(100vh)"
        alignContent={"center"}
        bgImage={
          "https://images.unsplash.com/photo-1618224619763-c26996a38420?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      >
        <Center>
          <Heading
            as="h1"
            size="4xl"
            color={"white"}
            fontWeight={"thin"}
            p={"4"}
          >
            CREATORVERSE
          </Heading>
        </Center>
        <Center>
          <Text fontSize="4xl" color={"gray.500"}>
            A way for you to connect with your favorite creators
          </Text>
        </Center>
        <Center>
          <Wrap color="white" justifyContent={"center"} py={"4"}>
            <WrapItem>
              <Center>
                <Button
                  size="md"
                  height="68px"
                  width="300px"
                  fontSize={"xl"}
                  fontWeight={"thin"}
                  border="2px"
                  borderColor="blue.300"
                  backgroundColor={"black"}
                  textColor={"white"}
                  _hover={{
                    backgroundColor: "blue.700",
                  }}
                  onClick={handleViewAllCreatorsNavigation}
                >
                  VIEW ALL CREATORS
                </Button>
              </Center>
            </WrapItem>
            <WrapItem>
              <Center>
                <Button
                  size="md"
                  height="68px"
                  width="300px"
                  fontSize={"xl"}
                  fontWeight={"thin"}
                  border="2px"
                  borderColor="blue.300"
                  backgroundColor={"black"}
                  textColor={"white"}
                  _hover={{
                    backgroundColor: "blue.700",
                  }}
                  onClick={handleAddNewCreatorNavigation}
                >
                  ADD NEW CREATORS
                </Button>
              </Center>
            </WrapItem>
          </Wrap>
        </Center>
      </Container>
    </>
  );
}
