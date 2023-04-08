import IERC20MetadataAbi from "./abis/IERC20Metadata";
import ERC20StakedTestAbi from "./abis/ERC20StakedTest";
import ERC20StakingPoolAbi from "./abis/ERC20StakingPool";

if (!process.env.NEXT_PUBLIC_STAKING_TOKEN_ADDRESS) throw Error("NEXT_PUBLIC_STAKING_TOKEN_ADDRESS env variable must be set");
if (!process.env.NEXT_PUBLIC_REWARDS_TOKEN_ADDRESS) throw Error("NEXT_PUBLIC_REWARDS_TOKEN_ADDRESS env variable must be set");
if (!process.env.NEXT_PUBLIC_STAKING_POOL_ADDRESS) throw Error("NEXT_PUBLIC_STAKING_POOL_ADDRESS env variable must be set");

export const StakingTokenContract = {
    address: process.env.NEXT_PUBLIC_STAKING_TOKEN_ADDRESS as `0x{string}`,
    abi: ERC20StakedTestAbi,
}

export const RewardsTokenContract = {
    address: process.env.NEXT_PUBLIC_REWARDS_TOKEN_ADDRESS as `0x{string}`,
    abi: IERC20MetadataAbi,
}

export const StakingPoolContract = {
    address: process.env.NEXT_PUBLIC_STAKING_POOL_ADDRESS as `0x{string}`,
    abi: ERC20StakingPoolAbi,
}
