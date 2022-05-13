
const hre = require("hardhat");

async function main() {

    //Deploy contract.
    const buyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
    const coffeeContract = await buyMeACoffee.deploy();
    await coffeeContract.deployed();
    console.log("BuyMeACoffee Deployed at: ", coffeeContract.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
