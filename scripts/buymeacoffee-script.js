
const { constants } = require("ethers");
const hre = require("hardhat");


async function getBalance(address){
    const balanceBigInt = await hre.waffle.provider.getBalance(address);
    return hre.ethers.utils.formatEther(balanceBigInt);
}

async function printBalances(addresses){
    let idx = 0;
    for(const address of addresses){
        console.log(`Address ${idx} balance: `, await getBalance(address));
        idx++;
    }
}

async function printMemos(memos) {
    for(const memo of memos){
        const timestamp = memo.timestamp;
        const tipper = memo.name;
        const tipperAddress = memo.from;
        const message = memo.message;
        console.log(`At ${timestamp}, ${tipper}, (${tipperAddress}) said: "${message}"`);
    }
}


async function main() {
    //Get example accounts.
    //Get the contrat to deploy.
    const [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners();
    //Deploy contract.
    const buyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
    const coffeeContract = await buyMeACoffee.deploy();
    await coffeeContract.deployed();
    console.log("BuyMeACoffee Deployed at: ", coffeeContract.address);

    //check balances before coffee purchase
    const addresses = [owner.address, tipper.address,coffeeContract.address];
    console.log("===START=====")
    await printBalances(addresses);

    //buy coffees 
    const tip = {value: hre.ethers.utils.parseEther("1")}; //options array to include in function call

    await coffeeContract.connect(tipper).buyCoffee("Bob",  "Capuccino", tip);
    await coffeeContract.connect(tipper2).buyCoffee("Joe", "Americano", tip);
    await coffeeContract.connect(tipper3).buyCoffee("Kim", "Espresso", tip);

    //check balances after buy 
    console.log("===bought coffee=====")
    await printBalances(addresses);

    //withdraw 
    await coffeeContract.connect(owner).withdrawTips();
    //check balance after withdraw
    console.log("===withdraw tips=====")
    await printBalances(addresses);

    //read all the memos
    console.log("=== memos: =====")
    const memos = await coffeeContract.getMemos();
    await printMemos(memos);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });