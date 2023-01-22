export async function addTodoOptions(newTodo) {
  return {
    optimisticData: (todos) => [...todos, newTodo].sort((a, b) => b.id - a.id),
    rollbackOnError: true,
    populateCache: true,
    revalidate: false,
  };
}
