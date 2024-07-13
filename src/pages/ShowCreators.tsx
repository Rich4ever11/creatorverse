import { Center, Container, Divider, Wrap, WrapItem } from "@chakra-ui/react";
import CreatorCard from "../components/CreatorCard";
import { useEffect, useState } from "react";
import { supabase } from "../client";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

interface creatorsData {
  id: number;
  description: string;
  name: string;
  socialMedia: string;
  url: string;
}

export default function ShowCreators() {
  const [creatorList, setCreatorList] = useState<creatorsData[]>([]);

  useEffect(() => {
    const getAllContentCreators = async () => {
      let allCreators: PostgrestSingleResponse<creatorsData[]> = await supabase
        .from("creators")
        .select("*");
      setCreatorList(allCreators.data || []);
    };
    getAllContentCreators();
  });

  return (
    <Container maxW="full" alignContent={"center"} backgroundColor={"black"}>
      <Divider color={"blue"} backgroundColor={"blue"} />
      <Center backgroundColor="black">
        <Wrap spacing="30px" justify="center" m={8}>
          {creatorList.map((creator: creatorsData, index: number) => (
            <WrapItem>
              <Center bg="black">
                <CreatorCard
                  key={index}
                  id={creator.id}
                  description={creator.description}
                  name={creator.name}
                  url={creator.url}
                  socialMedia={creator.socialMedia}
                />
              </Center>
            </WrapItem>
          ))}
        </Wrap>
      </Center>
    </Container>
  );
}
