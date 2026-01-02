function add(a: number, b: number): number {
  return a + b;
};

const greet = (name: string): void => {
  console.log(`Hello ${name}`);
};

function multiply(a: number, b?: number) {
  return a * (b || 1);
};

function sum(...nums: number[]) {
  return nums.reduce((acc, n) => acc + n, 0);
};
