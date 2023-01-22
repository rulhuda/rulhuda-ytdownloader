import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Skeleton,
  Spacer,
  Stack,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  addTodo,
  deleteTodo,
  getTodos,
  updateTodo,
  todosEndpoint as cacheKey,
} from "../../api/todosApi";
import { addTodoOptions } from "../../helpers/todosMutation";
import useSWR from "swr";
import { showFormattedDate } from "../../helpers/showFormattedDate";

const TodoList = () => {
  const toast = useToast();
  const [newTodo, setNewTodo] = useState("");

  const { isLoading, error, data: todos, mutate } = useSWR(cacheKey, getTodos);

  const addTodoMutation = async (newTodo) => {
    try {
      await mutate(addTodo(newTodo), addTodoOptions(newTodo));

      toast({
        position: "top",
        title: `Success add new todo`,
        status: "success",
        variant: "left-accent",
        isClosable: true,
        colorScheme: "teal",
        duration: 1000,
      });
    } catch (error) {
      toast({
        position: "top",
        title: `Failed add new todo`,
        status: "error",
        variant: "left-accent",
        isClosable: true,
        colorScheme: "red",
        duration: 1500,
      });
      return new Error(error);
    }
  };

  const updateTodoMutation = async (updatedTodo) => {
    try {
      const { id } = updatedTodo;
      const response = await updateTodo(updatedTodo, id);
      mutate();
      toast({
        position: "top",
        title: "Success! to update the item!",
        status: "success",
        variant: "left-accent",
        icon: "✔",
        duration: 1500,
        isClosable: true,
      });
      return response;
    } catch (error) {
      toast({
        position: "top",
        title: "Failed to update the item!",
        status: "error",
        variant: "left-accent",
        icon: "❌",
        duration: 1500,
        isClosable: true,
      });
    }
  };

  const deleteTodoMutation = async ({ id }) => {
    try {
      const response = await deleteTodo({ id });
      console.log(response);
      mutate();
      toast({
        position: "top",
        title: "Success! to delete the item!",
        status: "success",
        variant: "left-accent",
        icon: "✔",
        duration: 1500,
        isClosable: true,
      });
      return response;
    } catch (error) {
      toast({
        position: "top",
        title: "Failed to delete the item!",
        status: "error",
        variant: "left-accent",
        icon: "❌",
        duration: 1500,
        isClosable: true,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const createdAt = new Date().toISOString();

    await addTodoMutation({
      userId: 1,
      title: newTodo,
      completed: false,
      createdAt: createdAt,
    });

    setNewTodo("");
  };

  const formTodo = (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel htmlFor="new-todo" textAlign={"center"} color={"teal.600"}>
          Enter new todo item
        </FormLabel>
        <Input
          type="text"
          id="new-todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          required
        />
        <FormHelperText color="teal">Enter a new todo</FormHelperText>
        <Button width={"100%"} mt={2} colorScheme="teal" type="submit">
          <CheckIcon marginEnd={"5px"} />
          Submit
        </Button>
      </FormControl>
    </form>
  );

  return (
    <Stack
      height={"88vh"}
      border={"2px"}
      borderColor={"gray.500"}
      borderRadius={"10px"}
      padding={"10px"}
      alignSelf={"center"}
      width={{ base: "20em", md: "28em", lg: "34em" }}
    >
      <Heading
        borderBottom={"2px"}
        borderColor={"teal.400"}
        color={"teal"}
        paddingBottom={"0.8em"}
        my={2}
        as={"h1"}
        size="xl"
        noOfLines={1}
      >
        Todo List App
      </Heading>
      <Stack>{formTodo}</Stack>
      <Stack overflowY={"auto"} width="full" mt={2} direction={"column"}>
        {isLoading &&
          [...Array(5).keys()].map((i) => {
            return (
              <Skeleton key={i}>
                <Flex
                  width="100%"
                  align="center"
                  border={"2px"}
                  borderColor={"gray.300"}
                  borderRadius={"8px"}
                  paddingX={"4px"}
                  alignContent="center"
                  alignItems="center"
                  gap="2"
                  key={i}
                >
                  <Box>
                    <Checkbox size={"lg"} colorScheme="teal" />
                  </Box>
                  <Flex
                    width={"100%"}
                    paddingX={"2"}
                    borderRadius={"8"}
                    bgClip={"unset"}
                    bgColor={"gray.100"}
                    direction="column"
                    alignItems="flex-start"
                  >
                    <Box noOfLines={1} fontSize="lg">
                      <Text>title</Text>
                    </Box>
                    <Box fontSize="md">createdAt</Box>
                  </Flex>
                  <Spacer />
                  <ButtonGroup>
                    <Button variant={"outline"} colorScheme={"red"}>
                      <DeleteIcon />
                    </Button>
                  </ButtonGroup>
                </Flex>
              </Skeleton>
            );
          })}

        {error && `${error.message}`}

        {!isLoading &&
          todos.length > 0 &&
          todos?.map((todo) => {
            const { id, title, completed, createdAt } = todo;
            return (
              <Flex
                width="100%"
                align="center"
                border={"2px"}
                borderColor={"gray.300"}
                borderRadius={"8px"}
                paddingX={"4px"}
                alignContent="center"
                alignItems="center"
                gap="2"
                key={id}
              >
                <Box>
                  <Checkbox
                    size={"lg"}
                    defaultChecked={completed ? true : false}
                    onChange={() =>
                      updateTodoMutation({
                        ...todo,
                        completed: !completed,
                      })
                    }
                    colorScheme="teal"
                  />
                </Box>
                <Flex
                  width={"100%"}
                  paddingX={"2"}
                  borderRadius={"8"}
                  bgClip={"unset"}
                  bgColor={"gray.100"}
                  direction="column"
                  alignItems="flex-start"
                >
                  <Box noOfLines={1} fontSize="lg">
                    <Text textColor={"teal.700"}>{title}</Text>
                  </Box>
                  <Box fontSize="md">
                    <Text textColor={"teal.500"}>
                      {showFormattedDate(createdAt)}
                    </Text>
                  </Box>
                </Flex>
                <Spacer />
                <ButtonGroup>
                  <Button
                    variant={"outline"}
                    colorScheme={"red"}
                    onClick={() => deleteTodoMutation(todo)}
                  >
                    <DeleteIcon />
                  </Button>
                </ButtonGroup>
              </Flex>
            );
          })}

        {todos?.length === 0 && (
          <Alert status="warning">
            <AlertIcon />
            Todos is empty
          </Alert>
        )}
      </Stack>
    </Stack>
  );
};

export default TodoList;
