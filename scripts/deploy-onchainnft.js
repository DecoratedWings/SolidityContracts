
const hre = require("hardhat");

//Alternative way of writing deploy script using arrow function instead
const main = async () => {

    try {
        const onchainnft = await hre.ethers.getContractFactory("ChainBattles");
        const ChainBattlesContract = await onchainnft.deploy();
        await ChainBattlesContract.deployed();
        console.log("ChainBattlesContract Deployed at: ", ChainBattlesContract.address);
        process.exit(0);
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
}

main();
