import React from "react";
import styled from "styled-components";
import { PancakeRoundIcon } from "../Svg";
import Text from "../Text/Text";
import Skeleton from "../Skeleton/Skeleton";
import { Colors } from "../../theme";
import { Button } from "../Button";

export interface Props {
  color?: keyof Colors;
  cakePriceUsd?: number;
}

const PriceLink = styled.a`
  display: flex;
  align-items: center;
  svg {
    transition: transform 0.3s;
  }
  :hover {
    svg {
      transform: scale(1.2);
    }
  }
`;

const CakePrice: React.FC<Props> = ({ cakePriceUsd, color = "black" }) => {
  return <Button variant="primary" scale="md">{cakePriceUsd ? (
    <PriceLink
      href="/swap?outputCurrency=0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82"
    >
      <PancakeRoundIcon width="24px" mr="8px" />
      <Text color={color} bold>{`$${cakePriceUsd.toFixed(3)}`}</Text>
    </PriceLink>
  ) : (
    <Skeleton width={80} height={24} />
  )}</Button>
};

export default React.memo(CakePrice);
