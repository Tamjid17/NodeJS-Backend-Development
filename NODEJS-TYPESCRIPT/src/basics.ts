console.log("Hello Node js from typescript");

// basic types

let isDone: Boolean = false;

let num: number = 100;

let str: string = "Rex";

let list: number[] = [1, 2, 3];

let fruits: string[] = ["apple", "banana", "grape"];
//|
let flowers: Array<string> = ["lily", "rose", "sunflower"];

let randomValue: any = 1;

randomValue = "abcd";
randomValue = false;

let xyz: undefined = undefined;

let pqr: null = null;

enum Color {
    Red,
    Green,
    Blue,
}

let d: Color = Color.Green;

// special type

let abc: [string, number] = ["Hello", 2025];

//interface, types

interface User {
    name: String;
    id: number;
    email?: string; // question mark indicates that the field is optional
    readonly createdAt: Date;
}

const user: User = {
  name: "Bob",
  id: 1,
  createdAt: new Date(),
  email: "abc@gmail.com",
};

type Product = {
  title: string;
  price: number;
};

const product1: Product = {
  title: "Product 1",
  price: 200,
};

// function with type annotations

function add(a: number, b: number): number {
  return a + b;
}

const multiply = (a: number, b: number): number => {
  return a * b;
};

function greet(name: string, greeting?: string): string {
  return `${name} ${greeting}`;
}
