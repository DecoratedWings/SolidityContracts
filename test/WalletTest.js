const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require('@openzeppelin/test-helpers');


describe("Wallet", function () {
    const quorum = 2; //need 2 approvals to reach quorum
    const transferId = 0;
    const transferValue = ethers.utils.parseEther('1');

    let walletContract;
    let approvers = [];
    let notApprovedSigner;
    let faucet;
    let to;


    beforeEach(async () => {
        const signers = await ethers.getSigners();
        approvers.push(signers[0]); //address connected to deployed wallet
        approvers.push(signers[1]);
        approvers.push(signers[2]);
        to = signers[3]; //to in createTransfer function
        notApprovedSigner = signers[4];
        faucet = signers[5];

        const contract = await ethers.getContractFactory('Wallet');
        //Passing arguments into contructor
        walletContract = await contract.deploy(
            approvers.map((x) => x.address),
            quorum
        );
        await walletContract.deployed();


    })
    
    it("Should only allow approvers to approve", async function () {
        const tx = walletContract
        .connect(notApprovedSigner)
        .approveTransfer(transferId);
      await expect(tx).to.revertedWith('only approver allowed');
    });

    it("Should only allow approvers to create", async function () {
        const tx = walletContract
        .connect(notApprovedSigner)
        .createTransfer(transferValue, to.address);
      await expect(tx).to.revertedWith('only approver allowed');
    });

    it("Check that transfer is not sent", async function () {
        
    });

    it("Should only allow approval once", async function () {
  
    });

    it("Test valid approval", async function () {
  
    });

    it("Test quorum is reached and transfer occurs", async function () {
        const tx0 = await walletContract.createTransfer(transferValue, to.address);
        await tx0.wait();

        const initalBal = await ethers.provider.getBalance(to.address);
        const expectedBal = initalBal.add(transferValue);
        //Put money into the wallet from faucet address, so that it has money
        const transferEth = await faucet.sendTransaction({
            to: walletContract.address,
            value: transferValue
        });
        await transferEth.wait();

        //Quorum ///////////////

        //signers[0] connected --> approver 0
        const txn = await walletContract.approveTransfer(transferId);
        await txn.wait();

        //signers[1] connected --> approver 1
        const txn2 = await walletContract.connect(approvers[1])
                                         .approveTransfer(transferId);
        await txn2.wait();
        ///////////////////////

        const transfer = await walletContract.transfers(transferId);
        expect(transfer.approvals).to.eq(2);
        expect(transfer.sent).to.true;

        const walletBalance = await ethers.provider.getBalance(walletContract.address);
        expect(walletBalance).to.equal(0);
  
        const balAfter = await ethers.provider.getBalance(to.address);
        expect(balAfter).to.equal(expectedBal);

    });
  });