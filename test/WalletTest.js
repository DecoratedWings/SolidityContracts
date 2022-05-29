const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Wallet", function () {
    let walletContract;

    beforeEach(async () => {
        const contract = await ethers.getContractFactory('Wallet');
        walletContract = await contract.deploy();
        await walletContract.deployed();
    })
    
    it("Should only allow approvers to approve", async function () {
  
    });

    it("Should only allow approvers to create", async function () {
  
    });

    it("Check that transfer is not sent", async function () {
  
    });

    it("Should only allow approval once", async function () {
  
    });

    it("Test valid approval", async function () {
  
    });

    it("Test quorum is reached and transfer occurs", async function () {
  
    });
  });