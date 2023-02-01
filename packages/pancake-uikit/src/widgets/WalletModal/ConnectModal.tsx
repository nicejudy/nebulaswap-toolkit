import React, { useState } from "react";
import styled, { useTheme } from "styled-components";
import getExternalLinkProps from "../../util/getExternalLinkProps";
import Grid from "../../components/Box/Grid";
import Box from "../../components/Box/Box";
import getThemeValue from "../../util/getThemeValue";
import Text from "../../components/Text/Text";
import Heading from "../../components/Heading/Heading";
import { Button } from "../../components/Button";
import { ModalBody, ModalCloseButton, ModalContainer, ModalHeader, ModalTitle } from "../Modal";
import WalletCard, { MoreWalletCard } from "./WalletCard";
import config, { walletLocalStorageKey } from "./config";
import { Config, Login } from "./types";
import { Flex } from "../../components/Box";
import { Link } from "../../components/Link";

interface Props {
  login: Login;
  onDismiss?: () => void;
  displayCount?: number;
  t: (key: string) => string;
}

const WalletWrapper = styled(Box)`
  // border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
`;

/**
 * Checks local storage if we have saved the last wallet the user connected with
 * If we find something we put it at the top of the list
 *
 * @returns sorted config
 */
const getPreferredConfig = (walletConfig: Config[]) => {
  const preferredWalletName = localStorage.getItem(walletLocalStorageKey);
  const sortedConfig = walletConfig.sort((a: Config, b: Config) => a.priority - b.priority);

  if (!preferredWalletName) {
    return sortedConfig;
  }

  const preferredWallet = sortedConfig.find((sortedWalletConfig) => sortedWalletConfig.title === preferredWalletName);

  if (!preferredWallet) {
    return sortedConfig;
  }

  return [
    preferredWallet,
    ...sortedConfig.filter((sortedWalletConfig) => sortedWalletConfig.title !== preferredWalletName),
  ];
};

const ConnectModal: React.FC<Props> = ({ login, onDismiss = () => null, displayCount = 3, t }) => {
  const [showMore, setShowMore] = useState(false);
  const theme = useTheme();
  const sortedConfig = getPreferredConfig(config);
  // const displayListConfig = showMore ? sortedConfig : sortedConfig.slice(0, displayCount);
  const displayListConfig = sortedConfig;

  return (
    <ModalContainer minWidth="320px">
      {/* <ModalHeader background={getThemeValue("colors.gradients.bubblegum")(theme)}> */}
      <ModalHeader>
        <ModalTitle>
          <Heading>Connect Wallet</Heading>
        </ModalTitle>
        <ModalCloseButton onDismiss={onDismiss} />
      </ModalHeader>
      <ModalBody width={["100%", null, "100%"]}>
        <WalletWrapper px="5%" maxHeight="453px" overflowY="auto">
          {/* <Grid gridTemplateColumns="1fr 1fr"> */}
            {displayListConfig.map((wallet) => (
              <Box key={wallet.title}>
                <WalletCard walletConfig={wallet} login={login} onDismiss={onDismiss} />
              </Box>
            ))}
            {/* {!showMore && <MoreWalletCard t={t} onClick={() => setShowMore(true)} />} */}
          {/* </Grid> */}
        </WalletWrapper>
        <Flex pl="7%" mb="40px" mt="20px">
          <Text textAlign="center" color="textSubtle" as="p" fontSize="14px">
            New to Ethereum?&nbsp;
          </Text>
          <Link
            href="https://ethereum.org/wallets/"
            target="_blank"
            fontSize="14px"
          >
            Learn more about wallets
          </Link>
        </Flex>
      </ModalBody>
    </ModalContainer>
  );
};

export default ConnectModal;
