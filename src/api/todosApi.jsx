import axios from "axios";

const delay = () => new Promise((res) => setTimeout(() => res(), 800));

const todosApi = axios.create({
  baseURL: "http://localhost:3500",
});

export const todosEndpoint = "/todos";

export async function getTodos() {
  // await delay();
  const response = await todosApi.get(todosEndpoint);

  return response.data.sort((a, b) => b.id - a.id);
}

export async function addTodo({ userId, title, completed, createdAt }) {
  try {
    await delay();
    const response = await todosApi.post(todosEndpoint, {
      userId,
      title,
      completed,
      createdAt,
    });

    return response.data;
  } catch (error) {
    return error;
  }
}

export async function updateTodo(todo) {
  // await delay();
  const { id } = todo;
  const response = await todosApi.patch(`${todosEndpoint}/${id}`, todo);
  console.log(response);
  return response.data;
}

export async function deleteTodo({ id }) {
  // await delay();
  return await todosApi.delete(`${todosEndpoint}/${id}`, id);
}
