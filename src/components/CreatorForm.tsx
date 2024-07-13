import {
  Input,
  Box,
  VStack,
  Text,
  Textarea,
  HStack,
  Button,
  Image,
  Divider,
  InputLeftAddon,
  InputGroup,
} from "@chakra-ui/react";
import { useReducer } from "react";
import { SiInstagram, SiTwitter, SiYoutube } from "react-icons/si";
import { HiAtSymbol } from "react-icons/hi";
import { supabase } from "../client";
import { useNavigate } from "react-router-dom";

const ACTION_TYPES = {
  UPDATE_NAME: "update_name",
  UPDATE_IMAGE_URL: "update_imgURL",
  UPDATE_DESCRIPTION: "update_description",
  UPDATE_YOUTUBE: "update_youtube",
  UPDATE_TWITTER: "update_twitter",
  UPDATE_INSTAGRAM: "update_instagram",
  CLEAR_FIELDS: "clear_fields",
};

function reducer(
  state: {
    name: string;
    imgURL: string;
    description: string;
    socialMedia: { youtube: string; twitter: string; instagram: string };
  },
  action: { type: string; payload: string }
) {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_NAME: {
      return {
        ...state,
        name: action.payload,
      };
    }
    case ACTION_TYPES.UPDATE_IMAGE_URL: {
      return {
        ...state,
        imgURL: action.payload,
      };
    }
    case ACTION_TYPES.UPDATE_DESCRIPTION: {
      return {
        ...state,
        description: action.payload,
      };
    }
    case ACTION_TYPES.UPDATE_YOUTUBE: {
      return {
        ...state,
        socialMedia: {
          ...state.socialMedia,
          youtube: action.payload,
        },
      };
    }
    case ACTION_TYPES.UPDATE_TWITTER: {
      return {
        ...state,
        socialMedia: {
          ...state.socialMedia,
          twitter: action.payload,
        },
      };
    }
    case ACTION_TYPES.UPDATE_INSTAGRAM: {
      return {
        ...state,
        socialMedia: {
          ...state.socialMedia,
          instagram: action.payload,
        },
      };
    }
    case ACTION_TYPES.CLEAR_FIELDS: {
      return {
        ...state,
        name: "",
        imgURL: "",
        description: "",
        socialMedia: { youtube: "", twitter: "", instagram: "" },
      };
    }
  }

  throw Error("Unknown action.");
}

interface CreatorFormProps {
  id: number;
  edit: boolean;
  name: string;
  imgURL: string;
  description: string;
  socialMedia: { youtube: string; twitter: string; instagram: string };
}

