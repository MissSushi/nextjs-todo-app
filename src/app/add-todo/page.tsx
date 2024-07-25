"use client";

import { useState } from "react";
import Button from "../components/Button";
import LinkButton from "../components/LinkButton";

const NewTodo = () => {
  const [error, setError] = useState<boolean>();

  return (
    <>
      <form
        className="h-full flex flex-col"
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);

          try {
            const response = await fetch(window.location.href + "/api", {
              method: "POST",
              body: formData,
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

        <label htmlFor="newTodo">Neues Todo</label>
        <textarea
          name="newTodo"
          id="newTodo"
          placeholder="Neues Todo eintragen"
          className="rounded text-xl text-neutral-800 border-neutral-300 bg-neutral-100/40 focus:ring-green-500 focus:border-green-500"
        ></textarea>

        <div className="flex justify-center mt-auto">
          <Button type="submit" className="mr-4">
            Speichern
          </Button>
          <LinkButton href="/my-todos">Abbrechen</LinkButton>
        </div>
      </form>
    </>
  );
};

export default NewTodo;
