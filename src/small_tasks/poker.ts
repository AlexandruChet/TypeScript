import * as readline from "node:readline";

function cl(name: unknown) {
  console.log(name);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "Enter 5 numbers from 1 to 13 separated by a space: ",
  (input: string) => {
    const numbers: number[] = input.trim().split(/\s+/).map(Number);

    const counts: Record<number, number> = {};
    for (const num of numbers) counts[num] = (counts[num] || 0) + 1;

    const occurrences = Object.values(counts);
    const sorted = [...numbers].sort((a, b) => a - b);
    const isStraight =
      sorted.length === 5 &&
      sorted.every((val, i) => i === 0 || val === sorted[i - 1] + 1);

    if (occurrences.includes(5)) cl("Impossible (5 of a kind)");
    else if (occurrences.includes(4)) cl("Four of a Kind!");
    else if (occurrences.includes(3) && occurrences.includes(2)) cl("Full House");
    else if (isStraight) cl("Straight");
    else if (occurrences.includes(3)) cl("Three of a Kind");
    else if (occurrences.filter((v) => v === 2).length === 2) cl("Two Pairs");
    else if (occurrences.includes(2)) cl("One Pair");
    else cl("High Card (Other)");

    cl(numbers);

    rl.close();
  },
);
