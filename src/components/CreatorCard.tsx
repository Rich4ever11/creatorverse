import {
  Card,
  CardBody,
  Stack,
  Heading,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Image,
  Text,
  Container,
  IconButton,
  Flex,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { SiYoutube, SiTwitter, SiInstagram } from "react-icons/si";
import { MdEdit, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { supabase } from "../client";
import { FaInfo } from "react-icons/fa";
import { LegacyRef, useRef } from "react";

interface CreatorCardData {
  id: number;
  description: string;
  name: string;
  url: string;
  socialMedia: string;
}

export default function CreatorCard(props: CreatorCardData) {
  const navigate = useNavigate();

  const { id, description, name, url, socialMedia } = props;
  const parsedSocialMediaList = socialMedia.split(",");
  const socialMediaObject = {
    youtube: parsedSocialMediaList[0],
    twitter: parsedSocialMediaList[1],
    instagram: parsedSocialMediaList[2],
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  const handleViewCreator = () => {
    navigate("/view-creator", {
      state: {
        id,
        name,
        imgURL: url,
        description,
        socialMedia: {
          youtube: socialMediaObject.youtube,
          twitter: socialMediaObject.twitter,
          instagram: socialMediaObject.instagram,
        },
      },
    });
  };

  const handleCreatorEdit = () => {
    navigate("/edit-creator", {
      state: {
        id,
        edit: true,
        name,
        imgURL: url,
        description,
        socialMedia: {
          youtube: socialMediaObject.youtube,
          twitter: socialMediaObject.twitter,
          instagram: socialMediaObject.instagram,
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
    onClose();
  };

  return (
    <Card
      maxW="sm"
      border="2px"
      borderColor="blue.200"
      backgroundColor={"black"}
    >
      <CardBody>
        <Image
          src={
            url ||
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          }
          alt="user profile image"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Container px={0}>
            <Flex color="white">
              <IconButton
                borderRadius="full"
                variant="solid"
                mx={1}
                aria-label={"View Creator"}
                onClick={handleViewCreator}
              >
                <FaInfo color="black" />
              </IconButton>
              <IconButton
                isRound={true}
                colorScheme="red"
                aria-label="Search database"
                mx={1}
                onClick={() =>
                  window.open(
                    `https://www.youtube.com/channel/${socialMediaObject.youtube}`,
                    "_blank"
                  )
                }
                icon={<SiYoutube />}
              />
              <IconButton
                isRound={true}
                colorScheme="blue"
                aria-label="Search database"
                mx={1}
                onClick={() =>
                  window.open(
                    `https://x.com/@${socialMediaObject.twitter}`,
                    "_blank"
                  )
                }
                icon={<SiTwitter />}
              />
              <IconButton
                isRound={true}
                bgGradient="linear(to-l,#f9ce34, #ee2a7b, #6228d7)"
                aria-label="Search database"
                mx={1}
                onClick={() =>
                  window.open(
                    `https://instagram.com/${socialMediaObject.twitter}`,
                    "_blank"
                  )
                }
                icon={<SiInstagram color="white" />}
              />
            </Flex>
          </Container>
          <Heading size="lg" color={"blue.200"} fontWeight={"thin"}>
            {name}
          </Heading>
          <Text color={"white"}>{description}</Text>
        </Stack>
      </CardBody>
      <Divider />
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
    </Card>
  );
}
