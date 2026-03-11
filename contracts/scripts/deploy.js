const hre = require("hardhat");

async function main() {

    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying with:", deployer.address);

    /* =========================
       MOCK STABLECOINS
    ========================== */

    const MockStablecoin = await hre.ethers.getContractFactory("MockStablecoin");

    const usdc = await MockStablecoin.deploy(
        "Mock USD Coin",
        "USDC",
        6
    );

    await usdc.deployed();

    const usdcAddress = await usdc.address;

    console.log("USDC deployed:", usdcAddress);


    const usdt = await MockStablecoin.deploy(
        "Mock Tether",
        "USDT",
        6
    );

    await usdt.deployed();

    const usdtAddress = await usdt.address;

    console.log("USDT deployed:", usdtAddress);

    /* =========================
       FACTORY
    ========================== */

    const Factory = await hre.ethers.getContractFactory("TestSwapFactory");

    const factory = await Factory.deploy();

    await factory.deployed();

    const factoryAddress = await factory.address;

    console.log("Factory deployed:", factoryAddress);

    /* =========================
       ROUTER
    ========================== */

    const Router = await hre.ethers.getContractFactory("TestSwapRouter");

    const router = await Router.deploy(factoryAddress);

    await router.deployed();

    const routerAddress = await router.address;

    console.log("Router deployed:", routerAddress);

    /* =========================
       FAUCET
    ========================== */

    const Faucet = await hre.ethers.getContractFactory("TestSwapFaucet");

    const faucet = await Faucet.deploy(
        usdcAddress,
        usdtAddress
    );

    await faucet.deployed();

    const faucetAddress = await faucet.address;

    console.log("Faucet deployed:", faucetAddress);

    /* =========================
       TOKEN FACTORY
    ========================== */

    const TokenFactory = await hre.ethers.getContractFactory("TestSwapTokenFactory");

    const tokenFactory = await TokenFactory.deploy();

    await tokenFactory.deployed();

    const tokenFactoryAddress = await tokenFactory.address;

    console.log("TokenFactory deployed:", tokenFactoryAddress);

    console.log("\n=== DEPLOYMENT COMPLETE ===");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});