export default function CreatorForm(props: CreatorFormProps) {
  const navigate = useNavigate();
  const initialFormState = (({ edit, id, ...creatorForm }) => creatorForm)(
    props
  );
  const [state, dispatch] = useReducer(reducer, initialFormState);

  const AllFieldsEmpty = () => {
    const creatorInfoIsEmpty = [
      state.name,
      state.imgURL,
      state.description,
    ].every((x) => x === null || x === "");
    const socialMediaIsEmpty = [...Object.values(state.socialMedia)].every(
      (x) => x === null || x === ""
    );
    return creatorInfoIsEmpty && socialMediaIsEmpty;
  };

  const handleFormSubmit = async () => {
    if (!AllFieldsEmpty()) {
      try {
        if (props.edit && props.id) {
          const { data, error } = await supabase
            .from("creators")
            .update({
              name: state.name,
              url: state.imgURL,
              description: state.description,
              socialMedia: [...Object.values(state.socialMedia)].toString(),
            })
            .eq("id", props.id);
          console.log(data, error);
        } else {
          await supabase.from("creators").insert([
            {
              name: state.name,
              url: state.imgURL,
              description: state.description,
              socialMedia: [...Object.values(state.socialMedia)].toString(),
            },
          ]);
        }
      } catch (error) {
        console.error("failure to create creator", error);
      }
    } else {
      console.log("[o] Failed To Fill Out All Fields ");
    }
    navigate("/");
  };

  const handleDeleteCreator = () => {
    dispatch({
      type: ACTION_TYPES.CLEAR_FIELDS,
      payload: "",
    });
  };

  return (
    <>
      <Box maxW="full" backgroundColor={"black"} py={6}>
        <VStack maxW={"100%"}>
          <Image
            borderRadius="full"
            src={state.imgURL || "/emptyUser.webp"}
            alt="Image Not Found"
          />

          <Divider maxWidth={"50%"} pb={8} />
          <Text fontSize="5xl" color={"gray.300"}>
            Name
          </Text>
          <Input
            placeholder="Please enter your name"
            size="lg"
            type="name"
            textColor={"white"}
            bgColor={"blue.800"}
            maxW={"25%"}
            value={state.name}
            onChange={(event) =>
              dispatch({
                type: ACTION_TYPES.UPDATE_NAME,
                payload: event.target.value,
              })
            }
          />

          <Text fontSize="5xl" color={"gray.300"} pt={"8"}>
            Image URL
          </Text>
          <Input
            placeholder="Please enter a valid Image URL"
            type="imgURL"
            textColor={"white"}
            bgColor={"blue.800"}
            maxW={"50%"}
            size="lg"
            value={state.imgURL}
            onChange={(event) =>
              dispatch({
                type: ACTION_TYPES.UPDATE_IMAGE_URL,
                payload: event.target.value,
              })
            }
          />

          <Text fontSize="5xl" color={"gray.300"} pt={"8"}>
            Description
          </Text>
          <Textarea
            placeholder="Please type a thoughtful description this creator"
            textColor={"white"}
            bgColor={"blue.800"}
            maxW={"50%"}
            maxH={"150%"}
            whiteSpace="pre-line"
            size="lg"
            value={state.description}
            onChange={(event) =>
              dispatch({
                type: ACTION_TYPES.UPDATE_DESCRIPTION,
                payload: event.target.value,
              })
            }
          />

          <Text fontSize="5xl" color={"blue.200"} pt={"10"}>
            Social Media Links
          </Text>
          <Divider maxW={"40%"} />

          <HStack pt={8}>
            <SiYoutube size={30} color="white" />
            <Text fontSize="3xl" color={"white"}>
              Youtube
            </Text>
          </HStack>

          <HStack>
            <InputGroup>
              <InputLeftAddon>
                <HiAtSymbol />
              </InputLeftAddon>
              <Input
                placeholder="JohnDoe"
                type="YoutubeProfile"
                textColor={"white"}
                bgColor={"blue.800"}
                maxW={"100%"}
                value={state.socialMedia.youtube}
                onChange={(event) =>
                  dispatch({
                    type: ACTION_TYPES.UPDATE_YOUTUBE,
                    payload: event.target.value,
                  })
                }
              />
            </InputGroup>
          </HStack>

          <HStack pt={8}>
            <SiTwitter size={30} color="white" />
            <Text fontSize="3xl" color={"white"}>
              Twitter
            </Text>
          </HStack>

          <HStack>
            <InputGroup>
              <InputLeftAddon>
                <HiAtSymbol />
              </InputLeftAddon>
              <Input
                placeholder="JohnDoe"
                type="TwitterProfile"
                textColor={"white"}
                bgColor={"blue.800"}
                maxW={"100%"}
                value={state.socialMedia.twitter}
                onChange={(event) =>
                  dispatch({
                    type: ACTION_TYPES.UPDATE_TWITTER,
                    payload: event.target.value,
                  })
                }
              />
            </InputGroup>
          </HStack>

          <HStack pt={8}>
            <SiInstagram size={30} color="white" />
            <Text fontSize="3xl" color={"white"}>
              Instagram
            </Text>
          </HStack>

          <HStack>
            <InputGroup>
              <InputLeftAddon>
                <HiAtSymbol />
              </InputLeftAddon>
              <Input
                placeholder="JohnDoe"
                type="InstagramProfile"
                textColor={"white"}
                bgColor={"blue.800"}
                maxW={"100%"}
                value={state.socialMedia.instagram}
                onChange={(event) =>
                  dispatch({
                    type: ACTION_TYPES.UPDATE_INSTAGRAM,
                    payload: event.target.value,
                  })
                }
              />
            </InputGroup>
          </HStack>

          <HStack spacing="24px" py={8}>
            <Button
              size="md"
              fontWeight={"thin"}
              border="2px"
              borderColor="blue.300"
              backgroundColor={"black"}
              textColor={"white"}
              _hover={{
                backgroundColor: "blue.700",
              }}
              onClick={handleFormSubmit}
            >
              {props.edit ? "Update" : "Submit"}
            </Button>
            <Button
              size="md"
              fontWeight={"thin"}
              border="2px"
              borderColor="blue.300"
              backgroundColor={"black"}
              textColor={"white"}
              _hover={{
                backgroundColor: "blue.700",
              }}
              onClick={handleDeleteCreator}
            >
              Clear
            </Button>
          </HStack>
        </VStack>
      </Box>
    </>
  );
}
