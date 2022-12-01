import fs from "fs";
import { ethers, network } from "hardhat";
import { expect } from "chai";
import { BigNumber, ContractTransaction } from "ethers";
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

function mint(){}