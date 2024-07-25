"use client";
import { useState } from "react";
import Button from "./Button";
import LinkButton from "./LinkButton";

type TodoItemProps = {
  children: React.ReactNode;
  defaultStatus: boolean;
  id: number;
};

const TodoItem = ({ children, defaultStatus, id }: TodoItemProps) => {
  const [error, setError] = useState(false);
  const [editing, setEditing] = useState(false);
  return (
    <div className="flex items-baseline">
      <label htmlFor="checkbox" className="sr-only">
        Status
      </label>

      {editing ? null : (
        <>
          <input
            className="mr-2 rounded size-4 border-neutral-300 text-green-500 peer focus:ring-green-500"
            type="checkbox"
            name="checkbox"
            id="checkbox"
            defaultChecked={defaultStatus}
            onChange={async (e) => {
              try {
                const response = await fetch(window.location.href + "/api", {
                  method: "POST",
                  body: JSON.stringify({
                    id,
                    status: e.target.checked,
                    action: "changeStatus",
                  }),
                });
                if (!response.ok) {
                  throw new Error("Status 400 / 500");
                }
              } catch (error) {
                setError(true);
              }
            }}
          />
          {error && (
            <div className="text-red-900 p-2 bg-red-400 rounded">
              Etwas ist schiefgelaufen.
            </div>
          )}
        </>
      )}

      {editing ? (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const newTodo = formData.get("editTodo");

            try {
              const response = await fetch(window.location.href + "/api", {
                method: "POST",
                body: JSON.stringify({ id, newTodo, action: "editTodo" }),
              });

              if (!response.ok) {
                throw new Error("Status 400 / 500");
              }
              window.location.reload();
            } catch (error) {
              setError(true);
            }
          }}
        >
          <div className="flex flex-col">
            <label htmlFor="editTodo">Todo bearbeiten</label>
            <input
              type="text"
              id="editTodo"
              name="editTodo"
              className="rounded text-black"
            />
            <Button className="my-4" type="submit">
              Speichern
            </Button>
            <LinkButton
              className="text-center"
              onClick={() => {
                setEditing(false);
              }}
            >
              Abbrechen
            </LinkButton>
          </div>
        </form>
      ) : (
        <span className="text-xl peer-checked:line-through peer-checked:text-neutral-500/20 text-neutral-800 decoration-red-600 my-4">
          {children}
        </span>
      )}

      {!editing ? (
        <div className="ml-auto">
          <button
            type="button"
            className="mr-4"
            onClick={async () => {
              setEditing(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-neutral-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
            <span className="sr-only">Bearbeiten</span>
          </button>
          <button
            type="button"
            onClick={async () => {
              try {
                const response = await fetch(window.location.href + "/api", {
                  method: "delete",
                  body: JSON.stringify({ id }),
                });

                if (!response.ok) {
                  throw new Error("Status 400 / 500");
                }
                window.location.href = "/my-todos";
              } catch (error) {
                setError(true);
              }
            }}
          >
            {error && (
              <div className="text-red-900 p-2 bg-red-400 rounded">
                Etwas ist schiefgelaufen.
              </div>
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-red-700 ml-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
            <span className="sr-only">Löschen</span>
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default TodoItem;
