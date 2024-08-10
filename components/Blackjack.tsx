import React, { useState, useEffect } from "react";
import { createDeck } from "./Deck";
import { Card, Player } from "../types/types";
import PlayerComponent from "./Player";

const initialPlayerState = (isDealer = false): Player => ({
  name: isDealer ? "Dealer" : "Player",
  hand: [],
  score: 0,
  isDealer,
});

const Blackjack: React.FC = () => {
  const [deck, setDeck] = useState<Card[]>([]);
  const [player, setPlayer] = useState<Player>(initialPlayerState());
  const [dealer, setDealer] = useState<Player>(initialPlayerState(true));
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    setDeck(createDeck());
  }, []);

  useEffect(() => {
    if (player.hand.length === 2 && dealer.hand.length === 2) {
      if (calculateScore(player.hand) === 21) {
        setMessage("Blackjack! You win!");
        setGameOver(true);
      }
    }
  }, [player, dealer]);

  const dealInitialCards = () => {
    const newDeck = [...deck];
    const newPlayerHand = [newDeck.pop()!, newDeck.pop()!];
    const newDealerHand = [newDeck.pop()!, newDeck.pop()!];

    setPlayer({ ...player, hand: newPlayerHand });
    setDealer({ ...dealer, hand: newDealerHand });
    setDeck(newDeck);
  };

  const hit = () => {
    if (gameOver) return;

    const newDeck = [...deck];
    const newCard = newDeck.pop()!;
    const newHand = [...player.hand, newCard];
    const newScore = calculateScore(newHand);

    if (newScore > 21) {
      setMessage("Bust! You lose.");
      setGameOver(true);
    }

    setPlayer({ ...player, hand: newHand, score: newScore });
    setDeck(newDeck);
  };

  const stand = () => {
    if (gameOver) return;

    let dealerScore = calculateScore(dealer.hand);
    let newDeck = [...deck];
    let newDealerHand = [...dealer.hand];

    while (dealerScore < 17) {
      const newCard = newDeck.pop()!;
      newDealerHand.push(newCard);
      dealerScore = calculateScore(newDealerHand);
    }

    setDealer({ ...dealer, hand: newDealerHand, score: dealerScore });
    setDeck(newDeck);

    if (dealerScore > 21 || player.score > dealerScore) {
      setMessage("You win!");
    } else if (player.score < dealerScore) {
      setMessage("You lose.");
    } else {
      setMessage("It's a tie.");
    }

    setGameOver(true);
  };

  const calculateScore = (hand: Card[]): number => {
    let score = hand.reduce((acc, card) => acc + card.numericalValue, 0);
    let aces = hand.filter((card) => card.value === "A").length;

    while (score > 21 && aces > 0) {
      score -= 10;
      aces--;
    }

    return score;
  };

  const resetGame = () => {
    setPlayer(initialPlayerState());
    setDealer(initialPlayerState(true));
    setDeck(createDeck());
    setGameOver(false);
    setMessage("");
  };

  return (
    <div>
      <h1>Blackjack</h1>
      <button onClick={dealInitialCards}>Start Game</button>
      <PlayerComponent player={player} />
      <PlayerComponent player={dealer} hideFirstCard={!gameOver} />
      <p>{message}</p>
      <button onClick={hit} disabled={gameOver}>
        Hit
      </button>
      <button onClick={stand} disabled={gameOver}>
        Stand
      </button>
      <button onClick={resetGame}>Reset</button>
    </div>
  );
};

export default Blackjack;
