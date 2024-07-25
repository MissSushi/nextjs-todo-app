import TodoItem from "../components/TodoItem";
import LinkButton from "../components/LinkButton";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const MyTodos = async () => {
  const todosArray = await prisma.todo.findMany();

  return (
    <div className="flex flex-col h-full">
      <ul className="">
        {todosArray.map((item) => {
          return (
            <li key={item.id} className="border-b mx-4 pb-2">
              <TodoItem id={item.id} defaultStatus={item.status}>
                {item.name}
              </TodoItem>
            </li>
          );
        })}
      </ul>
      <div className="sticky bottom-4 mx-auto">
        <LinkButton
          href="/add-todo"
          className="dark:bg-slate-100/10 bg-green-500 text-white hover:bg-green-400 inline-block font-medium text-xl mt-4"
        >
          Neues Todo
        </LinkButton>
      </div>
    </div>
  );
};

export default MyTodos;
