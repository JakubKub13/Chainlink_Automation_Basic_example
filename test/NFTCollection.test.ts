import fs from "fs";
import { ethers, network } from "hardhat";
import { expect } from "chai";
import { BigNumber, Contract, ContractTransaction } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { NFTCollection, VRFCoordinatorV2Mock } from "../typechain-types";

const { parseEther } = ethers.utils;
const { AddressZero, HashZero } = ethers.constants;

const NFT_NAME: string = "Carbon NFT";
const NFT_SYMBOL: string = "cNFT";
const NFT_MAX_SUPPLY: string = "1000";
const NFT_MINT_COST: string = "0.1";
const NFT_REVEAL_BATCH_SIZE: string = "5";
const NFT_REVEAL_INTERVAL: string = "3600";

function mint(
    nftCollection: NFTCollection,
    amount: BigNumber
  ): Promise<ContractTransaction> {
    return nftCollection.mint(amount, {
      value: parseEther(NFT_MINT_COST).mul(amount),
    });
  }

async function revealBatch(
    nftCollection: NFTCollection,
    vrfCoordinatorV2Mock: VRFCoordinatorV2Mock
): Promise<ContractTransaction> {
    const revealTx = await nftCollection.revealPendingMetadata();
    const { events } = await revealTx.wait();
    const requestEvent = events?.find((e) => e.event == "BatchRevealRequested");
    const requestId = requestEvent?.args?.requestId;

    return vrfCoordinatorV2Mock.fulfillRandomWords(
        requestId,
        nftCollection.address
    );
}

describe("NFTCollection", async function () {
    let nftCollection: NFTCollection;
    let vrfCoordinatorV2Mock: VRFCoordinatorV2Mock;
    let owner: SignerWithAddress;
    let user: SignerWithAddress;
})