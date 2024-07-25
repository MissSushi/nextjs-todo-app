import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const formData = await request.formData();
  const newTodo = formData.get("newTodo");

  if (typeof newTodo !== "string") {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  await prisma.todo.create({
    data: {
      name: newTodo,
      status: false,
    },
  });
  return NextResponse.json({ success: true }, { status: 200 });
}
