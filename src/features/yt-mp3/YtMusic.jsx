import { CheckIcon, DownloadIcon } from "@chakra-ui/icons";
import {
  Accordion,
  Alert,
  AlertIcon,
  Box,
  Button,
  Card,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  Spacer,
  Stack,
  TabPanels,
  Tab,
  TabList,
  Tabs,
  Text,
  TabPanel,
  Container,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getYtMusic } from "../../api/YtApi";
import youtubeParser from "../../helpers/regexYtUrl";

const YtMusic = () => {
  const [newUrl, setNewUrl] = useState("");
  const [downloadData, setDownloadData] = useState("");
  const [fail, setFail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const parsingUrl = youtubeParser(newUrl);

    const response = await getYtMusic(parsingUrl);

    if (response.status === 404) {
      setIsLoading(false);
      setDownloadData("");
      return setFail(404);
    } else if (response.status === 500) {
      setIsLoading(false);
      setDownloadData("");
      return setFail(500);
    } else {
      setFail(200);
      setDownloadData(response);
      return setIsLoading(false);
    }
  };

  useEffect(() => {
    // setDownloadData("");
    setFail(200);
  }, []);

  return (
    <Container
      maxW={"full"}
      h={"100vh"}
      bgGradient="linear(to-t, teal.300, teal.200, teal.100)"
      overflowY={"auto"}
    >
      <Stack
        height={"100%"}
        marginX="auto"
        borderRadius={"10px"}
        padding={"10px"}
        width={{ base: "26em", md: "40em", lg: "44em" }}
      >
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel
              htmlFor="new-todo"
              textAlign={"center"}
              color={"teal.600"}
            >
              <Text fontWeight={"extrabold"} fontSize={"24px"}>
                YT Downloader
              </Text>
              <Text fontWeight={"medium"} fontSize={"16px"}>
                <a
                  href="https://github.com/rulhuda"
                  target="_blank"
                  rel="no-referrer"
                >
                  by Nurul Huda
                </a>
              </Text>
            </FormLabel>
            <Center>
              <FormHelperText color="teal">Paste your url here</FormHelperText>
            </Center>
            <Input
              bgColor={"whiteAlpha.700"}
              type="text"
              id="new-todo"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              required
              placeholder="Paste your link here"
            />
            <Button width={"100%"} mt={2} colorScheme="teal" type="submit">
              <CheckIcon marginEnd={"5px"} />
              Submit
            </Button>
          </FormControl>
        </form>
        <Stack mt={"4px"}>
          {fail === 404 && (
            <Alert status="warning">
              <AlertIcon />
              Url not found!
            </Alert>
          )}
          {fail === 500 && (
            <Alert status="warning">
              <AlertIcon />
              Reach limit for API!
            </Alert>
          )}

          {isLoading && (
            <Center>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Center>
          )}
          {!isLoading && downloadData !== "" && fail === 200 && (
            <>
              <Tabs>
                <TabList overflowY={"hidden"} overflowX={"auto"}>
                  {downloadData?.link.map((item, index) => {
                    const { type, quality } = item;
                    const typeSplit = type.split(";");
                    const typeParse = typeSplit[0];
                    const newType = typeParse.split("/")[0];
                    return (
                      <Tab key={index}>
                        {newType.toUpperCase()}/{quality}
                      </Tab>
                    );
                  })}
                </TabList>
                <TabPanels borderRadius={"10px"}>
                  {downloadData?.link.map((item, index) => {
                    const { title, thumbnail } = downloadData;
                    const { url, size } = item;
                    return (
                      <TabPanel
                        height={{ base: "auto", md: "11em" }}
                        p={2}
                        bgColor={"teal.50"}
                        key={index}
                        borderBottomLeftRadius={"10px"}
                        borderBottomRightRadius={"10px"}
                      >
                        <Flex
                          p={0}
                          height={"100%"}
                          direction={{ base: "column", md: "row" }}
                        >
                          <Box
                            bgColor={"teal.50"}
                            height={{ base: "100%", md: "10em" }}
                          >
                            <Card>
                              <Image
                                src={thumbnail}
                                bgSize={"contain"}
                                height={{ base: "100%", md: "10em" }}
                                width={"100%"}
                              />
                            </Card>
                          </Box>
                          <Spacer />
                          <Box
                            mt={{ base: "0.2em", md: "0", lg: "0" }}
                            bgColor={"teal.50"}
                            py="0.5em"
                            height={"100%"}
                          >
                            <Flex direction={"column"}>
                              <Box px={"1.5em"}>
                                <Text
                                  textColor={"gray.700"}
                                  fontSize={"lg"}
                                  noOfLines={3}
                                >
                                  {title}
                                </Text>
                              </Box>
                              <Box px={"1.5em"}>
                                <Text textColor={"gray.500"} fontSize={"sm"}>
                                  Size: {size}
                                </Text>
                              </Box>
                            </Flex>
                          </Box>
                          <Spacer />

                          <Box
                            alignContent={"center"}
                            bgColor="teal.400"
                            px="1em"
                            height={"100%"}
                            borderBottomRightRadius={"10px"}
                            borderBottomLeftRadius={{ base: "10px", md: "0" }}
                          >
                            <a href={url} rel="noreferrer" target="_blank">
                              <Text
                                textAlign={"center"}
                                textColor={"white"}
                                py={"2em"}
                              >
                                <DownloadIcon /> Download
                              </Text>
                            </a>
                          </Box>
                        </Flex>
                      </TabPanel>
                    );
                  })}
                </TabPanels>
              </Tabs>
            </>
          )}
        </Stack>
      </Stack>
    </Container>
  );
};

export default YtMusic;
