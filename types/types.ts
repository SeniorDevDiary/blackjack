export type Card = {
  suit: "hearts" | "diamonds" | "clubs" | "spades";
  value: string;
  numericalValue: number;
};

export type Player = {
  name: string;
  hand: Card[];
  score: number;
  isDealer: boolean;
};
