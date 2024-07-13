import {
  Card,
  Stack,
  CardBody,
  Heading,
  CardFooter,
  Button,
  Image,
  Text,
  Container,
  ButtonGroup,
  HStack,
  IconButton,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { supabase } from "../client";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { SiInstagram, SiTwitter, SiYoutube } from "react-icons/si";
import { useRef } from "react";

interface CreatorFormProps {
  id: number;
  name: string;
  imgURL: string;
  description: string;
  socialMedia: { youtube: string; twitter: string; instagram: string };
}

export default function CreatorInfoCard(props: CreatorFormProps) {
  const navigate = useNavigate();
  const { id, name, imgURL, description, socialMedia } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const handleCreatorEdit = () => {
    navigate("/edit-creator", {
      state: {
        id,
        edit: true,
        name,
        imgURL,
        description,
        socialMedia: {
          youtube: socialMedia.youtube,
          twitter: socialMedia.twitter,
          instagram: socialMedia.instagram,
        },
      },
    });
  };

  const handleCreatorDeletion = async () => {
    try {
      const { error } = await supabase.from("creators").delete().eq("id", id);
      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error("Failed to delete creator", error);
    }
  };

  return (
    <Container
      maxW="full"
      height="calc(100vh)"
      alignContent={"center"}
      background={"black"}
      p={16}
    >
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        borderColor={"blue.300"}
        backgroundColor={"black"}
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src={imgURL || ""}
          alt="Caffe Latte"
        />

        <Stack>
          <CardBody>
            <Heading size="4xl" fontWeight={"thin"} color={"white"} pb={4}>
              {name}
            </Heading>

            <Text py="2" color={"white"}>
              {description}
            </Text>
          </CardBody>

          <HStack pl={4}>
            <IconButton
              background={"black"}
              isRound={true}
              _hover={{}}
              onClick={() =>
                window.open(
                  `https://youtube.com/channel/${socialMedia.youtube}`,
                  "_blank"
                )
              }
              icon={<SiYoutube size={40} color="red" />}
              aria-label={"Youtube"}
            />

            <Text fontSize="3xl" color={"white"} pb={"5px"}>
              Youtube ~
            </Text>
            <Text fontSize="3xl" color={"gray.500"} pb={"5px"} as="i">
              @{socialMedia.youtube}
            </Text>
          </HStack>

          <HStack pl={4}>
            <IconButton
              background={"black"}
              isRound={true}
              _hover={{}}
              onClick={() =>
                window.open(`https://x.com/@${socialMedia.twitter}`, "_blank")
              }
              icon={<SiTwitter size={40} color="#1DA1F2" />}
              aria-label={"Twitter"}
            />
            <Text fontSize="3xl" color={"white"} pb={"5px"}>
              Twitter ~
            </Text>
            <Text fontSize="3xl" color={"gray.500"} pb={"5px"} as="i">
              @{socialMedia.twitter}
            </Text>
          </HStack>

          <HStack pl={4}>
            <IconButton
              isRound={true}
              bgGradient="linear(to-l,#f9ce34, #ee2a7b, #6228d7)"
              aria-label="Instagram"
              _hover={{}}
              onClick={() =>
                window.open(
                  `https://instagram.com/@${socialMedia.instagram}`,
                  "_blank"
                )
              }
              icon={<SiInstagram size={25} color="white" />}
            />

            <Text fontSize="3xl" color={"white"} pb={"5px"}>
              Instagram ~
            </Text>
            <Text fontSize="3xl" color={"gray.500"} pb={"5px"} as="i">
              @{socialMedia.instagram}
            </Text>
          </HStack>

          <CardFooter>
            <ButtonGroup spacing="2">
              <Button
                onClick={handleCreatorEdit}
                variant="solid"
                colorScheme="blue"
                leftIcon={<MdEdit />}
              >
                Edit Creator
              </Button>
              <Button
                variant="ghost"
                colorScheme="blue"
                onClick={onOpen}
                leftIcon={<MdDelete />}
              >
                Delete Creator
              </Button>

              <AlertDialog
                isOpen={isOpen}
                onClose={onClose}
                leastDestructiveRef={cancelButtonRef}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent
                    border="2px"
                    borderColor="blue.200"
                    backgroundColor={"black"}
                  >
                    <AlertDialogHeader
                      fontSize="2xl"
                      fontWeight="thin"
                      color={"white"}
                    >
                      Delete Creator
                    </AlertDialogHeader>

                    <AlertDialogBody fontWeight="thin" color={"white"}>
                      Are you sure? You can't undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button ref={cancelButtonRef} onClick={onClose}>
                        Cancel
                      </Button>
                      <Button
                        colorScheme="red"
                        ml={3}
                        onClick={handleCreatorDeletion}
                      >
                        Delete
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </ButtonGroup>
          </CardFooter>
        </Stack>
      </Card>
    </Container>
  );
}
