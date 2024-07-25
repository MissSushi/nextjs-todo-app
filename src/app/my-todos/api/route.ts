import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(request: Request) {
  const id = await request.json();

  if (typeof id.id !== "number") {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  await prisma.todo.delete({
    where: {
      id: id.id,
    },
  });
  return NextResponse.json({ success: true }, { status: 200 });
}

export async function POST(request: Request) {
  const data = await request.json();

  if (data.action === "changeStatus") {
    if (typeof data.status !== "boolean") {
      return NextResponse.json({ success: false }, { status: 400 });
    }
    await prisma.todo.update({
      where: {
        id: data.id,
      },
      data: {
        status: data.status,
      },
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } else if (data.action === "editTodo") {
    if (typeof data.id !== "number" || typeof data.newTodo !== "string") {
      return NextResponse.json({ success: false }, { status: 400 });
    }
    await prisma.todo.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.newTodo,
      },
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } else {
    return NextResponse.json({ error: "unsupported action" }, { status: 400 });
  }
}
