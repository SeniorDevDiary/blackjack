import React from "react";
import { Card } from "../types/types";
import styled from "styled-components";

type CardProps = {
  card: Card;
  hidden?: boolean;
};

const CardComponent: React.FC<CardProps> = ({ card, hidden = false }) => {
  return (
    <StyledCard hidden={hidden}>
      {hidden ? "Hidden" : `${card.value} of ${card.suit}`}
    </StyledCard>
  );
};

const StyledCard = styled.div<{ hidden: boolean }>`
  width: 100px;
  height: 150px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ hidden }) => (hidden ? "gray" : "white")};
`;

export default CardComponent;
