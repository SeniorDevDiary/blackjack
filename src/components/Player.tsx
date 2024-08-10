import React from "react";
import { Player } from "../types/types";
import CardComponent from "./Card";

type PlayerProps = {
  player: Player;
  hideFirstCard?: boolean;
};

const PlayerComponent: React.FC<PlayerProps> = ({
  player,
  hideFirstCard = false,
}) => {
  return (
    <div>
      <h2>{player.name}</h2>
      <div>
        {player.hand.map((card, index) => (
          <CardComponent
            key={index}
            card={card}
            hidden={hideFirstCard && index === 0}
          />
        ))}
      </div>
      <p>Score: {hideFirstCard ? "?" : player.score}</p>
    </div>
  );
};

export default PlayerComponent;
