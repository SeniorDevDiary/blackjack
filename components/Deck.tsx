import React from "react";
import { Card } from "../types/types";

const suits = ["hearts", "diamonds", "clubs", "spades"] as const;
const values = [
  { value: "2", numericalValue: 2 },
  { value: "3", numericalValue: 3 },
  { value: "4", numericalValue: 4 },
  { value: "5", numericalValue: 5 },
  { value: "6", numericalValue: 6 },
  { value: "7", numericalValue: 7 },
  { value: "8", numericalValue: 8 },
  { value: "9", numericalValue: 9 },
  { value: "10", numericalValue: 10 },
  { value: "J", numericalValue: 10 },
  { value: "Q", numericalValue: 10 },
  { value: "K", numericalValue: 10 },
  { value: "A", numericalValue: 11 }, // Handle Ace as either 1 or 11 later
];

export const createDeck = (): Card[] => {
  const deck: Card[] = [];

  suits.forEach((suit) => {
    values.forEach(({ value, numericalValue }) => {
      deck.push({ suit, value, numericalValue });
    });
  });

  return deck.sort(() => Math.random() - 0.5); // Shuffle the deck
};
