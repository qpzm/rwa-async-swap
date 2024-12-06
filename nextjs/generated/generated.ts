import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
  Address,
  useNetwork,
  useChainId,
} from "wagmi";
import { ReadContractResult, WriteContractMode, PrepareWriteContractResult } from "wagmi/actions";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ActionsRouter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const actionsRouterABI = [
  {
    stateMutability: "nonpayable",
    type: "constructor",
    inputs: [{ name: "_manager", internalType: "contract IPoolManager", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "CHECK_ENV_VAR",
    outputs: [{ name: "", internalType: "string", type: "string" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "IS_SCRIPT",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "IS_TEST",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "SNAP_DIR",
    outputs: [{ name: "", internalType: "string", type: "string" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "excludeArtifacts",
    outputs: [{ name: "excludedArtifacts_", internalType: "string[]", type: "string[]" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "excludeContracts",
    outputs: [{ name: "excludedContracts_", internalType: "address[]", type: "address[]" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "excludeSelectors",
    outputs: [
      {
        name: "excludedSelectors_",
        internalType: "struct StdInvariant.FuzzSelector[]",
        type: "tuple[]",
        components: [
          { name: "addr", internalType: "address", type: "address" },
          { name: "selectors", internalType: "bytes4[]", type: "bytes4[]" },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "excludeSenders",
    outputs: [{ name: "excludedSenders_", internalType: "address[]", type: "address[]" }],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      { name: "actions", internalType: "enum Actions[]", type: "uint8[]" },
      { name: "params", internalType: "bytes[]", type: "bytes[]" },
    ],
    name: "executeActions",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "failed",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "targetArtifactSelectors",
    outputs: [
      {
        name: "targetedArtifactSelectors_",
        internalType: "struct StdInvariant.FuzzArtifactSelector[]",
        type: "tuple[]",
        components: [
          { name: "artifact", internalType: "string", type: "string" },
          { name: "selectors", internalType: "bytes4[]", type: "bytes4[]" },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "targetArtifacts",
    outputs: [{ name: "targetedArtifacts_", internalType: "string[]", type: "string[]" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "targetContracts",
    outputs: [{ name: "targetedContracts_", internalType: "address[]", type: "address[]" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "targetInterfaces",
    outputs: [
      {
        name: "targetedInterfaces_",
        internalType: "struct StdInvariant.FuzzInterface[]",
        type: "tuple[]",
        components: [
          { name: "addr", internalType: "address", type: "address" },
          { name: "artifacts", internalType: "string[]", type: "string[]" },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "targetSelectors",
    outputs: [
      {
        name: "targetedSelectors_",
        internalType: "struct StdInvariant.FuzzSelector[]",
        type: "tuple[]",
        components: [
          { name: "addr", internalType: "address", type: "address" },
          { name: "selectors", internalType: "bytes4[]", type: "bytes4[]" },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "targetSenders",
    outputs: [{ name: "targetedSenders_", internalType: "address[]", type: "address[]" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "data", internalType: "bytes", type: "bytes" }],
    name: "unlockCallback",
    outputs: [{ name: "", internalType: "bytes", type: "bytes" }],
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "", internalType: "string", type: "string", indexed: false }],
    name: "log",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "", internalType: "address", type: "address", indexed: false }],
    name: "log_address",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "val", internalType: "uint256[]", type: "uint256[]", indexed: false }],
    name: "log_array",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "val", internalType: "int256[]", type: "int256[]", indexed: false }],
    name: "log_array",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "val", internalType: "address[]", type: "address[]", indexed: false }],
    name: "log_array",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "", internalType: "bytes", type: "bytes", indexed: false }],
    name: "log_bytes",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "", internalType: "bytes32", type: "bytes32", indexed: false }],
    name: "log_bytes32",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "", internalType: "int256", type: "int256", indexed: false }],
    name: "log_int",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "address", type: "address", indexed: false },
    ],
    name: "log_named_address",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "uint256[]", type: "uint256[]", indexed: false },
    ],
    name: "log_named_array",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "int256[]", type: "int256[]", indexed: false },
    ],
    name: "log_named_array",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "address[]", type: "address[]", indexed: false },
    ],
    name: "log_named_array",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "bytes", type: "bytes", indexed: false },
    ],
    name: "log_named_bytes",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "bytes32", type: "bytes32", indexed: false },
    ],
    name: "log_named_bytes32",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "int256", type: "int256", indexed: false },
      { name: "decimals", internalType: "uint256", type: "uint256", indexed: false },
    ],
    name: "log_named_decimal_int",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "uint256", type: "uint256", indexed: false },
      { name: "decimals", internalType: "uint256", type: "uint256", indexed: false },
    ],
    name: "log_named_decimal_uint",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "int256", type: "int256", indexed: false },
    ],
    name: "log_named_int",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "string", type: "string", indexed: false },
    ],
    name: "log_named_string",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "uint256", type: "uint256", indexed: false },
    ],
    name: "log_named_uint",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "", internalType: "string", type: "string", indexed: false }],
    name: "log_string",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "", internalType: "uint256", type: "uint256", indexed: false }],
    name: "log_uint",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "", internalType: "bytes", type: "bytes", indexed: false }],
    name: "logs",
  },
  { type: "error", inputs: [], name: "ActionNotSupported" },
  { type: "error", inputs: [], name: "CheckParameters" },
  {
    type: "error",
    inputs: [
      { name: "oldGas", internalType: "uint256", type: "uint256" },
      { name: "newGas", internalType: "uint256", type: "uint256" },
    ],
    name: "GasMismatch",
  },
  { type: "error", inputs: [{ name: "s", internalType: "string", type: "string" }], name: "InvalidStringNumber" },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BalanceDeltaLibrary
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const balanceDeltaLibraryABI = [
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "ZERO_DELTA",
    outputs: [{ name: "", internalType: "BalanceDelta", type: "int256" }],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BaseHook
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const baseHookABI = [
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      {
        name: "",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      {
        name: "",
        internalType: "struct IPoolManager.ModifyLiquidityParams",
        type: "tuple",
        components: [
          { name: "tickLower", internalType: "int24", type: "int24" },
          { name: "tickUpper", internalType: "int24", type: "int24" },
          { name: "liquidityDelta", internalType: "int256", type: "int256" },
          { name: "salt", internalType: "bytes32", type: "bytes32" },
        ],
      },
      { name: "", internalType: "BalanceDelta", type: "int256" },
      { name: "", internalType: "bytes", type: "bytes" },
    ],
    name: "afterAddLiquidity",
    outputs: [
      { name: "", internalType: "bytes4", type: "bytes4" },
      { name: "", internalType: "BalanceDelta", type: "int256" },
    ],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      {
        name: "",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      { name: "", internalType: "uint256", type: "uint256" },
      { name: "", internalType: "uint256", type: "uint256" },
      { name: "", internalType: "bytes", type: "bytes" },
    ],
    name: "afterDonate",
    outputs: [{ name: "", internalType: "bytes4", type: "bytes4" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      {
        name: "",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      { name: "", internalType: "uint160", type: "uint160" },
      { name: "", internalType: "int24", type: "int24" },
      { name: "", internalType: "bytes", type: "bytes" },
    ],
    name: "afterInitialize",
    outputs: [{ name: "", internalType: "bytes4", type: "bytes4" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      {
        name: "",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      {
        name: "",
        internalType: "struct IPoolManager.ModifyLiquidityParams",
        type: "tuple",
        components: [
          { name: "tickLower", internalType: "int24", type: "int24" },
          { name: "tickUpper", internalType: "int24", type: "int24" },
          { name: "liquidityDelta", internalType: "int256", type: "int256" },
          { name: "salt", internalType: "bytes32", type: "bytes32" },
        ],
      },
      { name: "", internalType: "BalanceDelta", type: "int256" },
      { name: "", internalType: "bytes", type: "bytes" },
    ],
    name: "afterRemoveLiquidity",
    outputs: [
      { name: "", internalType: "bytes4", type: "bytes4" },
      { name: "", internalType: "BalanceDelta", type: "int256" },
    ],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      {
        name: "",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      {
        name: "",
        internalType: "struct IPoolManager.SwapParams",
        type: "tuple",
        components: [
          { name: "zeroForOne", internalType: "bool", type: "bool" },
          { name: "amountSpecified", internalType: "int256", type: "int256" },
          { name: "sqrtPriceLimitX96", internalType: "uint160", type: "uint160" },
        ],
      },
      { name: "", internalType: "BalanceDelta", type: "int256" },
      { name: "", internalType: "bytes", type: "bytes" },
    ],
    name: "afterSwap",
    outputs: [
      { name: "", internalType: "bytes4", type: "bytes4" },
      { name: "", internalType: "int128", type: "int128" },
    ],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      {
        name: "",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      {
        name: "",
        internalType: "struct IPoolManager.ModifyLiquidityParams",
        type: "tuple",
        components: [
          { name: "tickLower", internalType: "int24", type: "int24" },
          { name: "tickUpper", internalType: "int24", type: "int24" },
          { name: "liquidityDelta", internalType: "int256", type: "int256" },
          { name: "salt", internalType: "bytes32", type: "bytes32" },
        ],
      },
      { name: "", internalType: "bytes", type: "bytes" },
    ],
    name: "beforeAddLiquidity",
    outputs: [{ name: "", internalType: "bytes4", type: "bytes4" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      {
        name: "",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      { name: "", internalType: "uint256", type: "uint256" },
      { name: "", internalType: "uint256", type: "uint256" },
      { name: "", internalType: "bytes", type: "bytes" },
    ],
    name: "beforeDonate",
    outputs: [{ name: "", internalType: "bytes4", type: "bytes4" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      {
        name: "",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      { name: "", internalType: "uint160", type: "uint160" },
      { name: "", internalType: "bytes", type: "bytes" },
    ],
    name: "beforeInitialize",
    outputs: [{ name: "", internalType: "bytes4", type: "bytes4" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      {
        name: "",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      {
        name: "",
        internalType: "struct IPoolManager.ModifyLiquidityParams",
        type: "tuple",
        components: [
          { name: "tickLower", internalType: "int24", type: "int24" },
          { name: "tickUpper", internalType: "int24", type: "int24" },
          { name: "liquidityDelta", internalType: "int256", type: "int256" },
          { name: "salt", internalType: "bytes32", type: "bytes32" },
        ],
      },
      { name: "", internalType: "bytes", type: "bytes" },
    ],
    name: "beforeRemoveLiquidity",
    outputs: [{ name: "", internalType: "bytes4", type: "bytes4" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      {
        name: "",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      {
        name: "",
        internalType: "struct IPoolManager.SwapParams",
        type: "tuple",
        components: [
          { name: "zeroForOne", internalType: "bool", type: "bool" },
          { name: "amountSpecified", internalType: "int256", type: "int256" },
          { name: "sqrtPriceLimitX96", internalType: "uint160", type: "uint160" },
        ],
      },
      { name: "", internalType: "bytes", type: "bytes" },
    ],
    name: "beforeSwap",
    outputs: [
      { name: "", internalType: "bytes4", type: "bytes4" },
      { name: "", internalType: "BeforeSwapDelta", type: "int256" },
      { name: "", internalType: "uint24", type: "uint24" },
    ],
  },
  {
    stateMutability: "pure",
    type: "function",
    inputs: [],
    name: "getHookPermissions",
    outputs: [
      {
        name: "",
        internalType: "struct Hooks.Permissions",
        type: "tuple",
        components: [
          { name: "beforeInitialize", internalType: "bool", type: "bool" },
          { name: "afterInitialize", internalType: "bool", type: "bool" },
          { name: "beforeAddLiquidity", internalType: "bool", type: "bool" },
          { name: "afterAddLiquidity", internalType: "bool", type: "bool" },
          { name: "beforeRemoveLiquidity", internalType: "bool", type: "bool" },
          { name: "afterRemoveLiquidity", internalType: "bool", type: "bool" },
          { name: "beforeSwap", internalType: "bool", type: "bool" },
          { name: "afterSwap", internalType: "bool", type: "bool" },
          { name: "beforeDonate", internalType: "bool", type: "bool" },
          { name: "afterDonate", internalType: "bool", type: "bool" },
          { name: "beforeSwapReturnDelta", internalType: "bool", type: "bool" },
          { name: "afterSwapReturnDelta", internalType: "bool", type: "bool" },
          { name: "afterAddLiquidityReturnDelta", internalType: "bool", type: "bool" },
          { name: "afterRemoveLiquidityReturnDelta", internalType: "bool", type: "bool" },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "poolManager",
    outputs: [{ name: "", internalType: "contract IPoolManager", type: "address" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "data", internalType: "bytes", type: "bytes" }],
    name: "unlockCallback",
    outputs: [{ name: "", internalType: "bytes", type: "bytes" }],
  },
  { type: "error", inputs: [], name: "HookNotImplemented" },
  { type: "error", inputs: [], name: "InvalidPool" },
  { type: "error", inputs: [], name: "LockFailure" },
  { type: "error", inputs: [], name: "NotPoolManager" },
  { type: "error", inputs: [], name: "NotSelf" },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BeforeSwapDeltaLibrary
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const beforeSwapDeltaLibraryABI = [
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "ZERO_DELTA",
    outputs: [{ name: "", internalType: "BeforeSwapDelta", type: "int256" }],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CSMM
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const csmmABI = [
  {
    stateMutability: "nonpayable",
    type: "constructor",
    inputs: [{ name: "poolManager", internalType: "contract IPoolManager", type: "address" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "key",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      { name: "amountEach", internalType: "uint256", type: "uint256" },
    ],
    name: "addLiquidity",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      {
        name: "",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      {
        name: "",
        internalType: "struct IPoolManager.ModifyLiquidityParams",
        type: "tuple",
        components: [
          { name: "tickLower", internalType: "int24", type: "int24" },
          { name: "tickUpper", internalType: "int24", type: "int24" },
          { name: "liquidityDelta", internalType: "int256", type: "int256" },
          { name: "salt", internalType: "bytes32", type: "bytes32" },
        ],
      },
      { name: "", internalType: "BalanceDelta", type: "int256" },
      { name: "", internalType: "bytes", type: "bytes" },
    ],
    name: "afterAddLiquidity",
    outputs: [
      { name: "", internalType: "bytes4", type: "bytes4" },
      { name: "", internalType: "BalanceDelta", type: "int256" },
    ],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      {
        name: "",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      { name: "", internalType: "uint256", type: "uint256" },
      { name: "", internalType: "uint256", type: "uint256" },
      { name: "", internalType: "bytes", type: "bytes" },
    ],
    name: "afterDonate",
    outputs: [{ name: "", internalType: "bytes4", type: "bytes4" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      {
        name: "",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      { name: "", internalType: "uint160", type: "uint160" },
      { name: "", internalType: "int24", type: "int24" },
      { name: "", internalType: "bytes", type: "bytes" },
    ],
    name: "afterInitialize",
    outputs: [{ name: "", internalType: "bytes4", type: "bytes4" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      {
        name: "",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      {
        name: "",
        internalType: "struct IPoolManager.ModifyLiquidityParams",
        type: "tuple",
        components: [
          { name: "tickLower", internalType: "int24", type: "int24" },
          { name: "tickUpper", internalType: "int24", type: "int24" },
          { name: "liquidityDelta", internalType: "int256", type: "int256" },
          { name: "salt", internalType: "bytes32", type: "bytes32" },
        ],
      },
      { name: "", internalType: "BalanceDelta", type: "int256" },
      { name: "", internalType: "bytes", type: "bytes" },
    ],
    name: "afterRemoveLiquidity",
    outputs: [
      { name: "", internalType: "bytes4", type: "bytes4" },
      { name: "", internalType: "BalanceDelta", type: "int256" },
    ],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      {
        name: "",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      {
        name: "",
        internalType: "struct IPoolManager.SwapParams",
        type: "tuple",
        components: [
          { name: "zeroForOne", internalType: "bool", type: "bool" },
          { name: "amountSpecified", internalType: "int256", type: "int256" },
          { name: "sqrtPriceLimitX96", internalType: "uint160", type: "uint160" },
        ],
      },
      { name: "", internalType: "BalanceDelta", type: "int256" },
      { name: "", internalType: "bytes", type: "bytes" },
    ],
    name: "afterSwap",
    outputs: [
      { name: "", internalType: "bytes4", type: "bytes4" },
      { name: "", internalType: "int128", type: "int128" },
    ],
  },
  {
    stateMutability: "pure",
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      {
        name: "",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      {
        name: "",
        internalType: "struct IPoolManager.ModifyLiquidityParams",
        type: "tuple",
        components: [
          { name: "tickLower", internalType: "int24", type: "int24" },
          { name: "tickUpper", internalType: "int24", type: "int24" },
          { name: "liquidityDelta", internalType: "int256", type: "int256" },
          { name: "salt", internalType: "bytes32", type: "bytes32" },
        ],
      },
      { name: "", internalType: "bytes", type: "bytes" },
    ],
    name: "beforeAddLiquidity",
    outputs: [{ name: "", internalType: "bytes4", type: "bytes4" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      {
        name: "",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      { name: "", internalType: "uint256", type: "uint256" },
      { name: "", internalType: "uint256", type: "uint256" },
      { name: "", internalType: "bytes", type: "bytes" },
    ],
    name: "beforeDonate",
    outputs: [{ name: "", internalType: "bytes4", type: "bytes4" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      {
        name: "",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      { name: "", internalType: "uint160", type: "uint160" },
      { name: "", internalType: "bytes", type: "bytes" },
    ],
    name: "beforeInitialize",
    outputs: [{ name: "", internalType: "bytes4", type: "bytes4" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      {
        name: "",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      {
        name: "",
        internalType: "struct IPoolManager.ModifyLiquidityParams",
        type: "tuple",
        components: [
          { name: "tickLower", internalType: "int24", type: "int24" },
          { name: "tickUpper", internalType: "int24", type: "int24" },
          { name: "liquidityDelta", internalType: "int256", type: "int256" },
          { name: "salt", internalType: "bytes32", type: "bytes32" },
        ],
      },
      { name: "", internalType: "bytes", type: "bytes" },
    ],
    name: "beforeRemoveLiquidity",
    outputs: [{ name: "", internalType: "bytes4", type: "bytes4" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      {
        name: "key",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      {
        name: "params",
        internalType: "struct IPoolManager.SwapParams",
        type: "tuple",
        components: [
          { name: "zeroForOne", internalType: "bool", type: "bool" },
          { name: "amountSpecified", internalType: "int256", type: "int256" },
          { name: "sqrtPriceLimitX96", internalType: "uint160", type: "uint160" },
        ],
      },
      { name: "", internalType: "bytes", type: "bytes" },
    ],
    name: "beforeSwap",
    outputs: [
      { name: "", internalType: "bytes4", type: "bytes4" },
      { name: "", internalType: "BeforeSwapDelta", type: "int256" },
      { name: "", internalType: "uint24", type: "uint24" },
    ],
  },
  {
    stateMutability: "pure",
    type: "function",
    inputs: [],
    name: "getHookPermissions",
    outputs: [
      {
        name: "",
        internalType: "struct Hooks.Permissions",
        type: "tuple",
        components: [
          { name: "beforeInitialize", internalType: "bool", type: "bool" },
          { name: "afterInitialize", internalType: "bool", type: "bool" },
          { name: "beforeAddLiquidity", internalType: "bool", type: "bool" },
          { name: "afterAddLiquidity", internalType: "bool", type: "bool" },
          { name: "beforeRemoveLiquidity", internalType: "bool", type: "bool" },
          { name: "afterRemoveLiquidity", internalType: "bool", type: "bool" },
          { name: "beforeSwap", internalType: "bool", type: "bool" },
          { name: "afterSwap", internalType: "bool", type: "bool" },
          { name: "beforeDonate", internalType: "bool", type: "bool" },
          { name: "afterDonate", internalType: "bool", type: "bool" },
          { name: "beforeSwapReturnDelta", internalType: "bool", type: "bool" },
          { name: "afterSwapReturnDelta", internalType: "bool", type: "bool" },
          { name: "afterAddLiquidityReturnDelta", internalType: "bool", type: "bool" },
          { name: "afterRemoveLiquidityReturnDelta", internalType: "bool", type: "bool" },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "poolManager",
    outputs: [{ name: "", internalType: "contract IPoolManager", type: "address" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "data", internalType: "bytes", type: "bytes" }],
    name: "unlockCallback",
    outputs: [{ name: "", internalType: "bytes", type: "bytes" }],
  },
  { type: "error", inputs: [], name: "AddLiquidityThroughHook" },
  { type: "error", inputs: [], name: "HookNotImplemented" },
  { type: "error", inputs: [], name: "InvalidPool" },
  { type: "error", inputs: [], name: "LockFailure" },
  { type: "error", inputs: [], name: "NotPoolManager" },
  { type: "error", inputs: [], name: "NotSelf" },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Constants
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const constantsABI = [
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "SQRT_PRICE_121_100",
    outputs: [{ name: "", internalType: "uint160", type: "uint160" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "SQRT_PRICE_1_1",
    outputs: [{ name: "", internalType: "uint160", type: "uint160" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "SQRT_PRICE_1_2",
    outputs: [{ name: "", internalType: "uint160", type: "uint160" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "SQRT_PRICE_1_4",
    outputs: [{ name: "", internalType: "uint160", type: "uint160" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "SQRT_PRICE_2_1",
    outputs: [{ name: "", internalType: "uint160", type: "uint160" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "SQRT_PRICE_4_1",
    outputs: [{ name: "", internalType: "uint160", type: "uint160" }],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CurrencyLibrary
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const currencyLibraryABI = [
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "NATIVE",
    outputs: [{ name: "", internalType: "Currency", type: "address" }],
  },
  {
    type: "error",
    inputs: [
      { name: "token", internalType: "address", type: "address" },
      { name: "reason", internalType: "bytes", type: "bytes" },
    ],
    name: "Wrap__ERC20TransferFailed",
  },
  {
    type: "error",
    inputs: [
      { name: "recipient", internalType: "address", type: "address" },
      { name: "reason", internalType: "bytes", type: "bytes" },
    ],
    name: "Wrap__NativeTransferFailed",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CurrencyReserves
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const currencyReservesABI = [{ type: "error", inputs: [], name: "AlreadySynced" }] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Deployers
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const deployersABI = [
  { stateMutability: "payable", type: "receive" },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "LIQUIDITY_PARAMS",
    outputs: [
      { name: "tickLower", internalType: "int24", type: "int24" },
      { name: "tickUpper", internalType: "int24", type: "int24" },
      { name: "liquidityDelta", internalType: "int256", type: "int256" },
      { name: "salt", internalType: "bytes32", type: "bytes32" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "MAX_PRICE_LIMIT",
    outputs: [{ name: "", internalType: "uint160", type: "uint160" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "MIN_PRICE_LIMIT",
    outputs: [{ name: "", internalType: "uint160", type: "uint160" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "REMOVE_LIQUIDITY_PARAMS",
    outputs: [
      { name: "tickLower", internalType: "int24", type: "int24" },
      { name: "tickUpper", internalType: "int24", type: "int24" },
      { name: "liquidityDelta", internalType: "int256", type: "int256" },
      { name: "salt", internalType: "bytes32", type: "bytes32" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "SWAP_PARAMS",
    outputs: [
      { name: "zeroForOne", internalType: "bool", type: "bool" },
      { name: "amountSpecified", internalType: "int256", type: "int256" },
      { name: "sqrtPriceLimitX96", internalType: "uint160", type: "uint160" },
    ],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20ABI = [
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      { name: "", internalType: "address", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", internalType: "uint8", type: "uint8" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ name: "", internalType: "string", type: "string" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "nonces",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
      { name: "deadline", internalType: "uint256", type: "uint256" },
      { name: "v", internalType: "uint8", type: "uint8" },
      { name: "r", internalType: "bytes32", type: "bytes32" },
      { name: "s", internalType: "bytes32", type: "bytes32" },
    ],
    name: "permit",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", internalType: "string", type: "string" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "to", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "owner", internalType: "address", type: "address", indexed: true },
      { name: "spender", internalType: "address", type: "address", indexed: true },
      { name: "amount", internalType: "uint256", type: "uint256", indexed: false },
    ],
    name: "Approval",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      { name: "amount", internalType: "uint256", type: "uint256", indexed: false },
    ],
    name: "Transfer",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC6909
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc6909ABI = [
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
      { name: "id", internalType: "uint256", type: "uint256" },
    ],
    name: "allowance",
    outputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "id", internalType: "uint256", type: "uint256" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "id", internalType: "uint256", type: "uint256" },
    ],
    name: "balanceOf",
    outputs: [{ name: "balance", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "operator", internalType: "address", type: "address" },
    ],
    name: "isOperator",
    outputs: [{ name: "isOperator", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "operator", internalType: "address", type: "address" },
      { name: "approved", internalType: "bool", type: "bool" },
    ],
    name: "setOperator",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "interfaceId", internalType: "bytes4", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "receiver", internalType: "address", type: "address" },
      { name: "id", internalType: "uint256", type: "uint256" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      { name: "receiver", internalType: "address", type: "address" },
      { name: "id", internalType: "uint256", type: "uint256" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "owner", internalType: "address", type: "address", indexed: true },
      { name: "spender", internalType: "address", type: "address", indexed: true },
      { name: "id", internalType: "uint256", type: "uint256", indexed: true },
      { name: "amount", internalType: "uint256", type: "uint256", indexed: false },
    ],
    name: "Approval",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "owner", internalType: "address", type: "address", indexed: true },
      { name: "operator", internalType: "address", type: "address", indexed: true },
      { name: "approved", internalType: "bool", type: "bool", indexed: false },
    ],
    name: "OperatorSet",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "caller", internalType: "address", type: "address", indexed: false },
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      { name: "id", internalType: "uint256", type: "uint256", indexed: true },
      { name: "amount", internalType: "uint256", type: "uint256", indexed: false },
    ],
    name: "Transfer",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC6909Claims
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc6909ClaimsABI = [
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
      { name: "id", internalType: "uint256", type: "uint256" },
    ],
    name: "allowance",
    outputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "id", internalType: "uint256", type: "uint256" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "id", internalType: "uint256", type: "uint256" },
    ],
    name: "balanceOf",
    outputs: [{ name: "balance", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "operator", internalType: "address", type: "address" },
    ],
    name: "isOperator",
    outputs: [{ name: "isOperator", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "operator", internalType: "address", type: "address" },
      { name: "approved", internalType: "bool", type: "bool" },
    ],
    name: "setOperator",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "interfaceId", internalType: "bytes4", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "receiver", internalType: "address", type: "address" },
      { name: "id", internalType: "uint256", type: "uint256" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      { name: "receiver", internalType: "address", type: "address" },
      { name: "id", internalType: "uint256", type: "uint256" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "owner", internalType: "address", type: "address", indexed: true },
      { name: "spender", internalType: "address", type: "address", indexed: true },
      { name: "id", internalType: "uint256", type: "uint256", indexed: true },
      { name: "amount", internalType: "uint256", type: "uint256", indexed: false },
    ],
    name: "Approval",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "owner", internalType: "address", type: "address", indexed: true },
      { name: "operator", internalType: "address", type: "address", indexed: true },
      { name: "approved", internalType: "bool", type: "bool", indexed: false },
    ],
    name: "OperatorSet",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "caller", internalType: "address", type: "address", indexed: false },
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      { name: "id", internalType: "uint256", type: "uint256", indexed: true },
      { name: "amount", internalType: "uint256", type: "uint256", indexed: false },
    ],
    name: "Transfer",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Extsload
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const extsloadABI = [
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "slot", internalType: "bytes32", type: "bytes32" }],
    name: "extsload",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "startSlot", internalType: "bytes32", type: "bytes32" },
      { name: "nSlots", internalType: "uint256", type: "uint256" },
    ],
    name: "extsload",
    outputs: [{ name: "", internalType: "bytes32[]", type: "bytes32[]" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "slots", internalType: "bytes32[]", type: "bytes32[]" }],
    name: "extsload",
    outputs: [{ name: "", internalType: "bytes32[]", type: "bytes32[]" }],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Exttload
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const exttloadABI = [
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "slots", internalType: "bytes32[]", type: "bytes32[]" }],
    name: "exttload",
    outputs: [{ name: "", internalType: "bytes32[]", type: "bytes32[]" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "slot", internalType: "bytes32", type: "bytes32" }],
    name: "exttload",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GasSnapshot
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const gasSnapshotABI = [
  { stateMutability: "nonpayable", type: "constructor", inputs: [] },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "CHECK_ENV_VAR",
    outputs: [{ name: "", internalType: "string", type: "string" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "IS_SCRIPT",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "SNAP_DIR",
    outputs: [{ name: "", internalType: "string", type: "string" }],
  },
  {
    type: "error",
    inputs: [
      { name: "oldGas", internalType: "uint256", type: "uint256" },
      { name: "newGas", internalType: "uint256", type: "uint256" },
    ],
    name: "GasMismatch",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Hooks
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const hooksABI = [
  { type: "error", inputs: [{ name: "hooks", internalType: "address", type: "address" }], name: "HookAddressNotValid" },
  { type: "error", inputs: [], name: "HookDeltaExceedsSwapAmount" },
  { type: "error", inputs: [], name: "InvalidHookResponse" },
  {
    type: "error",
    inputs: [
      { name: "hook", internalType: "address", type: "address" },
      { name: "revertReason", internalType: "bytes", type: "bytes" },
    ],
    name: "Wrap__FailedHookCall",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC165
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc165ABI = [
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "interfaceID", internalType: "bytes4", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20ABI = [
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", internalType: "uint8", type: "uint8" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ name: "", internalType: "string", type: "string" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", internalType: "string", type: "string" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "to", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "owner", internalType: "address", type: "address", indexed: true },
      { name: "spender", internalType: "address", type: "address", indexed: true },
      { name: "value", internalType: "uint256", type: "uint256", indexed: false },
    ],
    name: "Approval",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      { name: "value", internalType: "uint256", type: "uint256", indexed: false },
    ],
    name: "Transfer",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Minimal
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20MinimalABI = [
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "recipient", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      { name: "recipient", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "owner", internalType: "address", type: "address", indexed: true },
      { name: "spender", internalType: "address", type: "address", indexed: true },
      { name: "value", internalType: "uint256", type: "uint256", indexed: false },
    ],
    name: "Approval",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      { name: "value", internalType: "uint256", type: "uint256", indexed: false },
    ],
    name: "Transfer",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC6909Claims
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc6909ClaimsABI = [
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
      { name: "id", internalType: "uint256", type: "uint256" },
    ],
    name: "allowance",
    outputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "id", internalType: "uint256", type: "uint256" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "id", internalType: "uint256", type: "uint256" },
    ],
    name: "balanceOf",
    outputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
    ],
    name: "isOperator",
    outputs: [{ name: "approved", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "operator", internalType: "address", type: "address" },
      { name: "approved", internalType: "bool", type: "bool" },
    ],
    name: "setOperator",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "receiver", internalType: "address", type: "address" },
      { name: "id", internalType: "uint256", type: "uint256" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      { name: "receiver", internalType: "address", type: "address" },
      { name: "id", internalType: "uint256", type: "uint256" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "owner", internalType: "address", type: "address", indexed: true },
      { name: "spender", internalType: "address", type: "address", indexed: true },
      { name: "id", internalType: "uint256", type: "uint256", indexed: true },
      { name: "amount", internalType: "uint256", type: "uint256", indexed: false },
    ],
    name: "Approval",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "owner", internalType: "address", type: "address", indexed: true },
      { name: "operator", internalType: "address", type: "address", indexed: true },
      { name: "approved", internalType: "bool", type: "bool", indexed: false },
    ],
    name: "OperatorSet",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "caller", internalType: "address", type: "address", indexed: false },
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      { name: "id", internalType: "uint256", type: "uint256", indexed: true },
      { name: "amount", internalType: "uint256", type: "uint256", indexed: false },
    ],
    name: "Transfer",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721ABI = [
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      { name: "_approved", internalType: "address", type: "address" },
      { name: "_tokenId", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "_owner", internalType: "address", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "_tokenId", internalType: "uint256", type: "uint256" }],
    name: "getApproved",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "_owner", internalType: "address", type: "address" },
      { name: "_operator", internalType: "address", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "_tokenId", internalType: "uint256", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      { name: "_from", internalType: "address", type: "address" },
      { name: "_to", internalType: "address", type: "address" },
      { name: "_tokenId", internalType: "uint256", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      { name: "_from", internalType: "address", type: "address" },
      { name: "_to", internalType: "address", type: "address" },
      { name: "_tokenId", internalType: "uint256", type: "uint256" },
      { name: "data", internalType: "bytes", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "_operator", internalType: "address", type: "address" },
      { name: "_approved", internalType: "bool", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "interfaceID", internalType: "bytes4", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      { name: "_from", internalType: "address", type: "address" },
      { name: "_to", internalType: "address", type: "address" },
      { name: "_tokenId", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "_owner", internalType: "address", type: "address", indexed: true },
      { name: "_approved", internalType: "address", type: "address", indexed: true },
      { name: "_tokenId", internalType: "uint256", type: "uint256", indexed: true },
    ],
    name: "Approval",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "_owner", internalType: "address", type: "address", indexed: true },
      { name: "_operator", internalType: "address", type: "address", indexed: true },
      { name: "_approved", internalType: "bool", type: "bool", indexed: false },
    ],
    name: "ApprovalForAll",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "_from", internalType: "address", type: "address", indexed: true },
      { name: "_to", internalType: "address", type: "address", indexed: true },
      { name: "_tokenId", internalType: "uint256", type: "uint256", indexed: true },
    ],
    name: "Transfer",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Enumerable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721EnumerableABI = [
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      { name: "_approved", internalType: "address", type: "address" },
      { name: "_tokenId", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "_owner", internalType: "address", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "_tokenId", internalType: "uint256", type: "uint256" }],
    name: "getApproved",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "_owner", internalType: "address", type: "address" },
      { name: "_operator", internalType: "address", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "_tokenId", internalType: "uint256", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      { name: "_from", internalType: "address", type: "address" },
      { name: "_to", internalType: "address", type: "address" },
      { name: "_tokenId", internalType: "uint256", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      { name: "_from", internalType: "address", type: "address" },
      { name: "_to", internalType: "address", type: "address" },
      { name: "_tokenId", internalType: "uint256", type: "uint256" },
      { name: "data", internalType: "bytes", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "_operator", internalType: "address", type: "address" },
      { name: "_approved", internalType: "bool", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "interfaceID", internalType: "bytes4", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "_index", internalType: "uint256", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "_owner", internalType: "address", type: "address" },
      { name: "_index", internalType: "uint256", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      { name: "_from", internalType: "address", type: "address" },
      { name: "_to", internalType: "address", type: "address" },
      { name: "_tokenId", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "_owner", internalType: "address", type: "address", indexed: true },
      { name: "_approved", internalType: "address", type: "address", indexed: true },
      { name: "_tokenId", internalType: "uint256", type: "uint256", indexed: true },
    ],
    name: "Approval",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "_owner", internalType: "address", type: "address", indexed: true },
      { name: "_operator", internalType: "address", type: "address", indexed: true },
      { name: "_approved", internalType: "bool", type: "bool", indexed: false },
    ],
    name: "ApprovalForAll",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "_from", internalType: "address", type: "address", indexed: true },
      { name: "_to", internalType: "address", type: "address", indexed: true },
      { name: "_tokenId", internalType: "uint256", type: "uint256", indexed: true },
    ],
    name: "Transfer",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Metadata
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721MetadataABI = [
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      { name: "_approved", internalType: "address", type: "address" },
      { name: "_tokenId", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "_owner", internalType: "address", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "_tokenId", internalType: "uint256", type: "uint256" }],
    name: "getApproved",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "_owner", internalType: "address", type: "address" },
      { name: "_operator", internalType: "address", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ name: "_name", internalType: "string", type: "string" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "_tokenId", internalType: "uint256", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      { name: "_from", internalType: "address", type: "address" },
      { name: "_to", internalType: "address", type: "address" },
      { name: "_tokenId", internalType: "uint256", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      { name: "_from", internalType: "address", type: "address" },
      { name: "_to", internalType: "address", type: "address" },
      { name: "_tokenId", internalType: "uint256", type: "uint256" },
      { name: "data", internalType: "bytes", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "_operator", internalType: "address", type: "address" },
      { name: "_approved", internalType: "bool", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "interfaceID", internalType: "bytes4", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ name: "_symbol", internalType: "string", type: "string" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "_tokenId", internalType: "uint256", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ name: "", internalType: "string", type: "string" }],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      { name: "_from", internalType: "address", type: "address" },
      { name: "_to", internalType: "address", type: "address" },
      { name: "_tokenId", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "_owner", internalType: "address", type: "address", indexed: true },
      { name: "_approved", internalType: "address", type: "address", indexed: true },
      { name: "_tokenId", internalType: "uint256", type: "uint256", indexed: true },
    ],
    name: "Approval",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "_owner", internalType: "address", type: "address", indexed: true },
      { name: "_operator", internalType: "address", type: "address", indexed: true },
      { name: "_approved", internalType: "bool", type: "bool", indexed: false },
    ],
    name: "ApprovalForAll",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "_from", internalType: "address", type: "address", indexed: true },
      { name: "_to", internalType: "address", type: "address", indexed: true },
      { name: "_tokenId", internalType: "uint256", type: "uint256", indexed: true },
    ],
    name: "Transfer",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721TokenReceiver
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721TokenReceiverABI = [
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "_operator", internalType: "address", type: "address" },
      { name: "_from", internalType: "address", type: "address" },
      { name: "_tokenId", internalType: "uint256", type: "uint256" },
      { name: "_data", internalType: "bytes", type: "bytes" },
    ],
    name: "onERC721Received",
    outputs: [{ name: "", internalType: "bytes4", type: "bytes4" }],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IExtsload
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iExtsloadABI = [
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "slot", internalType: "bytes32", type: "bytes32" }],
    name: "extsload",
    outputs: [{ name: "value", internalType: "bytes32", type: "bytes32" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "startSlot", internalType: "bytes32", type: "bytes32" },
      { name: "nSlots", internalType: "uint256", type: "uint256" },
    ],
    name: "extsload",
    outputs: [{ name: "values", internalType: "bytes32[]", type: "bytes32[]" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "slots", internalType: "bytes32[]", type: "bytes32[]" }],
    name: "extsload",
    outputs: [{ name: "values", internalType: "bytes32[]", type: "bytes32[]" }],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IExttload
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iExttloadABI = [
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "slots", internalType: "bytes32[]", type: "bytes32[]" }],
    name: "exttload",
    outputs: [{ name: "values", internalType: "bytes32[]", type: "bytes32[]" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "slot", internalType: "bytes32", type: "bytes32" }],
    name: "exttload",
    outputs: [{ name: "value", internalType: "bytes32", type: "bytes32" }],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IHooks
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iHooksABI = [
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      {
        name: "key",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      {
        name: "params",
        internalType: "struct IPoolManager.ModifyLiquidityParams",
        type: "tuple",
        components: [
          { name: "tickLower", internalType: "int24", type: "int24" },
          { name: "tickUpper", internalType: "int24", type: "int24" },
          { name: "liquidityDelta", internalType: "int256", type: "int256" },
          { name: "salt", internalType: "bytes32", type: "bytes32" },
        ],
      },
      { name: "delta", internalType: "BalanceDelta", type: "int256" },
      { name: "hookData", internalType: "bytes", type: "bytes" },
    ],
    name: "afterAddLiquidity",
    outputs: [
      { name: "", internalType: "bytes4", type: "bytes4" },
      { name: "", internalType: "BalanceDelta", type: "int256" },
    ],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      {
        name: "key",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      { name: "amount0", internalType: "uint256", type: "uint256" },
      { name: "amount1", internalType: "uint256", type: "uint256" },
      { name: "hookData", internalType: "bytes", type: "bytes" },
    ],
    name: "afterDonate",
    outputs: [{ name: "", internalType: "bytes4", type: "bytes4" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      {
        name: "key",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      { name: "sqrtPriceX96", internalType: "uint160", type: "uint160" },
      { name: "tick", internalType: "int24", type: "int24" },
      { name: "hookData", internalType: "bytes", type: "bytes" },
    ],
    name: "afterInitialize",
    outputs: [{ name: "", internalType: "bytes4", type: "bytes4" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      {
        name: "key",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      {
        name: "params",
        internalType: "struct IPoolManager.ModifyLiquidityParams",
        type: "tuple",
        components: [
          { name: "tickLower", internalType: "int24", type: "int24" },
          { name: "tickUpper", internalType: "int24", type: "int24" },
          { name: "liquidityDelta", internalType: "int256", type: "int256" },
          { name: "salt", internalType: "bytes32", type: "bytes32" },
        ],
      },
      { name: "delta", internalType: "BalanceDelta", type: "int256" },
      { name: "hookData", internalType: "bytes", type: "bytes" },
    ],
    name: "afterRemoveLiquidity",
    outputs: [
      { name: "", internalType: "bytes4", type: "bytes4" },
      { name: "", internalType: "BalanceDelta", type: "int256" },
    ],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      {
        name: "key",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      {
        name: "params",
        internalType: "struct IPoolManager.SwapParams",
        type: "tuple",
        components: [
          { name: "zeroForOne", internalType: "bool", type: "bool" },
          { name: "amountSpecified", internalType: "int256", type: "int256" },
          { name: "sqrtPriceLimitX96", internalType: "uint160", type: "uint160" },
        ],
      },
      { name: "delta", internalType: "BalanceDelta", type: "int256" },
      { name: "hookData", internalType: "bytes", type: "bytes" },
    ],
    name: "afterSwap",
    outputs: [
      { name: "", internalType: "bytes4", type: "bytes4" },
      { name: "", internalType: "int128", type: "int128" },
    ],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      {
        name: "key",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      {
        name: "params",
        internalType: "struct IPoolManager.ModifyLiquidityParams",
        type: "tuple",
        components: [
          { name: "tickLower", internalType: "int24", type: "int24" },
          { name: "tickUpper", internalType: "int24", type: "int24" },
          { name: "liquidityDelta", internalType: "int256", type: "int256" },
          { name: "salt", internalType: "bytes32", type: "bytes32" },
        ],
      },
      { name: "hookData", internalType: "bytes", type: "bytes" },
    ],
    name: "beforeAddLiquidity",
    outputs: [{ name: "", internalType: "bytes4", type: "bytes4" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      {
        name: "key",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      { name: "amount0", internalType: "uint256", type: "uint256" },
      { name: "amount1", internalType: "uint256", type: "uint256" },
      { name: "hookData", internalType: "bytes", type: "bytes" },
    ],
    name: "beforeDonate",
    outputs: [{ name: "", internalType: "bytes4", type: "bytes4" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      {
        name: "key",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      { name: "sqrtPriceX96", internalType: "uint160", type: "uint160" },
      { name: "hookData", internalType: "bytes", type: "bytes" },
    ],
    name: "beforeInitialize",
    outputs: [{ name: "", internalType: "bytes4", type: "bytes4" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      {
        name: "key",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      {
        name: "params",
        internalType: "struct IPoolManager.ModifyLiquidityParams",
        type: "tuple",
        components: [
          { name: "tickLower", internalType: "int24", type: "int24" },
          { name: "tickUpper", internalType: "int24", type: "int24" },
          { name: "liquidityDelta", internalType: "int256", type: "int256" },
          { name: "salt", internalType: "bytes32", type: "bytes32" },
        ],
      },
      { name: "hookData", internalType: "bytes", type: "bytes" },
    ],
    name: "beforeRemoveLiquidity",
    outputs: [{ name: "", internalType: "bytes4", type: "bytes4" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      {
        name: "key",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      {
        name: "params",
        internalType: "struct IPoolManager.SwapParams",
        type: "tuple",
        components: [
          { name: "zeroForOne", internalType: "bool", type: "bool" },
          { name: "amountSpecified", internalType: "int256", type: "int256" },
          { name: "sqrtPriceLimitX96", internalType: "uint160", type: "uint160" },
        ],
      },
      { name: "hookData", internalType: "bytes", type: "bytes" },
    ],
    name: "beforeSwap",
    outputs: [
      { name: "", internalType: "bytes4", type: "bytes4" },
      { name: "", internalType: "BeforeSwapDelta", type: "int256" },
      { name: "", internalType: "uint24", type: "uint24" },
    ],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMulticall3
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMulticall3ABI = [
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      {
        name: "calls",
        internalType: "struct IMulticall3.Call[]",
        type: "tuple[]",
        components: [
          { name: "target", internalType: "address", type: "address" },
          { name: "callData", internalType: "bytes", type: "bytes" },
        ],
      },
    ],
    name: "aggregate",
    outputs: [
      { name: "blockNumber", internalType: "uint256", type: "uint256" },
      { name: "returnData", internalType: "bytes[]", type: "bytes[]" },
    ],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      {
        name: "calls",
        internalType: "struct IMulticall3.Call3[]",
        type: "tuple[]",
        components: [
          { name: "target", internalType: "address", type: "address" },
          { name: "allowFailure", internalType: "bool", type: "bool" },
          { name: "callData", internalType: "bytes", type: "bytes" },
        ],
      },
    ],
    name: "aggregate3",
    outputs: [
      {
        name: "returnData",
        internalType: "struct IMulticall3.Result[]",
        type: "tuple[]",
        components: [
          { name: "success", internalType: "bool", type: "bool" },
          { name: "returnData", internalType: "bytes", type: "bytes" },
        ],
      },
    ],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      {
        name: "calls",
        internalType: "struct IMulticall3.Call3Value[]",
        type: "tuple[]",
        components: [
          { name: "target", internalType: "address", type: "address" },
          { name: "allowFailure", internalType: "bool", type: "bool" },
          { name: "value", internalType: "uint256", type: "uint256" },
          { name: "callData", internalType: "bytes", type: "bytes" },
        ],
      },
    ],
    name: "aggregate3Value",
    outputs: [
      {
        name: "returnData",
        internalType: "struct IMulticall3.Result[]",
        type: "tuple[]",
        components: [
          { name: "success", internalType: "bool", type: "bool" },
          { name: "returnData", internalType: "bytes", type: "bytes" },
        ],
      },
    ],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      {
        name: "calls",
        internalType: "struct IMulticall3.Call[]",
        type: "tuple[]",
        components: [
          { name: "target", internalType: "address", type: "address" },
          { name: "callData", internalType: "bytes", type: "bytes" },
        ],
      },
    ],
    name: "blockAndAggregate",
    outputs: [
      { name: "blockNumber", internalType: "uint256", type: "uint256" },
      { name: "blockHash", internalType: "bytes32", type: "bytes32" },
      {
        name: "returnData",
        internalType: "struct IMulticall3.Result[]",
        type: "tuple[]",
        components: [
          { name: "success", internalType: "bool", type: "bool" },
          { name: "returnData", internalType: "bytes", type: "bytes" },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "getBasefee",
    outputs: [{ name: "basefee", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "blockNumber", internalType: "uint256", type: "uint256" }],
    name: "getBlockHash",
    outputs: [{ name: "blockHash", internalType: "bytes32", type: "bytes32" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "getBlockNumber",
    outputs: [{ name: "blockNumber", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "getChainId",
    outputs: [{ name: "chainid", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "getCurrentBlockCoinbase",
    outputs: [{ name: "coinbase", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "getCurrentBlockDifficulty",
    outputs: [{ name: "difficulty", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "getCurrentBlockGasLimit",
    outputs: [{ name: "gaslimit", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "getCurrentBlockTimestamp",
    outputs: [{ name: "timestamp", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "addr", internalType: "address", type: "address" }],
    name: "getEthBalance",
    outputs: [{ name: "balance", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "getLastBlockHash",
    outputs: [{ name: "blockHash", internalType: "bytes32", type: "bytes32" }],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      { name: "requireSuccess", internalType: "bool", type: "bool" },
      {
        name: "calls",
        internalType: "struct IMulticall3.Call[]",
        type: "tuple[]",
        components: [
          { name: "target", internalType: "address", type: "address" },
          { name: "callData", internalType: "bytes", type: "bytes" },
        ],
      },
    ],
    name: "tryAggregate",
    outputs: [
      {
        name: "returnData",
        internalType: "struct IMulticall3.Result[]",
        type: "tuple[]",
        components: [
          { name: "success", internalType: "bool", type: "bool" },
          { name: "returnData", internalType: "bytes", type: "bytes" },
        ],
      },
    ],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      { name: "requireSuccess", internalType: "bool", type: "bool" },
      {
        name: "calls",
        internalType: "struct IMulticall3.Call[]",
        type: "tuple[]",
        components: [
          { name: "target", internalType: "address", type: "address" },
          { name: "callData", internalType: "bytes", type: "bytes" },
        ],
      },
    ],
    name: "tryBlockAndAggregate",
    outputs: [
      { name: "blockNumber", internalType: "uint256", type: "uint256" },
      { name: "blockHash", internalType: "bytes32", type: "bytes32" },
      {
        name: "returnData",
        internalType: "struct IMulticall3.Result[]",
        type: "tuple[]",
        components: [
          { name: "success", internalType: "bool", type: "bool" },
          { name: "returnData", internalType: "bytes", type: "bytes" },
        ],
      },
    ],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IOracleSwap
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iOracleSwapABI = [
  { type: "error", inputs: [], name: "AddLiquidityThroughHook" },
  { type: "error", inputs: [], name: "NotOwner" },
  { type: "error", inputs: [], name: "StalePrice" },
  { type: "error", inputs: [], name: "TwoTokensAdded" },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IPoolManager
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iPoolManagerABI = [
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
      { name: "id", internalType: "uint256", type: "uint256" },
    ],
    name: "allowance",
    outputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "id", internalType: "uint256", type: "uint256" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "id", internalType: "uint256", type: "uint256" },
    ],
    name: "balanceOf",
    outputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "id", internalType: "uint256", type: "uint256" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "burn",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "currency", internalType: "Currency", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "clear",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "recipient", internalType: "address", type: "address" },
      { name: "currency", internalType: "Currency", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "collectProtocolFees",
    outputs: [{ name: "amountCollected", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "key",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      { name: "amount0", internalType: "uint256", type: "uint256" },
      { name: "amount1", internalType: "uint256", type: "uint256" },
      { name: "hookData", internalType: "bytes", type: "bytes" },
    ],
    name: "donate",
    outputs: [{ name: "", internalType: "BalanceDelta", type: "int256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "slot", internalType: "bytes32", type: "bytes32" }],
    name: "extsload",
    outputs: [{ name: "value", internalType: "bytes32", type: "bytes32" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "startSlot", internalType: "bytes32", type: "bytes32" },
      { name: "nSlots", internalType: "uint256", type: "uint256" },
    ],
    name: "extsload",
    outputs: [{ name: "values", internalType: "bytes32[]", type: "bytes32[]" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "slots", internalType: "bytes32[]", type: "bytes32[]" }],
    name: "extsload",
    outputs: [{ name: "values", internalType: "bytes32[]", type: "bytes32[]" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "slots", internalType: "bytes32[]", type: "bytes32[]" }],
    name: "exttload",
    outputs: [{ name: "values", internalType: "bytes32[]", type: "bytes32[]" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "slot", internalType: "bytes32", type: "bytes32" }],
    name: "exttload",
    outputs: [{ name: "value", internalType: "bytes32", type: "bytes32" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "key",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      { name: "sqrtPriceX96", internalType: "uint160", type: "uint160" },
      { name: "hookData", internalType: "bytes", type: "bytes" },
    ],
    name: "initialize",
    outputs: [{ name: "tick", internalType: "int24", type: "int24" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
    ],
    name: "isOperator",
    outputs: [{ name: "approved", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "id", internalType: "uint256", type: "uint256" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "key",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      {
        name: "params",
        internalType: "struct IPoolManager.ModifyLiquidityParams",
        type: "tuple",
        components: [
          { name: "tickLower", internalType: "int24", type: "int24" },
          { name: "tickUpper", internalType: "int24", type: "int24" },
          { name: "liquidityDelta", internalType: "int256", type: "int256" },
          { name: "salt", internalType: "bytes32", type: "bytes32" },
        ],
      },
      { name: "hookData", internalType: "bytes", type: "bytes" },
    ],
    name: "modifyLiquidity",
    outputs: [
      { name: "callerDelta", internalType: "BalanceDelta", type: "int256" },
      { name: "feeDelta", internalType: "BalanceDelta", type: "int256" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "protocolFeeController",
    outputs: [{ name: "", internalType: "contract IProtocolFeeController", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "currency", internalType: "Currency", type: "address" }],
    name: "protocolFeesAccrued",
    outputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "operator", internalType: "address", type: "address" },
      { name: "approved", internalType: "bool", type: "bool" },
    ],
    name: "setOperator",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "key",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      { name: "newProtocolFee", internalType: "uint24", type: "uint24" },
    ],
    name: "setProtocolFee",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "controller", internalType: "contract IProtocolFeeController", type: "address" }],
    name: "setProtocolFeeController",
    outputs: [],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [],
    name: "settle",
    outputs: [{ name: "paid", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [{ name: "recipient", internalType: "address", type: "address" }],
    name: "settleFor",
    outputs: [{ name: "paid", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "key",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      {
        name: "params",
        internalType: "struct IPoolManager.SwapParams",
        type: "tuple",
        components: [
          { name: "zeroForOne", internalType: "bool", type: "bool" },
          { name: "amountSpecified", internalType: "int256", type: "int256" },
          { name: "sqrtPriceLimitX96", internalType: "uint160", type: "uint160" },
        ],
      },
      { name: "hookData", internalType: "bytes", type: "bytes" },
    ],
    name: "swap",
    outputs: [{ name: "swapDelta", internalType: "BalanceDelta", type: "int256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "currency", internalType: "Currency", type: "address" }],
    name: "sync",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "currency", internalType: "Currency", type: "address" },
      { name: "to", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "take",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "receiver", internalType: "address", type: "address" },
      { name: "id", internalType: "uint256", type: "uint256" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      { name: "receiver", internalType: "address", type: "address" },
      { name: "id", internalType: "uint256", type: "uint256" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "data", internalType: "bytes", type: "bytes" }],
    name: "unlock",
    outputs: [{ name: "", internalType: "bytes", type: "bytes" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "key",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      { name: "newDynamicLPFee", internalType: "uint24", type: "uint24" },
    ],
    name: "updateDynamicLPFee",
    outputs: [],
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "owner", internalType: "address", type: "address", indexed: true },
      { name: "spender", internalType: "address", type: "address", indexed: true },
      { name: "id", internalType: "uint256", type: "uint256", indexed: true },
      { name: "amount", internalType: "uint256", type: "uint256", indexed: false },
    ],
    name: "Approval",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "id", internalType: "PoolId", type: "bytes32", indexed: true },
      { name: "currency0", internalType: "Currency", type: "address", indexed: true },
      { name: "currency1", internalType: "Currency", type: "address", indexed: true },
      { name: "fee", internalType: "uint24", type: "uint24", indexed: false },
      { name: "tickSpacing", internalType: "int24", type: "int24", indexed: false },
      { name: "hooks", internalType: "contract IHooks", type: "address", indexed: false },
      { name: "sqrtPriceX96", internalType: "uint160", type: "uint160", indexed: false },
      { name: "tick", internalType: "int24", type: "int24", indexed: false },
    ],
    name: "Initialize",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "id", internalType: "PoolId", type: "bytes32", indexed: true },
      { name: "sender", internalType: "address", type: "address", indexed: true },
      { name: "tickLower", internalType: "int24", type: "int24", indexed: false },
      { name: "tickUpper", internalType: "int24", type: "int24", indexed: false },
      { name: "liquidityDelta", internalType: "int256", type: "int256", indexed: false },
      { name: "salt", internalType: "bytes32", type: "bytes32", indexed: false },
    ],
    name: "ModifyLiquidity",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "owner", internalType: "address", type: "address", indexed: true },
      { name: "operator", internalType: "address", type: "address", indexed: true },
      { name: "approved", internalType: "bool", type: "bool", indexed: false },
    ],
    name: "OperatorSet",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "protocolFeeController", internalType: "address", type: "address", indexed: true }],
    name: "ProtocolFeeControllerUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "id", internalType: "PoolId", type: "bytes32", indexed: true },
      { name: "protocolFee", internalType: "uint24", type: "uint24", indexed: false },
    ],
    name: "ProtocolFeeUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "id", internalType: "PoolId", type: "bytes32", indexed: true },
      { name: "sender", internalType: "address", type: "address", indexed: true },
      { name: "amount0", internalType: "int128", type: "int128", indexed: false },
      { name: "amount1", internalType: "int128", type: "int128", indexed: false },
      { name: "sqrtPriceX96", internalType: "uint160", type: "uint160", indexed: false },
      { name: "liquidity", internalType: "uint128", type: "uint128", indexed: false },
      { name: "tick", internalType: "int24", type: "int24", indexed: false },
      { name: "fee", internalType: "uint24", type: "uint24", indexed: false },
    ],
    name: "Swap",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "caller", internalType: "address", type: "address", indexed: false },
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      { name: "id", internalType: "uint256", type: "uint256", indexed: true },
      { name: "amount", internalType: "uint256", type: "uint256", indexed: false },
    ],
    name: "Transfer",
  },
  { type: "error", inputs: [], name: "AlreadyUnlocked" },
  {
    type: "error",
    inputs: [
      { name: "currency0", internalType: "address", type: "address" },
      { name: "currency1", internalType: "address", type: "address" },
    ],
    name: "CurrenciesOutOfOrderOrEqual",
  },
  { type: "error", inputs: [], name: "CurrencyNotSettled" },
  { type: "error", inputs: [], name: "InvalidCaller" },
  { type: "error", inputs: [], name: "ManagerLocked" },
  { type: "error", inputs: [], name: "MustClearExactPositiveDelta" },
  { type: "error", inputs: [], name: "NonzeroNativeValue" },
  { type: "error", inputs: [], name: "PoolNotInitialized" },
  { type: "error", inputs: [], name: "ProtocolFeeCannotBeFetched" },
  { type: "error", inputs: [{ name: "fee", internalType: "uint24", type: "uint24" }], name: "ProtocolFeeTooLarge" },
  { type: "error", inputs: [], name: "SwapAmountCannotBeZero" },
  {
    type: "error",
    inputs: [{ name: "tickSpacing", internalType: "int24", type: "int24" }],
    name: "TickSpacingTooLarge",
  },
  {
    type: "error",
    inputs: [{ name: "tickSpacing", internalType: "int24", type: "int24" }],
    name: "TickSpacingTooSmall",
  },
  { type: "error", inputs: [], name: "UnauthorizedDynamicLPFeeUpdate" },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IPriceOracle
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iPriceOracleABI = [
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "token", internalType: "string", type: "string" }],
    name: "tokenPrices",
    outputs: [
      {
        name: "",
        internalType: "struct IPriceOracle.TokenPrice",
        type: "tuple",
        components: [
          { name: "price", internalType: "uint256", type: "uint256" },
          { name: "updatedAt", internalType: "uint256", type: "uint256" },
        ],
      },
    ],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IProtocolFeeController
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iProtocolFeeControllerABI = [
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      {
        name: "poolKey",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
    ],
    name: "protocolFeeForPool",
    outputs: [{ name: "protocolFee", internalType: "uint24", type: "uint24" }],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IProtocolFees
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iProtocolFeesABI = [
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "recipient", internalType: "address", type: "address" },
      { name: "currency", internalType: "Currency", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "collectProtocolFees",
    outputs: [{ name: "amountCollected", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "protocolFeeController",
    outputs: [{ name: "", internalType: "contract IProtocolFeeController", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "currency", internalType: "Currency", type: "address" }],
    name: "protocolFeesAccrued",
    outputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "key",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      { name: "newProtocolFee", internalType: "uint24", type: "uint24" },
    ],
    name: "setProtocolFee",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "controller", internalType: "contract IProtocolFeeController", type: "address" }],
    name: "setProtocolFeeController",
    outputs: [],
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "protocolFeeController", internalType: "address", type: "address", indexed: true }],
    name: "ProtocolFeeControllerUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "id", internalType: "PoolId", type: "bytes32", indexed: true },
      { name: "protocolFee", internalType: "uint24", type: "uint24", indexed: false },
    ],
    name: "ProtocolFeeUpdated",
  },
  { type: "error", inputs: [], name: "InvalidCaller" },
  { type: "error", inputs: [], name: "ProtocolFeeCannotBeFetched" },
  { type: "error", inputs: [{ name: "fee", internalType: "uint24", type: "uint24" }], name: "ProtocolFeeTooLarge" },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IUnlockCallback
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iUnlockCallbackABI = [
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "data", internalType: "bytes", type: "bytes" }],
    name: "unlockCallback",
    outputs: [{ name: "", internalType: "bytes", type: "bytes" }],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ImmutableState
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const immutableStateABI = [
  {
    stateMutability: "nonpayable",
    type: "constructor",
    inputs: [{ name: "_poolManager", internalType: "contract IPoolManager", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "poolManager",
    outputs: [{ name: "", internalType: "contract IPoolManager", type: "address" }],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// InvalidReturnSizeProtocolFeeControllerTest
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const invalidReturnSizeProtocolFeeControllerTestABI = [
  {
    stateMutability: "pure",
    type: "function",
    inputs: [
      {
        name: "",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
    ],
    name: "protocolFeeForPool",
    outputs: [{ name: "", internalType: "uint24", type: "uint24" }],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LPFeeLibrary
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const lpFeeLibraryABI = [
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "DYNAMIC_FEE_FLAG",
    outputs: [{ name: "", internalType: "uint24", type: "uint24" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "MAX_LP_FEE",
    outputs: [{ name: "", internalType: "uint24", type: "uint24" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "OVERRIDE_FEE_FLAG",
    outputs: [{ name: "", internalType: "uint24", type: "uint24" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "REMOVE_OVERRIDE_MASK",
    outputs: [{ name: "", internalType: "uint24", type: "uint24" }],
  },
  { type: "error", inputs: [{ name: "fee", internalType: "uint24", type: "uint24" }], name: "LPFeeTooLarge" },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MockERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const mockErc20ABI = [
  {
    stateMutability: "nonpayable",
    type: "constructor",
    inputs: [
      { name: "_name", internalType: "string", type: "string" },
      { name: "_symbol", internalType: "string", type: "string" },
      { name: "_decimals", internalType: "uint8", type: "uint8" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      { name: "", internalType: "address", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "burn",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", internalType: "uint8", type: "uint8" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ name: "", internalType: "string", type: "string" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "", internalType: "address", type: "address" }],
    name: "nonces",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
      { name: "value", internalType: "uint256", type: "uint256" },
      { name: "deadline", internalType: "uint256", type: "uint256" },
      { name: "v", internalType: "uint8", type: "uint8" },
      { name: "r", internalType: "bytes32", type: "bytes32" },
      { name: "s", internalType: "bytes32", type: "bytes32" },
    ],
    name: "permit",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", internalType: "string", type: "string" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "to", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "owner", internalType: "address", type: "address", indexed: true },
      { name: "spender", internalType: "address", type: "address", indexed: true },
      { name: "amount", internalType: "uint256", type: "uint256", indexed: false },
    ],
    name: "Approval",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      { name: "amount", internalType: "uint256", type: "uint256", indexed: false },
    ],
    name: "Transfer",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MockERC721
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const mockErc721ABI = [
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "id", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "id", internalType: "uint256", type: "uint256" }],
    name: "getApproved",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "name_", internalType: "string", type: "string" },
      { name: "symbol_", internalType: "string", type: "string" },
    ],
    name: "initialize",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "operator", internalType: "address", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ name: "", internalType: "string", type: "string" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "id", internalType: "uint256", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ name: "owner", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "to", internalType: "address", type: "address" },
      { name: "id", internalType: "uint256", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "to", internalType: "address", type: "address" },
      { name: "id", internalType: "uint256", type: "uint256" },
      { name: "data", internalType: "bytes", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "operator", internalType: "address", type: "address" },
      { name: "approved", internalType: "bool", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "interfaceId", internalType: "bytes4", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", internalType: "string", type: "string" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "id", internalType: "uint256", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ name: "", internalType: "string", type: "string" }],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "to", internalType: "address", type: "address" },
      { name: "id", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "_owner", internalType: "address", type: "address", indexed: true },
      { name: "_approved", internalType: "address", type: "address", indexed: true },
      { name: "_tokenId", internalType: "uint256", type: "uint256", indexed: true },
    ],
    name: "Approval",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "_owner", internalType: "address", type: "address", indexed: true },
      { name: "_operator", internalType: "address", type: "address", indexed: true },
      { name: "_approved", internalType: "bool", type: "bool", indexed: false },
    ],
    name: "ApprovalForAll",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "_from", internalType: "address", type: "address", indexed: true },
      { name: "_to", internalType: "address", type: "address", indexed: true },
      { name: "_tokenId", internalType: "uint256", type: "uint256", indexed: true },
    ],
    name: "Transfer",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MockPriceOracle
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const mockPriceOracleABI = [
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "token", internalType: "string", type: "string" }],
    name: "tokenPrices",
    outputs: [
      {
        name: "",
        internalType: "struct IPriceOracle.TokenPrice",
        type: "tuple",
        components: [
          { name: "price", internalType: "uint256", type: "uint256" },
          { name: "updatedAt", internalType: "uint256", type: "uint256" },
        ],
      },
    ],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "tokenName", internalType: "string", type: "string" },
      { name: "price", internalType: "uint256", type: "uint256" },
    ],
    name: "updatePrice",
    outputs: [],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// NestedActionExecutor
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const nestedActionExecutorABI = [
  {
    stateMutability: "nonpayable",
    type: "constructor",
    inputs: [
      { name: "_manager", internalType: "contract IPoolManager", type: "address" },
      { name: "_user", internalType: "address", type: "address" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "IS_TEST",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "excludeArtifacts",
    outputs: [{ name: "excludedArtifacts_", internalType: "string[]", type: "string[]" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "excludeContracts",
    outputs: [{ name: "excludedContracts_", internalType: "address[]", type: "address[]" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "excludeSelectors",
    outputs: [
      {
        name: "excludedSelectors_",
        internalType: "struct StdInvariant.FuzzSelector[]",
        type: "tuple[]",
        components: [
          { name: "addr", internalType: "address", type: "address" },
          { name: "selectors", internalType: "bytes4[]", type: "bytes4[]" },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "excludeSenders",
    outputs: [{ name: "excludedSenders_", internalType: "address[]", type: "address[]" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "actions", internalType: "enum Action[]", type: "uint8[]" }],
    name: "execute",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "failed",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "manager",
    outputs: [{ name: "", internalType: "contract IPoolManager", type: "address" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "_key",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
    ],
    name: "setKey",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "targetArtifactSelectors",
    outputs: [
      {
        name: "targetedArtifactSelectors_",
        internalType: "struct StdInvariant.FuzzArtifactSelector[]",
        type: "tuple[]",
        components: [
          { name: "artifact", internalType: "string", type: "string" },
          { name: "selectors", internalType: "bytes4[]", type: "bytes4[]" },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "targetArtifacts",
    outputs: [{ name: "targetedArtifacts_", internalType: "string[]", type: "string[]" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "targetContracts",
    outputs: [{ name: "targetedContracts_", internalType: "address[]", type: "address[]" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "targetInterfaces",
    outputs: [
      {
        name: "targetedInterfaces_",
        internalType: "struct StdInvariant.FuzzInterface[]",
        type: "tuple[]",
        components: [
          { name: "addr", internalType: "address", type: "address" },
          { name: "artifacts", internalType: "string[]", type: "string[]" },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "targetSelectors",
    outputs: [
      {
        name: "targetedSelectors_",
        internalType: "struct StdInvariant.FuzzSelector[]",
        type: "tuple[]",
        components: [
          { name: "addr", internalType: "address", type: "address" },
          { name: "selectors", internalType: "bytes4[]", type: "bytes4[]" },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "targetSenders",
    outputs: [{ name: "targetedSenders_", internalType: "address[]", type: "address[]" }],
  },
  {
    stateMutability: "pure",
    type: "function",
    inputs: [{ name: "", internalType: "bytes", type: "bytes" }],
    name: "unlockCallback",
    outputs: [{ name: "", internalType: "bytes", type: "bytes" }],
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "", internalType: "string", type: "string", indexed: false }],
    name: "log",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "", internalType: "address", type: "address", indexed: false }],
    name: "log_address",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "val", internalType: "uint256[]", type: "uint256[]", indexed: false }],
    name: "log_array",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "val", internalType: "int256[]", type: "int256[]", indexed: false }],
    name: "log_array",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "val", internalType: "address[]", type: "address[]", indexed: false }],
    name: "log_array",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "", internalType: "bytes", type: "bytes", indexed: false }],
    name: "log_bytes",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "", internalType: "bytes32", type: "bytes32", indexed: false }],
    name: "log_bytes32",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "", internalType: "int256", type: "int256", indexed: false }],
    name: "log_int",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "address", type: "address", indexed: false },
    ],
    name: "log_named_address",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "uint256[]", type: "uint256[]", indexed: false },
    ],
    name: "log_named_array",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "int256[]", type: "int256[]", indexed: false },
    ],
    name: "log_named_array",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "address[]", type: "address[]", indexed: false },
    ],
    name: "log_named_array",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "bytes", type: "bytes", indexed: false },
    ],
    name: "log_named_bytes",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "bytes32", type: "bytes32", indexed: false },
    ],
    name: "log_named_bytes32",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "int256", type: "int256", indexed: false },
      { name: "decimals", internalType: "uint256", type: "uint256", indexed: false },
    ],
    name: "log_named_decimal_int",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "uint256", type: "uint256", indexed: false },
      { name: "decimals", internalType: "uint256", type: "uint256", indexed: false },
    ],
    name: "log_named_decimal_uint",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "int256", type: "int256", indexed: false },
    ],
    name: "log_named_int",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "string", type: "string", indexed: false },
    ],
    name: "log_named_string",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "uint256", type: "uint256", indexed: false },
    ],
    name: "log_named_uint",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "", internalType: "string", type: "string", indexed: false }],
    name: "log_string",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "", internalType: "uint256", type: "uint256", indexed: false }],
    name: "log_uint",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "", internalType: "bytes", type: "bytes", indexed: false }],
    name: "logs",
  },
  { type: "error", inputs: [], name: "KeyNotSet" },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// NoDelegateCall
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const noDelegateCallABI = [{ type: "error", inputs: [], name: "DelegateCallNotAllowed" }] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OracleSwap
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const oracleSwapABI = [
  {
    stateMutability: "nonpayable",
    type: "constructor",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "poolManager", internalType: "contract IPoolManager", type: "address" },
      { name: "_priceOracle", internalType: "contract IPriceOracle", type: "address" },
    ],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      {
        name: "",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      {
        name: "",
        internalType: "struct IPoolManager.ModifyLiquidityParams",
        type: "tuple",
        components: [
          { name: "tickLower", internalType: "int24", type: "int24" },
          { name: "tickUpper", internalType: "int24", type: "int24" },
          { name: "liquidityDelta", internalType: "int256", type: "int256" },
          { name: "salt", internalType: "bytes32", type: "bytes32" },
        ],
      },
      { name: "", internalType: "BalanceDelta", type: "int256" },
      { name: "", internalType: "bytes", type: "bytes" },
    ],
    name: "afterAddLiquidity",
    outputs: [
      { name: "", internalType: "bytes4", type: "bytes4" },
      { name: "", internalType: "BalanceDelta", type: "int256" },
    ],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      {
        name: "",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      { name: "", internalType: "uint256", type: "uint256" },
      { name: "", internalType: "uint256", type: "uint256" },
      { name: "", internalType: "bytes", type: "bytes" },
    ],
    name: "afterDonate",
    outputs: [{ name: "", internalType: "bytes4", type: "bytes4" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      {
        name: "",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      { name: "", internalType: "uint160", type: "uint160" },
      { name: "", internalType: "int24", type: "int24" },
      { name: "", internalType: "bytes", type: "bytes" },
    ],
    name: "afterInitialize",
    outputs: [{ name: "", internalType: "bytes4", type: "bytes4" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      {
        name: "",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      {
        name: "",
        internalType: "struct IPoolManager.ModifyLiquidityParams",
        type: "tuple",
        components: [
          { name: "tickLower", internalType: "int24", type: "int24" },
          { name: "tickUpper", internalType: "int24", type: "int24" },
          { name: "liquidityDelta", internalType: "int256", type: "int256" },
          { name: "salt", internalType: "bytes32", type: "bytes32" },
        ],
      },
      { name: "", internalType: "BalanceDelta", type: "int256" },
      { name: "", internalType: "bytes", type: "bytes" },
    ],
    name: "afterRemoveLiquidity",
    outputs: [
      { name: "", internalType: "bytes4", type: "bytes4" },
      { name: "", internalType: "BalanceDelta", type: "int256" },
    ],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      {
        name: "",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      {
        name: "",
        internalType: "struct IPoolManager.SwapParams",
        type: "tuple",
        components: [
          { name: "zeroForOne", internalType: "bool", type: "bool" },
          { name: "amountSpecified", internalType: "int256", type: "int256" },
          { name: "sqrtPriceLimitX96", internalType: "uint160", type: "uint160" },
        ],
      },
      { name: "", internalType: "BalanceDelta", type: "int256" },
      { name: "", internalType: "bytes", type: "bytes" },
    ],
    name: "afterSwap",
    outputs: [
      { name: "", internalType: "bytes4", type: "bytes4" },
      { name: "", internalType: "int128", type: "int128" },
    ],
  },
  {
    stateMutability: "pure",
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      {
        name: "",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      {
        name: "",
        internalType: "struct IPoolManager.ModifyLiquidityParams",
        type: "tuple",
        components: [
          { name: "tickLower", internalType: "int24", type: "int24" },
          { name: "tickUpper", internalType: "int24", type: "int24" },
          { name: "liquidityDelta", internalType: "int256", type: "int256" },
          { name: "salt", internalType: "bytes32", type: "bytes32" },
        ],
      },
      { name: "", internalType: "bytes", type: "bytes" },
    ],
    name: "beforeAddLiquidity",
    outputs: [{ name: "", internalType: "bytes4", type: "bytes4" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      {
        name: "",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      { name: "", internalType: "uint256", type: "uint256" },
      { name: "", internalType: "uint256", type: "uint256" },
      { name: "", internalType: "bytes", type: "bytes" },
    ],
    name: "beforeDonate",
    outputs: [{ name: "", internalType: "bytes4", type: "bytes4" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      {
        name: "",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      { name: "", internalType: "uint160", type: "uint160" },
      { name: "", internalType: "bytes", type: "bytes" },
    ],
    name: "beforeInitialize",
    outputs: [{ name: "", internalType: "bytes4", type: "bytes4" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      {
        name: "",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      {
        name: "",
        internalType: "struct IPoolManager.ModifyLiquidityParams",
        type: "tuple",
        components: [
          { name: "tickLower", internalType: "int24", type: "int24" },
          { name: "tickUpper", internalType: "int24", type: "int24" },
          { name: "liquidityDelta", internalType: "int256", type: "int256" },
          { name: "salt", internalType: "bytes32", type: "bytes32" },
        ],
      },
      { name: "", internalType: "bytes", type: "bytes" },
    ],
    name: "beforeRemoveLiquidity",
    outputs: [{ name: "", internalType: "bytes4", type: "bytes4" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      {
        name: "key",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      {
        name: "params",
        internalType: "struct IPoolManager.SwapParams",
        type: "tuple",
        components: [
          { name: "zeroForOne", internalType: "bool", type: "bool" },
          { name: "amountSpecified", internalType: "int256", type: "int256" },
          { name: "sqrtPriceLimitX96", internalType: "uint160", type: "uint160" },
        ],
      },
      { name: "hookData", internalType: "bytes", type: "bytes" },
    ],
    name: "beforeSwap",
    outputs: [
      { name: "", internalType: "bytes4", type: "bytes4" },
      { name: "", internalType: "BeforeSwapDelta", type: "int256" },
      { name: "", internalType: "uint24", type: "uint24" },
    ],
  },
  {
    stateMutability: "pure",
    type: "function",
    inputs: [],
    name: "getHookPermissions",
    outputs: [
      {
        name: "",
        internalType: "struct Hooks.Permissions",
        type: "tuple",
        components: [
          { name: "beforeInitialize", internalType: "bool", type: "bool" },
          { name: "afterInitialize", internalType: "bool", type: "bool" },
          { name: "beforeAddLiquidity", internalType: "bool", type: "bool" },
          { name: "afterAddLiquidity", internalType: "bool", type: "bool" },
          { name: "beforeRemoveLiquidity", internalType: "bool", type: "bool" },
          { name: "afterRemoveLiquidity", internalType: "bool", type: "bool" },
          { name: "beforeSwap", internalType: "bool", type: "bool" },
          { name: "afterSwap", internalType: "bool", type: "bool" },
          { name: "beforeDonate", internalType: "bool", type: "bool" },
          { name: "afterDonate", internalType: "bool", type: "bool" },
          { name: "beforeSwapReturnDelta", internalType: "bool", type: "bool" },
          { name: "afterSwapReturnDelta", internalType: "bool", type: "bool" },
          { name: "afterAddLiquidityReturnDelta", internalType: "bool", type: "bool" },
          { name: "afterRemoveLiquidityReturnDelta", internalType: "bool", type: "bool" },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "oneForZeroEndTaskId",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "oneForZeroStartTaskId",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "poolManager",
    outputs: [{ name: "", internalType: "contract IPoolManager", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "priceOracle",
    outputs: [{ name: "", internalType: "contract IPriceOracle", type: "address" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "key",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "isZero", internalType: "bool", type: "bool" },
    ],
    name: "process",
    outputs: [],
  },
  { stateMutability: "nonpayable", type: "function", inputs: [], name: "renounceOwnership", outputs: [] },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "zeroForOne", internalType: "bool", type: "bool" },
      { name: "taskId", internalType: "uint256", type: "uint256" },
    ],
    name: "swapQueue",
    outputs: [
      { name: "receiver", internalType: "address", type: "address" },
      { name: "amountSpecified", internalType: "uint256", type: "uint256" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "tokenName",
    outputs: [{ name: "", internalType: "string", type: "string" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "data", internalType: "bytes", type: "bytes" }],
    name: "unlockCallback",
    outputs: [{ name: "", internalType: "bytes", type: "bytes" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "zeroForOneEndTaskId",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "zeroForOneStartTaskId",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "previousOwner", internalType: "address", type: "address", indexed: true },
      { name: "newOwner", internalType: "address", type: "address", indexed: true },
    ],
    name: "OwnershipTransferred",
  },
  { type: "error", inputs: [], name: "AddLiquidityThroughHook" },
  { type: "error", inputs: [], name: "HookNotImplemented" },
  { type: "error", inputs: [], name: "InvalidPool" },
  { type: "error", inputs: [], name: "LockFailure" },
  { type: "error", inputs: [], name: "NotOwner" },
  { type: "error", inputs: [], name: "NotPoolManager" },
  { type: "error", inputs: [], name: "NotSelf" },
  { type: "error", inputs: [{ name: "owner", internalType: "address", type: "address" }], name: "OwnableInvalidOwner" },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "OwnableUnauthorizedAccount",
  },
  { type: "error", inputs: [], name: "StalePrice" },
  { type: "error", inputs: [], name: "TwoTokensAdded" },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OutOfBoundsProtocolFeeControllerTest
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const outOfBoundsProtocolFeeControllerTestABI = [
  {
    stateMutability: "pure",
    type: "function",
    inputs: [
      {
        name: "",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
    ],
    name: "protocolFeeForPool",
    outputs: [{ name: "", internalType: "uint24", type: "uint24" }],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OverflowProtocolFeeControllerTest
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const overflowProtocolFeeControllerTestABI = [
  {
    stateMutability: "pure",
    type: "function",
    inputs: [
      {
        name: "",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
    ],
    name: "protocolFeeForPool",
    outputs: [{ name: "", internalType: "uint24", type: "uint24" }],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ownable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ownableABI = [
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  { stateMutability: "nonpayable", type: "function", inputs: [], name: "renounceOwnership", outputs: [] },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "previousOwner", internalType: "address", type: "address", indexed: true },
      { name: "newOwner", internalType: "address", type: "address", indexed: true },
    ],
    name: "OwnershipTransferred",
  },
  { type: "error", inputs: [{ name: "owner", internalType: "address", type: "address" }], name: "OwnableInvalidOwner" },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "OwnableUnauthorizedAccount",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Owned
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ownedABI = [
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "user", internalType: "address", type: "address", indexed: true },
      { name: "newOwner", internalType: "address", type: "address", indexed: true },
    ],
    name: "OwnershipTransferred",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Pool
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const poolABI = [
  { type: "error", inputs: [], name: "InvalidFeeForExactOut" },
  { type: "error", inputs: [], name: "NoLiquidityToReceiveFees" },
  { type: "error", inputs: [], name: "PoolAlreadyInitialized" },
  { type: "error", inputs: [], name: "PoolNotInitialized" },
  {
    type: "error",
    inputs: [
      { name: "sqrtPriceCurrentX96", internalType: "uint160", type: "uint160" },
      { name: "sqrtPriceLimitX96", internalType: "uint160", type: "uint160" },
    ],
    name: "PriceLimitAlreadyExceeded",
  },
  {
    type: "error",
    inputs: [{ name: "sqrtPriceLimitX96", internalType: "uint160", type: "uint160" }],
    name: "PriceLimitOutOfBounds",
  },
  { type: "error", inputs: [{ name: "tick", internalType: "int24", type: "int24" }], name: "TickLiquidityOverflow" },
  {
    type: "error",
    inputs: [{ name: "tickLower", internalType: "int24", type: "int24" }],
    name: "TickLowerOutOfBounds",
  },
  {
    type: "error",
    inputs: [{ name: "tickUpper", internalType: "int24", type: "int24" }],
    name: "TickUpperOutOfBounds",
  },
  {
    type: "error",
    inputs: [
      { name: "tickLower", internalType: "int24", type: "int24" },
      { name: "tickUpper", internalType: "int24", type: "int24" },
    ],
    name: "TicksMisordered",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PoolClaimsTest
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const poolClaimsTestABI = [
  {
    stateMutability: "nonpayable",
    type: "constructor",
    inputs: [{ name: "_manager", internalType: "contract IPoolManager", type: "address" }],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      { name: "currency", internalType: "Currency", type: "address" },
      { name: "user", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "deposit",
    outputs: [],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "manager",
    outputs: [{ name: "", internalType: "contract IPoolManager", type: "address" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "rawData", internalType: "bytes", type: "bytes" }],
    name: "unlockCallback",
    outputs: [{ name: "", internalType: "bytes", type: "bytes" }],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      { name: "currency", internalType: "Currency", type: "address" },
      { name: "user", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "withdraw",
    outputs: [],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PoolDonateTest
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *
 */
export const poolDonateTestABI = [
  {
    stateMutability: "nonpayable",
    type: "constructor",
    inputs: [{ name: "_manager", internalType: "contract IPoolManager", type: "address" }],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      {
        name: "key",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      { name: "amount0", internalType: "uint256", type: "uint256" },
      { name: "amount1", internalType: "uint256", type: "uint256" },
      { name: "hookData", internalType: "bytes", type: "bytes" },
    ],
    name: "donate",
    outputs: [{ name: "delta", internalType: "BalanceDelta", type: "int256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "manager",
    outputs: [{ name: "", internalType: "contract IPoolManager", type: "address" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "rawData", internalType: "bytes", type: "bytes" }],
    name: "unlockCallback",
    outputs: [{ name: "", internalType: "bytes", type: "bytes" }],
  },
] as const;

/**
 *
 */
export const poolDonateTestAddress = {
  31337: "0x4FA6C7a3A9b84F2A8340D4d33190F84e307B085c",
} as const;

/**
 *
 */
export const poolDonateTestConfig = { address: poolDonateTestAddress, abi: poolDonateTestABI } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PoolManager
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export const poolManagerABI = [
  {
    stateMutability: "nonpayable",
    type: "constructor",
    inputs: [{ name: "controllerGasLimit", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "spender", internalType: "address", type: "address" },
      { name: "id", internalType: "uint256", type: "uint256" },
    ],
    name: "allowance",
    outputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "spender", internalType: "address", type: "address" },
      { name: "id", internalType: "uint256", type: "uint256" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "id", internalType: "uint256", type: "uint256" },
    ],
    name: "balanceOf",
    outputs: [{ name: "balance", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "id", internalType: "uint256", type: "uint256" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "burn",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "currency", internalType: "Currency", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "clear",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "recipient", internalType: "address", type: "address" },
      { name: "currency", internalType: "Currency", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "collectProtocolFees",
    outputs: [{ name: "amountCollected", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "key",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      { name: "amount0", internalType: "uint256", type: "uint256" },
      { name: "amount1", internalType: "uint256", type: "uint256" },
      { name: "hookData", internalType: "bytes", type: "bytes" },
    ],
    name: "donate",
    outputs: [{ name: "delta", internalType: "BalanceDelta", type: "int256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "slot", internalType: "bytes32", type: "bytes32" }],
    name: "extsload",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "startSlot", internalType: "bytes32", type: "bytes32" },
      { name: "nSlots", internalType: "uint256", type: "uint256" },
    ],
    name: "extsload",
    outputs: [{ name: "", internalType: "bytes32[]", type: "bytes32[]" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "slots", internalType: "bytes32[]", type: "bytes32[]" }],
    name: "extsload",
    outputs: [{ name: "", internalType: "bytes32[]", type: "bytes32[]" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "slots", internalType: "bytes32[]", type: "bytes32[]" }],
    name: "exttload",
    outputs: [{ name: "", internalType: "bytes32[]", type: "bytes32[]" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "slot", internalType: "bytes32", type: "bytes32" }],
    name: "exttload",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "key",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      { name: "sqrtPriceX96", internalType: "uint160", type: "uint160" },
      { name: "hookData", internalType: "bytes", type: "bytes" },
    ],
    name: "initialize",
    outputs: [{ name: "tick", internalType: "int24", type: "int24" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "operator", internalType: "address", type: "address" },
    ],
    name: "isOperator",
    outputs: [{ name: "isOperator", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "id", internalType: "uint256", type: "uint256" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "key",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      {
        name: "params",
        internalType: "struct IPoolManager.ModifyLiquidityParams",
        type: "tuple",
        components: [
          { name: "tickLower", internalType: "int24", type: "int24" },
          { name: "tickUpper", internalType: "int24", type: "int24" },
          { name: "liquidityDelta", internalType: "int256", type: "int256" },
          { name: "salt", internalType: "bytes32", type: "bytes32" },
        ],
      },
      { name: "hookData", internalType: "bytes", type: "bytes" },
    ],
    name: "modifyLiquidity",
    outputs: [
      { name: "callerDelta", internalType: "BalanceDelta", type: "int256" },
      { name: "feesAccrued", internalType: "BalanceDelta", type: "int256" },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "protocolFeeController",
    outputs: [{ name: "", internalType: "contract IProtocolFeeController", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "currency", internalType: "Currency", type: "address" }],
    name: "protocolFeesAccrued",
    outputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "operator", internalType: "address", type: "address" },
      { name: "approved", internalType: "bool", type: "bool" },
    ],
    name: "setOperator",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "key",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      { name: "newProtocolFee", internalType: "uint24", type: "uint24" },
    ],
    name: "setProtocolFee",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "controller", internalType: "contract IProtocolFeeController", type: "address" }],
    name: "setProtocolFeeController",
    outputs: [],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [],
    name: "settle",
    outputs: [{ name: "paid", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [{ name: "recipient", internalType: "address", type: "address" }],
    name: "settleFor",
    outputs: [{ name: "paid", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "interfaceId", internalType: "bytes4", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "key",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      {
        name: "params",
        internalType: "struct IPoolManager.SwapParams",
        type: "tuple",
        components: [
          { name: "zeroForOne", internalType: "bool", type: "bool" },
          { name: "amountSpecified", internalType: "int256", type: "int256" },
          { name: "sqrtPriceLimitX96", internalType: "uint160", type: "uint160" },
        ],
      },
      { name: "hookData", internalType: "bytes", type: "bytes" },
    ],
    name: "swap",
    outputs: [{ name: "swapDelta", internalType: "BalanceDelta", type: "int256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "currency", internalType: "Currency", type: "address" }],
    name: "sync",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "currency", internalType: "Currency", type: "address" },
      { name: "to", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "take",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "receiver", internalType: "address", type: "address" },
      { name: "id", internalType: "uint256", type: "uint256" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      { name: "receiver", internalType: "address", type: "address" },
      { name: "id", internalType: "uint256", type: "uint256" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "data", internalType: "bytes", type: "bytes" }],
    name: "unlock",
    outputs: [{ name: "result", internalType: "bytes", type: "bytes" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "key",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      { name: "newDynamicLPFee", internalType: "uint24", type: "uint24" },
    ],
    name: "updateDynamicLPFee",
    outputs: [],
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "owner", internalType: "address", type: "address", indexed: true },
      { name: "spender", internalType: "address", type: "address", indexed: true },
      { name: "id", internalType: "uint256", type: "uint256", indexed: true },
      { name: "amount", internalType: "uint256", type: "uint256", indexed: false },
    ],
    name: "Approval",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "id", internalType: "PoolId", type: "bytes32", indexed: true },
      { name: "currency0", internalType: "Currency", type: "address", indexed: true },
      { name: "currency1", internalType: "Currency", type: "address", indexed: true },
      { name: "fee", internalType: "uint24", type: "uint24", indexed: false },
      { name: "tickSpacing", internalType: "int24", type: "int24", indexed: false },
      { name: "hooks", internalType: "contract IHooks", type: "address", indexed: false },
      { name: "sqrtPriceX96", internalType: "uint160", type: "uint160", indexed: false },
      { name: "tick", internalType: "int24", type: "int24", indexed: false },
    ],
    name: "Initialize",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "id", internalType: "PoolId", type: "bytes32", indexed: true },
      { name: "sender", internalType: "address", type: "address", indexed: true },
      { name: "tickLower", internalType: "int24", type: "int24", indexed: false },
      { name: "tickUpper", internalType: "int24", type: "int24", indexed: false },
      { name: "liquidityDelta", internalType: "int256", type: "int256", indexed: false },
      { name: "salt", internalType: "bytes32", type: "bytes32", indexed: false },
    ],
    name: "ModifyLiquidity",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "owner", internalType: "address", type: "address", indexed: true },
      { name: "operator", internalType: "address", type: "address", indexed: true },
      { name: "approved", internalType: "bool", type: "bool", indexed: false },
    ],
    name: "OperatorSet",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "user", internalType: "address", type: "address", indexed: true },
      { name: "newOwner", internalType: "address", type: "address", indexed: true },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "protocolFeeController", internalType: "address", type: "address", indexed: true }],
    name: "ProtocolFeeControllerUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "id", internalType: "PoolId", type: "bytes32", indexed: true },
      { name: "protocolFee", internalType: "uint24", type: "uint24", indexed: false },
    ],
    name: "ProtocolFeeUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "id", internalType: "PoolId", type: "bytes32", indexed: true },
      { name: "sender", internalType: "address", type: "address", indexed: true },
      { name: "amount0", internalType: "int128", type: "int128", indexed: false },
      { name: "amount1", internalType: "int128", type: "int128", indexed: false },
      { name: "sqrtPriceX96", internalType: "uint160", type: "uint160", indexed: false },
      { name: "liquidity", internalType: "uint128", type: "uint128", indexed: false },
      { name: "tick", internalType: "int24", type: "int24", indexed: false },
      { name: "fee", internalType: "uint24", type: "uint24", indexed: false },
    ],
    name: "Swap",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "caller", internalType: "address", type: "address", indexed: false },
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      { name: "id", internalType: "uint256", type: "uint256", indexed: true },
      { name: "amount", internalType: "uint256", type: "uint256", indexed: false },
    ],
    name: "Transfer",
  },
  { type: "error", inputs: [], name: "AlreadyUnlocked" },
  {
    type: "error",
    inputs: [
      { name: "currency0", internalType: "address", type: "address" },
      { name: "currency1", internalType: "address", type: "address" },
    ],
    name: "CurrenciesOutOfOrderOrEqual",
  },
  { type: "error", inputs: [], name: "CurrencyNotSettled" },
  { type: "error", inputs: [], name: "DelegateCallNotAllowed" },
  { type: "error", inputs: [], name: "InvalidCaller" },
  { type: "error", inputs: [], name: "ManagerLocked" },
  { type: "error", inputs: [], name: "MustClearExactPositiveDelta" },
  { type: "error", inputs: [], name: "NonzeroNativeValue" },
  { type: "error", inputs: [], name: "PoolNotInitialized" },
  { type: "error", inputs: [], name: "ProtocolFeeCannotBeFetched" },
  { type: "error", inputs: [{ name: "fee", internalType: "uint24", type: "uint24" }], name: "ProtocolFeeTooLarge" },
  { type: "error", inputs: [], name: "SwapAmountCannotBeZero" },
  {
    type: "error",
    inputs: [{ name: "tickSpacing", internalType: "int24", type: "int24" }],
    name: "TickSpacingTooLarge",
  },
  {
    type: "error",
    inputs: [{ name: "tickSpacing", internalType: "int24", type: "int24" }],
    name: "TickSpacingTooSmall",
  },
  { type: "error", inputs: [], name: "UnauthorizedDynamicLPFeeUpdate" },
] as const;

/**
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export const poolManagerAddress = {
  5: "0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b",
  420: "0xb673AE03413860776497B8C9b3E3F8d4D8745cB3",
  1442: "0xb673AE03413860776497B8C9b3E3F8d4D8745cB3",
  31337: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  80001: "0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6",
  84531: "0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D",
  421613: "0xC94a4C0a89937E278a0d427bb393134E68d5ec09",
  421614: "0xb673AE03413860776497B8C9b3E3F8d4D8745cB3",
  534351: "0xeb4708989b42f0cd327A6Bd8f76a931429137fd7",
  11155111: "0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219",
} as const;

/**
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export const poolManagerConfig = { address: poolManagerAddress, abi: poolManagerABI } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PoolModifyLiquidityTest
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x83feDBeD11B3667f40263a88e8435fca51A03F8C)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x30654C69B212AD057E817EcA26da6c5edA32E2E7)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x30654C69B212AD057E817EcA26da6c5edA32E2E7)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xB7b74B407E9bA6c070C5B5CC7E6B8E59e4642763)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xaFB341c8a50e4Bdec4E419Be7F3a6127E3BD6710)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xeb1aAdAC0a10Ac2eDFCbE496C3BCBc1dea4F994b)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x30654C69B212AD057E817EcA26da6c5edA32E2E7)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 */
export const poolModifyLiquidityTestABI = [
  {
    stateMutability: "nonpayable",
    type: "constructor",
    inputs: [{ name: "_manager", internalType: "contract IPoolManager", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "manager",
    outputs: [{ name: "", internalType: "contract IPoolManager", type: "address" }],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      {
        name: "key",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      {
        name: "params",
        internalType: "struct IPoolManager.ModifyLiquidityParams",
        type: "tuple",
        components: [
          { name: "tickLower", internalType: "int24", type: "int24" },
          { name: "tickUpper", internalType: "int24", type: "int24" },
          { name: "liquidityDelta", internalType: "int256", type: "int256" },
          { name: "salt", internalType: "bytes32", type: "bytes32" },
        ],
      },
      { name: "hookData", internalType: "bytes", type: "bytes" },
      { name: "settleUsingBurn", internalType: "bool", type: "bool" },
      { name: "takeClaims", internalType: "bool", type: "bool" },
    ],
    name: "modifyLiquidity",
    outputs: [{ name: "delta", internalType: "BalanceDelta", type: "int256" }],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      {
        name: "key",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      {
        name: "params",
        internalType: "struct IPoolManager.ModifyLiquidityParams",
        type: "tuple",
        components: [
          { name: "tickLower", internalType: "int24", type: "int24" },
          { name: "tickUpper", internalType: "int24", type: "int24" },
          { name: "liquidityDelta", internalType: "int256", type: "int256" },
          { name: "salt", internalType: "bytes32", type: "bytes32" },
        ],
      },
      { name: "hookData", internalType: "bytes", type: "bytes" },
    ],
    name: "modifyLiquidity",
    outputs: [{ name: "delta", internalType: "BalanceDelta", type: "int256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "rawData", internalType: "bytes", type: "bytes" }],
    name: "unlockCallback",
    outputs: [{ name: "", internalType: "bytes", type: "bytes" }],
  },
] as const;

/**
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x83feDBeD11B3667f40263a88e8435fca51A03F8C)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x30654C69B212AD057E817EcA26da6c5edA32E2E7)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x30654C69B212AD057E817EcA26da6c5edA32E2E7)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xB7b74B407E9bA6c070C5B5CC7E6B8E59e4642763)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xaFB341c8a50e4Bdec4E419Be7F3a6127E3BD6710)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xeb1aAdAC0a10Ac2eDFCbE496C3BCBc1dea4F994b)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x30654C69B212AD057E817EcA26da6c5edA32E2E7)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 */
export const poolModifyLiquidityTestAddress = {
  5: "0x83feDBeD11B3667f40263a88e8435fca51A03F8C",
  420: "0x30654C69B212AD057E817EcA26da6c5edA32E2E7",
  1442: "0x30654C69B212AD057E817EcA26da6c5edA32E2E7",
  31337: "0x3079c0319F8734239eB06765666468F7B76Eb505",
  80001: "0xB7b74B407E9bA6c070C5B5CC7E6B8E59e4642763",
  84531: "0xaFB341c8a50e4Bdec4E419Be7F3a6127E3BD6710",
  421613: "0xeb1aAdAC0a10Ac2eDFCbE496C3BCBc1dea4F994b",
  421614: "0x30654C69B212AD057E817EcA26da6c5edA32E2E7",
  534351: "0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49",
  11155111: "0xeb4708989b42f0cd327A6Bd8f76a931429137fd7",
} as const;

/**
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x83feDBeD11B3667f40263a88e8435fca51A03F8C)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x30654C69B212AD057E817EcA26da6c5edA32E2E7)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x30654C69B212AD057E817EcA26da6c5edA32E2E7)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xB7b74B407E9bA6c070C5B5CC7E6B8E59e4642763)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xaFB341c8a50e4Bdec4E419Be7F3a6127E3BD6710)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xeb1aAdAC0a10Ac2eDFCbE496C3BCBc1dea4F994b)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x30654C69B212AD057E817EcA26da6c5edA32E2E7)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 */
export const poolModifyLiquidityTestConfig = {
  address: poolModifyLiquidityTestAddress,
  abi: poolModifyLiquidityTestABI,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PoolModifyLiquidityTestNoChecks
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const poolModifyLiquidityTestNoChecksABI = [
  {
    stateMutability: "nonpayable",
    type: "constructor",
    inputs: [{ name: "_manager", internalType: "contract IPoolManager", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "manager",
    outputs: [{ name: "", internalType: "contract IPoolManager", type: "address" }],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      {
        name: "key",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      {
        name: "params",
        internalType: "struct IPoolManager.ModifyLiquidityParams",
        type: "tuple",
        components: [
          { name: "tickLower", internalType: "int24", type: "int24" },
          { name: "tickUpper", internalType: "int24", type: "int24" },
          { name: "liquidityDelta", internalType: "int256", type: "int256" },
          { name: "salt", internalType: "bytes32", type: "bytes32" },
        ],
      },
      { name: "hookData", internalType: "bytes", type: "bytes" },
      { name: "settleUsingBurn", internalType: "bool", type: "bool" },
      { name: "takeClaims", internalType: "bool", type: "bool" },
    ],
    name: "modifyLiquidity",
    outputs: [{ name: "delta", internalType: "BalanceDelta", type: "int256" }],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      {
        name: "key",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      {
        name: "params",
        internalType: "struct IPoolManager.ModifyLiquidityParams",
        type: "tuple",
        components: [
          { name: "tickLower", internalType: "int24", type: "int24" },
          { name: "tickUpper", internalType: "int24", type: "int24" },
          { name: "liquidityDelta", internalType: "int256", type: "int256" },
          { name: "salt", internalType: "bytes32", type: "bytes32" },
        ],
      },
      { name: "hookData", internalType: "bytes", type: "bytes" },
    ],
    name: "modifyLiquidity",
    outputs: [{ name: "delta", internalType: "BalanceDelta", type: "int256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "rawData", internalType: "bytes", type: "bytes" }],
    name: "unlockCallback",
    outputs: [{ name: "", internalType: "bytes", type: "bytes" }],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PoolNestedActionsTest
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const poolNestedActionsTestABI = [
  {
    stateMutability: "nonpayable",
    type: "constructor",
    inputs: [{ name: "_manager", internalType: "contract IPoolManager", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "IS_TEST",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "excludeArtifacts",
    outputs: [{ name: "excludedArtifacts_", internalType: "string[]", type: "string[]" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "excludeContracts",
    outputs: [{ name: "excludedContracts_", internalType: "address[]", type: "address[]" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "excludeSelectors",
    outputs: [
      {
        name: "excludedSelectors_",
        internalType: "struct StdInvariant.FuzzSelector[]",
        type: "tuple[]",
        components: [
          { name: "addr", internalType: "address", type: "address" },
          { name: "selectors", internalType: "bytes4[]", type: "bytes4[]" },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "excludeSenders",
    outputs: [{ name: "excludedSenders_", internalType: "address[]", type: "address[]" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "executor",
    outputs: [{ name: "", internalType: "contract NestedActionExecutor", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "failed",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "targetArtifactSelectors",
    outputs: [
      {
        name: "targetedArtifactSelectors_",
        internalType: "struct StdInvariant.FuzzArtifactSelector[]",
        type: "tuple[]",
        components: [
          { name: "artifact", internalType: "string", type: "string" },
          { name: "selectors", internalType: "bytes4[]", type: "bytes4[]" },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "targetArtifacts",
    outputs: [{ name: "targetedArtifacts_", internalType: "string[]", type: "string[]" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "targetContracts",
    outputs: [{ name: "targetedContracts_", internalType: "address[]", type: "address[]" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "targetInterfaces",
    outputs: [
      {
        name: "targetedInterfaces_",
        internalType: "struct StdInvariant.FuzzInterface[]",
        type: "tuple[]",
        components: [
          { name: "addr", internalType: "address", type: "address" },
          { name: "artifacts", internalType: "string[]", type: "string[]" },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "targetSelectors",
    outputs: [
      {
        name: "targetedSelectors_",
        internalType: "struct StdInvariant.FuzzSelector[]",
        type: "tuple[]",
        components: [
          { name: "addr", internalType: "address", type: "address" },
          { name: "selectors", internalType: "bytes4[]", type: "bytes4[]" },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "targetSenders",
    outputs: [{ name: "targetedSenders_", internalType: "address[]", type: "address[]" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "data", internalType: "bytes", type: "bytes" }],
    name: "unlock",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "data", internalType: "bytes", type: "bytes" }],
    name: "unlockCallback",
    outputs: [{ name: "", internalType: "bytes", type: "bytes" }],
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "", internalType: "string", type: "string", indexed: false }],
    name: "log",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "", internalType: "address", type: "address", indexed: false }],
    name: "log_address",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "val", internalType: "uint256[]", type: "uint256[]", indexed: false }],
    name: "log_array",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "val", internalType: "int256[]", type: "int256[]", indexed: false }],
    name: "log_array",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "val", internalType: "address[]", type: "address[]", indexed: false }],
    name: "log_array",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "", internalType: "bytes", type: "bytes", indexed: false }],
    name: "log_bytes",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "", internalType: "bytes32", type: "bytes32", indexed: false }],
    name: "log_bytes32",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "", internalType: "int256", type: "int256", indexed: false }],
    name: "log_int",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "address", type: "address", indexed: false },
    ],
    name: "log_named_address",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "uint256[]", type: "uint256[]", indexed: false },
    ],
    name: "log_named_array",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "int256[]", type: "int256[]", indexed: false },
    ],
    name: "log_named_array",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "address[]", type: "address[]", indexed: false },
    ],
    name: "log_named_array",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "bytes", type: "bytes", indexed: false },
    ],
    name: "log_named_bytes",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "bytes32", type: "bytes32", indexed: false },
    ],
    name: "log_named_bytes32",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "int256", type: "int256", indexed: false },
      { name: "decimals", internalType: "uint256", type: "uint256", indexed: false },
    ],
    name: "log_named_decimal_int",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "uint256", type: "uint256", indexed: false },
      { name: "decimals", internalType: "uint256", type: "uint256", indexed: false },
    ],
    name: "log_named_decimal_uint",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "int256", type: "int256", indexed: false },
    ],
    name: "log_named_int",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "string", type: "string", indexed: false },
    ],
    name: "log_named_string",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "uint256", type: "uint256", indexed: false },
    ],
    name: "log_named_uint",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "", internalType: "string", type: "string", indexed: false }],
    name: "log_string",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "", internalType: "uint256", type: "uint256", indexed: false }],
    name: "log_uint",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "", internalType: "bytes", type: "bytes", indexed: false }],
    name: "logs",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PoolSettleTest
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const poolSettleTestABI = [
  {
    stateMutability: "nonpayable",
    type: "constructor",
    inputs: [{ name: "_manager", internalType: "contract IPoolManager", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "manager",
    outputs: [{ name: "", internalType: "contract IPoolManager", type: "address" }],
  },
  { stateMutability: "payable", type: "function", inputs: [], name: "settle", outputs: [] },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "", internalType: "bytes", type: "bytes" }],
    name: "unlockCallback",
    outputs: [{ name: "", internalType: "bytes", type: "bytes" }],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PoolSwapTest
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF8AADC65Bf1Ec1645ef931317fD48ffa734a185c)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x24C731645ee1e35C3219153d370EBd79784D1E91)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x24C731645ee1e35C3219153d370EBd79784D1E91)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6550fa0D92B38F52C37D32d71084A7B270226Ba5)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xe99395035e1a89b6da10a73821Fc60158d5e59E9)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xa26b026581Fa923CFf3084119bf2d14060945a63)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x24C731645ee1e35C3219153d370EBd79784D1E91)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x3A0c2cF7c40A7B417AE9aB6ccBF60e86d8437395)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 */
export const poolSwapTestABI = [
  {
    stateMutability: "nonpayable",
    type: "constructor",
    inputs: [{ name: "_manager", internalType: "contract IPoolManager", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "manager",
    outputs: [{ name: "", internalType: "contract IPoolManager", type: "address" }],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      {
        name: "key",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      {
        name: "params",
        internalType: "struct IPoolManager.SwapParams",
        type: "tuple",
        components: [
          { name: "zeroForOne", internalType: "bool", type: "bool" },
          { name: "amountSpecified", internalType: "int256", type: "int256" },
          { name: "sqrtPriceLimitX96", internalType: "uint160", type: "uint160" },
        ],
      },
      {
        name: "testSettings",
        internalType: "struct PoolSwapTest.TestSettings",
        type: "tuple",
        components: [
          { name: "takeClaims", internalType: "bool", type: "bool" },
          { name: "settleUsingBurn", internalType: "bool", type: "bool" },
        ],
      },
      { name: "hookData", internalType: "bytes", type: "bytes" },
    ],
    name: "swap",
    outputs: [{ name: "delta", internalType: "BalanceDelta", type: "int256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "rawData", internalType: "bytes", type: "bytes" }],
    name: "unlockCallback",
    outputs: [{ name: "", internalType: "bytes", type: "bytes" }],
  },
  { type: "error", inputs: [], name: "NoSwapOccurred" },
] as const;

/**
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF8AADC65Bf1Ec1645ef931317fD48ffa734a185c)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x24C731645ee1e35C3219153d370EBd79784D1E91)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x24C731645ee1e35C3219153d370EBd79784D1E91)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6550fa0D92B38F52C37D32d71084A7B270226Ba5)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xe99395035e1a89b6da10a73821Fc60158d5e59E9)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xa26b026581Fa923CFf3084119bf2d14060945a63)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x24C731645ee1e35C3219153d370EBd79784D1E91)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x3A0c2cF7c40A7B417AE9aB6ccBF60e86d8437395)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 */
export const poolSwapTestAddress = {
  5: "0xF8AADC65Bf1Ec1645ef931317fD48ffa734a185c",
  420: "0x24C731645ee1e35C3219153d370EBd79784D1E91",
  1442: "0x24C731645ee1e35C3219153d370EBd79784D1E91",
  31337: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  80001: "0x6550fa0D92B38F52C37D32d71084A7B270226Ba5",
  84531: "0xe99395035e1a89b6da10a73821Fc60158d5e59E9",
  421613: "0xa26b026581Fa923CFf3084119bf2d14060945a63",
  421614: "0x24C731645ee1e35C3219153d370EBd79784D1E91",
  534351: "0x3A0c2cF7c40A7B417AE9aB6ccBF60e86d8437395",
  11155111: "0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49",
} as const;

/**
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF8AADC65Bf1Ec1645ef931317fD48ffa734a185c)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x24C731645ee1e35C3219153d370EBd79784D1E91)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x24C731645ee1e35C3219153d370EBd79784D1E91)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6550fa0D92B38F52C37D32d71084A7B270226Ba5)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xe99395035e1a89b6da10a73821Fc60158d5e59E9)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xa26b026581Fa923CFf3084119bf2d14060945a63)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x24C731645ee1e35C3219153d370EBd79784D1E91)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x3A0c2cF7c40A7B417AE9aB6ccBF60e86d8437395)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 */
export const poolSwapTestConfig = { address: poolSwapTestAddress, abi: poolSwapTestABI } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PoolTakeTest
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const poolTakeTestABI = [
  {
    stateMutability: "nonpayable",
    type: "constructor",
    inputs: [{ name: "_manager", internalType: "contract IPoolManager", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "manager",
    outputs: [{ name: "", internalType: "contract IPoolManager", type: "address" }],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      {
        name: "key",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      { name: "amount0", internalType: "uint256", type: "uint256" },
      { name: "amount1", internalType: "uint256", type: "uint256" },
    ],
    name: "take",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "rawData", internalType: "bytes", type: "bytes" }],
    name: "unlockCallback",
    outputs: [{ name: "", internalType: "bytes", type: "bytes" }],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PoolTestBase
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const poolTestBaseABI = [
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "manager",
    outputs: [{ name: "", internalType: "contract IPoolManager", type: "address" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "data", internalType: "bytes", type: "bytes" }],
    name: "unlockCallback",
    outputs: [{ name: "", internalType: "bytes", type: "bytes" }],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Position
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const positionABI = [{ type: "error", inputs: [], name: "CannotUpdateEmptyPosition" }] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ProtocolFeeControllerTest
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const protocolFeeControllerTestABI = [
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "", internalType: "PoolId", type: "bytes32" }],
    name: "protocolFee",
    outputs: [{ name: "", internalType: "uint24", type: "uint24" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      {
        name: "key",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
    ],
    name: "protocolFeeForPool",
    outputs: [{ name: "", internalType: "uint24", type: "uint24" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "id", internalType: "PoolId", type: "bytes32" },
      { name: "fee", internalType: "uint24", type: "uint24" },
    ],
    name: "setProtocolFeeForPool",
    outputs: [],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ProtocolFeeLibrary
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const protocolFeeLibraryABI = [
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "MAX_PROTOCOL_FEE",
    outputs: [{ name: "", internalType: "uint16", type: "uint16" }],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ProtocolFees
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const protocolFeesABI = [
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "recipient", internalType: "address", type: "address" },
      { name: "currency", internalType: "Currency", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
    ],
    name: "collectProtocolFees",
    outputs: [{ name: "amountCollected", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "protocolFeeController",
    outputs: [{ name: "", internalType: "contract IProtocolFeeController", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "currency", internalType: "Currency", type: "address" }],
    name: "protocolFeesAccrued",
    outputs: [{ name: "amount", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      {
        name: "key",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      { name: "newProtocolFee", internalType: "uint24", type: "uint24" },
    ],
    name: "setProtocolFee",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "controller", internalType: "contract IProtocolFeeController", type: "address" }],
    name: "setProtocolFeeController",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "user", internalType: "address", type: "address", indexed: true },
      { name: "newOwner", internalType: "address", type: "address", indexed: true },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "protocolFeeController", internalType: "address", type: "address", indexed: true }],
    name: "ProtocolFeeControllerUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "id", internalType: "PoolId", type: "bytes32", indexed: true },
      { name: "protocolFee", internalType: "uint24", type: "uint24", indexed: false },
    ],
    name: "ProtocolFeeUpdated",
  },
  { type: "error", inputs: [], name: "InvalidCaller" },
  { type: "error", inputs: [], name: "ProtocolFeeCannotBeFetched" },
  { type: "error", inputs: [{ name: "fee", internalType: "uint24", type: "uint24" }], name: "ProtocolFeeTooLarge" },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// RevertingProtocolFeeControllerTest
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const revertingProtocolFeeControllerTestABI = [
  {
    stateMutability: "pure",
    type: "function",
    inputs: [
      {
        name: "",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
    ],
    name: "protocolFeeForPool",
    outputs: [{ name: "", internalType: "uint24", type: "uint24" }],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SafeCallback
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const safeCallbackABI = [
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "poolManager",
    outputs: [{ name: "", internalType: "contract IPoolManager", type: "address" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "data", internalType: "bytes", type: "bytes" }],
    name: "unlockCallback",
    outputs: [{ name: "", internalType: "bytes", type: "bytes" }],
  },
  { type: "error", inputs: [], name: "NotPoolManager" },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SafeCast
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const safeCastABI = [{ type: "error", inputs: [], name: "SafeCastOverflow" }] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SqrtPriceMath
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const sqrtPriceMathABI = [
  { type: "error", inputs: [], name: "InvalidPrice" },
  { type: "error", inputs: [], name: "InvalidPriceOrLiquidity" },
  { type: "error", inputs: [], name: "NotEnoughLiquidity" },
  { type: "error", inputs: [], name: "PriceOverflow" },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// StateLibrary
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const stateLibraryABI = [
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "FEE_GROWTH_GLOBAL0_OFFSET",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "FEE_GROWTH_GLOBAL1_OFFSET",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "LIQUIDITY_OFFSET",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "POOLS_SLOT",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "POSITIONS_OFFSET",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "TICKS_OFFSET",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "TICK_BITMAP_OFFSET",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SwapRouterNoChecks
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const swapRouterNoChecksABI = [
  {
    stateMutability: "nonpayable",
    type: "constructor",
    inputs: [{ name: "_manager", internalType: "contract IPoolManager", type: "address" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "manager",
    outputs: [{ name: "", internalType: "contract IPoolManager", type: "address" }],
  },
  {
    stateMutability: "payable",
    type: "function",
    inputs: [
      {
        name: "key",
        internalType: "struct PoolKey",
        type: "tuple",
        components: [
          { name: "currency0", internalType: "Currency", type: "address" },
          { name: "currency1", internalType: "Currency", type: "address" },
          { name: "fee", internalType: "uint24", type: "uint24" },
          { name: "tickSpacing", internalType: "int24", type: "int24" },
          { name: "hooks", internalType: "contract IHooks", type: "address" },
        ],
      },
      {
        name: "params",
        internalType: "struct IPoolManager.SwapParams",
        type: "tuple",
        components: [
          { name: "zeroForOne", internalType: "bool", type: "bool" },
          { name: "amountSpecified", internalType: "int256", type: "int256" },
          { name: "sqrtPriceLimitX96", internalType: "uint160", type: "uint160" },
        ],
      },
    ],
    name: "swap",
    outputs: [],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [{ name: "rawData", internalType: "bytes", type: "bytes" }],
    name: "unlockCallback",
    outputs: [{ name: "", internalType: "bytes", type: "bytes" }],
  },
  { type: "error", inputs: [], name: "NoSwapOccurred" },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Test
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const testABI = [
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "IS_TEST",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "excludeArtifacts",
    outputs: [{ name: "excludedArtifacts_", internalType: "string[]", type: "string[]" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "excludeContracts",
    outputs: [{ name: "excludedContracts_", internalType: "address[]", type: "address[]" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "excludeSelectors",
    outputs: [
      {
        name: "excludedSelectors_",
        internalType: "struct StdInvariant.FuzzSelector[]",
        type: "tuple[]",
        components: [
          { name: "addr", internalType: "address", type: "address" },
          { name: "selectors", internalType: "bytes4[]", type: "bytes4[]" },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "excludeSenders",
    outputs: [{ name: "excludedSenders_", internalType: "address[]", type: "address[]" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "failed",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "targetArtifactSelectors",
    outputs: [
      {
        name: "targetedArtifactSelectors_",
        internalType: "struct StdInvariant.FuzzArtifactSelector[]",
        type: "tuple[]",
        components: [
          { name: "artifact", internalType: "string", type: "string" },
          { name: "selectors", internalType: "bytes4[]", type: "bytes4[]" },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "targetArtifacts",
    outputs: [{ name: "targetedArtifacts_", internalType: "string[]", type: "string[]" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "targetContracts",
    outputs: [{ name: "targetedContracts_", internalType: "address[]", type: "address[]" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "targetInterfaces",
    outputs: [
      {
        name: "targetedInterfaces_",
        internalType: "struct StdInvariant.FuzzInterface[]",
        type: "tuple[]",
        components: [
          { name: "addr", internalType: "address", type: "address" },
          { name: "artifacts", internalType: "string[]", type: "string[]" },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "targetSelectors",
    outputs: [
      {
        name: "targetedSelectors_",
        internalType: "struct StdInvariant.FuzzSelector[]",
        type: "tuple[]",
        components: [
          { name: "addr", internalType: "address", type: "address" },
          { name: "selectors", internalType: "bytes4[]", type: "bytes4[]" },
        ],
      },
    ],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "targetSenders",
    outputs: [{ name: "targetedSenders_", internalType: "address[]", type: "address[]" }],
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "", internalType: "string", type: "string", indexed: false }],
    name: "log",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "", internalType: "address", type: "address", indexed: false }],
    name: "log_address",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "val", internalType: "uint256[]", type: "uint256[]", indexed: false }],
    name: "log_array",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "val", internalType: "int256[]", type: "int256[]", indexed: false }],
    name: "log_array",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "val", internalType: "address[]", type: "address[]", indexed: false }],
    name: "log_array",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "", internalType: "bytes", type: "bytes", indexed: false }],
    name: "log_bytes",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "", internalType: "bytes32", type: "bytes32", indexed: false }],
    name: "log_bytes32",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "", internalType: "int256", type: "int256", indexed: false }],
    name: "log_int",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "address", type: "address", indexed: false },
    ],
    name: "log_named_address",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "uint256[]", type: "uint256[]", indexed: false },
    ],
    name: "log_named_array",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "int256[]", type: "int256[]", indexed: false },
    ],
    name: "log_named_array",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "address[]", type: "address[]", indexed: false },
    ],
    name: "log_named_array",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "bytes", type: "bytes", indexed: false },
    ],
    name: "log_named_bytes",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "bytes32", type: "bytes32", indexed: false },
    ],
    name: "log_named_bytes32",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "int256", type: "int256", indexed: false },
      { name: "decimals", internalType: "uint256", type: "uint256", indexed: false },
    ],
    name: "log_named_decimal_int",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "uint256", type: "uint256", indexed: false },
      { name: "decimals", internalType: "uint256", type: "uint256", indexed: false },
    ],
    name: "log_named_decimal_uint",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "int256", type: "int256", indexed: false },
    ],
    name: "log_named_int",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "string", type: "string", indexed: false },
    ],
    name: "log_named_string",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "key", internalType: "string", type: "string", indexed: false },
      { name: "val", internalType: "uint256", type: "uint256", indexed: false },
    ],
    name: "log_named_uint",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "", internalType: "string", type: "string", indexed: false }],
    name: "log_string",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "", internalType: "uint256", type: "uint256", indexed: false }],
    name: "log_uint",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [{ name: "", internalType: "bytes", type: "bytes", indexed: false }],
    name: "logs",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TickBitmap
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const tickBitmapABI = [
  {
    type: "error",
    inputs: [
      { name: "tick", internalType: "int24", type: "int24" },
      { name: "tickSpacing", internalType: "int24", type: "int24" },
    ],
    name: "TickMisaligned",
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TickMath
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const tickMathABI = [
  {
    type: "error",
    inputs: [{ name: "sqrtPriceX96", internalType: "uint160", type: "uint160" }],
    name: "InvalidSqrtPrice",
  },
  { type: "error", inputs: [{ name: "tick", internalType: "int24", type: "int24" }], name: "InvalidTick" },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Token0
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6aed99B81255c1d8D7b222A5F16290741B9DcD39)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x841B5A0b3DBc473c8A057E2391014aa4C4751351)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x73666807a1Ed304C2993C72D2b07434a4a561d26)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x5cbA23E581A5cBee77BE4E98Df0bCea74C0B5C9a)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5bA874E13D2Cf3161F89D1B1d1732D14226dBF16)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 */
export const token0ABI = [
  {
    type: "event",
    inputs: [
      { name: "owner", type: "address", indexed: true },
      { name: "spender", type: "address", indexed: true },
      { name: "value", type: "uint256", indexed: false },
    ],
    name: "Approval",
  },
  {
    type: "event",
    inputs: [
      { name: "from", type: "address", indexed: true },
      { name: "to", type: "address", indexed: true },
      { name: "value", type: "uint256", indexed: false },
    ],
    name: "Transfer",
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
  },
  { stateMutability: "view", type: "function", inputs: [], name: "decimals", outputs: [{ name: "", type: "uint8" }] },
  { stateMutability: "view", type: "function", inputs: [], name: "name", outputs: [{ name: "", type: "string" }] },
  { stateMutability: "view", type: "function", inputs: [], name: "symbol", outputs: [{ name: "", type: "string" }] },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "recipient", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "sender", type: "address" },
      { name: "recipient", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", type: "bool" }],
  },
] as const;

/**
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6aed99B81255c1d8D7b222A5F16290741B9DcD39)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x841B5A0b3DBc473c8A057E2391014aa4C4751351)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x73666807a1Ed304C2993C72D2b07434a4a561d26)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x5cbA23E581A5cBee77BE4E98Df0bCea74C0B5C9a)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5bA874E13D2Cf3161F89D1B1d1732D14226dBF16)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 */
export const token0Address = {
  5: "0x6aed99B81255c1d8D7b222A5F16290741B9DcD39",
  420: "0xeb4708989b42f0cd327A6Bd8f76a931429137fd7",
  1442: "0xeb4708989b42f0cd327A6Bd8f76a931429137fd7",
  31337: "0x0165878A594ca255338adfa4d48449f69242Eb8F",
  80001: "0x841B5A0b3DBc473c8A057E2391014aa4C4751351",
  84531: "0x73666807a1Ed304C2993C72D2b07434a4a561d26",
  421613: "0x5cbA23E581A5cBee77BE4E98Df0bCea74C0B5C9a",
  421614: "0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94",
  534351: "0x5bA874E13D2Cf3161F89D1B1d1732D14226dBF16",
  11155111: "0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94",
} as const;

/**
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6aed99B81255c1d8D7b222A5F16290741B9DcD39)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x841B5A0b3DBc473c8A057E2391014aa4C4751351)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x73666807a1Ed304C2993C72D2b07434a4a561d26)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x5cbA23E581A5cBee77BE4E98Df0bCea74C0B5C9a)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5bA874E13D2Cf3161F89D1B1d1732D14226dBF16)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 */
export const token0Config = { address: token0Address, abi: token0ABI } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Token1
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x77513a96372816fBD0Ab84D897cF261656208B18)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xFB3e0C6F74eB1a21CC1Da29aeC80D2Dfe6C9a317)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x482Bf489989ea9c40aC978739E11f1699384dd7F)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5C038EE8AB7bD7699037E277874F1c611aD0C28F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 */
export const token1ABI = [
  {
    type: "event",
    inputs: [
      { name: "owner", type: "address", indexed: true },
      { name: "spender", type: "address", indexed: true },
      { name: "value", type: "uint256", indexed: false },
    ],
    name: "Approval",
  },
  {
    type: "event",
    inputs: [
      { name: "from", type: "address", indexed: true },
      { name: "to", type: "address", indexed: true },
      { name: "value", type: "uint256", indexed: false },
    ],
    name: "Transfer",
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
  },
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
  },
  { stateMutability: "view", type: "function", inputs: [], name: "decimals", outputs: [{ name: "", type: "uint8" }] },
  { stateMutability: "view", type: "function", inputs: [], name: "name", outputs: [{ name: "", type: "string" }] },
  { stateMutability: "view", type: "function", inputs: [], name: "symbol", outputs: [{ name: "", type: "string" }] },
  {
    stateMutability: "view",
    type: "function",
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "recipient", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
  },
  {
    stateMutability: "nonpayable",
    type: "function",
    inputs: [
      { name: "sender", type: "address" },
      { name: "recipient", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "", type: "bool" }],
  },
] as const;

/**
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x77513a96372816fBD0Ab84D897cF261656208B18)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xFB3e0C6F74eB1a21CC1Da29aeC80D2Dfe6C9a317)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x482Bf489989ea9c40aC978739E11f1699384dd7F)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5C038EE8AB7bD7699037E277874F1c611aD0C28F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 */
export const token1Address = {
  5: "0x77513a96372816fBD0Ab84D897cF261656208B18",
  420: "0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49",
  1442: "0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49",
  31337: "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853",
  80001: "0xFB3e0C6F74eB1a21CC1Da29aeC80D2Dfe6C9a317",
  84531: "0x482Bf489989ea9c40aC978739E11f1699384dd7F",
  421613: "0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6",
  421614: "0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E",
  534351: "0x5C038EE8AB7bD7699037E277874F1c611aD0C28F",
  11155111: "0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E",
} as const;

/**
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x77513a96372816fBD0Ab84D897cF261656208B18)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xFB3e0C6F74eB1a21CC1Da29aeC80D2Dfe6C9a317)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x482Bf489989ea9c40aC978739E11f1699384dd7F)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5C038EE8AB7bD7699037E277874F1c611aD0C28F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 */
export const token1Config = { address: token1Address, abi: token1ABI } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UintString
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const uintStringABI = [
  { type: "error", inputs: [{ name: "s", internalType: "string", type: "string" }], name: "InvalidStringNumber" },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link actionsRouterABI}__.
 */
export function useActionsRouterRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof actionsRouterABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof actionsRouterABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: actionsRouterABI, ...config } as UseContractReadConfig<
    typeof actionsRouterABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link actionsRouterABI}__ and `functionName` set to `"CHECK_ENV_VAR"`.
 */
export function useActionsRouterCheckEnvVar<
  TFunctionName extends "CHECK_ENV_VAR",
  TSelectData = ReadContractResult<typeof actionsRouterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof actionsRouterABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: actionsRouterABI, functionName: "CHECK_ENV_VAR", ...config } as UseContractReadConfig<
    typeof actionsRouterABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link actionsRouterABI}__ and `functionName` set to `"IS_SCRIPT"`.
 */
export function useActionsRouterIsScript<
  TFunctionName extends "IS_SCRIPT",
  TSelectData = ReadContractResult<typeof actionsRouterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof actionsRouterABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: actionsRouterABI, functionName: "IS_SCRIPT", ...config } as UseContractReadConfig<
    typeof actionsRouterABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link actionsRouterABI}__ and `functionName` set to `"IS_TEST"`.
 */
export function useActionsRouterIsTest<
  TFunctionName extends "IS_TEST",
  TSelectData = ReadContractResult<typeof actionsRouterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof actionsRouterABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: actionsRouterABI, functionName: "IS_TEST", ...config } as UseContractReadConfig<
    typeof actionsRouterABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link actionsRouterABI}__ and `functionName` set to `"SNAP_DIR"`.
 */
export function useActionsRouterSnapDir<
  TFunctionName extends "SNAP_DIR",
  TSelectData = ReadContractResult<typeof actionsRouterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof actionsRouterABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: actionsRouterABI, functionName: "SNAP_DIR", ...config } as UseContractReadConfig<
    typeof actionsRouterABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link actionsRouterABI}__ and `functionName` set to `"excludeArtifacts"`.
 */
export function useActionsRouterExcludeArtifacts<
  TFunctionName extends "excludeArtifacts",
  TSelectData = ReadContractResult<typeof actionsRouterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof actionsRouterABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: actionsRouterABI,
    functionName: "excludeArtifacts",
    ...config,
  } as UseContractReadConfig<typeof actionsRouterABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link actionsRouterABI}__ and `functionName` set to `"excludeContracts"`.
 */
export function useActionsRouterExcludeContracts<
  TFunctionName extends "excludeContracts",
  TSelectData = ReadContractResult<typeof actionsRouterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof actionsRouterABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: actionsRouterABI,
    functionName: "excludeContracts",
    ...config,
  } as UseContractReadConfig<typeof actionsRouterABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link actionsRouterABI}__ and `functionName` set to `"excludeSelectors"`.
 */
export function useActionsRouterExcludeSelectors<
  TFunctionName extends "excludeSelectors",
  TSelectData = ReadContractResult<typeof actionsRouterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof actionsRouterABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: actionsRouterABI,
    functionName: "excludeSelectors",
    ...config,
  } as UseContractReadConfig<typeof actionsRouterABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link actionsRouterABI}__ and `functionName` set to `"excludeSenders"`.
 */
export function useActionsRouterExcludeSenders<
  TFunctionName extends "excludeSenders",
  TSelectData = ReadContractResult<typeof actionsRouterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof actionsRouterABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: actionsRouterABI, functionName: "excludeSenders", ...config } as UseContractReadConfig<
    typeof actionsRouterABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link actionsRouterABI}__ and `functionName` set to `"failed"`.
 */
export function useActionsRouterFailed<
  TFunctionName extends "failed",
  TSelectData = ReadContractResult<typeof actionsRouterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof actionsRouterABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: actionsRouterABI, functionName: "failed", ...config } as UseContractReadConfig<
    typeof actionsRouterABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link actionsRouterABI}__ and `functionName` set to `"targetArtifactSelectors"`.
 */
export function useActionsRouterTargetArtifactSelectors<
  TFunctionName extends "targetArtifactSelectors",
  TSelectData = ReadContractResult<typeof actionsRouterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof actionsRouterABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: actionsRouterABI,
    functionName: "targetArtifactSelectors",
    ...config,
  } as UseContractReadConfig<typeof actionsRouterABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link actionsRouterABI}__ and `functionName` set to `"targetArtifacts"`.
 */
export function useActionsRouterTargetArtifacts<
  TFunctionName extends "targetArtifacts",
  TSelectData = ReadContractResult<typeof actionsRouterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof actionsRouterABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: actionsRouterABI, functionName: "targetArtifacts", ...config } as UseContractReadConfig<
    typeof actionsRouterABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link actionsRouterABI}__ and `functionName` set to `"targetContracts"`.
 */
export function useActionsRouterTargetContracts<
  TFunctionName extends "targetContracts",
  TSelectData = ReadContractResult<typeof actionsRouterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof actionsRouterABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: actionsRouterABI, functionName: "targetContracts", ...config } as UseContractReadConfig<
    typeof actionsRouterABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link actionsRouterABI}__ and `functionName` set to `"targetInterfaces"`.
 */
export function useActionsRouterTargetInterfaces<
  TFunctionName extends "targetInterfaces",
  TSelectData = ReadContractResult<typeof actionsRouterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof actionsRouterABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: actionsRouterABI,
    functionName: "targetInterfaces",
    ...config,
  } as UseContractReadConfig<typeof actionsRouterABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link actionsRouterABI}__ and `functionName` set to `"targetSelectors"`.
 */
export function useActionsRouterTargetSelectors<
  TFunctionName extends "targetSelectors",
  TSelectData = ReadContractResult<typeof actionsRouterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof actionsRouterABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: actionsRouterABI, functionName: "targetSelectors", ...config } as UseContractReadConfig<
    typeof actionsRouterABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link actionsRouterABI}__ and `functionName` set to `"targetSenders"`.
 */
export function useActionsRouterTargetSenders<
  TFunctionName extends "targetSenders",
  TSelectData = ReadContractResult<typeof actionsRouterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof actionsRouterABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: actionsRouterABI, functionName: "targetSenders", ...config } as UseContractReadConfig<
    typeof actionsRouterABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link actionsRouterABI}__.
 */
export function useActionsRouterWrite<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof actionsRouterABI, string>["request"]["abi"],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof actionsRouterABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof actionsRouterABI, TFunctionName, TMode>({ abi: actionsRouterABI, ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link actionsRouterABI}__ and `functionName` set to `"executeActions"`.
 */
export function useActionsRouterExecuteActions<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof actionsRouterABI, "executeActions">["request"]["abi"],
        "executeActions",
        TMode
      > & { functionName?: "executeActions" }
    : UseContractWriteConfig<typeof actionsRouterABI, "executeActions", TMode> & {
        abi?: never;
        functionName?: "executeActions";
      } = {} as any,
) {
  return useContractWrite<typeof actionsRouterABI, "executeActions", TMode>({
    abi: actionsRouterABI,
    functionName: "executeActions",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link actionsRouterABI}__ and `functionName` set to `"unlockCallback"`.
 */
export function useActionsRouterUnlockCallback<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof actionsRouterABI, "unlockCallback">["request"]["abi"],
        "unlockCallback",
        TMode
      > & { functionName?: "unlockCallback" }
    : UseContractWriteConfig<typeof actionsRouterABI, "unlockCallback", TMode> & {
        abi?: never;
        functionName?: "unlockCallback";
      } = {} as any,
) {
  return useContractWrite<typeof actionsRouterABI, "unlockCallback", TMode>({
    abi: actionsRouterABI,
    functionName: "unlockCallback",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link actionsRouterABI}__.
 */
export function usePrepareActionsRouterWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof actionsRouterABI, TFunctionName>, "abi"> = {} as any,
) {
  return usePrepareContractWrite({ abi: actionsRouterABI, ...config } as UsePrepareContractWriteConfig<
    typeof actionsRouterABI,
    TFunctionName
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link actionsRouterABI}__ and `functionName` set to `"executeActions"`.
 */
export function usePrepareActionsRouterExecuteActions(
  config: Omit<
    UsePrepareContractWriteConfig<typeof actionsRouterABI, "executeActions">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: actionsRouterABI,
    functionName: "executeActions",
    ...config,
  } as UsePrepareContractWriteConfig<typeof actionsRouterABI, "executeActions">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link actionsRouterABI}__ and `functionName` set to `"unlockCallback"`.
 */
export function usePrepareActionsRouterUnlockCallback(
  config: Omit<
    UsePrepareContractWriteConfig<typeof actionsRouterABI, "unlockCallback">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: actionsRouterABI,
    functionName: "unlockCallback",
    ...config,
  } as UsePrepareContractWriteConfig<typeof actionsRouterABI, "unlockCallback">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link actionsRouterABI}__.
 */
export function useActionsRouterEvent<TEventName extends string>(
  config: Omit<UseContractEventConfig<typeof actionsRouterABI, TEventName>, "abi"> = {} as any,
) {
  return useContractEvent({ abi: actionsRouterABI, ...config } as UseContractEventConfig<
    typeof actionsRouterABI,
    TEventName
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link actionsRouterABI}__ and `eventName` set to `"log"`.
 */
export function useActionsRouterLogEvent(
  config: Omit<UseContractEventConfig<typeof actionsRouterABI, "log">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: actionsRouterABI, eventName: "log", ...config } as UseContractEventConfig<
    typeof actionsRouterABI,
    "log"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link actionsRouterABI}__ and `eventName` set to `"log_address"`.
 */
export function useActionsRouterLogAddressEvent(
  config: Omit<UseContractEventConfig<typeof actionsRouterABI, "log_address">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: actionsRouterABI, eventName: "log_address", ...config } as UseContractEventConfig<
    typeof actionsRouterABI,
    "log_address"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link actionsRouterABI}__ and `eventName` set to `"log_array"`.
 */
export function useActionsRouterLogArrayEvent(
  config: Omit<UseContractEventConfig<typeof actionsRouterABI, "log_array">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: actionsRouterABI, eventName: "log_array", ...config } as UseContractEventConfig<
    typeof actionsRouterABI,
    "log_array"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link actionsRouterABI}__ and `eventName` set to `"log_bytes"`.
 */
export function useActionsRouterLogBytesEvent(
  config: Omit<UseContractEventConfig<typeof actionsRouterABI, "log_bytes">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: actionsRouterABI, eventName: "log_bytes", ...config } as UseContractEventConfig<
    typeof actionsRouterABI,
    "log_bytes"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link actionsRouterABI}__ and `eventName` set to `"log_bytes32"`.
 */
export function useActionsRouterLogBytes32Event(
  config: Omit<UseContractEventConfig<typeof actionsRouterABI, "log_bytes32">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: actionsRouterABI, eventName: "log_bytes32", ...config } as UseContractEventConfig<
    typeof actionsRouterABI,
    "log_bytes32"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link actionsRouterABI}__ and `eventName` set to `"log_int"`.
 */
export function useActionsRouterLogIntEvent(
  config: Omit<UseContractEventConfig<typeof actionsRouterABI, "log_int">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: actionsRouterABI, eventName: "log_int", ...config } as UseContractEventConfig<
    typeof actionsRouterABI,
    "log_int"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link actionsRouterABI}__ and `eventName` set to `"log_named_address"`.
 */
export function useActionsRouterLogNamedAddressEvent(
  config: Omit<UseContractEventConfig<typeof actionsRouterABI, "log_named_address">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({
    abi: actionsRouterABI,
    eventName: "log_named_address",
    ...config,
  } as UseContractEventConfig<typeof actionsRouterABI, "log_named_address">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link actionsRouterABI}__ and `eventName` set to `"log_named_array"`.
 */
export function useActionsRouterLogNamedArrayEvent(
  config: Omit<UseContractEventConfig<typeof actionsRouterABI, "log_named_array">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: actionsRouterABI, eventName: "log_named_array", ...config } as UseContractEventConfig<
    typeof actionsRouterABI,
    "log_named_array"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link actionsRouterABI}__ and `eventName` set to `"log_named_bytes"`.
 */
export function useActionsRouterLogNamedBytesEvent(
  config: Omit<UseContractEventConfig<typeof actionsRouterABI, "log_named_bytes">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: actionsRouterABI, eventName: "log_named_bytes", ...config } as UseContractEventConfig<
    typeof actionsRouterABI,
    "log_named_bytes"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link actionsRouterABI}__ and `eventName` set to `"log_named_bytes32"`.
 */
export function useActionsRouterLogNamedBytes32Event(
  config: Omit<UseContractEventConfig<typeof actionsRouterABI, "log_named_bytes32">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({
    abi: actionsRouterABI,
    eventName: "log_named_bytes32",
    ...config,
  } as UseContractEventConfig<typeof actionsRouterABI, "log_named_bytes32">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link actionsRouterABI}__ and `eventName` set to `"log_named_decimal_int"`.
 */
export function useActionsRouterLogNamedDecimalIntEvent(
  config: Omit<
    UseContractEventConfig<typeof actionsRouterABI, "log_named_decimal_int">,
    "abi" | "eventName"
  > = {} as any,
) {
  return useContractEvent({
    abi: actionsRouterABI,
    eventName: "log_named_decimal_int",
    ...config,
  } as UseContractEventConfig<typeof actionsRouterABI, "log_named_decimal_int">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link actionsRouterABI}__ and `eventName` set to `"log_named_decimal_uint"`.
 */
export function useActionsRouterLogNamedDecimalUintEvent(
  config: Omit<
    UseContractEventConfig<typeof actionsRouterABI, "log_named_decimal_uint">,
    "abi" | "eventName"
  > = {} as any,
) {
  return useContractEvent({
    abi: actionsRouterABI,
    eventName: "log_named_decimal_uint",
    ...config,
  } as UseContractEventConfig<typeof actionsRouterABI, "log_named_decimal_uint">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link actionsRouterABI}__ and `eventName` set to `"log_named_int"`.
 */
export function useActionsRouterLogNamedIntEvent(
  config: Omit<UseContractEventConfig<typeof actionsRouterABI, "log_named_int">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: actionsRouterABI, eventName: "log_named_int", ...config } as UseContractEventConfig<
    typeof actionsRouterABI,
    "log_named_int"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link actionsRouterABI}__ and `eventName` set to `"log_named_string"`.
 */
export function useActionsRouterLogNamedStringEvent(
  config: Omit<UseContractEventConfig<typeof actionsRouterABI, "log_named_string">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: actionsRouterABI, eventName: "log_named_string", ...config } as UseContractEventConfig<
    typeof actionsRouterABI,
    "log_named_string"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link actionsRouterABI}__ and `eventName` set to `"log_named_uint"`.
 */
export function useActionsRouterLogNamedUintEvent(
  config: Omit<UseContractEventConfig<typeof actionsRouterABI, "log_named_uint">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: actionsRouterABI, eventName: "log_named_uint", ...config } as UseContractEventConfig<
    typeof actionsRouterABI,
    "log_named_uint"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link actionsRouterABI}__ and `eventName` set to `"log_string"`.
 */
export function useActionsRouterLogStringEvent(
  config: Omit<UseContractEventConfig<typeof actionsRouterABI, "log_string">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: actionsRouterABI, eventName: "log_string", ...config } as UseContractEventConfig<
    typeof actionsRouterABI,
    "log_string"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link actionsRouterABI}__ and `eventName` set to `"log_uint"`.
 */
export function useActionsRouterLogUintEvent(
  config: Omit<UseContractEventConfig<typeof actionsRouterABI, "log_uint">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: actionsRouterABI, eventName: "log_uint", ...config } as UseContractEventConfig<
    typeof actionsRouterABI,
    "log_uint"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link actionsRouterABI}__ and `eventName` set to `"logs"`.
 */
export function useActionsRouterLogsEvent(
  config: Omit<UseContractEventConfig<typeof actionsRouterABI, "logs">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: actionsRouterABI, eventName: "logs", ...config } as UseContractEventConfig<
    typeof actionsRouterABI,
    "logs"
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link balanceDeltaLibraryABI}__.
 */
export function useBalanceDeltaLibraryRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof balanceDeltaLibraryABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof balanceDeltaLibraryABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: balanceDeltaLibraryABI, ...config } as UseContractReadConfig<
    typeof balanceDeltaLibraryABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link balanceDeltaLibraryABI}__ and `functionName` set to `"ZERO_DELTA"`.
 */
export function useBalanceDeltaLibraryZeroDelta<
  TFunctionName extends "ZERO_DELTA",
  TSelectData = ReadContractResult<typeof balanceDeltaLibraryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof balanceDeltaLibraryABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: balanceDeltaLibraryABI,
    functionName: "ZERO_DELTA",
    ...config,
  } as UseContractReadConfig<typeof balanceDeltaLibraryABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link baseHookABI}__.
 */
export function useBaseHookRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof baseHookABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof baseHookABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: baseHookABI, ...config } as UseContractReadConfig<
    typeof baseHookABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"getHookPermissions"`.
 */
export function useBaseHookGetHookPermissions<
  TFunctionName extends "getHookPermissions",
  TSelectData = ReadContractResult<typeof baseHookABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof baseHookABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: baseHookABI, functionName: "getHookPermissions", ...config } as UseContractReadConfig<
    typeof baseHookABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"poolManager"`.
 */
export function useBaseHookPoolManager<
  TFunctionName extends "poolManager",
  TSelectData = ReadContractResult<typeof baseHookABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof baseHookABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: baseHookABI, functionName: "poolManager", ...config } as UseContractReadConfig<
    typeof baseHookABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link baseHookABI}__.
 */
export function useBaseHookWrite<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof baseHookABI, string>["request"]["abi"],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof baseHookABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof baseHookABI, TFunctionName, TMode>({ abi: baseHookABI, ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"afterAddLiquidity"`.
 */
export function useBaseHookAfterAddLiquidity<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof baseHookABI, "afterAddLiquidity">["request"]["abi"],
        "afterAddLiquidity",
        TMode
      > & { functionName?: "afterAddLiquidity" }
    : UseContractWriteConfig<typeof baseHookABI, "afterAddLiquidity", TMode> & {
        abi?: never;
        functionName?: "afterAddLiquidity";
      } = {} as any,
) {
  return useContractWrite<typeof baseHookABI, "afterAddLiquidity", TMode>({
    abi: baseHookABI,
    functionName: "afterAddLiquidity",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"afterDonate"`.
 */
export function useBaseHookAfterDonate<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof baseHookABI, "afterDonate">["request"]["abi"],
        "afterDonate",
        TMode
      > & { functionName?: "afterDonate" }
    : UseContractWriteConfig<typeof baseHookABI, "afterDonate", TMode> & {
        abi?: never;
        functionName?: "afterDonate";
      } = {} as any,
) {
  return useContractWrite<typeof baseHookABI, "afterDonate", TMode>({
    abi: baseHookABI,
    functionName: "afterDonate",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"afterInitialize"`.
 */
export function useBaseHookAfterInitialize<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof baseHookABI, "afterInitialize">["request"]["abi"],
        "afterInitialize",
        TMode
      > & { functionName?: "afterInitialize" }
    : UseContractWriteConfig<typeof baseHookABI, "afterInitialize", TMode> & {
        abi?: never;
        functionName?: "afterInitialize";
      } = {} as any,
) {
  return useContractWrite<typeof baseHookABI, "afterInitialize", TMode>({
    abi: baseHookABI,
    functionName: "afterInitialize",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"afterRemoveLiquidity"`.
 */
export function useBaseHookAfterRemoveLiquidity<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof baseHookABI, "afterRemoveLiquidity">["request"]["abi"],
        "afterRemoveLiquidity",
        TMode
      > & { functionName?: "afterRemoveLiquidity" }
    : UseContractWriteConfig<typeof baseHookABI, "afterRemoveLiquidity", TMode> & {
        abi?: never;
        functionName?: "afterRemoveLiquidity";
      } = {} as any,
) {
  return useContractWrite<typeof baseHookABI, "afterRemoveLiquidity", TMode>({
    abi: baseHookABI,
    functionName: "afterRemoveLiquidity",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"afterSwap"`.
 */
export function useBaseHookAfterSwap<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof baseHookABI, "afterSwap">["request"]["abi"],
        "afterSwap",
        TMode
      > & { functionName?: "afterSwap" }
    : UseContractWriteConfig<typeof baseHookABI, "afterSwap", TMode> & {
        abi?: never;
        functionName?: "afterSwap";
      } = {} as any,
) {
  return useContractWrite<typeof baseHookABI, "afterSwap", TMode>({
    abi: baseHookABI,
    functionName: "afterSwap",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"beforeAddLiquidity"`.
 */
export function useBaseHookBeforeAddLiquidity<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof baseHookABI, "beforeAddLiquidity">["request"]["abi"],
        "beforeAddLiquidity",
        TMode
      > & { functionName?: "beforeAddLiquidity" }
    : UseContractWriteConfig<typeof baseHookABI, "beforeAddLiquidity", TMode> & {
        abi?: never;
        functionName?: "beforeAddLiquidity";
      } = {} as any,
) {
  return useContractWrite<typeof baseHookABI, "beforeAddLiquidity", TMode>({
    abi: baseHookABI,
    functionName: "beforeAddLiquidity",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"beforeDonate"`.
 */
export function useBaseHookBeforeDonate<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof baseHookABI, "beforeDonate">["request"]["abi"],
        "beforeDonate",
        TMode
      > & { functionName?: "beforeDonate" }
    : UseContractWriteConfig<typeof baseHookABI, "beforeDonate", TMode> & {
        abi?: never;
        functionName?: "beforeDonate";
      } = {} as any,
) {
  return useContractWrite<typeof baseHookABI, "beforeDonate", TMode>({
    abi: baseHookABI,
    functionName: "beforeDonate",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"beforeInitialize"`.
 */
export function useBaseHookBeforeInitialize<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof baseHookABI, "beforeInitialize">["request"]["abi"],
        "beforeInitialize",
        TMode
      > & { functionName?: "beforeInitialize" }
    : UseContractWriteConfig<typeof baseHookABI, "beforeInitialize", TMode> & {
        abi?: never;
        functionName?: "beforeInitialize";
      } = {} as any,
) {
  return useContractWrite<typeof baseHookABI, "beforeInitialize", TMode>({
    abi: baseHookABI,
    functionName: "beforeInitialize",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"beforeRemoveLiquidity"`.
 */
export function useBaseHookBeforeRemoveLiquidity<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof baseHookABI, "beforeRemoveLiquidity">["request"]["abi"],
        "beforeRemoveLiquidity",
        TMode
      > & { functionName?: "beforeRemoveLiquidity" }
    : UseContractWriteConfig<typeof baseHookABI, "beforeRemoveLiquidity", TMode> & {
        abi?: never;
        functionName?: "beforeRemoveLiquidity";
      } = {} as any,
) {
  return useContractWrite<typeof baseHookABI, "beforeRemoveLiquidity", TMode>({
    abi: baseHookABI,
    functionName: "beforeRemoveLiquidity",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"beforeSwap"`.
 */
export function useBaseHookBeforeSwap<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof baseHookABI, "beforeSwap">["request"]["abi"],
        "beforeSwap",
        TMode
      > & { functionName?: "beforeSwap" }
    : UseContractWriteConfig<typeof baseHookABI, "beforeSwap", TMode> & {
        abi?: never;
        functionName?: "beforeSwap";
      } = {} as any,
) {
  return useContractWrite<typeof baseHookABI, "beforeSwap", TMode>({
    abi: baseHookABI,
    functionName: "beforeSwap",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"unlockCallback"`.
 */
export function useBaseHookUnlockCallback<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof baseHookABI, "unlockCallback">["request"]["abi"],
        "unlockCallback",
        TMode
      > & { functionName?: "unlockCallback" }
    : UseContractWriteConfig<typeof baseHookABI, "unlockCallback", TMode> & {
        abi?: never;
        functionName?: "unlockCallback";
      } = {} as any,
) {
  return useContractWrite<typeof baseHookABI, "unlockCallback", TMode>({
    abi: baseHookABI,
    functionName: "unlockCallback",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link baseHookABI}__.
 */
export function usePrepareBaseHookWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof baseHookABI, TFunctionName>, "abi"> = {} as any,
) {
  return usePrepareContractWrite({ abi: baseHookABI, ...config } as UsePrepareContractWriteConfig<
    typeof baseHookABI,
    TFunctionName
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"afterAddLiquidity"`.
 */
export function usePrepareBaseHookAfterAddLiquidity(
  config: Omit<
    UsePrepareContractWriteConfig<typeof baseHookABI, "afterAddLiquidity">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: baseHookABI,
    functionName: "afterAddLiquidity",
    ...config,
  } as UsePrepareContractWriteConfig<typeof baseHookABI, "afterAddLiquidity">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"afterDonate"`.
 */
export function usePrepareBaseHookAfterDonate(
  config: Omit<UsePrepareContractWriteConfig<typeof baseHookABI, "afterDonate">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: baseHookABI,
    functionName: "afterDonate",
    ...config,
  } as UsePrepareContractWriteConfig<typeof baseHookABI, "afterDonate">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"afterInitialize"`.
 */
export function usePrepareBaseHookAfterInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof baseHookABI, "afterInitialize">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: baseHookABI,
    functionName: "afterInitialize",
    ...config,
  } as UsePrepareContractWriteConfig<typeof baseHookABI, "afterInitialize">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"afterRemoveLiquidity"`.
 */
export function usePrepareBaseHookAfterRemoveLiquidity(
  config: Omit<
    UsePrepareContractWriteConfig<typeof baseHookABI, "afterRemoveLiquidity">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: baseHookABI,
    functionName: "afterRemoveLiquidity",
    ...config,
  } as UsePrepareContractWriteConfig<typeof baseHookABI, "afterRemoveLiquidity">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"afterSwap"`.
 */
export function usePrepareBaseHookAfterSwap(
  config: Omit<UsePrepareContractWriteConfig<typeof baseHookABI, "afterSwap">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: baseHookABI,
    functionName: "afterSwap",
    ...config,
  } as UsePrepareContractWriteConfig<typeof baseHookABI, "afterSwap">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"beforeAddLiquidity"`.
 */
export function usePrepareBaseHookBeforeAddLiquidity(
  config: Omit<
    UsePrepareContractWriteConfig<typeof baseHookABI, "beforeAddLiquidity">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: baseHookABI,
    functionName: "beforeAddLiquidity",
    ...config,
  } as UsePrepareContractWriteConfig<typeof baseHookABI, "beforeAddLiquidity">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"beforeDonate"`.
 */
export function usePrepareBaseHookBeforeDonate(
  config: Omit<UsePrepareContractWriteConfig<typeof baseHookABI, "beforeDonate">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: baseHookABI,
    functionName: "beforeDonate",
    ...config,
  } as UsePrepareContractWriteConfig<typeof baseHookABI, "beforeDonate">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"beforeInitialize"`.
 */
export function usePrepareBaseHookBeforeInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof baseHookABI, "beforeInitialize">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: baseHookABI,
    functionName: "beforeInitialize",
    ...config,
  } as UsePrepareContractWriteConfig<typeof baseHookABI, "beforeInitialize">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"beforeRemoveLiquidity"`.
 */
export function usePrepareBaseHookBeforeRemoveLiquidity(
  config: Omit<
    UsePrepareContractWriteConfig<typeof baseHookABI, "beforeRemoveLiquidity">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: baseHookABI,
    functionName: "beforeRemoveLiquidity",
    ...config,
  } as UsePrepareContractWriteConfig<typeof baseHookABI, "beforeRemoveLiquidity">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"beforeSwap"`.
 */
export function usePrepareBaseHookBeforeSwap(
  config: Omit<UsePrepareContractWriteConfig<typeof baseHookABI, "beforeSwap">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: baseHookABI,
    functionName: "beforeSwap",
    ...config,
  } as UsePrepareContractWriteConfig<typeof baseHookABI, "beforeSwap">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"unlockCallback"`.
 */
export function usePrepareBaseHookUnlockCallback(
  config: Omit<UsePrepareContractWriteConfig<typeof baseHookABI, "unlockCallback">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: baseHookABI,
    functionName: "unlockCallback",
    ...config,
  } as UsePrepareContractWriteConfig<typeof baseHookABI, "unlockCallback">);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link beforeSwapDeltaLibraryABI}__.
 */
export function useBeforeSwapDeltaLibraryRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof beforeSwapDeltaLibraryABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof beforeSwapDeltaLibraryABI, TFunctionName, TSelectData>, "abi"> = {} as any,
) {
  return useContractRead({ abi: beforeSwapDeltaLibraryABI, ...config } as UseContractReadConfig<
    typeof beforeSwapDeltaLibraryABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link beforeSwapDeltaLibraryABI}__ and `functionName` set to `"ZERO_DELTA"`.
 */
export function useBeforeSwapDeltaLibraryZeroDelta<
  TFunctionName extends "ZERO_DELTA",
  TSelectData = ReadContractResult<typeof beforeSwapDeltaLibraryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof beforeSwapDeltaLibraryABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: beforeSwapDeltaLibraryABI,
    functionName: "ZERO_DELTA",
    ...config,
  } as UseContractReadConfig<typeof beforeSwapDeltaLibraryABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link csmmABI}__.
 */
export function useCsmmRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof csmmABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof csmmABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: csmmABI, ...config } as UseContractReadConfig<
    typeof csmmABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link csmmABI}__ and `functionName` set to `"beforeAddLiquidity"`.
 */
export function useCsmmBeforeAddLiquidity<
  TFunctionName extends "beforeAddLiquidity",
  TSelectData = ReadContractResult<typeof csmmABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof csmmABI, TFunctionName, TSelectData>, "abi" | "functionName"> = {} as any) {
  return useContractRead({ abi: csmmABI, functionName: "beforeAddLiquidity", ...config } as UseContractReadConfig<
    typeof csmmABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link csmmABI}__ and `functionName` set to `"getHookPermissions"`.
 */
export function useCsmmGetHookPermissions<
  TFunctionName extends "getHookPermissions",
  TSelectData = ReadContractResult<typeof csmmABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof csmmABI, TFunctionName, TSelectData>, "abi" | "functionName"> = {} as any) {
  return useContractRead({ abi: csmmABI, functionName: "getHookPermissions", ...config } as UseContractReadConfig<
    typeof csmmABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link csmmABI}__ and `functionName` set to `"poolManager"`.
 */
export function useCsmmPoolManager<
  TFunctionName extends "poolManager",
  TSelectData = ReadContractResult<typeof csmmABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof csmmABI, TFunctionName, TSelectData>, "abi" | "functionName"> = {} as any) {
  return useContractRead({ abi: csmmABI, functionName: "poolManager", ...config } as UseContractReadConfig<
    typeof csmmABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link csmmABI}__.
 */
export function useCsmmWrite<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<PrepareWriteContractResult<typeof csmmABI, string>["request"]["abi"], TFunctionName, TMode>
    : UseContractWriteConfig<typeof csmmABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof csmmABI, TFunctionName, TMode>({ abi: csmmABI, ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link csmmABI}__ and `functionName` set to `"addLiquidity"`.
 */
export function useCsmmAddLiquidity<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof csmmABI, "addLiquidity">["request"]["abi"],
        "addLiquidity",
        TMode
      > & { functionName?: "addLiquidity" }
    : UseContractWriteConfig<typeof csmmABI, "addLiquidity", TMode> & {
        abi?: never;
        functionName?: "addLiquidity";
      } = {} as any,
) {
  return useContractWrite<typeof csmmABI, "addLiquidity", TMode>({
    abi: csmmABI,
    functionName: "addLiquidity",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link csmmABI}__ and `functionName` set to `"afterAddLiquidity"`.
 */
export function useCsmmAfterAddLiquidity<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof csmmABI, "afterAddLiquidity">["request"]["abi"],
        "afterAddLiquidity",
        TMode
      > & { functionName?: "afterAddLiquidity" }
    : UseContractWriteConfig<typeof csmmABI, "afterAddLiquidity", TMode> & {
        abi?: never;
        functionName?: "afterAddLiquidity";
      } = {} as any,
) {
  return useContractWrite<typeof csmmABI, "afterAddLiquidity", TMode>({
    abi: csmmABI,
    functionName: "afterAddLiquidity",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link csmmABI}__ and `functionName` set to `"afterDonate"`.
 */
export function useCsmmAfterDonate<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof csmmABI, "afterDonate">["request"]["abi"],
        "afterDonate",
        TMode
      > & { functionName?: "afterDonate" }
    : UseContractWriteConfig<typeof csmmABI, "afterDonate", TMode> & {
        abi?: never;
        functionName?: "afterDonate";
      } = {} as any,
) {
  return useContractWrite<typeof csmmABI, "afterDonate", TMode>({
    abi: csmmABI,
    functionName: "afterDonate",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link csmmABI}__ and `functionName` set to `"afterInitialize"`.
 */
export function useCsmmAfterInitialize<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof csmmABI, "afterInitialize">["request"]["abi"],
        "afterInitialize",
        TMode
      > & { functionName?: "afterInitialize" }
    : UseContractWriteConfig<typeof csmmABI, "afterInitialize", TMode> & {
        abi?: never;
        functionName?: "afterInitialize";
      } = {} as any,
) {
  return useContractWrite<typeof csmmABI, "afterInitialize", TMode>({
    abi: csmmABI,
    functionName: "afterInitialize",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link csmmABI}__ and `functionName` set to `"afterRemoveLiquidity"`.
 */
export function useCsmmAfterRemoveLiquidity<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof csmmABI, "afterRemoveLiquidity">["request"]["abi"],
        "afterRemoveLiquidity",
        TMode
      > & { functionName?: "afterRemoveLiquidity" }
    : UseContractWriteConfig<typeof csmmABI, "afterRemoveLiquidity", TMode> & {
        abi?: never;
        functionName?: "afterRemoveLiquidity";
      } = {} as any,
) {
  return useContractWrite<typeof csmmABI, "afterRemoveLiquidity", TMode>({
    abi: csmmABI,
    functionName: "afterRemoveLiquidity",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link csmmABI}__ and `functionName` set to `"afterSwap"`.
 */
export function useCsmmAfterSwap<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof csmmABI, "afterSwap">["request"]["abi"],
        "afterSwap",
        TMode
      > & { functionName?: "afterSwap" }
    : UseContractWriteConfig<typeof csmmABI, "afterSwap", TMode> & {
        abi?: never;
        functionName?: "afterSwap";
      } = {} as any,
) {
  return useContractWrite<typeof csmmABI, "afterSwap", TMode>({
    abi: csmmABI,
    functionName: "afterSwap",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link csmmABI}__ and `functionName` set to `"beforeDonate"`.
 */
export function useCsmmBeforeDonate<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof csmmABI, "beforeDonate">["request"]["abi"],
        "beforeDonate",
        TMode
      > & { functionName?: "beforeDonate" }
    : UseContractWriteConfig<typeof csmmABI, "beforeDonate", TMode> & {
        abi?: never;
        functionName?: "beforeDonate";
      } = {} as any,
) {
  return useContractWrite<typeof csmmABI, "beforeDonate", TMode>({
    abi: csmmABI,
    functionName: "beforeDonate",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link csmmABI}__ and `functionName` set to `"beforeInitialize"`.
 */
export function useCsmmBeforeInitialize<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof csmmABI, "beforeInitialize">["request"]["abi"],
        "beforeInitialize",
        TMode
      > & { functionName?: "beforeInitialize" }
    : UseContractWriteConfig<typeof csmmABI, "beforeInitialize", TMode> & {
        abi?: never;
        functionName?: "beforeInitialize";
      } = {} as any,
) {
  return useContractWrite<typeof csmmABI, "beforeInitialize", TMode>({
    abi: csmmABI,
    functionName: "beforeInitialize",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link csmmABI}__ and `functionName` set to `"beforeRemoveLiquidity"`.
 */
export function useCsmmBeforeRemoveLiquidity<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof csmmABI, "beforeRemoveLiquidity">["request"]["abi"],
        "beforeRemoveLiquidity",
        TMode
      > & { functionName?: "beforeRemoveLiquidity" }
    : UseContractWriteConfig<typeof csmmABI, "beforeRemoveLiquidity", TMode> & {
        abi?: never;
        functionName?: "beforeRemoveLiquidity";
      } = {} as any,
) {
  return useContractWrite<typeof csmmABI, "beforeRemoveLiquidity", TMode>({
    abi: csmmABI,
    functionName: "beforeRemoveLiquidity",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link csmmABI}__ and `functionName` set to `"beforeSwap"`.
 */
export function useCsmmBeforeSwap<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof csmmABI, "beforeSwap">["request"]["abi"],
        "beforeSwap",
        TMode
      > & { functionName?: "beforeSwap" }
    : UseContractWriteConfig<typeof csmmABI, "beforeSwap", TMode> & {
        abi?: never;
        functionName?: "beforeSwap";
      } = {} as any,
) {
  return useContractWrite<typeof csmmABI, "beforeSwap", TMode>({
    abi: csmmABI,
    functionName: "beforeSwap",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link csmmABI}__ and `functionName` set to `"unlockCallback"`.
 */
export function useCsmmUnlockCallback<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof csmmABI, "unlockCallback">["request"]["abi"],
        "unlockCallback",
        TMode
      > & { functionName?: "unlockCallback" }
    : UseContractWriteConfig<typeof csmmABI, "unlockCallback", TMode> & {
        abi?: never;
        functionName?: "unlockCallback";
      } = {} as any,
) {
  return useContractWrite<typeof csmmABI, "unlockCallback", TMode>({
    abi: csmmABI,
    functionName: "unlockCallback",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link csmmABI}__.
 */
export function usePrepareCsmmWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof csmmABI, TFunctionName>, "abi"> = {} as any,
) {
  return usePrepareContractWrite({ abi: csmmABI, ...config } as UsePrepareContractWriteConfig<
    typeof csmmABI,
    TFunctionName
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link csmmABI}__ and `functionName` set to `"addLiquidity"`.
 */
export function usePrepareCsmmAddLiquidity(
  config: Omit<UsePrepareContractWriteConfig<typeof csmmABI, "addLiquidity">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: csmmABI,
    functionName: "addLiquidity",
    ...config,
  } as UsePrepareContractWriteConfig<typeof csmmABI, "addLiquidity">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link csmmABI}__ and `functionName` set to `"afterAddLiquidity"`.
 */
export function usePrepareCsmmAfterAddLiquidity(
  config: Omit<UsePrepareContractWriteConfig<typeof csmmABI, "afterAddLiquidity">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: csmmABI,
    functionName: "afterAddLiquidity",
    ...config,
  } as UsePrepareContractWriteConfig<typeof csmmABI, "afterAddLiquidity">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link csmmABI}__ and `functionName` set to `"afterDonate"`.
 */
export function usePrepareCsmmAfterDonate(
  config: Omit<UsePrepareContractWriteConfig<typeof csmmABI, "afterDonate">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: csmmABI,
    functionName: "afterDonate",
    ...config,
  } as UsePrepareContractWriteConfig<typeof csmmABI, "afterDonate">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link csmmABI}__ and `functionName` set to `"afterInitialize"`.
 */
export function usePrepareCsmmAfterInitialize(
  config: Omit<UsePrepareContractWriteConfig<typeof csmmABI, "afterInitialize">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: csmmABI,
    functionName: "afterInitialize",
    ...config,
  } as UsePrepareContractWriteConfig<typeof csmmABI, "afterInitialize">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link csmmABI}__ and `functionName` set to `"afterRemoveLiquidity"`.
 */
export function usePrepareCsmmAfterRemoveLiquidity(
  config: Omit<
    UsePrepareContractWriteConfig<typeof csmmABI, "afterRemoveLiquidity">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: csmmABI,
    functionName: "afterRemoveLiquidity",
    ...config,
  } as UsePrepareContractWriteConfig<typeof csmmABI, "afterRemoveLiquidity">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link csmmABI}__ and `functionName` set to `"afterSwap"`.
 */
export function usePrepareCsmmAfterSwap(
  config: Omit<UsePrepareContractWriteConfig<typeof csmmABI, "afterSwap">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: csmmABI,
    functionName: "afterSwap",
    ...config,
  } as UsePrepareContractWriteConfig<typeof csmmABI, "afterSwap">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link csmmABI}__ and `functionName` set to `"beforeDonate"`.
 */
export function usePrepareCsmmBeforeDonate(
  config: Omit<UsePrepareContractWriteConfig<typeof csmmABI, "beforeDonate">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: csmmABI,
    functionName: "beforeDonate",
    ...config,
  } as UsePrepareContractWriteConfig<typeof csmmABI, "beforeDonate">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link csmmABI}__ and `functionName` set to `"beforeInitialize"`.
 */
export function usePrepareCsmmBeforeInitialize(
  config: Omit<UsePrepareContractWriteConfig<typeof csmmABI, "beforeInitialize">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: csmmABI,
    functionName: "beforeInitialize",
    ...config,
  } as UsePrepareContractWriteConfig<typeof csmmABI, "beforeInitialize">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link csmmABI}__ and `functionName` set to `"beforeRemoveLiquidity"`.
 */
export function usePrepareCsmmBeforeRemoveLiquidity(
  config: Omit<
    UsePrepareContractWriteConfig<typeof csmmABI, "beforeRemoveLiquidity">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: csmmABI,
    functionName: "beforeRemoveLiquidity",
    ...config,
  } as UsePrepareContractWriteConfig<typeof csmmABI, "beforeRemoveLiquidity">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link csmmABI}__ and `functionName` set to `"beforeSwap"`.
 */
export function usePrepareCsmmBeforeSwap(
  config: Omit<UsePrepareContractWriteConfig<typeof csmmABI, "beforeSwap">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: csmmABI,
    functionName: "beforeSwap",
    ...config,
  } as UsePrepareContractWriteConfig<typeof csmmABI, "beforeSwap">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link csmmABI}__ and `functionName` set to `"unlockCallback"`.
 */
export function usePrepareCsmmUnlockCallback(
  config: Omit<UsePrepareContractWriteConfig<typeof csmmABI, "unlockCallback">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: csmmABI,
    functionName: "unlockCallback",
    ...config,
  } as UsePrepareContractWriteConfig<typeof csmmABI, "unlockCallback">);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link constantsABI}__.
 */
export function useConstantsRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof constantsABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof constantsABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: constantsABI, ...config } as UseContractReadConfig<
    typeof constantsABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link constantsABI}__ and `functionName` set to `"SQRT_PRICE_121_100"`.
 */
export function useConstantsSqrtPrice_121_100<
  TFunctionName extends "SQRT_PRICE_121_100",
  TSelectData = ReadContractResult<typeof constantsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof constantsABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: constantsABI, functionName: "SQRT_PRICE_121_100", ...config } as UseContractReadConfig<
    typeof constantsABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link constantsABI}__ and `functionName` set to `"SQRT_PRICE_1_1"`.
 */
export function useConstantsSqrtPrice_1_1<
  TFunctionName extends "SQRT_PRICE_1_1",
  TSelectData = ReadContractResult<typeof constantsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof constantsABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: constantsABI, functionName: "SQRT_PRICE_1_1", ...config } as UseContractReadConfig<
    typeof constantsABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link constantsABI}__ and `functionName` set to `"SQRT_PRICE_1_2"`.
 */
export function useConstantsSqrtPrice_1_2<
  TFunctionName extends "SQRT_PRICE_1_2",
  TSelectData = ReadContractResult<typeof constantsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof constantsABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: constantsABI, functionName: "SQRT_PRICE_1_2", ...config } as UseContractReadConfig<
    typeof constantsABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link constantsABI}__ and `functionName` set to `"SQRT_PRICE_1_4"`.
 */
export function useConstantsSqrtPrice_1_4<
  TFunctionName extends "SQRT_PRICE_1_4",
  TSelectData = ReadContractResult<typeof constantsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof constantsABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: constantsABI, functionName: "SQRT_PRICE_1_4", ...config } as UseContractReadConfig<
    typeof constantsABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link constantsABI}__ and `functionName` set to `"SQRT_PRICE_2_1"`.
 */
export function useConstantsSqrtPrice_2_1<
  TFunctionName extends "SQRT_PRICE_2_1",
  TSelectData = ReadContractResult<typeof constantsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof constantsABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: constantsABI, functionName: "SQRT_PRICE_2_1", ...config } as UseContractReadConfig<
    typeof constantsABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link constantsABI}__ and `functionName` set to `"SQRT_PRICE_4_1"`.
 */
export function useConstantsSqrtPrice_4_1<
  TFunctionName extends "SQRT_PRICE_4_1",
  TSelectData = ReadContractResult<typeof constantsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof constantsABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: constantsABI, functionName: "SQRT_PRICE_4_1", ...config } as UseContractReadConfig<
    typeof constantsABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link currencyLibraryABI}__.
 */
export function useCurrencyLibraryRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof currencyLibraryABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof currencyLibraryABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: currencyLibraryABI, ...config } as UseContractReadConfig<
    typeof currencyLibraryABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link currencyLibraryABI}__ and `functionName` set to `"NATIVE"`.
 */
export function useCurrencyLibraryNative<
  TFunctionName extends "NATIVE",
  TSelectData = ReadContractResult<typeof currencyLibraryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof currencyLibraryABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: currencyLibraryABI, functionName: "NATIVE", ...config } as UseContractReadConfig<
    typeof currencyLibraryABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployersABI}__.
 */
export function useDeployersRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof deployersABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof deployersABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: deployersABI, ...config } as UseContractReadConfig<
    typeof deployersABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployersABI}__ and `functionName` set to `"LIQUIDITY_PARAMS"`.
 */
export function useDeployersLiquidityParams<
  TFunctionName extends "LIQUIDITY_PARAMS",
  TSelectData = ReadContractResult<typeof deployersABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deployersABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: deployersABI, functionName: "LIQUIDITY_PARAMS", ...config } as UseContractReadConfig<
    typeof deployersABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployersABI}__ and `functionName` set to `"MAX_PRICE_LIMIT"`.
 */
export function useDeployersMaxPriceLimit<
  TFunctionName extends "MAX_PRICE_LIMIT",
  TSelectData = ReadContractResult<typeof deployersABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deployersABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: deployersABI, functionName: "MAX_PRICE_LIMIT", ...config } as UseContractReadConfig<
    typeof deployersABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployersABI}__ and `functionName` set to `"MIN_PRICE_LIMIT"`.
 */
export function useDeployersMinPriceLimit<
  TFunctionName extends "MIN_PRICE_LIMIT",
  TSelectData = ReadContractResult<typeof deployersABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deployersABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: deployersABI, functionName: "MIN_PRICE_LIMIT", ...config } as UseContractReadConfig<
    typeof deployersABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployersABI}__ and `functionName` set to `"REMOVE_LIQUIDITY_PARAMS"`.
 */
export function useDeployersRemoveLiquidityParams<
  TFunctionName extends "REMOVE_LIQUIDITY_PARAMS",
  TSelectData = ReadContractResult<typeof deployersABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deployersABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: deployersABI,
    functionName: "REMOVE_LIQUIDITY_PARAMS",
    ...config,
  } as UseContractReadConfig<typeof deployersABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link deployersABI}__ and `functionName` set to `"SWAP_PARAMS"`.
 */
export function useDeployersSwapParams<
  TFunctionName extends "SWAP_PARAMS",
  TSelectData = ReadContractResult<typeof deployersABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof deployersABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: deployersABI, functionName: "SWAP_PARAMS", ...config } as UseContractReadConfig<
    typeof deployersABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__.
 */
export function useErc20Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: erc20ABI, ...config } as UseContractReadConfig<
    typeof erc20ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"DOMAIN_SEPARATOR"`.
 */
export function useErc20DomainSeparator<
  TFunctionName extends "DOMAIN_SEPARATOR",
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>, "abi" | "functionName"> = {} as any,
) {
  return useContractRead({ abi: erc20ABI, functionName: "DOMAIN_SEPARATOR", ...config } as UseContractReadConfig<
    typeof erc20ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"allowance"`.
 */
export function useErc20Allowance<
  TFunctionName extends "allowance",
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>, "abi" | "functionName"> = {} as any,
) {
  return useContractRead({ abi: erc20ABI, functionName: "allowance", ...config } as UseContractReadConfig<
    typeof erc20ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useErc20BalanceOf<
  TFunctionName extends "balanceOf",
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>, "abi" | "functionName"> = {} as any,
) {
  return useContractRead({ abi: erc20ABI, functionName: "balanceOf", ...config } as UseContractReadConfig<
    typeof erc20ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"decimals"`.
 */
export function useErc20Decimals<
  TFunctionName extends "decimals",
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>, "abi" | "functionName"> = {} as any,
) {
  return useContractRead({ abi: erc20ABI, functionName: "decimals", ...config } as UseContractReadConfig<
    typeof erc20ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"name"`.
 */
export function useErc20Name<
  TFunctionName extends "name",
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>, "abi" | "functionName"> = {} as any,
) {
  return useContractRead({ abi: erc20ABI, functionName: "name", ...config } as UseContractReadConfig<
    typeof erc20ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"nonces"`.
 */
export function useErc20Nonces<
  TFunctionName extends "nonces",
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>, "abi" | "functionName"> = {} as any,
) {
  return useContractRead({ abi: erc20ABI, functionName: "nonces", ...config } as UseContractReadConfig<
    typeof erc20ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"symbol"`.
 */
export function useErc20Symbol<
  TFunctionName extends "symbol",
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>, "abi" | "functionName"> = {} as any,
) {
  return useContractRead({ abi: erc20ABI, functionName: "symbol", ...config } as UseContractReadConfig<
    typeof erc20ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useErc20TotalSupply<
  TFunctionName extends "totalSupply",
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>, "abi" | "functionName"> = {} as any,
) {
  return useContractRead({ abi: erc20ABI, functionName: "totalSupply", ...config } as UseContractReadConfig<
    typeof erc20ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__.
 */
export function useErc20Write<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc20ABI, string>["request"]["abi"],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof erc20ABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, TFunctionName, TMode>({ abi: erc20ABI, ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"approve"`.
 */
export function useErc20Approve<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc20ABI, "approve">["request"]["abi"],
        "approve",
        TMode
      > & { functionName?: "approve" }
    : UseContractWriteConfig<typeof erc20ABI, "approve", TMode> & {
        abi?: never;
        functionName?: "approve";
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, "approve", TMode>({
    abi: erc20ABI,
    functionName: "approve",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"permit"`.
 */
export function useErc20Permit<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc20ABI, "permit">["request"]["abi"],
        "permit",
        TMode
      > & { functionName?: "permit" }
    : UseContractWriteConfig<typeof erc20ABI, "permit", TMode> & {
        abi?: never;
        functionName?: "permit";
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, "permit", TMode>({
    abi: erc20ABI,
    functionName: "permit",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transfer"`.
 */
export function useErc20Transfer<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc20ABI, "transfer">["request"]["abi"],
        "transfer",
        TMode
      > & { functionName?: "transfer" }
    : UseContractWriteConfig<typeof erc20ABI, "transfer", TMode> & {
        abi?: never;
        functionName?: "transfer";
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, "transfer", TMode>({
    abi: erc20ABI,
    functionName: "transfer",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useErc20TransferFrom<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc20ABI, "transferFrom">["request"]["abi"],
        "transferFrom",
        TMode
      > & { functionName?: "transferFrom" }
    : UseContractWriteConfig<typeof erc20ABI, "transferFrom", TMode> & {
        abi?: never;
        functionName?: "transferFrom";
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, "transferFrom", TMode>({
    abi: erc20ABI,
    functionName: "transferFrom",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__.
 */
export function usePrepareErc20Write<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof erc20ABI, TFunctionName>, "abi"> = {} as any,
) {
  return usePrepareContractWrite({ abi: erc20ABI, ...config } as UsePrepareContractWriteConfig<
    typeof erc20ABI,
    TFunctionName
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareErc20Approve(
  config: Omit<UsePrepareContractWriteConfig<typeof erc20ABI, "approve">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({ abi: erc20ABI, functionName: "approve", ...config } as UsePrepareContractWriteConfig<
    typeof erc20ABI,
    "approve"
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"permit"`.
 */
export function usePrepareErc20Permit(
  config: Omit<UsePrepareContractWriteConfig<typeof erc20ABI, "permit">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({ abi: erc20ABI, functionName: "permit", ...config } as UsePrepareContractWriteConfig<
    typeof erc20ABI,
    "permit"
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareErc20Transfer(
  config: Omit<UsePrepareContractWriteConfig<typeof erc20ABI, "transfer">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    functionName: "transfer",
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, "transfer">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareErc20TransferFrom(
  config: Omit<UsePrepareContractWriteConfig<typeof erc20ABI, "transferFrom">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    functionName: "transferFrom",
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, "transferFrom">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__.
 */
export function useErc20Event<TEventName extends string>(
  config: Omit<UseContractEventConfig<typeof erc20ABI, TEventName>, "abi"> = {} as any,
) {
  return useContractEvent({ abi: erc20ABI, ...config } as UseContractEventConfig<typeof erc20ABI, TEventName>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__ and `eventName` set to `"Approval"`.
 */
export function useErc20ApprovalEvent(
  config: Omit<UseContractEventConfig<typeof erc20ABI, "Approval">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: erc20ABI, eventName: "Approval", ...config } as UseContractEventConfig<
    typeof erc20ABI,
    "Approval"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__ and `eventName` set to `"Transfer"`.
 */
export function useErc20TransferEvent(
  config: Omit<UseContractEventConfig<typeof erc20ABI, "Transfer">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: erc20ABI, eventName: "Transfer", ...config } as UseContractEventConfig<
    typeof erc20ABI,
    "Transfer"
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc6909ABI}__.
 */
export function useErc6909Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc6909ABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof erc6909ABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: erc6909ABI, ...config } as UseContractReadConfig<
    typeof erc6909ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc6909ABI}__ and `functionName` set to `"allowance"`.
 */
export function useErc6909Allowance<
  TFunctionName extends "allowance",
  TSelectData = ReadContractResult<typeof erc6909ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc6909ABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: erc6909ABI, functionName: "allowance", ...config } as UseContractReadConfig<
    typeof erc6909ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc6909ABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useErc6909BalanceOf<
  TFunctionName extends "balanceOf",
  TSelectData = ReadContractResult<typeof erc6909ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc6909ABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: erc6909ABI, functionName: "balanceOf", ...config } as UseContractReadConfig<
    typeof erc6909ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc6909ABI}__ and `functionName` set to `"isOperator"`.
 */
export function useErc6909IsOperator<
  TFunctionName extends "isOperator",
  TSelectData = ReadContractResult<typeof erc6909ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc6909ABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: erc6909ABI, functionName: "isOperator", ...config } as UseContractReadConfig<
    typeof erc6909ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc6909ABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useErc6909SupportsInterface<
  TFunctionName extends "supportsInterface",
  TSelectData = ReadContractResult<typeof erc6909ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc6909ABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: erc6909ABI, functionName: "supportsInterface", ...config } as UseContractReadConfig<
    typeof erc6909ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc6909ABI}__.
 */
export function useErc6909Write<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc6909ABI, string>["request"]["abi"],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof erc6909ABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof erc6909ABI, TFunctionName, TMode>({ abi: erc6909ABI, ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc6909ABI}__ and `functionName` set to `"approve"`.
 */
export function useErc6909Approve<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc6909ABI, "approve">["request"]["abi"],
        "approve",
        TMode
      > & { functionName?: "approve" }
    : UseContractWriteConfig<typeof erc6909ABI, "approve", TMode> & {
        abi?: never;
        functionName?: "approve";
      } = {} as any,
) {
  return useContractWrite<typeof erc6909ABI, "approve", TMode>({
    abi: erc6909ABI,
    functionName: "approve",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc6909ABI}__ and `functionName` set to `"setOperator"`.
 */
export function useErc6909SetOperator<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc6909ABI, "setOperator">["request"]["abi"],
        "setOperator",
        TMode
      > & { functionName?: "setOperator" }
    : UseContractWriteConfig<typeof erc6909ABI, "setOperator", TMode> & {
        abi?: never;
        functionName?: "setOperator";
      } = {} as any,
) {
  return useContractWrite<typeof erc6909ABI, "setOperator", TMode>({
    abi: erc6909ABI,
    functionName: "setOperator",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc6909ABI}__ and `functionName` set to `"transfer"`.
 */
export function useErc6909Transfer<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc6909ABI, "transfer">["request"]["abi"],
        "transfer",
        TMode
      > & { functionName?: "transfer" }
    : UseContractWriteConfig<typeof erc6909ABI, "transfer", TMode> & {
        abi?: never;
        functionName?: "transfer";
      } = {} as any,
) {
  return useContractWrite<typeof erc6909ABI, "transfer", TMode>({
    abi: erc6909ABI,
    functionName: "transfer",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc6909ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useErc6909TransferFrom<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc6909ABI, "transferFrom">["request"]["abi"],
        "transferFrom",
        TMode
      > & { functionName?: "transferFrom" }
    : UseContractWriteConfig<typeof erc6909ABI, "transferFrom", TMode> & {
        abi?: never;
        functionName?: "transferFrom";
      } = {} as any,
) {
  return useContractWrite<typeof erc6909ABI, "transferFrom", TMode>({
    abi: erc6909ABI,
    functionName: "transferFrom",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc6909ABI}__.
 */
export function usePrepareErc6909Write<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof erc6909ABI, TFunctionName>, "abi"> = {} as any,
) {
  return usePrepareContractWrite({ abi: erc6909ABI, ...config } as UsePrepareContractWriteConfig<
    typeof erc6909ABI,
    TFunctionName
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc6909ABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareErc6909Approve(
  config: Omit<UsePrepareContractWriteConfig<typeof erc6909ABI, "approve">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc6909ABI,
    functionName: "approve",
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc6909ABI, "approve">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc6909ABI}__ and `functionName` set to `"setOperator"`.
 */
export function usePrepareErc6909SetOperator(
  config: Omit<UsePrepareContractWriteConfig<typeof erc6909ABI, "setOperator">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc6909ABI,
    functionName: "setOperator",
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc6909ABI, "setOperator">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc6909ABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareErc6909Transfer(
  config: Omit<UsePrepareContractWriteConfig<typeof erc6909ABI, "transfer">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc6909ABI,
    functionName: "transfer",
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc6909ABI, "transfer">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc6909ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareErc6909TransferFrom(
  config: Omit<UsePrepareContractWriteConfig<typeof erc6909ABI, "transferFrom">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc6909ABI,
    functionName: "transferFrom",
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc6909ABI, "transferFrom">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc6909ABI}__.
 */
export function useErc6909Event<TEventName extends string>(
  config: Omit<UseContractEventConfig<typeof erc6909ABI, TEventName>, "abi"> = {} as any,
) {
  return useContractEvent({ abi: erc6909ABI, ...config } as UseContractEventConfig<typeof erc6909ABI, TEventName>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc6909ABI}__ and `eventName` set to `"Approval"`.
 */
export function useErc6909ApprovalEvent(
  config: Omit<UseContractEventConfig<typeof erc6909ABI, "Approval">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: erc6909ABI, eventName: "Approval", ...config } as UseContractEventConfig<
    typeof erc6909ABI,
    "Approval"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc6909ABI}__ and `eventName` set to `"OperatorSet"`.
 */
export function useErc6909OperatorSetEvent(
  config: Omit<UseContractEventConfig<typeof erc6909ABI, "OperatorSet">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: erc6909ABI, eventName: "OperatorSet", ...config } as UseContractEventConfig<
    typeof erc6909ABI,
    "OperatorSet"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc6909ABI}__ and `eventName` set to `"Transfer"`.
 */
export function useErc6909TransferEvent(
  config: Omit<UseContractEventConfig<typeof erc6909ABI, "Transfer">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: erc6909ABI, eventName: "Transfer", ...config } as UseContractEventConfig<
    typeof erc6909ABI,
    "Transfer"
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc6909ClaimsABI}__.
 */
export function useErc6909ClaimsRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc6909ClaimsABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof erc6909ClaimsABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: erc6909ClaimsABI, ...config } as UseContractReadConfig<
    typeof erc6909ClaimsABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc6909ClaimsABI}__ and `functionName` set to `"allowance"`.
 */
export function useErc6909ClaimsAllowance<
  TFunctionName extends "allowance",
  TSelectData = ReadContractResult<typeof erc6909ClaimsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc6909ClaimsABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: erc6909ClaimsABI, functionName: "allowance", ...config } as UseContractReadConfig<
    typeof erc6909ClaimsABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc6909ClaimsABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useErc6909ClaimsBalanceOf<
  TFunctionName extends "balanceOf",
  TSelectData = ReadContractResult<typeof erc6909ClaimsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc6909ClaimsABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: erc6909ClaimsABI, functionName: "balanceOf", ...config } as UseContractReadConfig<
    typeof erc6909ClaimsABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc6909ClaimsABI}__ and `functionName` set to `"isOperator"`.
 */
export function useErc6909ClaimsIsOperator<
  TFunctionName extends "isOperator",
  TSelectData = ReadContractResult<typeof erc6909ClaimsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc6909ClaimsABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: erc6909ClaimsABI, functionName: "isOperator", ...config } as UseContractReadConfig<
    typeof erc6909ClaimsABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc6909ClaimsABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useErc6909ClaimsSupportsInterface<
  TFunctionName extends "supportsInterface",
  TSelectData = ReadContractResult<typeof erc6909ClaimsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc6909ClaimsABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: erc6909ClaimsABI,
    functionName: "supportsInterface",
    ...config,
  } as UseContractReadConfig<typeof erc6909ClaimsABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc6909ClaimsABI}__.
 */
export function useErc6909ClaimsWrite<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc6909ClaimsABI, string>["request"]["abi"],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof erc6909ClaimsABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof erc6909ClaimsABI, TFunctionName, TMode>({ abi: erc6909ClaimsABI, ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc6909ClaimsABI}__ and `functionName` set to `"approve"`.
 */
export function useErc6909ClaimsApprove<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc6909ClaimsABI, "approve">["request"]["abi"],
        "approve",
        TMode
      > & { functionName?: "approve" }
    : UseContractWriteConfig<typeof erc6909ClaimsABI, "approve", TMode> & {
        abi?: never;
        functionName?: "approve";
      } = {} as any,
) {
  return useContractWrite<typeof erc6909ClaimsABI, "approve", TMode>({
    abi: erc6909ClaimsABI,
    functionName: "approve",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc6909ClaimsABI}__ and `functionName` set to `"setOperator"`.
 */
export function useErc6909ClaimsSetOperator<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc6909ClaimsABI, "setOperator">["request"]["abi"],
        "setOperator",
        TMode
      > & { functionName?: "setOperator" }
    : UseContractWriteConfig<typeof erc6909ClaimsABI, "setOperator", TMode> & {
        abi?: never;
        functionName?: "setOperator";
      } = {} as any,
) {
  return useContractWrite<typeof erc6909ClaimsABI, "setOperator", TMode>({
    abi: erc6909ClaimsABI,
    functionName: "setOperator",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc6909ClaimsABI}__ and `functionName` set to `"transfer"`.
 */
export function useErc6909ClaimsTransfer<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc6909ClaimsABI, "transfer">["request"]["abi"],
        "transfer",
        TMode
      > & { functionName?: "transfer" }
    : UseContractWriteConfig<typeof erc6909ClaimsABI, "transfer", TMode> & {
        abi?: never;
        functionName?: "transfer";
      } = {} as any,
) {
  return useContractWrite<typeof erc6909ClaimsABI, "transfer", TMode>({
    abi: erc6909ClaimsABI,
    functionName: "transfer",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc6909ClaimsABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useErc6909ClaimsTransferFrom<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc6909ClaimsABI, "transferFrom">["request"]["abi"],
        "transferFrom",
        TMode
      > & { functionName?: "transferFrom" }
    : UseContractWriteConfig<typeof erc6909ClaimsABI, "transferFrom", TMode> & {
        abi?: never;
        functionName?: "transferFrom";
      } = {} as any,
) {
  return useContractWrite<typeof erc6909ClaimsABI, "transferFrom", TMode>({
    abi: erc6909ClaimsABI,
    functionName: "transferFrom",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc6909ClaimsABI}__.
 */
export function usePrepareErc6909ClaimsWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof erc6909ClaimsABI, TFunctionName>, "abi"> = {} as any,
) {
  return usePrepareContractWrite({ abi: erc6909ClaimsABI, ...config } as UsePrepareContractWriteConfig<
    typeof erc6909ClaimsABI,
    TFunctionName
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc6909ClaimsABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareErc6909ClaimsApprove(
  config: Omit<UsePrepareContractWriteConfig<typeof erc6909ClaimsABI, "approve">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc6909ClaimsABI,
    functionName: "approve",
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc6909ClaimsABI, "approve">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc6909ClaimsABI}__ and `functionName` set to `"setOperator"`.
 */
export function usePrepareErc6909ClaimsSetOperator(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc6909ClaimsABI, "setOperator">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc6909ClaimsABI,
    functionName: "setOperator",
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc6909ClaimsABI, "setOperator">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc6909ClaimsABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareErc6909ClaimsTransfer(
  config: Omit<UsePrepareContractWriteConfig<typeof erc6909ClaimsABI, "transfer">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc6909ClaimsABI,
    functionName: "transfer",
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc6909ClaimsABI, "transfer">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc6909ClaimsABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareErc6909ClaimsTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc6909ClaimsABI, "transferFrom">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc6909ClaimsABI,
    functionName: "transferFrom",
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc6909ClaimsABI, "transferFrom">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc6909ClaimsABI}__.
 */
export function useErc6909ClaimsEvent<TEventName extends string>(
  config: Omit<UseContractEventConfig<typeof erc6909ClaimsABI, TEventName>, "abi"> = {} as any,
) {
  return useContractEvent({ abi: erc6909ClaimsABI, ...config } as UseContractEventConfig<
    typeof erc6909ClaimsABI,
    TEventName
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc6909ClaimsABI}__ and `eventName` set to `"Approval"`.
 */
export function useErc6909ClaimsApprovalEvent(
  config: Omit<UseContractEventConfig<typeof erc6909ClaimsABI, "Approval">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: erc6909ClaimsABI, eventName: "Approval", ...config } as UseContractEventConfig<
    typeof erc6909ClaimsABI,
    "Approval"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc6909ClaimsABI}__ and `eventName` set to `"OperatorSet"`.
 */
export function useErc6909ClaimsOperatorSetEvent(
  config: Omit<UseContractEventConfig<typeof erc6909ClaimsABI, "OperatorSet">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: erc6909ClaimsABI, eventName: "OperatorSet", ...config } as UseContractEventConfig<
    typeof erc6909ClaimsABI,
    "OperatorSet"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc6909ClaimsABI}__ and `eventName` set to `"Transfer"`.
 */
export function useErc6909ClaimsTransferEvent(
  config: Omit<UseContractEventConfig<typeof erc6909ClaimsABI, "Transfer">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: erc6909ClaimsABI, eventName: "Transfer", ...config } as UseContractEventConfig<
    typeof erc6909ClaimsABI,
    "Transfer"
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link extsloadABI}__.
 */
export function useExtsloadRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof extsloadABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof extsloadABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: extsloadABI, ...config } as UseContractReadConfig<
    typeof extsloadABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link extsloadABI}__ and `functionName` set to `"extsload"`.
 */
export function useExtsloadExtsload<
  TFunctionName extends "extsload",
  TSelectData = ReadContractResult<typeof extsloadABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof extsloadABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: extsloadABI, functionName: "extsload", ...config } as UseContractReadConfig<
    typeof extsloadABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link exttloadABI}__.
 */
export function useExttloadRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof exttloadABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof exttloadABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: exttloadABI, ...config } as UseContractReadConfig<
    typeof exttloadABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link exttloadABI}__ and `functionName` set to `"exttload"`.
 */
export function useExttloadExttload<
  TFunctionName extends "exttload",
  TSelectData = ReadContractResult<typeof exttloadABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof exttloadABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: exttloadABI, functionName: "exttload", ...config } as UseContractReadConfig<
    typeof exttloadABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link gasSnapshotABI}__.
 */
export function useGasSnapshotRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof gasSnapshotABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof gasSnapshotABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: gasSnapshotABI, ...config } as UseContractReadConfig<
    typeof gasSnapshotABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link gasSnapshotABI}__ and `functionName` set to `"CHECK_ENV_VAR"`.
 */
export function useGasSnapshotCheckEnvVar<
  TFunctionName extends "CHECK_ENV_VAR",
  TSelectData = ReadContractResult<typeof gasSnapshotABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof gasSnapshotABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: gasSnapshotABI, functionName: "CHECK_ENV_VAR", ...config } as UseContractReadConfig<
    typeof gasSnapshotABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link gasSnapshotABI}__ and `functionName` set to `"IS_SCRIPT"`.
 */
export function useGasSnapshotIsScript<
  TFunctionName extends "IS_SCRIPT",
  TSelectData = ReadContractResult<typeof gasSnapshotABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof gasSnapshotABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: gasSnapshotABI, functionName: "IS_SCRIPT", ...config } as UseContractReadConfig<
    typeof gasSnapshotABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link gasSnapshotABI}__ and `functionName` set to `"SNAP_DIR"`.
 */
export function useGasSnapshotSnapDir<
  TFunctionName extends "SNAP_DIR",
  TSelectData = ReadContractResult<typeof gasSnapshotABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof gasSnapshotABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: gasSnapshotABI, functionName: "SNAP_DIR", ...config } as UseContractReadConfig<
    typeof gasSnapshotABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc165ABI}__.
 */
export function useIerc165Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ierc165ABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof ierc165ABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: ierc165ABI, ...config } as UseContractReadConfig<
    typeof ierc165ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc165ABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useIerc165SupportsInterface<
  TFunctionName extends "supportsInterface",
  TSelectData = ReadContractResult<typeof ierc165ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc165ABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: ierc165ABI, functionName: "supportsInterface", ...config } as UseContractReadConfig<
    typeof ierc165ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20ABI}__.
 */
export function useIerc20Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ierc20ABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof ierc20ABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: ierc20ABI, ...config } as UseContractReadConfig<
    typeof ierc20ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"allowance"`.
 */
export function useIerc20Allowance<
  TFunctionName extends "allowance",
  TSelectData = ReadContractResult<typeof ierc20ABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof ierc20ABI, TFunctionName, TSelectData>, "abi" | "functionName"> = {} as any,
) {
  return useContractRead({ abi: ierc20ABI, functionName: "allowance", ...config } as UseContractReadConfig<
    typeof ierc20ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useIerc20BalanceOf<
  TFunctionName extends "balanceOf",
  TSelectData = ReadContractResult<typeof ierc20ABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof ierc20ABI, TFunctionName, TSelectData>, "abi" | "functionName"> = {} as any,
) {
  return useContractRead({ abi: ierc20ABI, functionName: "balanceOf", ...config } as UseContractReadConfig<
    typeof ierc20ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"decimals"`.
 */
export function useIerc20Decimals<
  TFunctionName extends "decimals",
  TSelectData = ReadContractResult<typeof ierc20ABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof ierc20ABI, TFunctionName, TSelectData>, "abi" | "functionName"> = {} as any,
) {
  return useContractRead({ abi: ierc20ABI, functionName: "decimals", ...config } as UseContractReadConfig<
    typeof ierc20ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"name"`.
 */
export function useIerc20Name<
  TFunctionName extends "name",
  TSelectData = ReadContractResult<typeof ierc20ABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof ierc20ABI, TFunctionName, TSelectData>, "abi" | "functionName"> = {} as any,
) {
  return useContractRead({ abi: ierc20ABI, functionName: "name", ...config } as UseContractReadConfig<
    typeof ierc20ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"symbol"`.
 */
export function useIerc20Symbol<
  TFunctionName extends "symbol",
  TSelectData = ReadContractResult<typeof ierc20ABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof ierc20ABI, TFunctionName, TSelectData>, "abi" | "functionName"> = {} as any,
) {
  return useContractRead({ abi: ierc20ABI, functionName: "symbol", ...config } as UseContractReadConfig<
    typeof ierc20ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useIerc20TotalSupply<
  TFunctionName extends "totalSupply",
  TSelectData = ReadContractResult<typeof ierc20ABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof ierc20ABI, TFunctionName, TSelectData>, "abi" | "functionName"> = {} as any,
) {
  return useContractRead({ abi: ierc20ABI, functionName: "totalSupply", ...config } as UseContractReadConfig<
    typeof ierc20ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20ABI}__.
 */
export function useIerc20Write<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc20ABI, string>["request"]["abi"],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof ierc20ABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof ierc20ABI, TFunctionName, TMode>({ abi: ierc20ABI, ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"approve"`.
 */
export function useIerc20Approve<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc20ABI, "approve">["request"]["abi"],
        "approve",
        TMode
      > & { functionName?: "approve" }
    : UseContractWriteConfig<typeof ierc20ABI, "approve", TMode> & {
        abi?: never;
        functionName?: "approve";
      } = {} as any,
) {
  return useContractWrite<typeof ierc20ABI, "approve", TMode>({
    abi: ierc20ABI,
    functionName: "approve",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"transfer"`.
 */
export function useIerc20Transfer<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc20ABI, "transfer">["request"]["abi"],
        "transfer",
        TMode
      > & { functionName?: "transfer" }
    : UseContractWriteConfig<typeof ierc20ABI, "transfer", TMode> & {
        abi?: never;
        functionName?: "transfer";
      } = {} as any,
) {
  return useContractWrite<typeof ierc20ABI, "transfer", TMode>({
    abi: ierc20ABI,
    functionName: "transfer",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useIerc20TransferFrom<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc20ABI, "transferFrom">["request"]["abi"],
        "transferFrom",
        TMode
      > & { functionName?: "transferFrom" }
    : UseContractWriteConfig<typeof ierc20ABI, "transferFrom", TMode> & {
        abi?: never;
        functionName?: "transferFrom";
      } = {} as any,
) {
  return useContractWrite<typeof ierc20ABI, "transferFrom", TMode>({
    abi: ierc20ABI,
    functionName: "transferFrom",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20ABI}__.
 */
export function usePrepareIerc20Write<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof ierc20ABI, TFunctionName>, "abi"> = {} as any,
) {
  return usePrepareContractWrite({ abi: ierc20ABI, ...config } as UsePrepareContractWriteConfig<
    typeof ierc20ABI,
    TFunctionName
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareIerc20Approve(
  config: Omit<UsePrepareContractWriteConfig<typeof ierc20ABI, "approve">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20ABI,
    functionName: "approve",
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20ABI, "approve">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareIerc20Transfer(
  config: Omit<UsePrepareContractWriteConfig<typeof ierc20ABI, "transfer">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20ABI,
    functionName: "transfer",
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20ABI, "transfer">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareIerc20TransferFrom(
  config: Omit<UsePrepareContractWriteConfig<typeof ierc20ABI, "transferFrom">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20ABI,
    functionName: "transferFrom",
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20ABI, "transferFrom">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc20ABI}__.
 */
export function useIerc20Event<TEventName extends string>(
  config: Omit<UseContractEventConfig<typeof ierc20ABI, TEventName>, "abi"> = {} as any,
) {
  return useContractEvent({ abi: ierc20ABI, ...config } as UseContractEventConfig<typeof ierc20ABI, TEventName>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc20ABI}__ and `eventName` set to `"Approval"`.
 */
export function useIerc20ApprovalEvent(
  config: Omit<UseContractEventConfig<typeof ierc20ABI, "Approval">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: ierc20ABI, eventName: "Approval", ...config } as UseContractEventConfig<
    typeof ierc20ABI,
    "Approval"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc20ABI}__ and `eventName` set to `"Transfer"`.
 */
export function useIerc20TransferEvent(
  config: Omit<UseContractEventConfig<typeof ierc20ABI, "Transfer">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: ierc20ABI, eventName: "Transfer", ...config } as UseContractEventConfig<
    typeof ierc20ABI,
    "Transfer"
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20MinimalABI}__.
 */
export function useIerc20MinimalRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ierc20MinimalABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof ierc20MinimalABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: ierc20MinimalABI, ...config } as UseContractReadConfig<
    typeof ierc20MinimalABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20MinimalABI}__ and `functionName` set to `"allowance"`.
 */
export function useIerc20MinimalAllowance<
  TFunctionName extends "allowance",
  TSelectData = ReadContractResult<typeof ierc20MinimalABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20MinimalABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: ierc20MinimalABI, functionName: "allowance", ...config } as UseContractReadConfig<
    typeof ierc20MinimalABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20MinimalABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useIerc20MinimalBalanceOf<
  TFunctionName extends "balanceOf",
  TSelectData = ReadContractResult<typeof ierc20MinimalABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20MinimalABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: ierc20MinimalABI, functionName: "balanceOf", ...config } as UseContractReadConfig<
    typeof ierc20MinimalABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20MinimalABI}__.
 */
export function useIerc20MinimalWrite<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc20MinimalABI, string>["request"]["abi"],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof ierc20MinimalABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof ierc20MinimalABI, TFunctionName, TMode>({ abi: ierc20MinimalABI, ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20MinimalABI}__ and `functionName` set to `"approve"`.
 */
export function useIerc20MinimalApprove<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc20MinimalABI, "approve">["request"]["abi"],
        "approve",
        TMode
      > & { functionName?: "approve" }
    : UseContractWriteConfig<typeof ierc20MinimalABI, "approve", TMode> & {
        abi?: never;
        functionName?: "approve";
      } = {} as any,
) {
  return useContractWrite<typeof ierc20MinimalABI, "approve", TMode>({
    abi: ierc20MinimalABI,
    functionName: "approve",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20MinimalABI}__ and `functionName` set to `"transfer"`.
 */
export function useIerc20MinimalTransfer<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc20MinimalABI, "transfer">["request"]["abi"],
        "transfer",
        TMode
      > & { functionName?: "transfer" }
    : UseContractWriteConfig<typeof ierc20MinimalABI, "transfer", TMode> & {
        abi?: never;
        functionName?: "transfer";
      } = {} as any,
) {
  return useContractWrite<typeof ierc20MinimalABI, "transfer", TMode>({
    abi: ierc20MinimalABI,
    functionName: "transfer",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20MinimalABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useIerc20MinimalTransferFrom<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc20MinimalABI, "transferFrom">["request"]["abi"],
        "transferFrom",
        TMode
      > & { functionName?: "transferFrom" }
    : UseContractWriteConfig<typeof ierc20MinimalABI, "transferFrom", TMode> & {
        abi?: never;
        functionName?: "transferFrom";
      } = {} as any,
) {
  return useContractWrite<typeof ierc20MinimalABI, "transferFrom", TMode>({
    abi: ierc20MinimalABI,
    functionName: "transferFrom",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20MinimalABI}__.
 */
export function usePrepareIerc20MinimalWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof ierc20MinimalABI, TFunctionName>, "abi"> = {} as any,
) {
  return usePrepareContractWrite({ abi: ierc20MinimalABI, ...config } as UsePrepareContractWriteConfig<
    typeof ierc20MinimalABI,
    TFunctionName
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20MinimalABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareIerc20MinimalApprove(
  config: Omit<UsePrepareContractWriteConfig<typeof ierc20MinimalABI, "approve">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20MinimalABI,
    functionName: "approve",
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20MinimalABI, "approve">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20MinimalABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareIerc20MinimalTransfer(
  config: Omit<UsePrepareContractWriteConfig<typeof ierc20MinimalABI, "transfer">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20MinimalABI,
    functionName: "transfer",
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20MinimalABI, "transfer">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20MinimalABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareIerc20MinimalTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc20MinimalABI, "transferFrom">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20MinimalABI,
    functionName: "transferFrom",
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20MinimalABI, "transferFrom">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc20MinimalABI}__.
 */
export function useIerc20MinimalEvent<TEventName extends string>(
  config: Omit<UseContractEventConfig<typeof ierc20MinimalABI, TEventName>, "abi"> = {} as any,
) {
  return useContractEvent({ abi: ierc20MinimalABI, ...config } as UseContractEventConfig<
    typeof ierc20MinimalABI,
    TEventName
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc20MinimalABI}__ and `eventName` set to `"Approval"`.
 */
export function useIerc20MinimalApprovalEvent(
  config: Omit<UseContractEventConfig<typeof ierc20MinimalABI, "Approval">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: ierc20MinimalABI, eventName: "Approval", ...config } as UseContractEventConfig<
    typeof ierc20MinimalABI,
    "Approval"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc20MinimalABI}__ and `eventName` set to `"Transfer"`.
 */
export function useIerc20MinimalTransferEvent(
  config: Omit<UseContractEventConfig<typeof ierc20MinimalABI, "Transfer">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: ierc20MinimalABI, eventName: "Transfer", ...config } as UseContractEventConfig<
    typeof ierc20MinimalABI,
    "Transfer"
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc6909ClaimsABI}__.
 */
export function useIerc6909ClaimsRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ierc6909ClaimsABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof ierc6909ClaimsABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: ierc6909ClaimsABI, ...config } as UseContractReadConfig<
    typeof ierc6909ClaimsABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc6909ClaimsABI}__ and `functionName` set to `"allowance"`.
 */
export function useIerc6909ClaimsAllowance<
  TFunctionName extends "allowance",
  TSelectData = ReadContractResult<typeof ierc6909ClaimsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc6909ClaimsABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: ierc6909ClaimsABI, functionName: "allowance", ...config } as UseContractReadConfig<
    typeof ierc6909ClaimsABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc6909ClaimsABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useIerc6909ClaimsBalanceOf<
  TFunctionName extends "balanceOf",
  TSelectData = ReadContractResult<typeof ierc6909ClaimsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc6909ClaimsABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: ierc6909ClaimsABI, functionName: "balanceOf", ...config } as UseContractReadConfig<
    typeof ierc6909ClaimsABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc6909ClaimsABI}__ and `functionName` set to `"isOperator"`.
 */
export function useIerc6909ClaimsIsOperator<
  TFunctionName extends "isOperator",
  TSelectData = ReadContractResult<typeof ierc6909ClaimsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc6909ClaimsABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: ierc6909ClaimsABI, functionName: "isOperator", ...config } as UseContractReadConfig<
    typeof ierc6909ClaimsABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc6909ClaimsABI}__.
 */
export function useIerc6909ClaimsWrite<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc6909ClaimsABI, string>["request"]["abi"],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof ierc6909ClaimsABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof ierc6909ClaimsABI, TFunctionName, TMode>({ abi: ierc6909ClaimsABI, ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc6909ClaimsABI}__ and `functionName` set to `"approve"`.
 */
export function useIerc6909ClaimsApprove<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc6909ClaimsABI, "approve">["request"]["abi"],
        "approve",
        TMode
      > & { functionName?: "approve" }
    : UseContractWriteConfig<typeof ierc6909ClaimsABI, "approve", TMode> & {
        abi?: never;
        functionName?: "approve";
      } = {} as any,
) {
  return useContractWrite<typeof ierc6909ClaimsABI, "approve", TMode>({
    abi: ierc6909ClaimsABI,
    functionName: "approve",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc6909ClaimsABI}__ and `functionName` set to `"setOperator"`.
 */
export function useIerc6909ClaimsSetOperator<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc6909ClaimsABI, "setOperator">["request"]["abi"],
        "setOperator",
        TMode
      > & { functionName?: "setOperator" }
    : UseContractWriteConfig<typeof ierc6909ClaimsABI, "setOperator", TMode> & {
        abi?: never;
        functionName?: "setOperator";
      } = {} as any,
) {
  return useContractWrite<typeof ierc6909ClaimsABI, "setOperator", TMode>({
    abi: ierc6909ClaimsABI,
    functionName: "setOperator",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc6909ClaimsABI}__ and `functionName` set to `"transfer"`.
 */
export function useIerc6909ClaimsTransfer<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc6909ClaimsABI, "transfer">["request"]["abi"],
        "transfer",
        TMode
      > & { functionName?: "transfer" }
    : UseContractWriteConfig<typeof ierc6909ClaimsABI, "transfer", TMode> & {
        abi?: never;
        functionName?: "transfer";
      } = {} as any,
) {
  return useContractWrite<typeof ierc6909ClaimsABI, "transfer", TMode>({
    abi: ierc6909ClaimsABI,
    functionName: "transfer",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc6909ClaimsABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useIerc6909ClaimsTransferFrom<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc6909ClaimsABI, "transferFrom">["request"]["abi"],
        "transferFrom",
        TMode
      > & { functionName?: "transferFrom" }
    : UseContractWriteConfig<typeof ierc6909ClaimsABI, "transferFrom", TMode> & {
        abi?: never;
        functionName?: "transferFrom";
      } = {} as any,
) {
  return useContractWrite<typeof ierc6909ClaimsABI, "transferFrom", TMode>({
    abi: ierc6909ClaimsABI,
    functionName: "transferFrom",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc6909ClaimsABI}__.
 */
export function usePrepareIerc6909ClaimsWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof ierc6909ClaimsABI, TFunctionName>, "abi"> = {} as any,
) {
  return usePrepareContractWrite({ abi: ierc6909ClaimsABI, ...config } as UsePrepareContractWriteConfig<
    typeof ierc6909ClaimsABI,
    TFunctionName
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc6909ClaimsABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareIerc6909ClaimsApprove(
  config: Omit<UsePrepareContractWriteConfig<typeof ierc6909ClaimsABI, "approve">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc6909ClaimsABI,
    functionName: "approve",
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc6909ClaimsABI, "approve">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc6909ClaimsABI}__ and `functionName` set to `"setOperator"`.
 */
export function usePrepareIerc6909ClaimsSetOperator(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc6909ClaimsABI, "setOperator">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc6909ClaimsABI,
    functionName: "setOperator",
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc6909ClaimsABI, "setOperator">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc6909ClaimsABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareIerc6909ClaimsTransfer(
  config: Omit<UsePrepareContractWriteConfig<typeof ierc6909ClaimsABI, "transfer">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc6909ClaimsABI,
    functionName: "transfer",
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc6909ClaimsABI, "transfer">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc6909ClaimsABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareIerc6909ClaimsTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc6909ClaimsABI, "transferFrom">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc6909ClaimsABI,
    functionName: "transferFrom",
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc6909ClaimsABI, "transferFrom">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc6909ClaimsABI}__.
 */
export function useIerc6909ClaimsEvent<TEventName extends string>(
  config: Omit<UseContractEventConfig<typeof ierc6909ClaimsABI, TEventName>, "abi"> = {} as any,
) {
  return useContractEvent({ abi: ierc6909ClaimsABI, ...config } as UseContractEventConfig<
    typeof ierc6909ClaimsABI,
    TEventName
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc6909ClaimsABI}__ and `eventName` set to `"Approval"`.
 */
export function useIerc6909ClaimsApprovalEvent(
  config: Omit<UseContractEventConfig<typeof ierc6909ClaimsABI, "Approval">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: ierc6909ClaimsABI, eventName: "Approval", ...config } as UseContractEventConfig<
    typeof ierc6909ClaimsABI,
    "Approval"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc6909ClaimsABI}__ and `eventName` set to `"OperatorSet"`.
 */
export function useIerc6909ClaimsOperatorSetEvent(
  config: Omit<UseContractEventConfig<typeof ierc6909ClaimsABI, "OperatorSet">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: ierc6909ClaimsABI, eventName: "OperatorSet", ...config } as UseContractEventConfig<
    typeof ierc6909ClaimsABI,
    "OperatorSet"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc6909ClaimsABI}__ and `eventName` set to `"Transfer"`.
 */
export function useIerc6909ClaimsTransferEvent(
  config: Omit<UseContractEventConfig<typeof ierc6909ClaimsABI, "Transfer">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: ierc6909ClaimsABI, eventName: "Transfer", ...config } as UseContractEventConfig<
    typeof ierc6909ClaimsABI,
    "Transfer"
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721ABI}__.
 */
export function useIerc721Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ierc721ABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof ierc721ABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: ierc721ABI, ...config } as UseContractReadConfig<
    typeof ierc721ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721ABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useIerc721BalanceOf<
  TFunctionName extends "balanceOf",
  TSelectData = ReadContractResult<typeof ierc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc721ABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: ierc721ABI, functionName: "balanceOf", ...config } as UseContractReadConfig<
    typeof ierc721ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721ABI}__ and `functionName` set to `"getApproved"`.
 */
export function useIerc721GetApproved<
  TFunctionName extends "getApproved",
  TSelectData = ReadContractResult<typeof ierc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc721ABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: ierc721ABI, functionName: "getApproved", ...config } as UseContractReadConfig<
    typeof ierc721ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721ABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useIerc721IsApprovedForAll<
  TFunctionName extends "isApprovedForAll",
  TSelectData = ReadContractResult<typeof ierc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc721ABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: ierc721ABI, functionName: "isApprovedForAll", ...config } as UseContractReadConfig<
    typeof ierc721ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721ABI}__ and `functionName` set to `"ownerOf"`.
 */
export function useIerc721OwnerOf<
  TFunctionName extends "ownerOf",
  TSelectData = ReadContractResult<typeof ierc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc721ABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: ierc721ABI, functionName: "ownerOf", ...config } as UseContractReadConfig<
    typeof ierc721ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721ABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useIerc721SupportsInterface<
  TFunctionName extends "supportsInterface",
  TSelectData = ReadContractResult<typeof ierc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc721ABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: ierc721ABI, functionName: "supportsInterface", ...config } as UseContractReadConfig<
    typeof ierc721ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721ABI}__.
 */
export function useIerc721Write<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc721ABI, string>["request"]["abi"],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof ierc721ABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof ierc721ABI, TFunctionName, TMode>({ abi: ierc721ABI, ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721ABI}__ and `functionName` set to `"approve"`.
 */
export function useIerc721Approve<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc721ABI, "approve">["request"]["abi"],
        "approve",
        TMode
      > & { functionName?: "approve" }
    : UseContractWriteConfig<typeof ierc721ABI, "approve", TMode> & {
        abi?: never;
        functionName?: "approve";
      } = {} as any,
) {
  return useContractWrite<typeof ierc721ABI, "approve", TMode>({
    abi: ierc721ABI,
    functionName: "approve",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721ABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useIerc721SafeTransferFrom<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc721ABI, "safeTransferFrom">["request"]["abi"],
        "safeTransferFrom",
        TMode
      > & { functionName?: "safeTransferFrom" }
    : UseContractWriteConfig<typeof ierc721ABI, "safeTransferFrom", TMode> & {
        abi?: never;
        functionName?: "safeTransferFrom";
      } = {} as any,
) {
  return useContractWrite<typeof ierc721ABI, "safeTransferFrom", TMode>({
    abi: ierc721ABI,
    functionName: "safeTransferFrom",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721ABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useIerc721SetApprovalForAll<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc721ABI, "setApprovalForAll">["request"]["abi"],
        "setApprovalForAll",
        TMode
      > & { functionName?: "setApprovalForAll" }
    : UseContractWriteConfig<typeof ierc721ABI, "setApprovalForAll", TMode> & {
        abi?: never;
        functionName?: "setApprovalForAll";
      } = {} as any,
) {
  return useContractWrite<typeof ierc721ABI, "setApprovalForAll", TMode>({
    abi: ierc721ABI,
    functionName: "setApprovalForAll",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useIerc721TransferFrom<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc721ABI, "transferFrom">["request"]["abi"],
        "transferFrom",
        TMode
      > & { functionName?: "transferFrom" }
    : UseContractWriteConfig<typeof ierc721ABI, "transferFrom", TMode> & {
        abi?: never;
        functionName?: "transferFrom";
      } = {} as any,
) {
  return useContractWrite<typeof ierc721ABI, "transferFrom", TMode>({
    abi: ierc721ABI,
    functionName: "transferFrom",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721ABI}__.
 */
export function usePrepareIerc721Write<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof ierc721ABI, TFunctionName>, "abi"> = {} as any,
) {
  return usePrepareContractWrite({ abi: ierc721ABI, ...config } as UsePrepareContractWriteConfig<
    typeof ierc721ABI,
    TFunctionName
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721ABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareIerc721Approve(
  config: Omit<UsePrepareContractWriteConfig<typeof ierc721ABI, "approve">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721ABI,
    functionName: "approve",
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc721ABI, "approve">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721ABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareIerc721SafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc721ABI, "safeTransferFrom">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721ABI,
    functionName: "safeTransferFrom",
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc721ABI, "safeTransferFrom">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721ABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareIerc721SetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc721ABI, "setApprovalForAll">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721ABI,
    functionName: "setApprovalForAll",
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc721ABI, "setApprovalForAll">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareIerc721TransferFrom(
  config: Omit<UsePrepareContractWriteConfig<typeof ierc721ABI, "transferFrom">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721ABI,
    functionName: "transferFrom",
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc721ABI, "transferFrom">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc721ABI}__.
 */
export function useIerc721Event<TEventName extends string>(
  config: Omit<UseContractEventConfig<typeof ierc721ABI, TEventName>, "abi"> = {} as any,
) {
  return useContractEvent({ abi: ierc721ABI, ...config } as UseContractEventConfig<typeof ierc721ABI, TEventName>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc721ABI}__ and `eventName` set to `"Approval"`.
 */
export function useIerc721ApprovalEvent(
  config: Omit<UseContractEventConfig<typeof ierc721ABI, "Approval">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: ierc721ABI, eventName: "Approval", ...config } as UseContractEventConfig<
    typeof ierc721ABI,
    "Approval"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc721ABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useIerc721ApprovalForAllEvent(
  config: Omit<UseContractEventConfig<typeof ierc721ABI, "ApprovalForAll">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: ierc721ABI, eventName: "ApprovalForAll", ...config } as UseContractEventConfig<
    typeof ierc721ABI,
    "ApprovalForAll"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc721ABI}__ and `eventName` set to `"Transfer"`.
 */
export function useIerc721TransferEvent(
  config: Omit<UseContractEventConfig<typeof ierc721ABI, "Transfer">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: ierc721ABI, eventName: "Transfer", ...config } as UseContractEventConfig<
    typeof ierc721ABI,
    "Transfer"
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721EnumerableABI}__.
 */
export function useIerc721EnumerableRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ierc721EnumerableABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof ierc721EnumerableABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: ierc721EnumerableABI, ...config } as UseContractReadConfig<
    typeof ierc721EnumerableABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useIerc721EnumerableBalanceOf<
  TFunctionName extends "balanceOf",
  TSelectData = ReadContractResult<typeof ierc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc721EnumerableABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: ierc721EnumerableABI, functionName: "balanceOf", ...config } as UseContractReadConfig<
    typeof ierc721EnumerableABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"getApproved"`.
 */
export function useIerc721EnumerableGetApproved<
  TFunctionName extends "getApproved",
  TSelectData = ReadContractResult<typeof ierc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc721EnumerableABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: ierc721EnumerableABI, functionName: "getApproved", ...config } as UseContractReadConfig<
    typeof ierc721EnumerableABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useIerc721EnumerableIsApprovedForAll<
  TFunctionName extends "isApprovedForAll",
  TSelectData = ReadContractResult<typeof ierc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc721EnumerableABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721EnumerableABI,
    functionName: "isApprovedForAll",
    ...config,
  } as UseContractReadConfig<typeof ierc721EnumerableABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"ownerOf"`.
 */
export function useIerc721EnumerableOwnerOf<
  TFunctionName extends "ownerOf",
  TSelectData = ReadContractResult<typeof ierc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc721EnumerableABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: ierc721EnumerableABI, functionName: "ownerOf", ...config } as UseContractReadConfig<
    typeof ierc721EnumerableABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useIerc721EnumerableSupportsInterface<
  TFunctionName extends "supportsInterface",
  TSelectData = ReadContractResult<typeof ierc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc721EnumerableABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721EnumerableABI,
    functionName: "supportsInterface",
    ...config,
  } as UseContractReadConfig<typeof ierc721EnumerableABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"tokenByIndex"`.
 */
export function useIerc721EnumerableTokenByIndex<
  TFunctionName extends "tokenByIndex",
  TSelectData = ReadContractResult<typeof ierc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc721EnumerableABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721EnumerableABI,
    functionName: "tokenByIndex",
    ...config,
  } as UseContractReadConfig<typeof ierc721EnumerableABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"tokenOfOwnerByIndex"`.
 */
export function useIerc721EnumerableTokenOfOwnerByIndex<
  TFunctionName extends "tokenOfOwnerByIndex",
  TSelectData = ReadContractResult<typeof ierc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc721EnumerableABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721EnumerableABI,
    functionName: "tokenOfOwnerByIndex",
    ...config,
  } as UseContractReadConfig<typeof ierc721EnumerableABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useIerc721EnumerableTotalSupply<
  TFunctionName extends "totalSupply",
  TSelectData = ReadContractResult<typeof ierc721EnumerableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc721EnumerableABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: ierc721EnumerableABI, functionName: "totalSupply", ...config } as UseContractReadConfig<
    typeof ierc721EnumerableABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721EnumerableABI}__.
 */
export function useIerc721EnumerableWrite<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc721EnumerableABI, string>["request"]["abi"],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof ierc721EnumerableABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof ierc721EnumerableABI, TFunctionName, TMode>({
    abi: ierc721EnumerableABI,
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"approve"`.
 */
export function useIerc721EnumerableApprove<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc721EnumerableABI, "approve">["request"]["abi"],
        "approve",
        TMode
      > & { functionName?: "approve" }
    : UseContractWriteConfig<typeof ierc721EnumerableABI, "approve", TMode> & {
        abi?: never;
        functionName?: "approve";
      } = {} as any,
) {
  return useContractWrite<typeof ierc721EnumerableABI, "approve", TMode>({
    abi: ierc721EnumerableABI,
    functionName: "approve",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useIerc721EnumerableSafeTransferFrom<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc721EnumerableABI, "safeTransferFrom">["request"]["abi"],
        "safeTransferFrom",
        TMode
      > & { functionName?: "safeTransferFrom" }
    : UseContractWriteConfig<typeof ierc721EnumerableABI, "safeTransferFrom", TMode> & {
        abi?: never;
        functionName?: "safeTransferFrom";
      } = {} as any,
) {
  return useContractWrite<typeof ierc721EnumerableABI, "safeTransferFrom", TMode>({
    abi: ierc721EnumerableABI,
    functionName: "safeTransferFrom",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useIerc721EnumerableSetApprovalForAll<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc721EnumerableABI, "setApprovalForAll">["request"]["abi"],
        "setApprovalForAll",
        TMode
      > & { functionName?: "setApprovalForAll" }
    : UseContractWriteConfig<typeof ierc721EnumerableABI, "setApprovalForAll", TMode> & {
        abi?: never;
        functionName?: "setApprovalForAll";
      } = {} as any,
) {
  return useContractWrite<typeof ierc721EnumerableABI, "setApprovalForAll", TMode>({
    abi: ierc721EnumerableABI,
    functionName: "setApprovalForAll",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useIerc721EnumerableTransferFrom<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc721EnumerableABI, "transferFrom">["request"]["abi"],
        "transferFrom",
        TMode
      > & { functionName?: "transferFrom" }
    : UseContractWriteConfig<typeof ierc721EnumerableABI, "transferFrom", TMode> & {
        abi?: never;
        functionName?: "transferFrom";
      } = {} as any,
) {
  return useContractWrite<typeof ierc721EnumerableABI, "transferFrom", TMode>({
    abi: ierc721EnumerableABI,
    functionName: "transferFrom",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721EnumerableABI}__.
 */
export function usePrepareIerc721EnumerableWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof ierc721EnumerableABI, TFunctionName>, "abi"> = {} as any,
) {
  return usePrepareContractWrite({ abi: ierc721EnumerableABI, ...config } as UsePrepareContractWriteConfig<
    typeof ierc721EnumerableABI,
    TFunctionName
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareIerc721EnumerableApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc721EnumerableABI, "approve">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721EnumerableABI,
    functionName: "approve",
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc721EnumerableABI, "approve">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareIerc721EnumerableSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc721EnumerableABI, "safeTransferFrom">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721EnumerableABI,
    functionName: "safeTransferFrom",
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc721EnumerableABI, "safeTransferFrom">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareIerc721EnumerableSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc721EnumerableABI, "setApprovalForAll">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721EnumerableABI,
    functionName: "setApprovalForAll",
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc721EnumerableABI, "setApprovalForAll">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareIerc721EnumerableTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc721EnumerableABI, "transferFrom">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721EnumerableABI,
    functionName: "transferFrom",
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc721EnumerableABI, "transferFrom">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc721EnumerableABI}__.
 */
export function useIerc721EnumerableEvent<TEventName extends string>(
  config: Omit<UseContractEventConfig<typeof ierc721EnumerableABI, TEventName>, "abi"> = {} as any,
) {
  return useContractEvent({ abi: ierc721EnumerableABI, ...config } as UseContractEventConfig<
    typeof ierc721EnumerableABI,
    TEventName
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `eventName` set to `"Approval"`.
 */
export function useIerc721EnumerableApprovalEvent(
  config: Omit<UseContractEventConfig<typeof ierc721EnumerableABI, "Approval">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: ierc721EnumerableABI, eventName: "Approval", ...config } as UseContractEventConfig<
    typeof ierc721EnumerableABI,
    "Approval"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useIerc721EnumerableApprovalForAllEvent(
  config: Omit<UseContractEventConfig<typeof ierc721EnumerableABI, "ApprovalForAll">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({
    abi: ierc721EnumerableABI,
    eventName: "ApprovalForAll",
    ...config,
  } as UseContractEventConfig<typeof ierc721EnumerableABI, "ApprovalForAll">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc721EnumerableABI}__ and `eventName` set to `"Transfer"`.
 */
export function useIerc721EnumerableTransferEvent(
  config: Omit<UseContractEventConfig<typeof ierc721EnumerableABI, "Transfer">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: ierc721EnumerableABI, eventName: "Transfer", ...config } as UseContractEventConfig<
    typeof ierc721EnumerableABI,
    "Transfer"
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721MetadataABI}__.
 */
export function useIerc721MetadataRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ierc721MetadataABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof ierc721MetadataABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: ierc721MetadataABI, ...config } as UseContractReadConfig<
    typeof ierc721MetadataABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useIerc721MetadataBalanceOf<
  TFunctionName extends "balanceOf",
  TSelectData = ReadContractResult<typeof ierc721MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc721MetadataABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: ierc721MetadataABI, functionName: "balanceOf", ...config } as UseContractReadConfig<
    typeof ierc721MetadataABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"getApproved"`.
 */
export function useIerc721MetadataGetApproved<
  TFunctionName extends "getApproved",
  TSelectData = ReadContractResult<typeof ierc721MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc721MetadataABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: ierc721MetadataABI, functionName: "getApproved", ...config } as UseContractReadConfig<
    typeof ierc721MetadataABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useIerc721MetadataIsApprovedForAll<
  TFunctionName extends "isApprovedForAll",
  TSelectData = ReadContractResult<typeof ierc721MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc721MetadataABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721MetadataABI,
    functionName: "isApprovedForAll",
    ...config,
  } as UseContractReadConfig<typeof ierc721MetadataABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"name"`.
 */
export function useIerc721MetadataName<
  TFunctionName extends "name",
  TSelectData = ReadContractResult<typeof ierc721MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc721MetadataABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: ierc721MetadataABI, functionName: "name", ...config } as UseContractReadConfig<
    typeof ierc721MetadataABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"ownerOf"`.
 */
export function useIerc721MetadataOwnerOf<
  TFunctionName extends "ownerOf",
  TSelectData = ReadContractResult<typeof ierc721MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc721MetadataABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: ierc721MetadataABI, functionName: "ownerOf", ...config } as UseContractReadConfig<
    typeof ierc721MetadataABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useIerc721MetadataSupportsInterface<
  TFunctionName extends "supportsInterface",
  TSelectData = ReadContractResult<typeof ierc721MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc721MetadataABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: ierc721MetadataABI,
    functionName: "supportsInterface",
    ...config,
  } as UseContractReadConfig<typeof ierc721MetadataABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"symbol"`.
 */
export function useIerc721MetadataSymbol<
  TFunctionName extends "symbol",
  TSelectData = ReadContractResult<typeof ierc721MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc721MetadataABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: ierc721MetadataABI, functionName: "symbol", ...config } as UseContractReadConfig<
    typeof ierc721MetadataABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"tokenURI"`.
 */
export function useIerc721MetadataTokenUri<
  TFunctionName extends "tokenURI",
  TSelectData = ReadContractResult<typeof ierc721MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc721MetadataABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: ierc721MetadataABI, functionName: "tokenURI", ...config } as UseContractReadConfig<
    typeof ierc721MetadataABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721MetadataABI}__.
 */
export function useIerc721MetadataWrite<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc721MetadataABI, string>["request"]["abi"],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof ierc721MetadataABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof ierc721MetadataABI, TFunctionName, TMode>({
    abi: ierc721MetadataABI,
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"approve"`.
 */
export function useIerc721MetadataApprove<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc721MetadataABI, "approve">["request"]["abi"],
        "approve",
        TMode
      > & { functionName?: "approve" }
    : UseContractWriteConfig<typeof ierc721MetadataABI, "approve", TMode> & {
        abi?: never;
        functionName?: "approve";
      } = {} as any,
) {
  return useContractWrite<typeof ierc721MetadataABI, "approve", TMode>({
    abi: ierc721MetadataABI,
    functionName: "approve",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useIerc721MetadataSafeTransferFrom<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc721MetadataABI, "safeTransferFrom">["request"]["abi"],
        "safeTransferFrom",
        TMode
      > & { functionName?: "safeTransferFrom" }
    : UseContractWriteConfig<typeof ierc721MetadataABI, "safeTransferFrom", TMode> & {
        abi?: never;
        functionName?: "safeTransferFrom";
      } = {} as any,
) {
  return useContractWrite<typeof ierc721MetadataABI, "safeTransferFrom", TMode>({
    abi: ierc721MetadataABI,
    functionName: "safeTransferFrom",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useIerc721MetadataSetApprovalForAll<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc721MetadataABI, "setApprovalForAll">["request"]["abi"],
        "setApprovalForAll",
        TMode
      > & { functionName?: "setApprovalForAll" }
    : UseContractWriteConfig<typeof ierc721MetadataABI, "setApprovalForAll", TMode> & {
        abi?: never;
        functionName?: "setApprovalForAll";
      } = {} as any,
) {
  return useContractWrite<typeof ierc721MetadataABI, "setApprovalForAll", TMode>({
    abi: ierc721MetadataABI,
    functionName: "setApprovalForAll",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useIerc721MetadataTransferFrom<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc721MetadataABI, "transferFrom">["request"]["abi"],
        "transferFrom",
        TMode
      > & { functionName?: "transferFrom" }
    : UseContractWriteConfig<typeof ierc721MetadataABI, "transferFrom", TMode> & {
        abi?: never;
        functionName?: "transferFrom";
      } = {} as any,
) {
  return useContractWrite<typeof ierc721MetadataABI, "transferFrom", TMode>({
    abi: ierc721MetadataABI,
    functionName: "transferFrom",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721MetadataABI}__.
 */
export function usePrepareIerc721MetadataWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof ierc721MetadataABI, TFunctionName>, "abi"> = {} as any,
) {
  return usePrepareContractWrite({ abi: ierc721MetadataABI, ...config } as UsePrepareContractWriteConfig<
    typeof ierc721MetadataABI,
    TFunctionName
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareIerc721MetadataApprove(
  config: Omit<UsePrepareContractWriteConfig<typeof ierc721MetadataABI, "approve">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721MetadataABI,
    functionName: "approve",
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc721MetadataABI, "approve">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareIerc721MetadataSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc721MetadataABI, "safeTransferFrom">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721MetadataABI,
    functionName: "safeTransferFrom",
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc721MetadataABI, "safeTransferFrom">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareIerc721MetadataSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc721MetadataABI, "setApprovalForAll">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721MetadataABI,
    functionName: "setApprovalForAll",
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc721MetadataABI, "setApprovalForAll">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721MetadataABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareIerc721MetadataTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc721MetadataABI, "transferFrom">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721MetadataABI,
    functionName: "transferFrom",
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc721MetadataABI, "transferFrom">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc721MetadataABI}__.
 */
export function useIerc721MetadataEvent<TEventName extends string>(
  config: Omit<UseContractEventConfig<typeof ierc721MetadataABI, TEventName>, "abi"> = {} as any,
) {
  return useContractEvent({ abi: ierc721MetadataABI, ...config } as UseContractEventConfig<
    typeof ierc721MetadataABI,
    TEventName
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc721MetadataABI}__ and `eventName` set to `"Approval"`.
 */
export function useIerc721MetadataApprovalEvent(
  config: Omit<UseContractEventConfig<typeof ierc721MetadataABI, "Approval">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: ierc721MetadataABI, eventName: "Approval", ...config } as UseContractEventConfig<
    typeof ierc721MetadataABI,
    "Approval"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc721MetadataABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useIerc721MetadataApprovalForAllEvent(
  config: Omit<UseContractEventConfig<typeof ierc721MetadataABI, "ApprovalForAll">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: ierc721MetadataABI, eventName: "ApprovalForAll", ...config } as UseContractEventConfig<
    typeof ierc721MetadataABI,
    "ApprovalForAll"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc721MetadataABI}__ and `eventName` set to `"Transfer"`.
 */
export function useIerc721MetadataTransferEvent(
  config: Omit<UseContractEventConfig<typeof ierc721MetadataABI, "Transfer">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: ierc721MetadataABI, eventName: "Transfer", ...config } as UseContractEventConfig<
    typeof ierc721MetadataABI,
    "Transfer"
  >);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721TokenReceiverABI}__.
 */
export function useIerc721TokenReceiverWrite<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc721TokenReceiverABI, string>["request"]["abi"],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof ierc721TokenReceiverABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof ierc721TokenReceiverABI, TFunctionName, TMode>({
    abi: ierc721TokenReceiverABI,
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc721TokenReceiverABI}__ and `functionName` set to `"onERC721Received"`.
 */
export function useIerc721TokenReceiverOnErc721Received<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc721TokenReceiverABI, "onERC721Received">["request"]["abi"],
        "onERC721Received",
        TMode
      > & { functionName?: "onERC721Received" }
    : UseContractWriteConfig<typeof ierc721TokenReceiverABI, "onERC721Received", TMode> & {
        abi?: never;
        functionName?: "onERC721Received";
      } = {} as any,
) {
  return useContractWrite<typeof ierc721TokenReceiverABI, "onERC721Received", TMode>({
    abi: ierc721TokenReceiverABI,
    functionName: "onERC721Received",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721TokenReceiverABI}__.
 */
export function usePrepareIerc721TokenReceiverWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof ierc721TokenReceiverABI, TFunctionName>, "abi"> = {} as any,
) {
  return usePrepareContractWrite({ abi: ierc721TokenReceiverABI, ...config } as UsePrepareContractWriteConfig<
    typeof ierc721TokenReceiverABI,
    TFunctionName
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc721TokenReceiverABI}__ and `functionName` set to `"onERC721Received"`.
 */
export function usePrepareIerc721TokenReceiverOnErc721Received(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc721TokenReceiverABI, "onERC721Received">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc721TokenReceiverABI,
    functionName: "onERC721Received",
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc721TokenReceiverABI, "onERC721Received">);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iExtsloadABI}__.
 */
export function useIExtsloadRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof iExtsloadABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof iExtsloadABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: iExtsloadABI, ...config } as UseContractReadConfig<
    typeof iExtsloadABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iExtsloadABI}__ and `functionName` set to `"extsload"`.
 */
export function useIExtsloadExtsload<
  TFunctionName extends "extsload",
  TSelectData = ReadContractResult<typeof iExtsloadABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iExtsloadABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: iExtsloadABI, functionName: "extsload", ...config } as UseContractReadConfig<
    typeof iExtsloadABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iExttloadABI}__.
 */
export function useIExttloadRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof iExttloadABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof iExttloadABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: iExttloadABI, ...config } as UseContractReadConfig<
    typeof iExttloadABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iExttloadABI}__ and `functionName` set to `"exttload"`.
 */
export function useIExttloadExttload<
  TFunctionName extends "exttload",
  TSelectData = ReadContractResult<typeof iExttloadABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iExttloadABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: iExttloadABI, functionName: "exttload", ...config } as UseContractReadConfig<
    typeof iExttloadABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iHooksABI}__.
 */
export function useIHooksWrite<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iHooksABI, string>["request"]["abi"],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof iHooksABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof iHooksABI, TFunctionName, TMode>({ abi: iHooksABI, ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iHooksABI}__ and `functionName` set to `"afterAddLiquidity"`.
 */
export function useIHooksAfterAddLiquidity<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iHooksABI, "afterAddLiquidity">["request"]["abi"],
        "afterAddLiquidity",
        TMode
      > & { functionName?: "afterAddLiquidity" }
    : UseContractWriteConfig<typeof iHooksABI, "afterAddLiquidity", TMode> & {
        abi?: never;
        functionName?: "afterAddLiquidity";
      } = {} as any,
) {
  return useContractWrite<typeof iHooksABI, "afterAddLiquidity", TMode>({
    abi: iHooksABI,
    functionName: "afterAddLiquidity",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iHooksABI}__ and `functionName` set to `"afterDonate"`.
 */
export function useIHooksAfterDonate<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iHooksABI, "afterDonate">["request"]["abi"],
        "afterDonate",
        TMode
      > & { functionName?: "afterDonate" }
    : UseContractWriteConfig<typeof iHooksABI, "afterDonate", TMode> & {
        abi?: never;
        functionName?: "afterDonate";
      } = {} as any,
) {
  return useContractWrite<typeof iHooksABI, "afterDonate", TMode>({
    abi: iHooksABI,
    functionName: "afterDonate",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iHooksABI}__ and `functionName` set to `"afterInitialize"`.
 */
export function useIHooksAfterInitialize<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iHooksABI, "afterInitialize">["request"]["abi"],
        "afterInitialize",
        TMode
      > & { functionName?: "afterInitialize" }
    : UseContractWriteConfig<typeof iHooksABI, "afterInitialize", TMode> & {
        abi?: never;
        functionName?: "afterInitialize";
      } = {} as any,
) {
  return useContractWrite<typeof iHooksABI, "afterInitialize", TMode>({
    abi: iHooksABI,
    functionName: "afterInitialize",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iHooksABI}__ and `functionName` set to `"afterRemoveLiquidity"`.
 */
export function useIHooksAfterRemoveLiquidity<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iHooksABI, "afterRemoveLiquidity">["request"]["abi"],
        "afterRemoveLiquidity",
        TMode
      > & { functionName?: "afterRemoveLiquidity" }
    : UseContractWriteConfig<typeof iHooksABI, "afterRemoveLiquidity", TMode> & {
        abi?: never;
        functionName?: "afterRemoveLiquidity";
      } = {} as any,
) {
  return useContractWrite<typeof iHooksABI, "afterRemoveLiquidity", TMode>({
    abi: iHooksABI,
    functionName: "afterRemoveLiquidity",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iHooksABI}__ and `functionName` set to `"afterSwap"`.
 */
export function useIHooksAfterSwap<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iHooksABI, "afterSwap">["request"]["abi"],
        "afterSwap",
        TMode
      > & { functionName?: "afterSwap" }
    : UseContractWriteConfig<typeof iHooksABI, "afterSwap", TMode> & {
        abi?: never;
        functionName?: "afterSwap";
      } = {} as any,
) {
  return useContractWrite<typeof iHooksABI, "afterSwap", TMode>({
    abi: iHooksABI,
    functionName: "afterSwap",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iHooksABI}__ and `functionName` set to `"beforeAddLiquidity"`.
 */
export function useIHooksBeforeAddLiquidity<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iHooksABI, "beforeAddLiquidity">["request"]["abi"],
        "beforeAddLiquidity",
        TMode
      > & { functionName?: "beforeAddLiquidity" }
    : UseContractWriteConfig<typeof iHooksABI, "beforeAddLiquidity", TMode> & {
        abi?: never;
        functionName?: "beforeAddLiquidity";
      } = {} as any,
) {
  return useContractWrite<typeof iHooksABI, "beforeAddLiquidity", TMode>({
    abi: iHooksABI,
    functionName: "beforeAddLiquidity",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iHooksABI}__ and `functionName` set to `"beforeDonate"`.
 */
export function useIHooksBeforeDonate<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iHooksABI, "beforeDonate">["request"]["abi"],
        "beforeDonate",
        TMode
      > & { functionName?: "beforeDonate" }
    : UseContractWriteConfig<typeof iHooksABI, "beforeDonate", TMode> & {
        abi?: never;
        functionName?: "beforeDonate";
      } = {} as any,
) {
  return useContractWrite<typeof iHooksABI, "beforeDonate", TMode>({
    abi: iHooksABI,
    functionName: "beforeDonate",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iHooksABI}__ and `functionName` set to `"beforeInitialize"`.
 */
export function useIHooksBeforeInitialize<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iHooksABI, "beforeInitialize">["request"]["abi"],
        "beforeInitialize",
        TMode
      > & { functionName?: "beforeInitialize" }
    : UseContractWriteConfig<typeof iHooksABI, "beforeInitialize", TMode> & {
        abi?: never;
        functionName?: "beforeInitialize";
      } = {} as any,
) {
  return useContractWrite<typeof iHooksABI, "beforeInitialize", TMode>({
    abi: iHooksABI,
    functionName: "beforeInitialize",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iHooksABI}__ and `functionName` set to `"beforeRemoveLiquidity"`.
 */
export function useIHooksBeforeRemoveLiquidity<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iHooksABI, "beforeRemoveLiquidity">["request"]["abi"],
        "beforeRemoveLiquidity",
        TMode
      > & { functionName?: "beforeRemoveLiquidity" }
    : UseContractWriteConfig<typeof iHooksABI, "beforeRemoveLiquidity", TMode> & {
        abi?: never;
        functionName?: "beforeRemoveLiquidity";
      } = {} as any,
) {
  return useContractWrite<typeof iHooksABI, "beforeRemoveLiquidity", TMode>({
    abi: iHooksABI,
    functionName: "beforeRemoveLiquidity",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iHooksABI}__ and `functionName` set to `"beforeSwap"`.
 */
export function useIHooksBeforeSwap<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iHooksABI, "beforeSwap">["request"]["abi"],
        "beforeSwap",
        TMode
      > & { functionName?: "beforeSwap" }
    : UseContractWriteConfig<typeof iHooksABI, "beforeSwap", TMode> & {
        abi?: never;
        functionName?: "beforeSwap";
      } = {} as any,
) {
  return useContractWrite<typeof iHooksABI, "beforeSwap", TMode>({
    abi: iHooksABI,
    functionName: "beforeSwap",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iHooksABI}__.
 */
export function usePrepareIHooksWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof iHooksABI, TFunctionName>, "abi"> = {} as any,
) {
  return usePrepareContractWrite({ abi: iHooksABI, ...config } as UsePrepareContractWriteConfig<
    typeof iHooksABI,
    TFunctionName
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iHooksABI}__ and `functionName` set to `"afterAddLiquidity"`.
 */
export function usePrepareIHooksAfterAddLiquidity(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iHooksABI, "afterAddLiquidity">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iHooksABI,
    functionName: "afterAddLiquidity",
    ...config,
  } as UsePrepareContractWriteConfig<typeof iHooksABI, "afterAddLiquidity">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iHooksABI}__ and `functionName` set to `"afterDonate"`.
 */
export function usePrepareIHooksAfterDonate(
  config: Omit<UsePrepareContractWriteConfig<typeof iHooksABI, "afterDonate">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: iHooksABI,
    functionName: "afterDonate",
    ...config,
  } as UsePrepareContractWriteConfig<typeof iHooksABI, "afterDonate">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iHooksABI}__ and `functionName` set to `"afterInitialize"`.
 */
export function usePrepareIHooksAfterInitialize(
  config: Omit<UsePrepareContractWriteConfig<typeof iHooksABI, "afterInitialize">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: iHooksABI,
    functionName: "afterInitialize",
    ...config,
  } as UsePrepareContractWriteConfig<typeof iHooksABI, "afterInitialize">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iHooksABI}__ and `functionName` set to `"afterRemoveLiquidity"`.
 */
export function usePrepareIHooksAfterRemoveLiquidity(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iHooksABI, "afterRemoveLiquidity">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iHooksABI,
    functionName: "afterRemoveLiquidity",
    ...config,
  } as UsePrepareContractWriteConfig<typeof iHooksABI, "afterRemoveLiquidity">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iHooksABI}__ and `functionName` set to `"afterSwap"`.
 */
export function usePrepareIHooksAfterSwap(
  config: Omit<UsePrepareContractWriteConfig<typeof iHooksABI, "afterSwap">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: iHooksABI,
    functionName: "afterSwap",
    ...config,
  } as UsePrepareContractWriteConfig<typeof iHooksABI, "afterSwap">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iHooksABI}__ and `functionName` set to `"beforeAddLiquidity"`.
 */
export function usePrepareIHooksBeforeAddLiquidity(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iHooksABI, "beforeAddLiquidity">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iHooksABI,
    functionName: "beforeAddLiquidity",
    ...config,
  } as UsePrepareContractWriteConfig<typeof iHooksABI, "beforeAddLiquidity">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iHooksABI}__ and `functionName` set to `"beforeDonate"`.
 */
export function usePrepareIHooksBeforeDonate(
  config: Omit<UsePrepareContractWriteConfig<typeof iHooksABI, "beforeDonate">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: iHooksABI,
    functionName: "beforeDonate",
    ...config,
  } as UsePrepareContractWriteConfig<typeof iHooksABI, "beforeDonate">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iHooksABI}__ and `functionName` set to `"beforeInitialize"`.
 */
export function usePrepareIHooksBeforeInitialize(
  config: Omit<UsePrepareContractWriteConfig<typeof iHooksABI, "beforeInitialize">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: iHooksABI,
    functionName: "beforeInitialize",
    ...config,
  } as UsePrepareContractWriteConfig<typeof iHooksABI, "beforeInitialize">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iHooksABI}__ and `functionName` set to `"beforeRemoveLiquidity"`.
 */
export function usePrepareIHooksBeforeRemoveLiquidity(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iHooksABI, "beforeRemoveLiquidity">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iHooksABI,
    functionName: "beforeRemoveLiquidity",
    ...config,
  } as UsePrepareContractWriteConfig<typeof iHooksABI, "beforeRemoveLiquidity">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iHooksABI}__ and `functionName` set to `"beforeSwap"`.
 */
export function usePrepareIHooksBeforeSwap(
  config: Omit<UsePrepareContractWriteConfig<typeof iHooksABI, "beforeSwap">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: iHooksABI,
    functionName: "beforeSwap",
    ...config,
  } as UsePrepareContractWriteConfig<typeof iHooksABI, "beforeSwap">);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iMulticall3ABI}__.
 */
export function useIMulticall3Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof iMulticall3ABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof iMulticall3ABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: iMulticall3ABI, ...config } as UseContractReadConfig<
    typeof iMulticall3ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"getBasefee"`.
 */
export function useIMulticall3GetBasefee<
  TFunctionName extends "getBasefee",
  TSelectData = ReadContractResult<typeof iMulticall3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iMulticall3ABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: iMulticall3ABI, functionName: "getBasefee", ...config } as UseContractReadConfig<
    typeof iMulticall3ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"getBlockHash"`.
 */
export function useIMulticall3GetBlockHash<
  TFunctionName extends "getBlockHash",
  TSelectData = ReadContractResult<typeof iMulticall3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iMulticall3ABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: iMulticall3ABI, functionName: "getBlockHash", ...config } as UseContractReadConfig<
    typeof iMulticall3ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"getBlockNumber"`.
 */
export function useIMulticall3GetBlockNumber<
  TFunctionName extends "getBlockNumber",
  TSelectData = ReadContractResult<typeof iMulticall3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iMulticall3ABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: iMulticall3ABI, functionName: "getBlockNumber", ...config } as UseContractReadConfig<
    typeof iMulticall3ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"getChainId"`.
 */
export function useIMulticall3GetChainId<
  TFunctionName extends "getChainId",
  TSelectData = ReadContractResult<typeof iMulticall3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iMulticall3ABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: iMulticall3ABI, functionName: "getChainId", ...config } as UseContractReadConfig<
    typeof iMulticall3ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"getCurrentBlockCoinbase"`.
 */
export function useIMulticall3GetCurrentBlockCoinbase<
  TFunctionName extends "getCurrentBlockCoinbase",
  TSelectData = ReadContractResult<typeof iMulticall3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iMulticall3ABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: iMulticall3ABI,
    functionName: "getCurrentBlockCoinbase",
    ...config,
  } as UseContractReadConfig<typeof iMulticall3ABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"getCurrentBlockDifficulty"`.
 */
export function useIMulticall3GetCurrentBlockDifficulty<
  TFunctionName extends "getCurrentBlockDifficulty",
  TSelectData = ReadContractResult<typeof iMulticall3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iMulticall3ABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: iMulticall3ABI,
    functionName: "getCurrentBlockDifficulty",
    ...config,
  } as UseContractReadConfig<typeof iMulticall3ABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"getCurrentBlockGasLimit"`.
 */
export function useIMulticall3GetCurrentBlockGasLimit<
  TFunctionName extends "getCurrentBlockGasLimit",
  TSelectData = ReadContractResult<typeof iMulticall3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iMulticall3ABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: iMulticall3ABI,
    functionName: "getCurrentBlockGasLimit",
    ...config,
  } as UseContractReadConfig<typeof iMulticall3ABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"getCurrentBlockTimestamp"`.
 */
export function useIMulticall3GetCurrentBlockTimestamp<
  TFunctionName extends "getCurrentBlockTimestamp",
  TSelectData = ReadContractResult<typeof iMulticall3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iMulticall3ABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: iMulticall3ABI,
    functionName: "getCurrentBlockTimestamp",
    ...config,
  } as UseContractReadConfig<typeof iMulticall3ABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"getEthBalance"`.
 */
export function useIMulticall3GetEthBalance<
  TFunctionName extends "getEthBalance",
  TSelectData = ReadContractResult<typeof iMulticall3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iMulticall3ABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: iMulticall3ABI, functionName: "getEthBalance", ...config } as UseContractReadConfig<
    typeof iMulticall3ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"getLastBlockHash"`.
 */
export function useIMulticall3GetLastBlockHash<
  TFunctionName extends "getLastBlockHash",
  TSelectData = ReadContractResult<typeof iMulticall3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iMulticall3ABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: iMulticall3ABI, functionName: "getLastBlockHash", ...config } as UseContractReadConfig<
    typeof iMulticall3ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__.
 */
export function useIMulticall3Write<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iMulticall3ABI, string>["request"]["abi"],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof iMulticall3ABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof iMulticall3ABI, TFunctionName, TMode>({ abi: iMulticall3ABI, ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"aggregate"`.
 */
export function useIMulticall3Aggregate<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iMulticall3ABI, "aggregate">["request"]["abi"],
        "aggregate",
        TMode
      > & { functionName?: "aggregate" }
    : UseContractWriteConfig<typeof iMulticall3ABI, "aggregate", TMode> & {
        abi?: never;
        functionName?: "aggregate";
      } = {} as any,
) {
  return useContractWrite<typeof iMulticall3ABI, "aggregate", TMode>({
    abi: iMulticall3ABI,
    functionName: "aggregate",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"aggregate3"`.
 */
export function useIMulticall3Aggregate3<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iMulticall3ABI, "aggregate3">["request"]["abi"],
        "aggregate3",
        TMode
      > & { functionName?: "aggregate3" }
    : UseContractWriteConfig<typeof iMulticall3ABI, "aggregate3", TMode> & {
        abi?: never;
        functionName?: "aggregate3";
      } = {} as any,
) {
  return useContractWrite<typeof iMulticall3ABI, "aggregate3", TMode>({
    abi: iMulticall3ABI,
    functionName: "aggregate3",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"aggregate3Value"`.
 */
export function useIMulticall3Aggregate3Value<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iMulticall3ABI, "aggregate3Value">["request"]["abi"],
        "aggregate3Value",
        TMode
      > & { functionName?: "aggregate3Value" }
    : UseContractWriteConfig<typeof iMulticall3ABI, "aggregate3Value", TMode> & {
        abi?: never;
        functionName?: "aggregate3Value";
      } = {} as any,
) {
  return useContractWrite<typeof iMulticall3ABI, "aggregate3Value", TMode>({
    abi: iMulticall3ABI,
    functionName: "aggregate3Value",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"blockAndAggregate"`.
 */
export function useIMulticall3BlockAndAggregate<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iMulticall3ABI, "blockAndAggregate">["request"]["abi"],
        "blockAndAggregate",
        TMode
      > & { functionName?: "blockAndAggregate" }
    : UseContractWriteConfig<typeof iMulticall3ABI, "blockAndAggregate", TMode> & {
        abi?: never;
        functionName?: "blockAndAggregate";
      } = {} as any,
) {
  return useContractWrite<typeof iMulticall3ABI, "blockAndAggregate", TMode>({
    abi: iMulticall3ABI,
    functionName: "blockAndAggregate",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"tryAggregate"`.
 */
export function useIMulticall3TryAggregate<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iMulticall3ABI, "tryAggregate">["request"]["abi"],
        "tryAggregate",
        TMode
      > & { functionName?: "tryAggregate" }
    : UseContractWriteConfig<typeof iMulticall3ABI, "tryAggregate", TMode> & {
        abi?: never;
        functionName?: "tryAggregate";
      } = {} as any,
) {
  return useContractWrite<typeof iMulticall3ABI, "tryAggregate", TMode>({
    abi: iMulticall3ABI,
    functionName: "tryAggregate",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"tryBlockAndAggregate"`.
 */
export function useIMulticall3TryBlockAndAggregate<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iMulticall3ABI, "tryBlockAndAggregate">["request"]["abi"],
        "tryBlockAndAggregate",
        TMode
      > & { functionName?: "tryBlockAndAggregate" }
    : UseContractWriteConfig<typeof iMulticall3ABI, "tryBlockAndAggregate", TMode> & {
        abi?: never;
        functionName?: "tryBlockAndAggregate";
      } = {} as any,
) {
  return useContractWrite<typeof iMulticall3ABI, "tryBlockAndAggregate", TMode>({
    abi: iMulticall3ABI,
    functionName: "tryBlockAndAggregate",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__.
 */
export function usePrepareIMulticall3Write<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof iMulticall3ABI, TFunctionName>, "abi"> = {} as any,
) {
  return usePrepareContractWrite({ abi: iMulticall3ABI, ...config } as UsePrepareContractWriteConfig<
    typeof iMulticall3ABI,
    TFunctionName
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"aggregate"`.
 */
export function usePrepareIMulticall3Aggregate(
  config: Omit<UsePrepareContractWriteConfig<typeof iMulticall3ABI, "aggregate">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: iMulticall3ABI,
    functionName: "aggregate",
    ...config,
  } as UsePrepareContractWriteConfig<typeof iMulticall3ABI, "aggregate">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"aggregate3"`.
 */
export function usePrepareIMulticall3Aggregate3(
  config: Omit<UsePrepareContractWriteConfig<typeof iMulticall3ABI, "aggregate3">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: iMulticall3ABI,
    functionName: "aggregate3",
    ...config,
  } as UsePrepareContractWriteConfig<typeof iMulticall3ABI, "aggregate3">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"aggregate3Value"`.
 */
export function usePrepareIMulticall3Aggregate3Value(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iMulticall3ABI, "aggregate3Value">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iMulticall3ABI,
    functionName: "aggregate3Value",
    ...config,
  } as UsePrepareContractWriteConfig<typeof iMulticall3ABI, "aggregate3Value">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"blockAndAggregate"`.
 */
export function usePrepareIMulticall3BlockAndAggregate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iMulticall3ABI, "blockAndAggregate">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iMulticall3ABI,
    functionName: "blockAndAggregate",
    ...config,
  } as UsePrepareContractWriteConfig<typeof iMulticall3ABI, "blockAndAggregate">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"tryAggregate"`.
 */
export function usePrepareIMulticall3TryAggregate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iMulticall3ABI, "tryAggregate">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iMulticall3ABI,
    functionName: "tryAggregate",
    ...config,
  } as UsePrepareContractWriteConfig<typeof iMulticall3ABI, "tryAggregate">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"tryBlockAndAggregate"`.
 */
export function usePrepareIMulticall3TryBlockAndAggregate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iMulticall3ABI, "tryBlockAndAggregate">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iMulticall3ABI,
    functionName: "tryBlockAndAggregate",
    ...config,
  } as UsePrepareContractWriteConfig<typeof iMulticall3ABI, "tryBlockAndAggregate">);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iPoolManagerABI}__.
 */
export function useIPoolManagerRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof iPoolManagerABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof iPoolManagerABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: iPoolManagerABI, ...config } as UseContractReadConfig<
    typeof iPoolManagerABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"allowance"`.
 */
export function useIPoolManagerAllowance<
  TFunctionName extends "allowance",
  TSelectData = ReadContractResult<typeof iPoolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iPoolManagerABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: iPoolManagerABI, functionName: "allowance", ...config } as UseContractReadConfig<
    typeof iPoolManagerABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useIPoolManagerBalanceOf<
  TFunctionName extends "balanceOf",
  TSelectData = ReadContractResult<typeof iPoolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iPoolManagerABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: iPoolManagerABI, functionName: "balanceOf", ...config } as UseContractReadConfig<
    typeof iPoolManagerABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"extsload"`.
 */
export function useIPoolManagerExtsload<
  TFunctionName extends "extsload",
  TSelectData = ReadContractResult<typeof iPoolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iPoolManagerABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: iPoolManagerABI, functionName: "extsload", ...config } as UseContractReadConfig<
    typeof iPoolManagerABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"exttload"`.
 */
export function useIPoolManagerExttload<
  TFunctionName extends "exttload",
  TSelectData = ReadContractResult<typeof iPoolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iPoolManagerABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: iPoolManagerABI, functionName: "exttload", ...config } as UseContractReadConfig<
    typeof iPoolManagerABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"isOperator"`.
 */
export function useIPoolManagerIsOperator<
  TFunctionName extends "isOperator",
  TSelectData = ReadContractResult<typeof iPoolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iPoolManagerABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: iPoolManagerABI, functionName: "isOperator", ...config } as UseContractReadConfig<
    typeof iPoolManagerABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"protocolFeeController"`.
 */
export function useIPoolManagerProtocolFeeController<
  TFunctionName extends "protocolFeeController",
  TSelectData = ReadContractResult<typeof iPoolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iPoolManagerABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: iPoolManagerABI,
    functionName: "protocolFeeController",
    ...config,
  } as UseContractReadConfig<typeof iPoolManagerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"protocolFeesAccrued"`.
 */
export function useIPoolManagerProtocolFeesAccrued<
  TFunctionName extends "protocolFeesAccrued",
  TSelectData = ReadContractResult<typeof iPoolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iPoolManagerABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: iPoolManagerABI,
    functionName: "protocolFeesAccrued",
    ...config,
  } as UseContractReadConfig<typeof iPoolManagerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__.
 */
export function useIPoolManagerWrite<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iPoolManagerABI, string>["request"]["abi"],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof iPoolManagerABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof iPoolManagerABI, TFunctionName, TMode>({ abi: iPoolManagerABI, ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"approve"`.
 */
export function useIPoolManagerApprove<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iPoolManagerABI, "approve">["request"]["abi"],
        "approve",
        TMode
      > & { functionName?: "approve" }
    : UseContractWriteConfig<typeof iPoolManagerABI, "approve", TMode> & {
        abi?: never;
        functionName?: "approve";
      } = {} as any,
) {
  return useContractWrite<typeof iPoolManagerABI, "approve", TMode>({
    abi: iPoolManagerABI,
    functionName: "approve",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"burn"`.
 */
export function useIPoolManagerBurn<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iPoolManagerABI, "burn">["request"]["abi"],
        "burn",
        TMode
      > & { functionName?: "burn" }
    : UseContractWriteConfig<typeof iPoolManagerABI, "burn", TMode> & {
        abi?: never;
        functionName?: "burn";
      } = {} as any,
) {
  return useContractWrite<typeof iPoolManagerABI, "burn", TMode>({
    abi: iPoolManagerABI,
    functionName: "burn",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"clear"`.
 */
export function useIPoolManagerClear<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iPoolManagerABI, "clear">["request"]["abi"],
        "clear",
        TMode
      > & { functionName?: "clear" }
    : UseContractWriteConfig<typeof iPoolManagerABI, "clear", TMode> & {
        abi?: never;
        functionName?: "clear";
      } = {} as any,
) {
  return useContractWrite<typeof iPoolManagerABI, "clear", TMode>({
    abi: iPoolManagerABI,
    functionName: "clear",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"collectProtocolFees"`.
 */
export function useIPoolManagerCollectProtocolFees<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iPoolManagerABI, "collectProtocolFees">["request"]["abi"],
        "collectProtocolFees",
        TMode
      > & { functionName?: "collectProtocolFees" }
    : UseContractWriteConfig<typeof iPoolManagerABI, "collectProtocolFees", TMode> & {
        abi?: never;
        functionName?: "collectProtocolFees";
      } = {} as any,
) {
  return useContractWrite<typeof iPoolManagerABI, "collectProtocolFees", TMode>({
    abi: iPoolManagerABI,
    functionName: "collectProtocolFees",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"donate"`.
 */
export function useIPoolManagerDonate<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iPoolManagerABI, "donate">["request"]["abi"],
        "donate",
        TMode
      > & { functionName?: "donate" }
    : UseContractWriteConfig<typeof iPoolManagerABI, "donate", TMode> & {
        abi?: never;
        functionName?: "donate";
      } = {} as any,
) {
  return useContractWrite<typeof iPoolManagerABI, "donate", TMode>({
    abi: iPoolManagerABI,
    functionName: "donate",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"initialize"`.
 */
export function useIPoolManagerInitialize<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iPoolManagerABI, "initialize">["request"]["abi"],
        "initialize",
        TMode
      > & { functionName?: "initialize" }
    : UseContractWriteConfig<typeof iPoolManagerABI, "initialize", TMode> & {
        abi?: never;
        functionName?: "initialize";
      } = {} as any,
) {
  return useContractWrite<typeof iPoolManagerABI, "initialize", TMode>({
    abi: iPoolManagerABI,
    functionName: "initialize",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"mint"`.
 */
export function useIPoolManagerMint<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iPoolManagerABI, "mint">["request"]["abi"],
        "mint",
        TMode
      > & { functionName?: "mint" }
    : UseContractWriteConfig<typeof iPoolManagerABI, "mint", TMode> & {
        abi?: never;
        functionName?: "mint";
      } = {} as any,
) {
  return useContractWrite<typeof iPoolManagerABI, "mint", TMode>({
    abi: iPoolManagerABI,
    functionName: "mint",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"modifyLiquidity"`.
 */
export function useIPoolManagerModifyLiquidity<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iPoolManagerABI, "modifyLiquidity">["request"]["abi"],
        "modifyLiquidity",
        TMode
      > & { functionName?: "modifyLiquidity" }
    : UseContractWriteConfig<typeof iPoolManagerABI, "modifyLiquidity", TMode> & {
        abi?: never;
        functionName?: "modifyLiquidity";
      } = {} as any,
) {
  return useContractWrite<typeof iPoolManagerABI, "modifyLiquidity", TMode>({
    abi: iPoolManagerABI,
    functionName: "modifyLiquidity",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"setOperator"`.
 */
export function useIPoolManagerSetOperator<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iPoolManagerABI, "setOperator">["request"]["abi"],
        "setOperator",
        TMode
      > & { functionName?: "setOperator" }
    : UseContractWriteConfig<typeof iPoolManagerABI, "setOperator", TMode> & {
        abi?: never;
        functionName?: "setOperator";
      } = {} as any,
) {
  return useContractWrite<typeof iPoolManagerABI, "setOperator", TMode>({
    abi: iPoolManagerABI,
    functionName: "setOperator",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"setProtocolFee"`.
 */
export function useIPoolManagerSetProtocolFee<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iPoolManagerABI, "setProtocolFee">["request"]["abi"],
        "setProtocolFee",
        TMode
      > & { functionName?: "setProtocolFee" }
    : UseContractWriteConfig<typeof iPoolManagerABI, "setProtocolFee", TMode> & {
        abi?: never;
        functionName?: "setProtocolFee";
      } = {} as any,
) {
  return useContractWrite<typeof iPoolManagerABI, "setProtocolFee", TMode>({
    abi: iPoolManagerABI,
    functionName: "setProtocolFee",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"setProtocolFeeController"`.
 */
export function useIPoolManagerSetProtocolFeeController<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iPoolManagerABI, "setProtocolFeeController">["request"]["abi"],
        "setProtocolFeeController",
        TMode
      > & { functionName?: "setProtocolFeeController" }
    : UseContractWriteConfig<typeof iPoolManagerABI, "setProtocolFeeController", TMode> & {
        abi?: never;
        functionName?: "setProtocolFeeController";
      } = {} as any,
) {
  return useContractWrite<typeof iPoolManagerABI, "setProtocolFeeController", TMode>({
    abi: iPoolManagerABI,
    functionName: "setProtocolFeeController",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"settle"`.
 */
export function useIPoolManagerSettle<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iPoolManagerABI, "settle">["request"]["abi"],
        "settle",
        TMode
      > & { functionName?: "settle" }
    : UseContractWriteConfig<typeof iPoolManagerABI, "settle", TMode> & {
        abi?: never;
        functionName?: "settle";
      } = {} as any,
) {
  return useContractWrite<typeof iPoolManagerABI, "settle", TMode>({
    abi: iPoolManagerABI,
    functionName: "settle",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"settleFor"`.
 */
export function useIPoolManagerSettleFor<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iPoolManagerABI, "settleFor">["request"]["abi"],
        "settleFor",
        TMode
      > & { functionName?: "settleFor" }
    : UseContractWriteConfig<typeof iPoolManagerABI, "settleFor", TMode> & {
        abi?: never;
        functionName?: "settleFor";
      } = {} as any,
) {
  return useContractWrite<typeof iPoolManagerABI, "settleFor", TMode>({
    abi: iPoolManagerABI,
    functionName: "settleFor",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"swap"`.
 */
export function useIPoolManagerSwap<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iPoolManagerABI, "swap">["request"]["abi"],
        "swap",
        TMode
      > & { functionName?: "swap" }
    : UseContractWriteConfig<typeof iPoolManagerABI, "swap", TMode> & {
        abi?: never;
        functionName?: "swap";
      } = {} as any,
) {
  return useContractWrite<typeof iPoolManagerABI, "swap", TMode>({
    abi: iPoolManagerABI,
    functionName: "swap",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"sync"`.
 */
export function useIPoolManagerSync<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iPoolManagerABI, "sync">["request"]["abi"],
        "sync",
        TMode
      > & { functionName?: "sync" }
    : UseContractWriteConfig<typeof iPoolManagerABI, "sync", TMode> & {
        abi?: never;
        functionName?: "sync";
      } = {} as any,
) {
  return useContractWrite<typeof iPoolManagerABI, "sync", TMode>({
    abi: iPoolManagerABI,
    functionName: "sync",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"take"`.
 */
export function useIPoolManagerTake<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iPoolManagerABI, "take">["request"]["abi"],
        "take",
        TMode
      > & { functionName?: "take" }
    : UseContractWriteConfig<typeof iPoolManagerABI, "take", TMode> & {
        abi?: never;
        functionName?: "take";
      } = {} as any,
) {
  return useContractWrite<typeof iPoolManagerABI, "take", TMode>({
    abi: iPoolManagerABI,
    functionName: "take",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"transfer"`.
 */
export function useIPoolManagerTransfer<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iPoolManagerABI, "transfer">["request"]["abi"],
        "transfer",
        TMode
      > & { functionName?: "transfer" }
    : UseContractWriteConfig<typeof iPoolManagerABI, "transfer", TMode> & {
        abi?: never;
        functionName?: "transfer";
      } = {} as any,
) {
  return useContractWrite<typeof iPoolManagerABI, "transfer", TMode>({
    abi: iPoolManagerABI,
    functionName: "transfer",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useIPoolManagerTransferFrom<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iPoolManagerABI, "transferFrom">["request"]["abi"],
        "transferFrom",
        TMode
      > & { functionName?: "transferFrom" }
    : UseContractWriteConfig<typeof iPoolManagerABI, "transferFrom", TMode> & {
        abi?: never;
        functionName?: "transferFrom";
      } = {} as any,
) {
  return useContractWrite<typeof iPoolManagerABI, "transferFrom", TMode>({
    abi: iPoolManagerABI,
    functionName: "transferFrom",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"unlock"`.
 */
export function useIPoolManagerUnlock<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iPoolManagerABI, "unlock">["request"]["abi"],
        "unlock",
        TMode
      > & { functionName?: "unlock" }
    : UseContractWriteConfig<typeof iPoolManagerABI, "unlock", TMode> & {
        abi?: never;
        functionName?: "unlock";
      } = {} as any,
) {
  return useContractWrite<typeof iPoolManagerABI, "unlock", TMode>({
    abi: iPoolManagerABI,
    functionName: "unlock",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"updateDynamicLPFee"`.
 */
export function useIPoolManagerUpdateDynamicLpFee<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iPoolManagerABI, "updateDynamicLPFee">["request"]["abi"],
        "updateDynamicLPFee",
        TMode
      > & { functionName?: "updateDynamicLPFee" }
    : UseContractWriteConfig<typeof iPoolManagerABI, "updateDynamicLPFee", TMode> & {
        abi?: never;
        functionName?: "updateDynamicLPFee";
      } = {} as any,
) {
  return useContractWrite<typeof iPoolManagerABI, "updateDynamicLPFee", TMode>({
    abi: iPoolManagerABI,
    functionName: "updateDynamicLPFee",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__.
 */
export function usePrepareIPoolManagerWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof iPoolManagerABI, TFunctionName>, "abi"> = {} as any,
) {
  return usePrepareContractWrite({ abi: iPoolManagerABI, ...config } as UsePrepareContractWriteConfig<
    typeof iPoolManagerABI,
    TFunctionName
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareIPoolManagerApprove(
  config: Omit<UsePrepareContractWriteConfig<typeof iPoolManagerABI, "approve">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPoolManagerABI,
    functionName: "approve",
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPoolManagerABI, "approve">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"burn"`.
 */
export function usePrepareIPoolManagerBurn(
  config: Omit<UsePrepareContractWriteConfig<typeof iPoolManagerABI, "burn">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPoolManagerABI,
    functionName: "burn",
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPoolManagerABI, "burn">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"clear"`.
 */
export function usePrepareIPoolManagerClear(
  config: Omit<UsePrepareContractWriteConfig<typeof iPoolManagerABI, "clear">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPoolManagerABI,
    functionName: "clear",
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPoolManagerABI, "clear">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"collectProtocolFees"`.
 */
export function usePrepareIPoolManagerCollectProtocolFees(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iPoolManagerABI, "collectProtocolFees">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPoolManagerABI,
    functionName: "collectProtocolFees",
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPoolManagerABI, "collectProtocolFees">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"donate"`.
 */
export function usePrepareIPoolManagerDonate(
  config: Omit<UsePrepareContractWriteConfig<typeof iPoolManagerABI, "donate">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPoolManagerABI,
    functionName: "donate",
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPoolManagerABI, "donate">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"initialize"`.
 */
export function usePrepareIPoolManagerInitialize(
  config: Omit<UsePrepareContractWriteConfig<typeof iPoolManagerABI, "initialize">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPoolManagerABI,
    functionName: "initialize",
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPoolManagerABI, "initialize">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"mint"`.
 */
export function usePrepareIPoolManagerMint(
  config: Omit<UsePrepareContractWriteConfig<typeof iPoolManagerABI, "mint">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPoolManagerABI,
    functionName: "mint",
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPoolManagerABI, "mint">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"modifyLiquidity"`.
 */
export function usePrepareIPoolManagerModifyLiquidity(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iPoolManagerABI, "modifyLiquidity">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPoolManagerABI,
    functionName: "modifyLiquidity",
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPoolManagerABI, "modifyLiquidity">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"setOperator"`.
 */
export function usePrepareIPoolManagerSetOperator(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iPoolManagerABI, "setOperator">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPoolManagerABI,
    functionName: "setOperator",
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPoolManagerABI, "setOperator">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"setProtocolFee"`.
 */
export function usePrepareIPoolManagerSetProtocolFee(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iPoolManagerABI, "setProtocolFee">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPoolManagerABI,
    functionName: "setProtocolFee",
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPoolManagerABI, "setProtocolFee">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"setProtocolFeeController"`.
 */
export function usePrepareIPoolManagerSetProtocolFeeController(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iPoolManagerABI, "setProtocolFeeController">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPoolManagerABI,
    functionName: "setProtocolFeeController",
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPoolManagerABI, "setProtocolFeeController">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"settle"`.
 */
export function usePrepareIPoolManagerSettle(
  config: Omit<UsePrepareContractWriteConfig<typeof iPoolManagerABI, "settle">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPoolManagerABI,
    functionName: "settle",
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPoolManagerABI, "settle">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"settleFor"`.
 */
export function usePrepareIPoolManagerSettleFor(
  config: Omit<UsePrepareContractWriteConfig<typeof iPoolManagerABI, "settleFor">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPoolManagerABI,
    functionName: "settleFor",
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPoolManagerABI, "settleFor">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"swap"`.
 */
export function usePrepareIPoolManagerSwap(
  config: Omit<UsePrepareContractWriteConfig<typeof iPoolManagerABI, "swap">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPoolManagerABI,
    functionName: "swap",
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPoolManagerABI, "swap">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"sync"`.
 */
export function usePrepareIPoolManagerSync(
  config: Omit<UsePrepareContractWriteConfig<typeof iPoolManagerABI, "sync">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPoolManagerABI,
    functionName: "sync",
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPoolManagerABI, "sync">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"take"`.
 */
export function usePrepareIPoolManagerTake(
  config: Omit<UsePrepareContractWriteConfig<typeof iPoolManagerABI, "take">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPoolManagerABI,
    functionName: "take",
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPoolManagerABI, "take">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareIPoolManagerTransfer(
  config: Omit<UsePrepareContractWriteConfig<typeof iPoolManagerABI, "transfer">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPoolManagerABI,
    functionName: "transfer",
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPoolManagerABI, "transfer">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareIPoolManagerTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iPoolManagerABI, "transferFrom">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPoolManagerABI,
    functionName: "transferFrom",
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPoolManagerABI, "transferFrom">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"unlock"`.
 */
export function usePrepareIPoolManagerUnlock(
  config: Omit<UsePrepareContractWriteConfig<typeof iPoolManagerABI, "unlock">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPoolManagerABI,
    functionName: "unlock",
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPoolManagerABI, "unlock">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"updateDynamicLPFee"`.
 */
export function usePrepareIPoolManagerUpdateDynamicLpFee(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iPoolManagerABI, "updateDynamicLPFee">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPoolManagerABI,
    functionName: "updateDynamicLPFee",
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPoolManagerABI, "updateDynamicLPFee">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iPoolManagerABI}__.
 */
export function useIPoolManagerEvent<TEventName extends string>(
  config: Omit<UseContractEventConfig<typeof iPoolManagerABI, TEventName>, "abi"> = {} as any,
) {
  return useContractEvent({ abi: iPoolManagerABI, ...config } as UseContractEventConfig<
    typeof iPoolManagerABI,
    TEventName
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iPoolManagerABI}__ and `eventName` set to `"Approval"`.
 */
export function useIPoolManagerApprovalEvent(
  config: Omit<UseContractEventConfig<typeof iPoolManagerABI, "Approval">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: iPoolManagerABI, eventName: "Approval", ...config } as UseContractEventConfig<
    typeof iPoolManagerABI,
    "Approval"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iPoolManagerABI}__ and `eventName` set to `"Initialize"`.
 */
export function useIPoolManagerInitializeEvent(
  config: Omit<UseContractEventConfig<typeof iPoolManagerABI, "Initialize">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: iPoolManagerABI, eventName: "Initialize", ...config } as UseContractEventConfig<
    typeof iPoolManagerABI,
    "Initialize"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iPoolManagerABI}__ and `eventName` set to `"ModifyLiquidity"`.
 */
export function useIPoolManagerModifyLiquidityEvent(
  config: Omit<UseContractEventConfig<typeof iPoolManagerABI, "ModifyLiquidity">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: iPoolManagerABI, eventName: "ModifyLiquidity", ...config } as UseContractEventConfig<
    typeof iPoolManagerABI,
    "ModifyLiquidity"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iPoolManagerABI}__ and `eventName` set to `"OperatorSet"`.
 */
export function useIPoolManagerOperatorSetEvent(
  config: Omit<UseContractEventConfig<typeof iPoolManagerABI, "OperatorSet">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: iPoolManagerABI, eventName: "OperatorSet", ...config } as UseContractEventConfig<
    typeof iPoolManagerABI,
    "OperatorSet"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iPoolManagerABI}__ and `eventName` set to `"ProtocolFeeControllerUpdated"`.
 */
export function useIPoolManagerProtocolFeeControllerUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof iPoolManagerABI, "ProtocolFeeControllerUpdated">,
    "abi" | "eventName"
  > = {} as any,
) {
  return useContractEvent({
    abi: iPoolManagerABI,
    eventName: "ProtocolFeeControllerUpdated",
    ...config,
  } as UseContractEventConfig<typeof iPoolManagerABI, "ProtocolFeeControllerUpdated">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iPoolManagerABI}__ and `eventName` set to `"ProtocolFeeUpdated"`.
 */
export function useIPoolManagerProtocolFeeUpdatedEvent(
  config: Omit<UseContractEventConfig<typeof iPoolManagerABI, "ProtocolFeeUpdated">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({
    abi: iPoolManagerABI,
    eventName: "ProtocolFeeUpdated",
    ...config,
  } as UseContractEventConfig<typeof iPoolManagerABI, "ProtocolFeeUpdated">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iPoolManagerABI}__ and `eventName` set to `"Swap"`.
 */
export function useIPoolManagerSwapEvent(
  config: Omit<UseContractEventConfig<typeof iPoolManagerABI, "Swap">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: iPoolManagerABI, eventName: "Swap", ...config } as UseContractEventConfig<
    typeof iPoolManagerABI,
    "Swap"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iPoolManagerABI}__ and `eventName` set to `"Transfer"`.
 */
export function useIPoolManagerTransferEvent(
  config: Omit<UseContractEventConfig<typeof iPoolManagerABI, "Transfer">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: iPoolManagerABI, eventName: "Transfer", ...config } as UseContractEventConfig<
    typeof iPoolManagerABI,
    "Transfer"
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iPriceOracleABI}__.
 */
export function useIPriceOracleRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof iPriceOracleABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof iPriceOracleABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: iPriceOracleABI, ...config } as UseContractReadConfig<
    typeof iPriceOracleABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iPriceOracleABI}__ and `functionName` set to `"tokenPrices"`.
 */
export function useIPriceOracleTokenPrices<
  TFunctionName extends "tokenPrices",
  TSelectData = ReadContractResult<typeof iPriceOracleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iPriceOracleABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: iPriceOracleABI, functionName: "tokenPrices", ...config } as UseContractReadConfig<
    typeof iPriceOracleABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iProtocolFeeControllerABI}__.
 */
export function useIProtocolFeeControllerRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof iProtocolFeeControllerABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof iProtocolFeeControllerABI, TFunctionName, TSelectData>, "abi"> = {} as any,
) {
  return useContractRead({ abi: iProtocolFeeControllerABI, ...config } as UseContractReadConfig<
    typeof iProtocolFeeControllerABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iProtocolFeeControllerABI}__ and `functionName` set to `"protocolFeeForPool"`.
 */
export function useIProtocolFeeControllerProtocolFeeForPool<
  TFunctionName extends "protocolFeeForPool",
  TSelectData = ReadContractResult<typeof iProtocolFeeControllerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iProtocolFeeControllerABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: iProtocolFeeControllerABI,
    functionName: "protocolFeeForPool",
    ...config,
  } as UseContractReadConfig<typeof iProtocolFeeControllerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iProtocolFeesABI}__.
 */
export function useIProtocolFeesRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof iProtocolFeesABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof iProtocolFeesABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: iProtocolFeesABI, ...config } as UseContractReadConfig<
    typeof iProtocolFeesABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iProtocolFeesABI}__ and `functionName` set to `"protocolFeeController"`.
 */
export function useIProtocolFeesProtocolFeeController<
  TFunctionName extends "protocolFeeController",
  TSelectData = ReadContractResult<typeof iProtocolFeesABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iProtocolFeesABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: iProtocolFeesABI,
    functionName: "protocolFeeController",
    ...config,
  } as UseContractReadConfig<typeof iProtocolFeesABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iProtocolFeesABI}__ and `functionName` set to `"protocolFeesAccrued"`.
 */
export function useIProtocolFeesProtocolFeesAccrued<
  TFunctionName extends "protocolFeesAccrued",
  TSelectData = ReadContractResult<typeof iProtocolFeesABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iProtocolFeesABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: iProtocolFeesABI,
    functionName: "protocolFeesAccrued",
    ...config,
  } as UseContractReadConfig<typeof iProtocolFeesABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iProtocolFeesABI}__.
 */
export function useIProtocolFeesWrite<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iProtocolFeesABI, string>["request"]["abi"],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof iProtocolFeesABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof iProtocolFeesABI, TFunctionName, TMode>({ abi: iProtocolFeesABI, ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iProtocolFeesABI}__ and `functionName` set to `"collectProtocolFees"`.
 */
export function useIProtocolFeesCollectProtocolFees<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iProtocolFeesABI, "collectProtocolFees">["request"]["abi"],
        "collectProtocolFees",
        TMode
      > & { functionName?: "collectProtocolFees" }
    : UseContractWriteConfig<typeof iProtocolFeesABI, "collectProtocolFees", TMode> & {
        abi?: never;
        functionName?: "collectProtocolFees";
      } = {} as any,
) {
  return useContractWrite<typeof iProtocolFeesABI, "collectProtocolFees", TMode>({
    abi: iProtocolFeesABI,
    functionName: "collectProtocolFees",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iProtocolFeesABI}__ and `functionName` set to `"setProtocolFee"`.
 */
export function useIProtocolFeesSetProtocolFee<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iProtocolFeesABI, "setProtocolFee">["request"]["abi"],
        "setProtocolFee",
        TMode
      > & { functionName?: "setProtocolFee" }
    : UseContractWriteConfig<typeof iProtocolFeesABI, "setProtocolFee", TMode> & {
        abi?: never;
        functionName?: "setProtocolFee";
      } = {} as any,
) {
  return useContractWrite<typeof iProtocolFeesABI, "setProtocolFee", TMode>({
    abi: iProtocolFeesABI,
    functionName: "setProtocolFee",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iProtocolFeesABI}__ and `functionName` set to `"setProtocolFeeController"`.
 */
export function useIProtocolFeesSetProtocolFeeController<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iProtocolFeesABI, "setProtocolFeeController">["request"]["abi"],
        "setProtocolFeeController",
        TMode
      > & { functionName?: "setProtocolFeeController" }
    : UseContractWriteConfig<typeof iProtocolFeesABI, "setProtocolFeeController", TMode> & {
        abi?: never;
        functionName?: "setProtocolFeeController";
      } = {} as any,
) {
  return useContractWrite<typeof iProtocolFeesABI, "setProtocolFeeController", TMode>({
    abi: iProtocolFeesABI,
    functionName: "setProtocolFeeController",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iProtocolFeesABI}__.
 */
export function usePrepareIProtocolFeesWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof iProtocolFeesABI, TFunctionName>, "abi"> = {} as any,
) {
  return usePrepareContractWrite({ abi: iProtocolFeesABI, ...config } as UsePrepareContractWriteConfig<
    typeof iProtocolFeesABI,
    TFunctionName
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iProtocolFeesABI}__ and `functionName` set to `"collectProtocolFees"`.
 */
export function usePrepareIProtocolFeesCollectProtocolFees(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iProtocolFeesABI, "collectProtocolFees">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iProtocolFeesABI,
    functionName: "collectProtocolFees",
    ...config,
  } as UsePrepareContractWriteConfig<typeof iProtocolFeesABI, "collectProtocolFees">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iProtocolFeesABI}__ and `functionName` set to `"setProtocolFee"`.
 */
export function usePrepareIProtocolFeesSetProtocolFee(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iProtocolFeesABI, "setProtocolFee">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iProtocolFeesABI,
    functionName: "setProtocolFee",
    ...config,
  } as UsePrepareContractWriteConfig<typeof iProtocolFeesABI, "setProtocolFee">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iProtocolFeesABI}__ and `functionName` set to `"setProtocolFeeController"`.
 */
export function usePrepareIProtocolFeesSetProtocolFeeController(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iProtocolFeesABI, "setProtocolFeeController">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iProtocolFeesABI,
    functionName: "setProtocolFeeController",
    ...config,
  } as UsePrepareContractWriteConfig<typeof iProtocolFeesABI, "setProtocolFeeController">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iProtocolFeesABI}__.
 */
export function useIProtocolFeesEvent<TEventName extends string>(
  config: Omit<UseContractEventConfig<typeof iProtocolFeesABI, TEventName>, "abi"> = {} as any,
) {
  return useContractEvent({ abi: iProtocolFeesABI, ...config } as UseContractEventConfig<
    typeof iProtocolFeesABI,
    TEventName
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iProtocolFeesABI}__ and `eventName` set to `"ProtocolFeeControllerUpdated"`.
 */
export function useIProtocolFeesProtocolFeeControllerUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof iProtocolFeesABI, "ProtocolFeeControllerUpdated">,
    "abi" | "eventName"
  > = {} as any,
) {
  return useContractEvent({
    abi: iProtocolFeesABI,
    eventName: "ProtocolFeeControllerUpdated",
    ...config,
  } as UseContractEventConfig<typeof iProtocolFeesABI, "ProtocolFeeControllerUpdated">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iProtocolFeesABI}__ and `eventName` set to `"ProtocolFeeUpdated"`.
 */
export function useIProtocolFeesProtocolFeeUpdatedEvent(
  config: Omit<UseContractEventConfig<typeof iProtocolFeesABI, "ProtocolFeeUpdated">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({
    abi: iProtocolFeesABI,
    eventName: "ProtocolFeeUpdated",
    ...config,
  } as UseContractEventConfig<typeof iProtocolFeesABI, "ProtocolFeeUpdated">);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iUnlockCallbackABI}__.
 */
export function useIUnlockCallbackWrite<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iUnlockCallbackABI, string>["request"]["abi"],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof iUnlockCallbackABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof iUnlockCallbackABI, TFunctionName, TMode>({
    abi: iUnlockCallbackABI,
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iUnlockCallbackABI}__ and `functionName` set to `"unlockCallback"`.
 */
export function useIUnlockCallbackUnlockCallback<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iUnlockCallbackABI, "unlockCallback">["request"]["abi"],
        "unlockCallback",
        TMode
      > & { functionName?: "unlockCallback" }
    : UseContractWriteConfig<typeof iUnlockCallbackABI, "unlockCallback", TMode> & {
        abi?: never;
        functionName?: "unlockCallback";
      } = {} as any,
) {
  return useContractWrite<typeof iUnlockCallbackABI, "unlockCallback", TMode>({
    abi: iUnlockCallbackABI,
    functionName: "unlockCallback",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iUnlockCallbackABI}__.
 */
export function usePrepareIUnlockCallbackWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof iUnlockCallbackABI, TFunctionName>, "abi"> = {} as any,
) {
  return usePrepareContractWrite({ abi: iUnlockCallbackABI, ...config } as UsePrepareContractWriteConfig<
    typeof iUnlockCallbackABI,
    TFunctionName
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iUnlockCallbackABI}__ and `functionName` set to `"unlockCallback"`.
 */
export function usePrepareIUnlockCallbackUnlockCallback(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iUnlockCallbackABI, "unlockCallback">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iUnlockCallbackABI,
    functionName: "unlockCallback",
    ...config,
  } as UsePrepareContractWriteConfig<typeof iUnlockCallbackABI, "unlockCallback">);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link immutableStateABI}__.
 */
export function useImmutableStateRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof immutableStateABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof immutableStateABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: immutableStateABI, ...config } as UseContractReadConfig<
    typeof immutableStateABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link immutableStateABI}__ and `functionName` set to `"poolManager"`.
 */
export function useImmutableStatePoolManager<
  TFunctionName extends "poolManager",
  TSelectData = ReadContractResult<typeof immutableStateABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof immutableStateABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: immutableStateABI, functionName: "poolManager", ...config } as UseContractReadConfig<
    typeof immutableStateABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link invalidReturnSizeProtocolFeeControllerTestABI}__.
 */
export function useInvalidReturnSizeProtocolFeeControllerTestRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof invalidReturnSizeProtocolFeeControllerTestABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof invalidReturnSizeProtocolFeeControllerTestABI, TFunctionName, TSelectData>,
    "abi"
  > = {} as any,
) {
  return useContractRead({ abi: invalidReturnSizeProtocolFeeControllerTestABI, ...config } as UseContractReadConfig<
    typeof invalidReturnSizeProtocolFeeControllerTestABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link invalidReturnSizeProtocolFeeControllerTestABI}__ and `functionName` set to `"protocolFeeForPool"`.
 */
export function useInvalidReturnSizeProtocolFeeControllerTestProtocolFeeForPool<
  TFunctionName extends "protocolFeeForPool",
  TSelectData = ReadContractResult<typeof invalidReturnSizeProtocolFeeControllerTestABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof invalidReturnSizeProtocolFeeControllerTestABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: invalidReturnSizeProtocolFeeControllerTestABI,
    functionName: "protocolFeeForPool",
    ...config,
  } as UseContractReadConfig<typeof invalidReturnSizeProtocolFeeControllerTestABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lpFeeLibraryABI}__.
 */
export function useLpFeeLibraryRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof lpFeeLibraryABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof lpFeeLibraryABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: lpFeeLibraryABI, ...config } as UseContractReadConfig<
    typeof lpFeeLibraryABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lpFeeLibraryABI}__ and `functionName` set to `"DYNAMIC_FEE_FLAG"`.
 */
export function useLpFeeLibraryDynamicFeeFlag<
  TFunctionName extends "DYNAMIC_FEE_FLAG",
  TSelectData = ReadContractResult<typeof lpFeeLibraryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lpFeeLibraryABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: lpFeeLibraryABI, functionName: "DYNAMIC_FEE_FLAG", ...config } as UseContractReadConfig<
    typeof lpFeeLibraryABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lpFeeLibraryABI}__ and `functionName` set to `"MAX_LP_FEE"`.
 */
export function useLpFeeLibraryMaxLpFee<
  TFunctionName extends "MAX_LP_FEE",
  TSelectData = ReadContractResult<typeof lpFeeLibraryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lpFeeLibraryABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: lpFeeLibraryABI, functionName: "MAX_LP_FEE", ...config } as UseContractReadConfig<
    typeof lpFeeLibraryABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lpFeeLibraryABI}__ and `functionName` set to `"OVERRIDE_FEE_FLAG"`.
 */
export function useLpFeeLibraryOverrideFeeFlag<
  TFunctionName extends "OVERRIDE_FEE_FLAG",
  TSelectData = ReadContractResult<typeof lpFeeLibraryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lpFeeLibraryABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: lpFeeLibraryABI,
    functionName: "OVERRIDE_FEE_FLAG",
    ...config,
  } as UseContractReadConfig<typeof lpFeeLibraryABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link lpFeeLibraryABI}__ and `functionName` set to `"REMOVE_OVERRIDE_MASK"`.
 */
export function useLpFeeLibraryRemoveOverrideMask<
  TFunctionName extends "REMOVE_OVERRIDE_MASK",
  TSelectData = ReadContractResult<typeof lpFeeLibraryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof lpFeeLibraryABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: lpFeeLibraryABI,
    functionName: "REMOVE_OVERRIDE_MASK",
    ...config,
  } as UseContractReadConfig<typeof lpFeeLibraryABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mockErc20ABI}__.
 */
export function useMockErc20Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof mockErc20ABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof mockErc20ABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: mockErc20ABI, ...config } as UseContractReadConfig<
    typeof mockErc20ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mockErc20ABI}__ and `functionName` set to `"DOMAIN_SEPARATOR"`.
 */
export function useMockErc20DomainSeparator<
  TFunctionName extends "DOMAIN_SEPARATOR",
  TSelectData = ReadContractResult<typeof mockErc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mockErc20ABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: mockErc20ABI, functionName: "DOMAIN_SEPARATOR", ...config } as UseContractReadConfig<
    typeof mockErc20ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mockErc20ABI}__ and `functionName` set to `"allowance"`.
 */
export function useMockErc20Allowance<
  TFunctionName extends "allowance",
  TSelectData = ReadContractResult<typeof mockErc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mockErc20ABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: mockErc20ABI, functionName: "allowance", ...config } as UseContractReadConfig<
    typeof mockErc20ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mockErc20ABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useMockErc20BalanceOf<
  TFunctionName extends "balanceOf",
  TSelectData = ReadContractResult<typeof mockErc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mockErc20ABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: mockErc20ABI, functionName: "balanceOf", ...config } as UseContractReadConfig<
    typeof mockErc20ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mockErc20ABI}__ and `functionName` set to `"decimals"`.
 */
export function useMockErc20Decimals<
  TFunctionName extends "decimals",
  TSelectData = ReadContractResult<typeof mockErc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mockErc20ABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: mockErc20ABI, functionName: "decimals", ...config } as UseContractReadConfig<
    typeof mockErc20ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mockErc20ABI}__ and `functionName` set to `"name"`.
 */
export function useMockErc20Name<
  TFunctionName extends "name",
  TSelectData = ReadContractResult<typeof mockErc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mockErc20ABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: mockErc20ABI, functionName: "name", ...config } as UseContractReadConfig<
    typeof mockErc20ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mockErc20ABI}__ and `functionName` set to `"nonces"`.
 */
export function useMockErc20Nonces<
  TFunctionName extends "nonces",
  TSelectData = ReadContractResult<typeof mockErc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mockErc20ABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: mockErc20ABI, functionName: "nonces", ...config } as UseContractReadConfig<
    typeof mockErc20ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mockErc20ABI}__ and `functionName` set to `"symbol"`.
 */
export function useMockErc20Symbol<
  TFunctionName extends "symbol",
  TSelectData = ReadContractResult<typeof mockErc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mockErc20ABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: mockErc20ABI, functionName: "symbol", ...config } as UseContractReadConfig<
    typeof mockErc20ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mockErc20ABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useMockErc20TotalSupply<
  TFunctionName extends "totalSupply",
  TSelectData = ReadContractResult<typeof mockErc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mockErc20ABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: mockErc20ABI, functionName: "totalSupply", ...config } as UseContractReadConfig<
    typeof mockErc20ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mockErc20ABI}__.
 */
export function useMockErc20Write<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof mockErc20ABI, string>["request"]["abi"],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof mockErc20ABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof mockErc20ABI, TFunctionName, TMode>({ abi: mockErc20ABI, ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mockErc20ABI}__ and `functionName` set to `"approve"`.
 */
export function useMockErc20Approve<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof mockErc20ABI, "approve">["request"]["abi"],
        "approve",
        TMode
      > & { functionName?: "approve" }
    : UseContractWriteConfig<typeof mockErc20ABI, "approve", TMode> & {
        abi?: never;
        functionName?: "approve";
      } = {} as any,
) {
  return useContractWrite<typeof mockErc20ABI, "approve", TMode>({
    abi: mockErc20ABI,
    functionName: "approve",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mockErc20ABI}__ and `functionName` set to `"burn"`.
 */
export function useMockErc20Burn<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof mockErc20ABI, "burn">["request"]["abi"],
        "burn",
        TMode
      > & { functionName?: "burn" }
    : UseContractWriteConfig<typeof mockErc20ABI, "burn", TMode> & {
        abi?: never;
        functionName?: "burn";
      } = {} as any,
) {
  return useContractWrite<typeof mockErc20ABI, "burn", TMode>({
    abi: mockErc20ABI,
    functionName: "burn",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mockErc20ABI}__ and `functionName` set to `"mint"`.
 */
export function useMockErc20Mint<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof mockErc20ABI, "mint">["request"]["abi"],
        "mint",
        TMode
      > & { functionName?: "mint" }
    : UseContractWriteConfig<typeof mockErc20ABI, "mint", TMode> & {
        abi?: never;
        functionName?: "mint";
      } = {} as any,
) {
  return useContractWrite<typeof mockErc20ABI, "mint", TMode>({
    abi: mockErc20ABI,
    functionName: "mint",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mockErc20ABI}__ and `functionName` set to `"permit"`.
 */
export function useMockErc20Permit<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof mockErc20ABI, "permit">["request"]["abi"],
        "permit",
        TMode
      > & { functionName?: "permit" }
    : UseContractWriteConfig<typeof mockErc20ABI, "permit", TMode> & {
        abi?: never;
        functionName?: "permit";
      } = {} as any,
) {
  return useContractWrite<typeof mockErc20ABI, "permit", TMode>({
    abi: mockErc20ABI,
    functionName: "permit",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mockErc20ABI}__ and `functionName` set to `"transfer"`.
 */
export function useMockErc20Transfer<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof mockErc20ABI, "transfer">["request"]["abi"],
        "transfer",
        TMode
      > & { functionName?: "transfer" }
    : UseContractWriteConfig<typeof mockErc20ABI, "transfer", TMode> & {
        abi?: never;
        functionName?: "transfer";
      } = {} as any,
) {
  return useContractWrite<typeof mockErc20ABI, "transfer", TMode>({
    abi: mockErc20ABI,
    functionName: "transfer",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mockErc20ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useMockErc20TransferFrom<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof mockErc20ABI, "transferFrom">["request"]["abi"],
        "transferFrom",
        TMode
      > & { functionName?: "transferFrom" }
    : UseContractWriteConfig<typeof mockErc20ABI, "transferFrom", TMode> & {
        abi?: never;
        functionName?: "transferFrom";
      } = {} as any,
) {
  return useContractWrite<typeof mockErc20ABI, "transferFrom", TMode>({
    abi: mockErc20ABI,
    functionName: "transferFrom",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mockErc20ABI}__.
 */
export function usePrepareMockErc20Write<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof mockErc20ABI, TFunctionName>, "abi"> = {} as any,
) {
  return usePrepareContractWrite({ abi: mockErc20ABI, ...config } as UsePrepareContractWriteConfig<
    typeof mockErc20ABI,
    TFunctionName
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mockErc20ABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareMockErc20Approve(
  config: Omit<UsePrepareContractWriteConfig<typeof mockErc20ABI, "approve">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: mockErc20ABI,
    functionName: "approve",
    ...config,
  } as UsePrepareContractWriteConfig<typeof mockErc20ABI, "approve">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mockErc20ABI}__ and `functionName` set to `"burn"`.
 */
export function usePrepareMockErc20Burn(
  config: Omit<UsePrepareContractWriteConfig<typeof mockErc20ABI, "burn">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: mockErc20ABI,
    functionName: "burn",
    ...config,
  } as UsePrepareContractWriteConfig<typeof mockErc20ABI, "burn">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mockErc20ABI}__ and `functionName` set to `"mint"`.
 */
export function usePrepareMockErc20Mint(
  config: Omit<UsePrepareContractWriteConfig<typeof mockErc20ABI, "mint">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: mockErc20ABI,
    functionName: "mint",
    ...config,
  } as UsePrepareContractWriteConfig<typeof mockErc20ABI, "mint">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mockErc20ABI}__ and `functionName` set to `"permit"`.
 */
export function usePrepareMockErc20Permit(
  config: Omit<UsePrepareContractWriteConfig<typeof mockErc20ABI, "permit">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: mockErc20ABI,
    functionName: "permit",
    ...config,
  } as UsePrepareContractWriteConfig<typeof mockErc20ABI, "permit">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mockErc20ABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareMockErc20Transfer(
  config: Omit<UsePrepareContractWriteConfig<typeof mockErc20ABI, "transfer">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: mockErc20ABI,
    functionName: "transfer",
    ...config,
  } as UsePrepareContractWriteConfig<typeof mockErc20ABI, "transfer">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mockErc20ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareMockErc20TransferFrom(
  config: Omit<UsePrepareContractWriteConfig<typeof mockErc20ABI, "transferFrom">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: mockErc20ABI,
    functionName: "transferFrom",
    ...config,
  } as UsePrepareContractWriteConfig<typeof mockErc20ABI, "transferFrom">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link mockErc20ABI}__.
 */
export function useMockErc20Event<TEventName extends string>(
  config: Omit<UseContractEventConfig<typeof mockErc20ABI, TEventName>, "abi"> = {} as any,
) {
  return useContractEvent({ abi: mockErc20ABI, ...config } as UseContractEventConfig<typeof mockErc20ABI, TEventName>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link mockErc20ABI}__ and `eventName` set to `"Approval"`.
 */
export function useMockErc20ApprovalEvent(
  config: Omit<UseContractEventConfig<typeof mockErc20ABI, "Approval">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: mockErc20ABI, eventName: "Approval", ...config } as UseContractEventConfig<
    typeof mockErc20ABI,
    "Approval"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link mockErc20ABI}__ and `eventName` set to `"Transfer"`.
 */
export function useMockErc20TransferEvent(
  config: Omit<UseContractEventConfig<typeof mockErc20ABI, "Transfer">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: mockErc20ABI, eventName: "Transfer", ...config } as UseContractEventConfig<
    typeof mockErc20ABI,
    "Transfer"
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mockErc721ABI}__.
 */
export function useMockErc721Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof mockErc721ABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof mockErc721ABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: mockErc721ABI, ...config } as UseContractReadConfig<
    typeof mockErc721ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mockErc721ABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useMockErc721BalanceOf<
  TFunctionName extends "balanceOf",
  TSelectData = ReadContractResult<typeof mockErc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mockErc721ABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: mockErc721ABI, functionName: "balanceOf", ...config } as UseContractReadConfig<
    typeof mockErc721ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mockErc721ABI}__ and `functionName` set to `"getApproved"`.
 */
export function useMockErc721GetApproved<
  TFunctionName extends "getApproved",
  TSelectData = ReadContractResult<typeof mockErc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mockErc721ABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: mockErc721ABI, functionName: "getApproved", ...config } as UseContractReadConfig<
    typeof mockErc721ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mockErc721ABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useMockErc721IsApprovedForAll<
  TFunctionName extends "isApprovedForAll",
  TSelectData = ReadContractResult<typeof mockErc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mockErc721ABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: mockErc721ABI, functionName: "isApprovedForAll", ...config } as UseContractReadConfig<
    typeof mockErc721ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mockErc721ABI}__ and `functionName` set to `"name"`.
 */
export function useMockErc721Name<
  TFunctionName extends "name",
  TSelectData = ReadContractResult<typeof mockErc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mockErc721ABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: mockErc721ABI, functionName: "name", ...config } as UseContractReadConfig<
    typeof mockErc721ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mockErc721ABI}__ and `functionName` set to `"ownerOf"`.
 */
export function useMockErc721OwnerOf<
  TFunctionName extends "ownerOf",
  TSelectData = ReadContractResult<typeof mockErc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mockErc721ABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: mockErc721ABI, functionName: "ownerOf", ...config } as UseContractReadConfig<
    typeof mockErc721ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mockErc721ABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useMockErc721SupportsInterface<
  TFunctionName extends "supportsInterface",
  TSelectData = ReadContractResult<typeof mockErc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mockErc721ABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: mockErc721ABI, functionName: "supportsInterface", ...config } as UseContractReadConfig<
    typeof mockErc721ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mockErc721ABI}__ and `functionName` set to `"symbol"`.
 */
export function useMockErc721Symbol<
  TFunctionName extends "symbol",
  TSelectData = ReadContractResult<typeof mockErc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mockErc721ABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: mockErc721ABI, functionName: "symbol", ...config } as UseContractReadConfig<
    typeof mockErc721ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mockErc721ABI}__ and `functionName` set to `"tokenURI"`.
 */
export function useMockErc721TokenUri<
  TFunctionName extends "tokenURI",
  TSelectData = ReadContractResult<typeof mockErc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mockErc721ABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: mockErc721ABI, functionName: "tokenURI", ...config } as UseContractReadConfig<
    typeof mockErc721ABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mockErc721ABI}__.
 */
export function useMockErc721Write<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof mockErc721ABI, string>["request"]["abi"],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof mockErc721ABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof mockErc721ABI, TFunctionName, TMode>({ abi: mockErc721ABI, ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mockErc721ABI}__ and `functionName` set to `"approve"`.
 */
export function useMockErc721Approve<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof mockErc721ABI, "approve">["request"]["abi"],
        "approve",
        TMode
      > & { functionName?: "approve" }
    : UseContractWriteConfig<typeof mockErc721ABI, "approve", TMode> & {
        abi?: never;
        functionName?: "approve";
      } = {} as any,
) {
  return useContractWrite<typeof mockErc721ABI, "approve", TMode>({
    abi: mockErc721ABI,
    functionName: "approve",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mockErc721ABI}__ and `functionName` set to `"initialize"`.
 */
export function useMockErc721Initialize<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof mockErc721ABI, "initialize">["request"]["abi"],
        "initialize",
        TMode
      > & { functionName?: "initialize" }
    : UseContractWriteConfig<typeof mockErc721ABI, "initialize", TMode> & {
        abi?: never;
        functionName?: "initialize";
      } = {} as any,
) {
  return useContractWrite<typeof mockErc721ABI, "initialize", TMode>({
    abi: mockErc721ABI,
    functionName: "initialize",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mockErc721ABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useMockErc721SafeTransferFrom<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof mockErc721ABI, "safeTransferFrom">["request"]["abi"],
        "safeTransferFrom",
        TMode
      > & { functionName?: "safeTransferFrom" }
    : UseContractWriteConfig<typeof mockErc721ABI, "safeTransferFrom", TMode> & {
        abi?: never;
        functionName?: "safeTransferFrom";
      } = {} as any,
) {
  return useContractWrite<typeof mockErc721ABI, "safeTransferFrom", TMode>({
    abi: mockErc721ABI,
    functionName: "safeTransferFrom",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mockErc721ABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useMockErc721SetApprovalForAll<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof mockErc721ABI, "setApprovalForAll">["request"]["abi"],
        "setApprovalForAll",
        TMode
      > & { functionName?: "setApprovalForAll" }
    : UseContractWriteConfig<typeof mockErc721ABI, "setApprovalForAll", TMode> & {
        abi?: never;
        functionName?: "setApprovalForAll";
      } = {} as any,
) {
  return useContractWrite<typeof mockErc721ABI, "setApprovalForAll", TMode>({
    abi: mockErc721ABI,
    functionName: "setApprovalForAll",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mockErc721ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useMockErc721TransferFrom<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof mockErc721ABI, "transferFrom">["request"]["abi"],
        "transferFrom",
        TMode
      > & { functionName?: "transferFrom" }
    : UseContractWriteConfig<typeof mockErc721ABI, "transferFrom", TMode> & {
        abi?: never;
        functionName?: "transferFrom";
      } = {} as any,
) {
  return useContractWrite<typeof mockErc721ABI, "transferFrom", TMode>({
    abi: mockErc721ABI,
    functionName: "transferFrom",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mockErc721ABI}__.
 */
export function usePrepareMockErc721Write<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof mockErc721ABI, TFunctionName>, "abi"> = {} as any,
) {
  return usePrepareContractWrite({ abi: mockErc721ABI, ...config } as UsePrepareContractWriteConfig<
    typeof mockErc721ABI,
    TFunctionName
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mockErc721ABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareMockErc721Approve(
  config: Omit<UsePrepareContractWriteConfig<typeof mockErc721ABI, "approve">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: mockErc721ABI,
    functionName: "approve",
    ...config,
  } as UsePrepareContractWriteConfig<typeof mockErc721ABI, "approve">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mockErc721ABI}__ and `functionName` set to `"initialize"`.
 */
export function usePrepareMockErc721Initialize(
  config: Omit<UsePrepareContractWriteConfig<typeof mockErc721ABI, "initialize">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: mockErc721ABI,
    functionName: "initialize",
    ...config,
  } as UsePrepareContractWriteConfig<typeof mockErc721ABI, "initialize">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mockErc721ABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareMockErc721SafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof mockErc721ABI, "safeTransferFrom">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: mockErc721ABI,
    functionName: "safeTransferFrom",
    ...config,
  } as UsePrepareContractWriteConfig<typeof mockErc721ABI, "safeTransferFrom">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mockErc721ABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareMockErc721SetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof mockErc721ABI, "setApprovalForAll">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: mockErc721ABI,
    functionName: "setApprovalForAll",
    ...config,
  } as UsePrepareContractWriteConfig<typeof mockErc721ABI, "setApprovalForAll">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mockErc721ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareMockErc721TransferFrom(
  config: Omit<UsePrepareContractWriteConfig<typeof mockErc721ABI, "transferFrom">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: mockErc721ABI,
    functionName: "transferFrom",
    ...config,
  } as UsePrepareContractWriteConfig<typeof mockErc721ABI, "transferFrom">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link mockErc721ABI}__.
 */
export function useMockErc721Event<TEventName extends string>(
  config: Omit<UseContractEventConfig<typeof mockErc721ABI, TEventName>, "abi"> = {} as any,
) {
  return useContractEvent({ abi: mockErc721ABI, ...config } as UseContractEventConfig<
    typeof mockErc721ABI,
    TEventName
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link mockErc721ABI}__ and `eventName` set to `"Approval"`.
 */
export function useMockErc721ApprovalEvent(
  config: Omit<UseContractEventConfig<typeof mockErc721ABI, "Approval">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: mockErc721ABI, eventName: "Approval", ...config } as UseContractEventConfig<
    typeof mockErc721ABI,
    "Approval"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link mockErc721ABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useMockErc721ApprovalForAllEvent(
  config: Omit<UseContractEventConfig<typeof mockErc721ABI, "ApprovalForAll">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: mockErc721ABI, eventName: "ApprovalForAll", ...config } as UseContractEventConfig<
    typeof mockErc721ABI,
    "ApprovalForAll"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link mockErc721ABI}__ and `eventName` set to `"Transfer"`.
 */
export function useMockErc721TransferEvent(
  config: Omit<UseContractEventConfig<typeof mockErc721ABI, "Transfer">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: mockErc721ABI, eventName: "Transfer", ...config } as UseContractEventConfig<
    typeof mockErc721ABI,
    "Transfer"
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mockPriceOracleABI}__.
 */
export function useMockPriceOracleRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof mockPriceOracleABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof mockPriceOracleABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: mockPriceOracleABI, ...config } as UseContractReadConfig<
    typeof mockPriceOracleABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link mockPriceOracleABI}__ and `functionName` set to `"tokenPrices"`.
 */
export function useMockPriceOracleTokenPrices<
  TFunctionName extends "tokenPrices",
  TSelectData = ReadContractResult<typeof mockPriceOracleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof mockPriceOracleABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: mockPriceOracleABI, functionName: "tokenPrices", ...config } as UseContractReadConfig<
    typeof mockPriceOracleABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mockPriceOracleABI}__.
 */
export function useMockPriceOracleWrite<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof mockPriceOracleABI, string>["request"]["abi"],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof mockPriceOracleABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof mockPriceOracleABI, TFunctionName, TMode>({
    abi: mockPriceOracleABI,
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link mockPriceOracleABI}__ and `functionName` set to `"updatePrice"`.
 */
export function useMockPriceOracleUpdatePrice<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof mockPriceOracleABI, "updatePrice">["request"]["abi"],
        "updatePrice",
        TMode
      > & { functionName?: "updatePrice" }
    : UseContractWriteConfig<typeof mockPriceOracleABI, "updatePrice", TMode> & {
        abi?: never;
        functionName?: "updatePrice";
      } = {} as any,
) {
  return useContractWrite<typeof mockPriceOracleABI, "updatePrice", TMode>({
    abi: mockPriceOracleABI,
    functionName: "updatePrice",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mockPriceOracleABI}__.
 */
export function usePrepareMockPriceOracleWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof mockPriceOracleABI, TFunctionName>, "abi"> = {} as any,
) {
  return usePrepareContractWrite({ abi: mockPriceOracleABI, ...config } as UsePrepareContractWriteConfig<
    typeof mockPriceOracleABI,
    TFunctionName
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link mockPriceOracleABI}__ and `functionName` set to `"updatePrice"`.
 */
export function usePrepareMockPriceOracleUpdatePrice(
  config: Omit<
    UsePrepareContractWriteConfig<typeof mockPriceOracleABI, "updatePrice">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: mockPriceOracleABI,
    functionName: "updatePrice",
    ...config,
  } as UsePrepareContractWriteConfig<typeof mockPriceOracleABI, "updatePrice">);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nestedActionExecutorABI}__.
 */
export function useNestedActionExecutorRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof nestedActionExecutorABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof nestedActionExecutorABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: nestedActionExecutorABI, ...config } as UseContractReadConfig<
    typeof nestedActionExecutorABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nestedActionExecutorABI}__ and `functionName` set to `"IS_TEST"`.
 */
export function useNestedActionExecutorIsTest<
  TFunctionName extends "IS_TEST",
  TSelectData = ReadContractResult<typeof nestedActionExecutorABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof nestedActionExecutorABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: nestedActionExecutorABI, functionName: "IS_TEST", ...config } as UseContractReadConfig<
    typeof nestedActionExecutorABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nestedActionExecutorABI}__ and `functionName` set to `"excludeArtifacts"`.
 */
export function useNestedActionExecutorExcludeArtifacts<
  TFunctionName extends "excludeArtifacts",
  TSelectData = ReadContractResult<typeof nestedActionExecutorABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof nestedActionExecutorABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: nestedActionExecutorABI,
    functionName: "excludeArtifacts",
    ...config,
  } as UseContractReadConfig<typeof nestedActionExecutorABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nestedActionExecutorABI}__ and `functionName` set to `"excludeContracts"`.
 */
export function useNestedActionExecutorExcludeContracts<
  TFunctionName extends "excludeContracts",
  TSelectData = ReadContractResult<typeof nestedActionExecutorABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof nestedActionExecutorABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: nestedActionExecutorABI,
    functionName: "excludeContracts",
    ...config,
  } as UseContractReadConfig<typeof nestedActionExecutorABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nestedActionExecutorABI}__ and `functionName` set to `"excludeSelectors"`.
 */
export function useNestedActionExecutorExcludeSelectors<
  TFunctionName extends "excludeSelectors",
  TSelectData = ReadContractResult<typeof nestedActionExecutorABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof nestedActionExecutorABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: nestedActionExecutorABI,
    functionName: "excludeSelectors",
    ...config,
  } as UseContractReadConfig<typeof nestedActionExecutorABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nestedActionExecutorABI}__ and `functionName` set to `"excludeSenders"`.
 */
export function useNestedActionExecutorExcludeSenders<
  TFunctionName extends "excludeSenders",
  TSelectData = ReadContractResult<typeof nestedActionExecutorABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof nestedActionExecutorABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: nestedActionExecutorABI,
    functionName: "excludeSenders",
    ...config,
  } as UseContractReadConfig<typeof nestedActionExecutorABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nestedActionExecutorABI}__ and `functionName` set to `"failed"`.
 */
export function useNestedActionExecutorFailed<
  TFunctionName extends "failed",
  TSelectData = ReadContractResult<typeof nestedActionExecutorABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof nestedActionExecutorABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: nestedActionExecutorABI, functionName: "failed", ...config } as UseContractReadConfig<
    typeof nestedActionExecutorABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nestedActionExecutorABI}__ and `functionName` set to `"manager"`.
 */
export function useNestedActionExecutorManager<
  TFunctionName extends "manager",
  TSelectData = ReadContractResult<typeof nestedActionExecutorABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof nestedActionExecutorABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: nestedActionExecutorABI, functionName: "manager", ...config } as UseContractReadConfig<
    typeof nestedActionExecutorABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nestedActionExecutorABI}__ and `functionName` set to `"targetArtifactSelectors"`.
 */
export function useNestedActionExecutorTargetArtifactSelectors<
  TFunctionName extends "targetArtifactSelectors",
  TSelectData = ReadContractResult<typeof nestedActionExecutorABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof nestedActionExecutorABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: nestedActionExecutorABI,
    functionName: "targetArtifactSelectors",
    ...config,
  } as UseContractReadConfig<typeof nestedActionExecutorABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nestedActionExecutorABI}__ and `functionName` set to `"targetArtifacts"`.
 */
export function useNestedActionExecutorTargetArtifacts<
  TFunctionName extends "targetArtifacts",
  TSelectData = ReadContractResult<typeof nestedActionExecutorABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof nestedActionExecutorABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: nestedActionExecutorABI,
    functionName: "targetArtifacts",
    ...config,
  } as UseContractReadConfig<typeof nestedActionExecutorABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nestedActionExecutorABI}__ and `functionName` set to `"targetContracts"`.
 */
export function useNestedActionExecutorTargetContracts<
  TFunctionName extends "targetContracts",
  TSelectData = ReadContractResult<typeof nestedActionExecutorABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof nestedActionExecutorABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: nestedActionExecutorABI,
    functionName: "targetContracts",
    ...config,
  } as UseContractReadConfig<typeof nestedActionExecutorABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nestedActionExecutorABI}__ and `functionName` set to `"targetInterfaces"`.
 */
export function useNestedActionExecutorTargetInterfaces<
  TFunctionName extends "targetInterfaces",
  TSelectData = ReadContractResult<typeof nestedActionExecutorABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof nestedActionExecutorABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: nestedActionExecutorABI,
    functionName: "targetInterfaces",
    ...config,
  } as UseContractReadConfig<typeof nestedActionExecutorABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nestedActionExecutorABI}__ and `functionName` set to `"targetSelectors"`.
 */
export function useNestedActionExecutorTargetSelectors<
  TFunctionName extends "targetSelectors",
  TSelectData = ReadContractResult<typeof nestedActionExecutorABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof nestedActionExecutorABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: nestedActionExecutorABI,
    functionName: "targetSelectors",
    ...config,
  } as UseContractReadConfig<typeof nestedActionExecutorABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nestedActionExecutorABI}__ and `functionName` set to `"targetSenders"`.
 */
export function useNestedActionExecutorTargetSenders<
  TFunctionName extends "targetSenders",
  TSelectData = ReadContractResult<typeof nestedActionExecutorABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof nestedActionExecutorABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: nestedActionExecutorABI,
    functionName: "targetSenders",
    ...config,
  } as UseContractReadConfig<typeof nestedActionExecutorABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nestedActionExecutorABI}__ and `functionName` set to `"unlockCallback"`.
 */
export function useNestedActionExecutorUnlockCallback<
  TFunctionName extends "unlockCallback",
  TSelectData = ReadContractResult<typeof nestedActionExecutorABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof nestedActionExecutorABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: nestedActionExecutorABI,
    functionName: "unlockCallback",
    ...config,
  } as UseContractReadConfig<typeof nestedActionExecutorABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link nestedActionExecutorABI}__.
 */
export function useNestedActionExecutorWrite<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof nestedActionExecutorABI, string>["request"]["abi"],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof nestedActionExecutorABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof nestedActionExecutorABI, TFunctionName, TMode>({
    abi: nestedActionExecutorABI,
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link nestedActionExecutorABI}__ and `functionName` set to `"execute"`.
 */
export function useNestedActionExecutorExecute<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof nestedActionExecutorABI, "execute">["request"]["abi"],
        "execute",
        TMode
      > & { functionName?: "execute" }
    : UseContractWriteConfig<typeof nestedActionExecutorABI, "execute", TMode> & {
        abi?: never;
        functionName?: "execute";
      } = {} as any,
) {
  return useContractWrite<typeof nestedActionExecutorABI, "execute", TMode>({
    abi: nestedActionExecutorABI,
    functionName: "execute",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link nestedActionExecutorABI}__ and `functionName` set to `"setKey"`.
 */
export function useNestedActionExecutorSetKey<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof nestedActionExecutorABI, "setKey">["request"]["abi"],
        "setKey",
        TMode
      > & { functionName?: "setKey" }
    : UseContractWriteConfig<typeof nestedActionExecutorABI, "setKey", TMode> & {
        abi?: never;
        functionName?: "setKey";
      } = {} as any,
) {
  return useContractWrite<typeof nestedActionExecutorABI, "setKey", TMode>({
    abi: nestedActionExecutorABI,
    functionName: "setKey",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link nestedActionExecutorABI}__.
 */
export function usePrepareNestedActionExecutorWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof nestedActionExecutorABI, TFunctionName>, "abi"> = {} as any,
) {
  return usePrepareContractWrite({ abi: nestedActionExecutorABI, ...config } as UsePrepareContractWriteConfig<
    typeof nestedActionExecutorABI,
    TFunctionName
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link nestedActionExecutorABI}__ and `functionName` set to `"execute"`.
 */
export function usePrepareNestedActionExecutorExecute(
  config: Omit<
    UsePrepareContractWriteConfig<typeof nestedActionExecutorABI, "execute">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: nestedActionExecutorABI,
    functionName: "execute",
    ...config,
  } as UsePrepareContractWriteConfig<typeof nestedActionExecutorABI, "execute">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link nestedActionExecutorABI}__ and `functionName` set to `"setKey"`.
 */
export function usePrepareNestedActionExecutorSetKey(
  config: Omit<
    UsePrepareContractWriteConfig<typeof nestedActionExecutorABI, "setKey">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: nestedActionExecutorABI,
    functionName: "setKey",
    ...config,
  } as UsePrepareContractWriteConfig<typeof nestedActionExecutorABI, "setKey">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link nestedActionExecutorABI}__.
 */
export function useNestedActionExecutorEvent<TEventName extends string>(
  config: Omit<UseContractEventConfig<typeof nestedActionExecutorABI, TEventName>, "abi"> = {} as any,
) {
  return useContractEvent({ abi: nestedActionExecutorABI, ...config } as UseContractEventConfig<
    typeof nestedActionExecutorABI,
    TEventName
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link nestedActionExecutorABI}__ and `eventName` set to `"log"`.
 */
export function useNestedActionExecutorLogEvent(
  config: Omit<UseContractEventConfig<typeof nestedActionExecutorABI, "log">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: nestedActionExecutorABI, eventName: "log", ...config } as UseContractEventConfig<
    typeof nestedActionExecutorABI,
    "log"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link nestedActionExecutorABI}__ and `eventName` set to `"log_address"`.
 */
export function useNestedActionExecutorLogAddressEvent(
  config: Omit<UseContractEventConfig<typeof nestedActionExecutorABI, "log_address">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({
    abi: nestedActionExecutorABI,
    eventName: "log_address",
    ...config,
  } as UseContractEventConfig<typeof nestedActionExecutorABI, "log_address">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link nestedActionExecutorABI}__ and `eventName` set to `"log_array"`.
 */
export function useNestedActionExecutorLogArrayEvent(
  config: Omit<UseContractEventConfig<typeof nestedActionExecutorABI, "log_array">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: nestedActionExecutorABI, eventName: "log_array", ...config } as UseContractEventConfig<
    typeof nestedActionExecutorABI,
    "log_array"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link nestedActionExecutorABI}__ and `eventName` set to `"log_bytes"`.
 */
export function useNestedActionExecutorLogBytesEvent(
  config: Omit<UseContractEventConfig<typeof nestedActionExecutorABI, "log_bytes">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: nestedActionExecutorABI, eventName: "log_bytes", ...config } as UseContractEventConfig<
    typeof nestedActionExecutorABI,
    "log_bytes"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link nestedActionExecutorABI}__ and `eventName` set to `"log_bytes32"`.
 */
export function useNestedActionExecutorLogBytes32Event(
  config: Omit<UseContractEventConfig<typeof nestedActionExecutorABI, "log_bytes32">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({
    abi: nestedActionExecutorABI,
    eventName: "log_bytes32",
    ...config,
  } as UseContractEventConfig<typeof nestedActionExecutorABI, "log_bytes32">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link nestedActionExecutorABI}__ and `eventName` set to `"log_int"`.
 */
export function useNestedActionExecutorLogIntEvent(
  config: Omit<UseContractEventConfig<typeof nestedActionExecutorABI, "log_int">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: nestedActionExecutorABI, eventName: "log_int", ...config } as UseContractEventConfig<
    typeof nestedActionExecutorABI,
    "log_int"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link nestedActionExecutorABI}__ and `eventName` set to `"log_named_address"`.
 */
export function useNestedActionExecutorLogNamedAddressEvent(
  config: Omit<
    UseContractEventConfig<typeof nestedActionExecutorABI, "log_named_address">,
    "abi" | "eventName"
  > = {} as any,
) {
  return useContractEvent({
    abi: nestedActionExecutorABI,
    eventName: "log_named_address",
    ...config,
  } as UseContractEventConfig<typeof nestedActionExecutorABI, "log_named_address">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link nestedActionExecutorABI}__ and `eventName` set to `"log_named_array"`.
 */
export function useNestedActionExecutorLogNamedArrayEvent(
  config: Omit<
    UseContractEventConfig<typeof nestedActionExecutorABI, "log_named_array">,
    "abi" | "eventName"
  > = {} as any,
) {
  return useContractEvent({
    abi: nestedActionExecutorABI,
    eventName: "log_named_array",
    ...config,
  } as UseContractEventConfig<typeof nestedActionExecutorABI, "log_named_array">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link nestedActionExecutorABI}__ and `eventName` set to `"log_named_bytes"`.
 */
export function useNestedActionExecutorLogNamedBytesEvent(
  config: Omit<
    UseContractEventConfig<typeof nestedActionExecutorABI, "log_named_bytes">,
    "abi" | "eventName"
  > = {} as any,
) {
  return useContractEvent({
    abi: nestedActionExecutorABI,
    eventName: "log_named_bytes",
    ...config,
  } as UseContractEventConfig<typeof nestedActionExecutorABI, "log_named_bytes">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link nestedActionExecutorABI}__ and `eventName` set to `"log_named_bytes32"`.
 */
export function useNestedActionExecutorLogNamedBytes32Event(
  config: Omit<
    UseContractEventConfig<typeof nestedActionExecutorABI, "log_named_bytes32">,
    "abi" | "eventName"
  > = {} as any,
) {
  return useContractEvent({
    abi: nestedActionExecutorABI,
    eventName: "log_named_bytes32",
    ...config,
  } as UseContractEventConfig<typeof nestedActionExecutorABI, "log_named_bytes32">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link nestedActionExecutorABI}__ and `eventName` set to `"log_named_decimal_int"`.
 */
export function useNestedActionExecutorLogNamedDecimalIntEvent(
  config: Omit<
    UseContractEventConfig<typeof nestedActionExecutorABI, "log_named_decimal_int">,
    "abi" | "eventName"
  > = {} as any,
) {
  return useContractEvent({
    abi: nestedActionExecutorABI,
    eventName: "log_named_decimal_int",
    ...config,
  } as UseContractEventConfig<typeof nestedActionExecutorABI, "log_named_decimal_int">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link nestedActionExecutorABI}__ and `eventName` set to `"log_named_decimal_uint"`.
 */
export function useNestedActionExecutorLogNamedDecimalUintEvent(
  config: Omit<
    UseContractEventConfig<typeof nestedActionExecutorABI, "log_named_decimal_uint">,
    "abi" | "eventName"
  > = {} as any,
) {
  return useContractEvent({
    abi: nestedActionExecutorABI,
    eventName: "log_named_decimal_uint",
    ...config,
  } as UseContractEventConfig<typeof nestedActionExecutorABI, "log_named_decimal_uint">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link nestedActionExecutorABI}__ and `eventName` set to `"log_named_int"`.
 */
export function useNestedActionExecutorLogNamedIntEvent(
  config: Omit<
    UseContractEventConfig<typeof nestedActionExecutorABI, "log_named_int">,
    "abi" | "eventName"
  > = {} as any,
) {
  return useContractEvent({
    abi: nestedActionExecutorABI,
    eventName: "log_named_int",
    ...config,
  } as UseContractEventConfig<typeof nestedActionExecutorABI, "log_named_int">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link nestedActionExecutorABI}__ and `eventName` set to `"log_named_string"`.
 */
export function useNestedActionExecutorLogNamedStringEvent(
  config: Omit<
    UseContractEventConfig<typeof nestedActionExecutorABI, "log_named_string">,
    "abi" | "eventName"
  > = {} as any,
) {
  return useContractEvent({
    abi: nestedActionExecutorABI,
    eventName: "log_named_string",
    ...config,
  } as UseContractEventConfig<typeof nestedActionExecutorABI, "log_named_string">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link nestedActionExecutorABI}__ and `eventName` set to `"log_named_uint"`.
 */
export function useNestedActionExecutorLogNamedUintEvent(
  config: Omit<
    UseContractEventConfig<typeof nestedActionExecutorABI, "log_named_uint">,
    "abi" | "eventName"
  > = {} as any,
) {
  return useContractEvent({
    abi: nestedActionExecutorABI,
    eventName: "log_named_uint",
    ...config,
  } as UseContractEventConfig<typeof nestedActionExecutorABI, "log_named_uint">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link nestedActionExecutorABI}__ and `eventName` set to `"log_string"`.
 */
export function useNestedActionExecutorLogStringEvent(
  config: Omit<UseContractEventConfig<typeof nestedActionExecutorABI, "log_string">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({
    abi: nestedActionExecutorABI,
    eventName: "log_string",
    ...config,
  } as UseContractEventConfig<typeof nestedActionExecutorABI, "log_string">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link nestedActionExecutorABI}__ and `eventName` set to `"log_uint"`.
 */
export function useNestedActionExecutorLogUintEvent(
  config: Omit<UseContractEventConfig<typeof nestedActionExecutorABI, "log_uint">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: nestedActionExecutorABI, eventName: "log_uint", ...config } as UseContractEventConfig<
    typeof nestedActionExecutorABI,
    "log_uint"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link nestedActionExecutorABI}__ and `eventName` set to `"logs"`.
 */
export function useNestedActionExecutorLogsEvent(
  config: Omit<UseContractEventConfig<typeof nestedActionExecutorABI, "logs">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: nestedActionExecutorABI, eventName: "logs", ...config } as UseContractEventConfig<
    typeof nestedActionExecutorABI,
    "logs"
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link oracleSwapABI}__.
 */
export function useOracleSwapRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof oracleSwapABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof oracleSwapABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: oracleSwapABI, ...config } as UseContractReadConfig<
    typeof oracleSwapABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link oracleSwapABI}__ and `functionName` set to `"beforeAddLiquidity"`.
 */
export function useOracleSwapBeforeAddLiquidity<
  TFunctionName extends "beforeAddLiquidity",
  TSelectData = ReadContractResult<typeof oracleSwapABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof oracleSwapABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: oracleSwapABI, functionName: "beforeAddLiquidity", ...config } as UseContractReadConfig<
    typeof oracleSwapABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link oracleSwapABI}__ and `functionName` set to `"getHookPermissions"`.
 */
export function useOracleSwapGetHookPermissions<
  TFunctionName extends "getHookPermissions",
  TSelectData = ReadContractResult<typeof oracleSwapABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof oracleSwapABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: oracleSwapABI, functionName: "getHookPermissions", ...config } as UseContractReadConfig<
    typeof oracleSwapABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link oracleSwapABI}__ and `functionName` set to `"oneForZeroEndTaskId"`.
 */
export function useOracleSwapOneForZeroEndTaskId<
  TFunctionName extends "oneForZeroEndTaskId",
  TSelectData = ReadContractResult<typeof oracleSwapABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof oracleSwapABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: oracleSwapABI,
    functionName: "oneForZeroEndTaskId",
    ...config,
  } as UseContractReadConfig<typeof oracleSwapABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link oracleSwapABI}__ and `functionName` set to `"oneForZeroStartTaskId"`.
 */
export function useOracleSwapOneForZeroStartTaskId<
  TFunctionName extends "oneForZeroStartTaskId",
  TSelectData = ReadContractResult<typeof oracleSwapABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof oracleSwapABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: oracleSwapABI,
    functionName: "oneForZeroStartTaskId",
    ...config,
  } as UseContractReadConfig<typeof oracleSwapABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link oracleSwapABI}__ and `functionName` set to `"owner"`.
 */
export function useOracleSwapOwner<
  TFunctionName extends "owner",
  TSelectData = ReadContractResult<typeof oracleSwapABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof oracleSwapABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: oracleSwapABI, functionName: "owner", ...config } as UseContractReadConfig<
    typeof oracleSwapABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link oracleSwapABI}__ and `functionName` set to `"poolManager"`.
 */
export function useOracleSwapPoolManager<
  TFunctionName extends "poolManager",
  TSelectData = ReadContractResult<typeof oracleSwapABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof oracleSwapABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: oracleSwapABI, functionName: "poolManager", ...config } as UseContractReadConfig<
    typeof oracleSwapABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link oracleSwapABI}__ and `functionName` set to `"priceOracle"`.
 */
export function useOracleSwapPriceOracle<
  TFunctionName extends "priceOracle",
  TSelectData = ReadContractResult<typeof oracleSwapABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof oracleSwapABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: oracleSwapABI, functionName: "priceOracle", ...config } as UseContractReadConfig<
    typeof oracleSwapABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link oracleSwapABI}__ and `functionName` set to `"swapQueue"`.
 */
export function useOracleSwapSwapQueue<
  TFunctionName extends "swapQueue",
  TSelectData = ReadContractResult<typeof oracleSwapABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof oracleSwapABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: oracleSwapABI, functionName: "swapQueue", ...config } as UseContractReadConfig<
    typeof oracleSwapABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link oracleSwapABI}__ and `functionName` set to `"tokenName"`.
 */
export function useOracleSwapTokenName<
  TFunctionName extends "tokenName",
  TSelectData = ReadContractResult<typeof oracleSwapABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof oracleSwapABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: oracleSwapABI, functionName: "tokenName", ...config } as UseContractReadConfig<
    typeof oracleSwapABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link oracleSwapABI}__ and `functionName` set to `"zeroForOneEndTaskId"`.
 */
export function useOracleSwapZeroForOneEndTaskId<
  TFunctionName extends "zeroForOneEndTaskId",
  TSelectData = ReadContractResult<typeof oracleSwapABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof oracleSwapABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: oracleSwapABI,
    functionName: "zeroForOneEndTaskId",
    ...config,
  } as UseContractReadConfig<typeof oracleSwapABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link oracleSwapABI}__ and `functionName` set to `"zeroForOneStartTaskId"`.
 */
export function useOracleSwapZeroForOneStartTaskId<
  TFunctionName extends "zeroForOneStartTaskId",
  TSelectData = ReadContractResult<typeof oracleSwapABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof oracleSwapABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: oracleSwapABI,
    functionName: "zeroForOneStartTaskId",
    ...config,
  } as UseContractReadConfig<typeof oracleSwapABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link oracleSwapABI}__.
 */
export function useOracleSwapWrite<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof oracleSwapABI, string>["request"]["abi"],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof oracleSwapABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof oracleSwapABI, TFunctionName, TMode>({ abi: oracleSwapABI, ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link oracleSwapABI}__ and `functionName` set to `"afterAddLiquidity"`.
 */
export function useOracleSwapAfterAddLiquidity<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof oracleSwapABI, "afterAddLiquidity">["request"]["abi"],
        "afterAddLiquidity",
        TMode
      > & { functionName?: "afterAddLiquidity" }
    : UseContractWriteConfig<typeof oracleSwapABI, "afterAddLiquidity", TMode> & {
        abi?: never;
        functionName?: "afterAddLiquidity";
      } = {} as any,
) {
  return useContractWrite<typeof oracleSwapABI, "afterAddLiquidity", TMode>({
    abi: oracleSwapABI,
    functionName: "afterAddLiquidity",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link oracleSwapABI}__ and `functionName` set to `"afterDonate"`.
 */
export function useOracleSwapAfterDonate<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof oracleSwapABI, "afterDonate">["request"]["abi"],
        "afterDonate",
        TMode
      > & { functionName?: "afterDonate" }
    : UseContractWriteConfig<typeof oracleSwapABI, "afterDonate", TMode> & {
        abi?: never;
        functionName?: "afterDonate";
      } = {} as any,
) {
  return useContractWrite<typeof oracleSwapABI, "afterDonate", TMode>({
    abi: oracleSwapABI,
    functionName: "afterDonate",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link oracleSwapABI}__ and `functionName` set to `"afterInitialize"`.
 */
export function useOracleSwapAfterInitialize<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof oracleSwapABI, "afterInitialize">["request"]["abi"],
        "afterInitialize",
        TMode
      > & { functionName?: "afterInitialize" }
    : UseContractWriteConfig<typeof oracleSwapABI, "afterInitialize", TMode> & {
        abi?: never;
        functionName?: "afterInitialize";
      } = {} as any,
) {
  return useContractWrite<typeof oracleSwapABI, "afterInitialize", TMode>({
    abi: oracleSwapABI,
    functionName: "afterInitialize",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link oracleSwapABI}__ and `functionName` set to `"afterRemoveLiquidity"`.
 */
export function useOracleSwapAfterRemoveLiquidity<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof oracleSwapABI, "afterRemoveLiquidity">["request"]["abi"],
        "afterRemoveLiquidity",
        TMode
      > & { functionName?: "afterRemoveLiquidity" }
    : UseContractWriteConfig<typeof oracleSwapABI, "afterRemoveLiquidity", TMode> & {
        abi?: never;
        functionName?: "afterRemoveLiquidity";
      } = {} as any,
) {
  return useContractWrite<typeof oracleSwapABI, "afterRemoveLiquidity", TMode>({
    abi: oracleSwapABI,
    functionName: "afterRemoveLiquidity",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link oracleSwapABI}__ and `functionName` set to `"afterSwap"`.
 */
export function useOracleSwapAfterSwap<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof oracleSwapABI, "afterSwap">["request"]["abi"],
        "afterSwap",
        TMode
      > & { functionName?: "afterSwap" }
    : UseContractWriteConfig<typeof oracleSwapABI, "afterSwap", TMode> & {
        abi?: never;
        functionName?: "afterSwap";
      } = {} as any,
) {
  return useContractWrite<typeof oracleSwapABI, "afterSwap", TMode>({
    abi: oracleSwapABI,
    functionName: "afterSwap",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link oracleSwapABI}__ and `functionName` set to `"beforeDonate"`.
 */
export function useOracleSwapBeforeDonate<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof oracleSwapABI, "beforeDonate">["request"]["abi"],
        "beforeDonate",
        TMode
      > & { functionName?: "beforeDonate" }
    : UseContractWriteConfig<typeof oracleSwapABI, "beforeDonate", TMode> & {
        abi?: never;
        functionName?: "beforeDonate";
      } = {} as any,
) {
  return useContractWrite<typeof oracleSwapABI, "beforeDonate", TMode>({
    abi: oracleSwapABI,
    functionName: "beforeDonate",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link oracleSwapABI}__ and `functionName` set to `"beforeInitialize"`.
 */
export function useOracleSwapBeforeInitialize<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof oracleSwapABI, "beforeInitialize">["request"]["abi"],
        "beforeInitialize",
        TMode
      > & { functionName?: "beforeInitialize" }
    : UseContractWriteConfig<typeof oracleSwapABI, "beforeInitialize", TMode> & {
        abi?: never;
        functionName?: "beforeInitialize";
      } = {} as any,
) {
  return useContractWrite<typeof oracleSwapABI, "beforeInitialize", TMode>({
    abi: oracleSwapABI,
    functionName: "beforeInitialize",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link oracleSwapABI}__ and `functionName` set to `"beforeRemoveLiquidity"`.
 */
export function useOracleSwapBeforeRemoveLiquidity<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof oracleSwapABI, "beforeRemoveLiquidity">["request"]["abi"],
        "beforeRemoveLiquidity",
        TMode
      > & { functionName?: "beforeRemoveLiquidity" }
    : UseContractWriteConfig<typeof oracleSwapABI, "beforeRemoveLiquidity", TMode> & {
        abi?: never;
        functionName?: "beforeRemoveLiquidity";
      } = {} as any,
) {
  return useContractWrite<typeof oracleSwapABI, "beforeRemoveLiquidity", TMode>({
    abi: oracleSwapABI,
    functionName: "beforeRemoveLiquidity",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link oracleSwapABI}__ and `functionName` set to `"beforeSwap"`.
 */
export function useOracleSwapBeforeSwap<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof oracleSwapABI, "beforeSwap">["request"]["abi"],
        "beforeSwap",
        TMode
      > & { functionName?: "beforeSwap" }
    : UseContractWriteConfig<typeof oracleSwapABI, "beforeSwap", TMode> & {
        abi?: never;
        functionName?: "beforeSwap";
      } = {} as any,
) {
  return useContractWrite<typeof oracleSwapABI, "beforeSwap", TMode>({
    abi: oracleSwapABI,
    functionName: "beforeSwap",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link oracleSwapABI}__ and `functionName` set to `"process"`.
 */
export function useOracleSwapProcess<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof oracleSwapABI, "process">["request"]["abi"],
        "process",
        TMode
      > & { functionName?: "process" }
    : UseContractWriteConfig<typeof oracleSwapABI, "process", TMode> & {
        abi?: never;
        functionName?: "process";
      } = {} as any,
) {
  return useContractWrite<typeof oracleSwapABI, "process", TMode>({
    abi: oracleSwapABI,
    functionName: "process",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link oracleSwapABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function useOracleSwapRenounceOwnership<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof oracleSwapABI, "renounceOwnership">["request"]["abi"],
        "renounceOwnership",
        TMode
      > & { functionName?: "renounceOwnership" }
    : UseContractWriteConfig<typeof oracleSwapABI, "renounceOwnership", TMode> & {
        abi?: never;
        functionName?: "renounceOwnership";
      } = {} as any,
) {
  return useContractWrite<typeof oracleSwapABI, "renounceOwnership", TMode>({
    abi: oracleSwapABI,
    functionName: "renounceOwnership",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link oracleSwapABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function useOracleSwapTransferOwnership<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof oracleSwapABI, "transferOwnership">["request"]["abi"],
        "transferOwnership",
        TMode
      > & { functionName?: "transferOwnership" }
    : UseContractWriteConfig<typeof oracleSwapABI, "transferOwnership", TMode> & {
        abi?: never;
        functionName?: "transferOwnership";
      } = {} as any,
) {
  return useContractWrite<typeof oracleSwapABI, "transferOwnership", TMode>({
    abi: oracleSwapABI,
    functionName: "transferOwnership",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link oracleSwapABI}__ and `functionName` set to `"unlockCallback"`.
 */
export function useOracleSwapUnlockCallback<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof oracleSwapABI, "unlockCallback">["request"]["abi"],
        "unlockCallback",
        TMode
      > & { functionName?: "unlockCallback" }
    : UseContractWriteConfig<typeof oracleSwapABI, "unlockCallback", TMode> & {
        abi?: never;
        functionName?: "unlockCallback";
      } = {} as any,
) {
  return useContractWrite<typeof oracleSwapABI, "unlockCallback", TMode>({
    abi: oracleSwapABI,
    functionName: "unlockCallback",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link oracleSwapABI}__.
 */
export function usePrepareOracleSwapWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof oracleSwapABI, TFunctionName>, "abi"> = {} as any,
) {
  return usePrepareContractWrite({ abi: oracleSwapABI, ...config } as UsePrepareContractWriteConfig<
    typeof oracleSwapABI,
    TFunctionName
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link oracleSwapABI}__ and `functionName` set to `"afterAddLiquidity"`.
 */
export function usePrepareOracleSwapAfterAddLiquidity(
  config: Omit<
    UsePrepareContractWriteConfig<typeof oracleSwapABI, "afterAddLiquidity">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: oracleSwapABI,
    functionName: "afterAddLiquidity",
    ...config,
  } as UsePrepareContractWriteConfig<typeof oracleSwapABI, "afterAddLiquidity">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link oracleSwapABI}__ and `functionName` set to `"afterDonate"`.
 */
export function usePrepareOracleSwapAfterDonate(
  config: Omit<UsePrepareContractWriteConfig<typeof oracleSwapABI, "afterDonate">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: oracleSwapABI,
    functionName: "afterDonate",
    ...config,
  } as UsePrepareContractWriteConfig<typeof oracleSwapABI, "afterDonate">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link oracleSwapABI}__ and `functionName` set to `"afterInitialize"`.
 */
export function usePrepareOracleSwapAfterInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof oracleSwapABI, "afterInitialize">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: oracleSwapABI,
    functionName: "afterInitialize",
    ...config,
  } as UsePrepareContractWriteConfig<typeof oracleSwapABI, "afterInitialize">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link oracleSwapABI}__ and `functionName` set to `"afterRemoveLiquidity"`.
 */
export function usePrepareOracleSwapAfterRemoveLiquidity(
  config: Omit<
    UsePrepareContractWriteConfig<typeof oracleSwapABI, "afterRemoveLiquidity">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: oracleSwapABI,
    functionName: "afterRemoveLiquidity",
    ...config,
  } as UsePrepareContractWriteConfig<typeof oracleSwapABI, "afterRemoveLiquidity">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link oracleSwapABI}__ and `functionName` set to `"afterSwap"`.
 */
export function usePrepareOracleSwapAfterSwap(
  config: Omit<UsePrepareContractWriteConfig<typeof oracleSwapABI, "afterSwap">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: oracleSwapABI,
    functionName: "afterSwap",
    ...config,
  } as UsePrepareContractWriteConfig<typeof oracleSwapABI, "afterSwap">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link oracleSwapABI}__ and `functionName` set to `"beforeDonate"`.
 */
export function usePrepareOracleSwapBeforeDonate(
  config: Omit<UsePrepareContractWriteConfig<typeof oracleSwapABI, "beforeDonate">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: oracleSwapABI,
    functionName: "beforeDonate",
    ...config,
  } as UsePrepareContractWriteConfig<typeof oracleSwapABI, "beforeDonate">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link oracleSwapABI}__ and `functionName` set to `"beforeInitialize"`.
 */
export function usePrepareOracleSwapBeforeInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof oracleSwapABI, "beforeInitialize">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: oracleSwapABI,
    functionName: "beforeInitialize",
    ...config,
  } as UsePrepareContractWriteConfig<typeof oracleSwapABI, "beforeInitialize">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link oracleSwapABI}__ and `functionName` set to `"beforeRemoveLiquidity"`.
 */
export function usePrepareOracleSwapBeforeRemoveLiquidity(
  config: Omit<
    UsePrepareContractWriteConfig<typeof oracleSwapABI, "beforeRemoveLiquidity">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: oracleSwapABI,
    functionName: "beforeRemoveLiquidity",
    ...config,
  } as UsePrepareContractWriteConfig<typeof oracleSwapABI, "beforeRemoveLiquidity">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link oracleSwapABI}__ and `functionName` set to `"beforeSwap"`.
 */
export function usePrepareOracleSwapBeforeSwap(
  config: Omit<UsePrepareContractWriteConfig<typeof oracleSwapABI, "beforeSwap">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: oracleSwapABI,
    functionName: "beforeSwap",
    ...config,
  } as UsePrepareContractWriteConfig<typeof oracleSwapABI, "beforeSwap">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link oracleSwapABI}__ and `functionName` set to `"process"`.
 */
export function usePrepareOracleSwapProcess(
  config: Omit<UsePrepareContractWriteConfig<typeof oracleSwapABI, "process">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: oracleSwapABI,
    functionName: "process",
    ...config,
  } as UsePrepareContractWriteConfig<typeof oracleSwapABI, "process">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link oracleSwapABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function usePrepareOracleSwapRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof oracleSwapABI, "renounceOwnership">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: oracleSwapABI,
    functionName: "renounceOwnership",
    ...config,
  } as UsePrepareContractWriteConfig<typeof oracleSwapABI, "renounceOwnership">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link oracleSwapABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePrepareOracleSwapTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof oracleSwapABI, "transferOwnership">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: oracleSwapABI,
    functionName: "transferOwnership",
    ...config,
  } as UsePrepareContractWriteConfig<typeof oracleSwapABI, "transferOwnership">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link oracleSwapABI}__ and `functionName` set to `"unlockCallback"`.
 */
export function usePrepareOracleSwapUnlockCallback(
  config: Omit<
    UsePrepareContractWriteConfig<typeof oracleSwapABI, "unlockCallback">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: oracleSwapABI,
    functionName: "unlockCallback",
    ...config,
  } as UsePrepareContractWriteConfig<typeof oracleSwapABI, "unlockCallback">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link oracleSwapABI}__.
 */
export function useOracleSwapEvent<TEventName extends string>(
  config: Omit<UseContractEventConfig<typeof oracleSwapABI, TEventName>, "abi"> = {} as any,
) {
  return useContractEvent({ abi: oracleSwapABI, ...config } as UseContractEventConfig<
    typeof oracleSwapABI,
    TEventName
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link oracleSwapABI}__ and `eventName` set to `"OwnershipTransferred"`.
 */
export function useOracleSwapOwnershipTransferredEvent(
  config: Omit<UseContractEventConfig<typeof oracleSwapABI, "OwnershipTransferred">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({
    abi: oracleSwapABI,
    eventName: "OwnershipTransferred",
    ...config,
  } as UseContractEventConfig<typeof oracleSwapABI, "OwnershipTransferred">);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link outOfBoundsProtocolFeeControllerTestABI}__.
 */
export function useOutOfBoundsProtocolFeeControllerTestRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof outOfBoundsProtocolFeeControllerTestABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof outOfBoundsProtocolFeeControllerTestABI, TFunctionName, TSelectData>,
    "abi"
  > = {} as any,
) {
  return useContractRead({ abi: outOfBoundsProtocolFeeControllerTestABI, ...config } as UseContractReadConfig<
    typeof outOfBoundsProtocolFeeControllerTestABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link outOfBoundsProtocolFeeControllerTestABI}__ and `functionName` set to `"protocolFeeForPool"`.
 */
export function useOutOfBoundsProtocolFeeControllerTestProtocolFeeForPool<
  TFunctionName extends "protocolFeeForPool",
  TSelectData = ReadContractResult<typeof outOfBoundsProtocolFeeControllerTestABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof outOfBoundsProtocolFeeControllerTestABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: outOfBoundsProtocolFeeControllerTestABI,
    functionName: "protocolFeeForPool",
    ...config,
  } as UseContractReadConfig<typeof outOfBoundsProtocolFeeControllerTestABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link overflowProtocolFeeControllerTestABI}__.
 */
export function useOverflowProtocolFeeControllerTestRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof overflowProtocolFeeControllerTestABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof overflowProtocolFeeControllerTestABI, TFunctionName, TSelectData>,
    "abi"
  > = {} as any,
) {
  return useContractRead({ abi: overflowProtocolFeeControllerTestABI, ...config } as UseContractReadConfig<
    typeof overflowProtocolFeeControllerTestABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link overflowProtocolFeeControllerTestABI}__ and `functionName` set to `"protocolFeeForPool"`.
 */
export function useOverflowProtocolFeeControllerTestProtocolFeeForPool<
  TFunctionName extends "protocolFeeForPool",
  TSelectData = ReadContractResult<typeof overflowProtocolFeeControllerTestABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof overflowProtocolFeeControllerTestABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: overflowProtocolFeeControllerTestABI,
    functionName: "protocolFeeForPool",
    ...config,
  } as UseContractReadConfig<typeof overflowProtocolFeeControllerTestABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ownableABI}__.
 */
export function useOwnableRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ownableABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof ownableABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: ownableABI, ...config } as UseContractReadConfig<
    typeof ownableABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ownableABI}__ and `functionName` set to `"owner"`.
 */
export function useOwnableOwner<
  TFunctionName extends "owner",
  TSelectData = ReadContractResult<typeof ownableABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ownableABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: ownableABI, functionName: "owner", ...config } as UseContractReadConfig<
    typeof ownableABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ownableABI}__.
 */
export function useOwnableWrite<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ownableABI, string>["request"]["abi"],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof ownableABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof ownableABI, TFunctionName, TMode>({ abi: ownableABI, ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ownableABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function useOwnableRenounceOwnership<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ownableABI, "renounceOwnership">["request"]["abi"],
        "renounceOwnership",
        TMode
      > & { functionName?: "renounceOwnership" }
    : UseContractWriteConfig<typeof ownableABI, "renounceOwnership", TMode> & {
        abi?: never;
        functionName?: "renounceOwnership";
      } = {} as any,
) {
  return useContractWrite<typeof ownableABI, "renounceOwnership", TMode>({
    abi: ownableABI,
    functionName: "renounceOwnership",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ownableABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function useOwnableTransferOwnership<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ownableABI, "transferOwnership">["request"]["abi"],
        "transferOwnership",
        TMode
      > & { functionName?: "transferOwnership" }
    : UseContractWriteConfig<typeof ownableABI, "transferOwnership", TMode> & {
        abi?: never;
        functionName?: "transferOwnership";
      } = {} as any,
) {
  return useContractWrite<typeof ownableABI, "transferOwnership", TMode>({
    abi: ownableABI,
    functionName: "transferOwnership",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ownableABI}__.
 */
export function usePrepareOwnableWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof ownableABI, TFunctionName>, "abi"> = {} as any,
) {
  return usePrepareContractWrite({ abi: ownableABI, ...config } as UsePrepareContractWriteConfig<
    typeof ownableABI,
    TFunctionName
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ownableABI}__ and `functionName` set to `"renounceOwnership"`.
 */
export function usePrepareOwnableRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ownableABI, "renounceOwnership">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ownableABI,
    functionName: "renounceOwnership",
    ...config,
  } as UsePrepareContractWriteConfig<typeof ownableABI, "renounceOwnership">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ownableABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePrepareOwnableTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ownableABI, "transferOwnership">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ownableABI,
    functionName: "transferOwnership",
    ...config,
  } as UsePrepareContractWriteConfig<typeof ownableABI, "transferOwnership">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ownableABI}__.
 */
export function useOwnableEvent<TEventName extends string>(
  config: Omit<UseContractEventConfig<typeof ownableABI, TEventName>, "abi"> = {} as any,
) {
  return useContractEvent({ abi: ownableABI, ...config } as UseContractEventConfig<typeof ownableABI, TEventName>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ownableABI}__ and `eventName` set to `"OwnershipTransferred"`.
 */
export function useOwnableOwnershipTransferredEvent(
  config: Omit<UseContractEventConfig<typeof ownableABI, "OwnershipTransferred">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: ownableABI, eventName: "OwnershipTransferred", ...config } as UseContractEventConfig<
    typeof ownableABI,
    "OwnershipTransferred"
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ownedABI}__.
 */
export function useOwnedRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ownedABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof ownedABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: ownedABI, ...config } as UseContractReadConfig<
    typeof ownedABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ownedABI}__ and `functionName` set to `"owner"`.
 */
export function useOwnedOwner<
  TFunctionName extends "owner",
  TSelectData = ReadContractResult<typeof ownedABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof ownedABI, TFunctionName, TSelectData>, "abi" | "functionName"> = {} as any,
) {
  return useContractRead({ abi: ownedABI, functionName: "owner", ...config } as UseContractReadConfig<
    typeof ownedABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ownedABI}__.
 */
export function useOwnedWrite<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ownedABI, string>["request"]["abi"],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof ownedABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof ownedABI, TFunctionName, TMode>({ abi: ownedABI, ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ownedABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function useOwnedTransferOwnership<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ownedABI, "transferOwnership">["request"]["abi"],
        "transferOwnership",
        TMode
      > & { functionName?: "transferOwnership" }
    : UseContractWriteConfig<typeof ownedABI, "transferOwnership", TMode> & {
        abi?: never;
        functionName?: "transferOwnership";
      } = {} as any,
) {
  return useContractWrite<typeof ownedABI, "transferOwnership", TMode>({
    abi: ownedABI,
    functionName: "transferOwnership",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ownedABI}__.
 */
export function usePrepareOwnedWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof ownedABI, TFunctionName>, "abi"> = {} as any,
) {
  return usePrepareContractWrite({ abi: ownedABI, ...config } as UsePrepareContractWriteConfig<
    typeof ownedABI,
    TFunctionName
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ownedABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePrepareOwnedTransferOwnership(
  config: Omit<UsePrepareContractWriteConfig<typeof ownedABI, "transferOwnership">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: ownedABI,
    functionName: "transferOwnership",
    ...config,
  } as UsePrepareContractWriteConfig<typeof ownedABI, "transferOwnership">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ownedABI}__.
 */
export function useOwnedEvent<TEventName extends string>(
  config: Omit<UseContractEventConfig<typeof ownedABI, TEventName>, "abi"> = {} as any,
) {
  return useContractEvent({ abi: ownedABI, ...config } as UseContractEventConfig<typeof ownedABI, TEventName>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ownedABI}__ and `eventName` set to `"OwnershipTransferred"`.
 */
export function useOwnedOwnershipTransferredEvent(
  config: Omit<UseContractEventConfig<typeof ownedABI, "OwnershipTransferred">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: ownedABI, eventName: "OwnershipTransferred", ...config } as UseContractEventConfig<
    typeof ownedABI,
    "OwnershipTransferred"
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolClaimsTestABI}__.
 */
export function usePoolClaimsTestRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof poolClaimsTestABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof poolClaimsTestABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: poolClaimsTestABI, ...config } as UseContractReadConfig<
    typeof poolClaimsTestABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolClaimsTestABI}__ and `functionName` set to `"manager"`.
 */
export function usePoolClaimsTestManager<
  TFunctionName extends "manager",
  TSelectData = ReadContractResult<typeof poolClaimsTestABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolClaimsTestABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: poolClaimsTestABI, functionName: "manager", ...config } as UseContractReadConfig<
    typeof poolClaimsTestABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolClaimsTestABI}__.
 */
export function usePoolClaimsTestWrite<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolClaimsTestABI, string>["request"]["abi"],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof poolClaimsTestABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof poolClaimsTestABI, TFunctionName, TMode>({ abi: poolClaimsTestABI, ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolClaimsTestABI}__ and `functionName` set to `"deposit"`.
 */
export function usePoolClaimsTestDeposit<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolClaimsTestABI, "deposit">["request"]["abi"],
        "deposit",
        TMode
      > & { functionName?: "deposit" }
    : UseContractWriteConfig<typeof poolClaimsTestABI, "deposit", TMode> & {
        abi?: never;
        functionName?: "deposit";
      } = {} as any,
) {
  return useContractWrite<typeof poolClaimsTestABI, "deposit", TMode>({
    abi: poolClaimsTestABI,
    functionName: "deposit",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolClaimsTestABI}__ and `functionName` set to `"unlockCallback"`.
 */
export function usePoolClaimsTestUnlockCallback<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolClaimsTestABI, "unlockCallback">["request"]["abi"],
        "unlockCallback",
        TMode
      > & { functionName?: "unlockCallback" }
    : UseContractWriteConfig<typeof poolClaimsTestABI, "unlockCallback", TMode> & {
        abi?: never;
        functionName?: "unlockCallback";
      } = {} as any,
) {
  return useContractWrite<typeof poolClaimsTestABI, "unlockCallback", TMode>({
    abi: poolClaimsTestABI,
    functionName: "unlockCallback",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolClaimsTestABI}__ and `functionName` set to `"withdraw"`.
 */
export function usePoolClaimsTestWithdraw<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolClaimsTestABI, "withdraw">["request"]["abi"],
        "withdraw",
        TMode
      > & { functionName?: "withdraw" }
    : UseContractWriteConfig<typeof poolClaimsTestABI, "withdraw", TMode> & {
        abi?: never;
        functionName?: "withdraw";
      } = {} as any,
) {
  return useContractWrite<typeof poolClaimsTestABI, "withdraw", TMode>({
    abi: poolClaimsTestABI,
    functionName: "withdraw",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolClaimsTestABI}__.
 */
export function usePreparePoolClaimsTestWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof poolClaimsTestABI, TFunctionName>, "abi"> = {} as any,
) {
  return usePrepareContractWrite({ abi: poolClaimsTestABI, ...config } as UsePrepareContractWriteConfig<
    typeof poolClaimsTestABI,
    TFunctionName
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolClaimsTestABI}__ and `functionName` set to `"deposit"`.
 */
export function usePreparePoolClaimsTestDeposit(
  config: Omit<UsePrepareContractWriteConfig<typeof poolClaimsTestABI, "deposit">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: poolClaimsTestABI,
    functionName: "deposit",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolClaimsTestABI, "deposit">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolClaimsTestABI}__ and `functionName` set to `"unlockCallback"`.
 */
export function usePreparePoolClaimsTestUnlockCallback(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolClaimsTestABI, "unlockCallback">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: poolClaimsTestABI,
    functionName: "unlockCallback",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolClaimsTestABI, "unlockCallback">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolClaimsTestABI}__ and `functionName` set to `"withdraw"`.
 */
export function usePreparePoolClaimsTestWithdraw(
  config: Omit<UsePrepareContractWriteConfig<typeof poolClaimsTestABI, "withdraw">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: poolClaimsTestABI,
    functionName: "withdraw",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolClaimsTestABI, "withdraw">);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolDonateTestABI}__.
 *
 *
 */
export function usePoolDonateTestRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof poolDonateTestABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof poolDonateTestABI, TFunctionName, TSelectData>, "abi" | "address"> & {
    chainId?: keyof typeof poolDonateTestAddress;
  } = {} as any,
) {
  return useContractRead({
    abi: poolDonateTestABI,
    address: poolDonateTestAddress[31337],
    ...config,
  } as UseContractReadConfig<typeof poolDonateTestABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolDonateTestABI}__ and `functionName` set to `"manager"`.
 *
 *
 */
export function usePoolDonateTestManager<
  TFunctionName extends "manager",
  TSelectData = ReadContractResult<typeof poolDonateTestABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolDonateTestABI, TFunctionName, TSelectData>,
    "abi" | "address" | "functionName"
  > & { chainId?: keyof typeof poolDonateTestAddress } = {} as any,
) {
  return useContractRead({
    abi: poolDonateTestABI,
    address: poolDonateTestAddress[31337],
    functionName: "manager",
    ...config,
  } as UseContractReadConfig<typeof poolDonateTestABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolDonateTestABI}__.
 *
 *
 */
export function usePoolDonateTestWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof poolDonateTestAddress,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolDonateTestABI, string>["request"]["abi"],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof poolDonateTestABI, TFunctionName, TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
      } = {} as any,
) {
  return useContractWrite<typeof poolDonateTestABI, TFunctionName, TMode>({
    abi: poolDonateTestABI,
    address: poolDonateTestAddress[31337],
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolDonateTestABI}__ and `functionName` set to `"donate"`.
 *
 *
 */
export function usePoolDonateTestDonate<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof poolDonateTestAddress,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolDonateTestABI, "donate">["request"]["abi"],
        "donate",
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: "donate" }
    : UseContractWriteConfig<typeof poolDonateTestABI, "donate", TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: "donate";
      } = {} as any,
) {
  return useContractWrite<typeof poolDonateTestABI, "donate", TMode>({
    abi: poolDonateTestABI,
    address: poolDonateTestAddress[31337],
    functionName: "donate",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolDonateTestABI}__ and `functionName` set to `"unlockCallback"`.
 *
 *
 */
export function usePoolDonateTestUnlockCallback<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof poolDonateTestAddress,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolDonateTestABI, "unlockCallback">["request"]["abi"],
        "unlockCallback",
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: "unlockCallback" }
    : UseContractWriteConfig<typeof poolDonateTestABI, "unlockCallback", TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: "unlockCallback";
      } = {} as any,
) {
  return useContractWrite<typeof poolDonateTestABI, "unlockCallback", TMode>({
    abi: poolDonateTestABI,
    address: poolDonateTestAddress[31337],
    functionName: "unlockCallback",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolDonateTestABI}__.
 *
 *
 */
export function usePreparePoolDonateTestWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof poolDonateTestABI, TFunctionName>, "abi" | "address"> & {
    chainId?: keyof typeof poolDonateTestAddress;
  } = {} as any,
) {
  return usePrepareContractWrite({
    abi: poolDonateTestABI,
    address: poolDonateTestAddress[31337],
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolDonateTestABI, TFunctionName>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolDonateTestABI}__ and `functionName` set to `"donate"`.
 *
 *
 */
export function usePreparePoolDonateTestDonate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolDonateTestABI, "donate">,
    "abi" | "address" | "functionName"
  > & { chainId?: keyof typeof poolDonateTestAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: poolDonateTestABI,
    address: poolDonateTestAddress[31337],
    functionName: "donate",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolDonateTestABI, "donate">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolDonateTestABI}__ and `functionName` set to `"unlockCallback"`.
 *
 *
 */
export function usePreparePoolDonateTestUnlockCallback(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolDonateTestABI, "unlockCallback">,
    "abi" | "address" | "functionName"
  > & { chainId?: keyof typeof poolDonateTestAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: poolDonateTestABI,
    address: poolDonateTestAddress[31337],
    functionName: "unlockCallback",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolDonateTestABI, "unlockCallback">);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolManagerABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof poolManagerABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>, "abi" | "address"> & {
    chainId?: keyof typeof poolManagerAddress;
  } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    ...config,
  } as UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"allowance"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerAllowance<
  TFunctionName extends "allowance",
  TSelectData = ReadContractResult<typeof poolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>,
    "abi" | "address" | "functionName"
  > & { chainId?: keyof typeof poolManagerAddress } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "allowance",
    ...config,
  } as UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"balanceOf"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerBalanceOf<
  TFunctionName extends "balanceOf",
  TSelectData = ReadContractResult<typeof poolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>,
    "abi" | "address" | "functionName"
  > & { chainId?: keyof typeof poolManagerAddress } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "balanceOf",
    ...config,
  } as UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"extsload"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerExtsload<
  TFunctionName extends "extsload",
  TSelectData = ReadContractResult<typeof poolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>,
    "abi" | "address" | "functionName"
  > & { chainId?: keyof typeof poolManagerAddress } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "extsload",
    ...config,
  } as UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"exttload"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerExttload<
  TFunctionName extends "exttload",
  TSelectData = ReadContractResult<typeof poolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>,
    "abi" | "address" | "functionName"
  > & { chainId?: keyof typeof poolManagerAddress } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "exttload",
    ...config,
  } as UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"isOperator"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerIsOperator<
  TFunctionName extends "isOperator",
  TSelectData = ReadContractResult<typeof poolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>,
    "abi" | "address" | "functionName"
  > & { chainId?: keyof typeof poolManagerAddress } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "isOperator",
    ...config,
  } as UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"owner"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerOwner<
  TFunctionName extends "owner",
  TSelectData = ReadContractResult<typeof poolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>,
    "abi" | "address" | "functionName"
  > & { chainId?: keyof typeof poolManagerAddress } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "owner",
    ...config,
  } as UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"protocolFeeController"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerProtocolFeeController<
  TFunctionName extends "protocolFeeController",
  TSelectData = ReadContractResult<typeof poolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>,
    "abi" | "address" | "functionName"
  > & { chainId?: keyof typeof poolManagerAddress } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "protocolFeeController",
    ...config,
  } as UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"protocolFeesAccrued"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerProtocolFeesAccrued<
  TFunctionName extends "protocolFeesAccrued",
  TSelectData = ReadContractResult<typeof poolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>,
    "abi" | "address" | "functionName"
  > & { chainId?: keyof typeof poolManagerAddress } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "protocolFeesAccrued",
    ...config,
  } as UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"supportsInterface"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerSupportsInterface<
  TFunctionName extends "supportsInterface",
  TSelectData = ReadContractResult<typeof poolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>,
    "abi" | "address" | "functionName"
  > & { chainId?: keyof typeof poolManagerAddress } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "supportsInterface",
    ...config,
  } as UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof poolManagerAddress,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolManagerABI, string>["request"]["abi"],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof poolManagerABI, TFunctionName, TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
      } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof poolManagerABI, TFunctionName, TMode>({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"approve"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerApprove<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof poolManagerAddress,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolManagerABI, "approve">["request"]["abi"],
        "approve",
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: "approve" }
    : UseContractWriteConfig<typeof poolManagerABI, "approve", TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: "approve";
      } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof poolManagerABI, "approve", TMode>({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "approve",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"burn"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerBurn<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof poolManagerAddress,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolManagerABI, "burn">["request"]["abi"],
        "burn",
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: "burn" }
    : UseContractWriteConfig<typeof poolManagerABI, "burn", TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: "burn";
      } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof poolManagerABI, "burn", TMode>({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "burn",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"clear"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerClear<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof poolManagerAddress,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolManagerABI, "clear">["request"]["abi"],
        "clear",
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: "clear" }
    : UseContractWriteConfig<typeof poolManagerABI, "clear", TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: "clear";
      } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof poolManagerABI, "clear", TMode>({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "clear",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"collectProtocolFees"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerCollectProtocolFees<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof poolManagerAddress,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolManagerABI, "collectProtocolFees">["request"]["abi"],
        "collectProtocolFees",
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: "collectProtocolFees" }
    : UseContractWriteConfig<typeof poolManagerABI, "collectProtocolFees", TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: "collectProtocolFees";
      } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof poolManagerABI, "collectProtocolFees", TMode>({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "collectProtocolFees",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"donate"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerDonate<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof poolManagerAddress,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolManagerABI, "donate">["request"]["abi"],
        "donate",
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: "donate" }
    : UseContractWriteConfig<typeof poolManagerABI, "donate", TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: "donate";
      } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof poolManagerABI, "donate", TMode>({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "donate",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"initialize"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerInitialize<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof poolManagerAddress,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolManagerABI, "initialize">["request"]["abi"],
        "initialize",
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: "initialize" }
    : UseContractWriteConfig<typeof poolManagerABI, "initialize", TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: "initialize";
      } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof poolManagerABI, "initialize", TMode>({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "initialize",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"mint"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerMint<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof poolManagerAddress,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolManagerABI, "mint">["request"]["abi"],
        "mint",
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: "mint" }
    : UseContractWriteConfig<typeof poolManagerABI, "mint", TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: "mint";
      } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof poolManagerABI, "mint", TMode>({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "mint",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"modifyLiquidity"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerModifyLiquidity<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof poolManagerAddress,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolManagerABI, "modifyLiquidity">["request"]["abi"],
        "modifyLiquidity",
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: "modifyLiquidity" }
    : UseContractWriteConfig<typeof poolManagerABI, "modifyLiquidity", TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: "modifyLiquidity";
      } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof poolManagerABI, "modifyLiquidity", TMode>({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "modifyLiquidity",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"setOperator"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerSetOperator<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof poolManagerAddress,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolManagerABI, "setOperator">["request"]["abi"],
        "setOperator",
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: "setOperator" }
    : UseContractWriteConfig<typeof poolManagerABI, "setOperator", TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: "setOperator";
      } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof poolManagerABI, "setOperator", TMode>({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "setOperator",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"setProtocolFee"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerSetProtocolFee<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof poolManagerAddress,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolManagerABI, "setProtocolFee">["request"]["abi"],
        "setProtocolFee",
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: "setProtocolFee" }
    : UseContractWriteConfig<typeof poolManagerABI, "setProtocolFee", TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: "setProtocolFee";
      } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof poolManagerABI, "setProtocolFee", TMode>({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "setProtocolFee",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"setProtocolFeeController"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerSetProtocolFeeController<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof poolManagerAddress,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolManagerABI, "setProtocolFeeController">["request"]["abi"],
        "setProtocolFeeController",
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: "setProtocolFeeController" }
    : UseContractWriteConfig<typeof poolManagerABI, "setProtocolFeeController", TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: "setProtocolFeeController";
      } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof poolManagerABI, "setProtocolFeeController", TMode>({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "setProtocolFeeController",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"settle"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerSettle<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof poolManagerAddress,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolManagerABI, "settle">["request"]["abi"],
        "settle",
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: "settle" }
    : UseContractWriteConfig<typeof poolManagerABI, "settle", TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: "settle";
      } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof poolManagerABI, "settle", TMode>({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "settle",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"settleFor"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerSettleFor<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof poolManagerAddress,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolManagerABI, "settleFor">["request"]["abi"],
        "settleFor",
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: "settleFor" }
    : UseContractWriteConfig<typeof poolManagerABI, "settleFor", TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: "settleFor";
      } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof poolManagerABI, "settleFor", TMode>({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "settleFor",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"swap"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerSwap<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof poolManagerAddress,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolManagerABI, "swap">["request"]["abi"],
        "swap",
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: "swap" }
    : UseContractWriteConfig<typeof poolManagerABI, "swap", TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: "swap";
      } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof poolManagerABI, "swap", TMode>({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "swap",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"sync"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerSync<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof poolManagerAddress,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolManagerABI, "sync">["request"]["abi"],
        "sync",
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: "sync" }
    : UseContractWriteConfig<typeof poolManagerABI, "sync", TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: "sync";
      } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof poolManagerABI, "sync", TMode>({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "sync",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"take"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerTake<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof poolManagerAddress,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolManagerABI, "take">["request"]["abi"],
        "take",
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: "take" }
    : UseContractWriteConfig<typeof poolManagerABI, "take", TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: "take";
      } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof poolManagerABI, "take", TMode>({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "take",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"transfer"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerTransfer<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof poolManagerAddress,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolManagerABI, "transfer">["request"]["abi"],
        "transfer",
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: "transfer" }
    : UseContractWriteConfig<typeof poolManagerABI, "transfer", TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: "transfer";
      } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof poolManagerABI, "transfer", TMode>({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "transfer",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"transferFrom"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerTransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof poolManagerAddress,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolManagerABI, "transferFrom">["request"]["abi"],
        "transferFrom",
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: "transferFrom" }
    : UseContractWriteConfig<typeof poolManagerABI, "transferFrom", TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: "transferFrom";
      } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof poolManagerABI, "transferFrom", TMode>({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "transferFrom",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerTransferOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof poolManagerAddress,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolManagerABI, "transferOwnership">["request"]["abi"],
        "transferOwnership",
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: "transferOwnership" }
    : UseContractWriteConfig<typeof poolManagerABI, "transferOwnership", TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: "transferOwnership";
      } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof poolManagerABI, "transferOwnership", TMode>({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "transferOwnership",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"unlock"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerUnlock<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof poolManagerAddress,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolManagerABI, "unlock">["request"]["abi"],
        "unlock",
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: "unlock" }
    : UseContractWriteConfig<typeof poolManagerABI, "unlock", TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: "unlock";
      } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof poolManagerABI, "unlock", TMode>({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "unlock",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"updateDynamicLPFee"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerUpdateDynamicLpFee<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof poolManagerAddress,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolManagerABI, "updateDynamicLPFee">["request"]["abi"],
        "updateDynamicLPFee",
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: "updateDynamicLPFee" }
    : UseContractWriteConfig<typeof poolManagerABI, "updateDynamicLPFee", TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: "updateDynamicLPFee";
      } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof poolManagerABI, "updateDynamicLPFee", TMode>({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "updateDynamicLPFee",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePreparePoolManagerWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof poolManagerABI, TFunctionName>, "abi" | "address"> & {
    chainId?: keyof typeof poolManagerAddress;
  } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolManagerABI, TFunctionName>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"approve"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePreparePoolManagerApprove(
  config: Omit<UsePrepareContractWriteConfig<typeof poolManagerABI, "approve">, "abi" | "address" | "functionName"> & {
    chainId?: keyof typeof poolManagerAddress;
  } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "approve",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolManagerABI, "approve">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"burn"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePreparePoolManagerBurn(
  config: Omit<UsePrepareContractWriteConfig<typeof poolManagerABI, "burn">, "abi" | "address" | "functionName"> & {
    chainId?: keyof typeof poolManagerAddress;
  } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "burn",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolManagerABI, "burn">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"clear"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePreparePoolManagerClear(
  config: Omit<UsePrepareContractWriteConfig<typeof poolManagerABI, "clear">, "abi" | "address" | "functionName"> & {
    chainId?: keyof typeof poolManagerAddress;
  } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "clear",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolManagerABI, "clear">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"collectProtocolFees"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePreparePoolManagerCollectProtocolFees(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolManagerABI, "collectProtocolFees">,
    "abi" | "address" | "functionName"
  > & { chainId?: keyof typeof poolManagerAddress } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "collectProtocolFees",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolManagerABI, "collectProtocolFees">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"donate"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePreparePoolManagerDonate(
  config: Omit<UsePrepareContractWriteConfig<typeof poolManagerABI, "donate">, "abi" | "address" | "functionName"> & {
    chainId?: keyof typeof poolManagerAddress;
  } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "donate",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolManagerABI, "donate">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"initialize"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePreparePoolManagerInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolManagerABI, "initialize">,
    "abi" | "address" | "functionName"
  > & { chainId?: keyof typeof poolManagerAddress } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "initialize",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolManagerABI, "initialize">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"mint"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePreparePoolManagerMint(
  config: Omit<UsePrepareContractWriteConfig<typeof poolManagerABI, "mint">, "abi" | "address" | "functionName"> & {
    chainId?: keyof typeof poolManagerAddress;
  } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "mint",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolManagerABI, "mint">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"modifyLiquidity"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePreparePoolManagerModifyLiquidity(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolManagerABI, "modifyLiquidity">,
    "abi" | "address" | "functionName"
  > & { chainId?: keyof typeof poolManagerAddress } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "modifyLiquidity",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolManagerABI, "modifyLiquidity">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"setOperator"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePreparePoolManagerSetOperator(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolManagerABI, "setOperator">,
    "abi" | "address" | "functionName"
  > & { chainId?: keyof typeof poolManagerAddress } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "setOperator",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolManagerABI, "setOperator">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"setProtocolFee"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePreparePoolManagerSetProtocolFee(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolManagerABI, "setProtocolFee">,
    "abi" | "address" | "functionName"
  > & { chainId?: keyof typeof poolManagerAddress } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "setProtocolFee",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolManagerABI, "setProtocolFee">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"setProtocolFeeController"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePreparePoolManagerSetProtocolFeeController(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolManagerABI, "setProtocolFeeController">,
    "abi" | "address" | "functionName"
  > & { chainId?: keyof typeof poolManagerAddress } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "setProtocolFeeController",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolManagerABI, "setProtocolFeeController">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"settle"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePreparePoolManagerSettle(
  config: Omit<UsePrepareContractWriteConfig<typeof poolManagerABI, "settle">, "abi" | "address" | "functionName"> & {
    chainId?: keyof typeof poolManagerAddress;
  } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "settle",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolManagerABI, "settle">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"settleFor"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePreparePoolManagerSettleFor(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolManagerABI, "settleFor">,
    "abi" | "address" | "functionName"
  > & { chainId?: keyof typeof poolManagerAddress } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "settleFor",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolManagerABI, "settleFor">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"swap"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePreparePoolManagerSwap(
  config: Omit<UsePrepareContractWriteConfig<typeof poolManagerABI, "swap">, "abi" | "address" | "functionName"> & {
    chainId?: keyof typeof poolManagerAddress;
  } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "swap",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolManagerABI, "swap">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"sync"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePreparePoolManagerSync(
  config: Omit<UsePrepareContractWriteConfig<typeof poolManagerABI, "sync">, "abi" | "address" | "functionName"> & {
    chainId?: keyof typeof poolManagerAddress;
  } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "sync",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolManagerABI, "sync">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"take"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePreparePoolManagerTake(
  config: Omit<UsePrepareContractWriteConfig<typeof poolManagerABI, "take">, "abi" | "address" | "functionName"> & {
    chainId?: keyof typeof poolManagerAddress;
  } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "take",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolManagerABI, "take">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"transfer"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePreparePoolManagerTransfer(
  config: Omit<UsePrepareContractWriteConfig<typeof poolManagerABI, "transfer">, "abi" | "address" | "functionName"> & {
    chainId?: keyof typeof poolManagerAddress;
  } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "transfer",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolManagerABI, "transfer">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"transferFrom"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePreparePoolManagerTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolManagerABI, "transferFrom">,
    "abi" | "address" | "functionName"
  > & { chainId?: keyof typeof poolManagerAddress } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "transferFrom",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolManagerABI, "transferFrom">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePreparePoolManagerTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolManagerABI, "transferOwnership">,
    "abi" | "address" | "functionName"
  > & { chainId?: keyof typeof poolManagerAddress } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "transferOwnership",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolManagerABI, "transferOwnership">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"unlock"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePreparePoolManagerUnlock(
  config: Omit<UsePrepareContractWriteConfig<typeof poolManagerABI, "unlock">, "abi" | "address" | "functionName"> & {
    chainId?: keyof typeof poolManagerAddress;
  } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "unlock",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolManagerABI, "unlock">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"updateDynamicLPFee"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePreparePoolManagerUpdateDynamicLpFee(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolManagerABI, "updateDynamicLPFee">,
    "abi" | "address" | "functionName"
  > & { chainId?: keyof typeof poolManagerAddress } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    functionName: "updateDynamicLPFee",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolManagerABI, "updateDynamicLPFee">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolManagerABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerEvent<TEventName extends string>(
  config: Omit<UseContractEventConfig<typeof poolManagerABI, TEventName>, "abi" | "address"> & {
    chainId?: keyof typeof poolManagerAddress;
  } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractEvent({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    ...config,
  } as UseContractEventConfig<typeof poolManagerABI, TEventName>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolManagerABI}__ and `eventName` set to `"Approval"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerApprovalEvent(
  config: Omit<UseContractEventConfig<typeof poolManagerABI, "Approval">, "abi" | "address" | "eventName"> & {
    chainId?: keyof typeof poolManagerAddress;
  } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractEvent({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    eventName: "Approval",
    ...config,
  } as UseContractEventConfig<typeof poolManagerABI, "Approval">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolManagerABI}__ and `eventName` set to `"Initialize"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerInitializeEvent(
  config: Omit<UseContractEventConfig<typeof poolManagerABI, "Initialize">, "abi" | "address" | "eventName"> & {
    chainId?: keyof typeof poolManagerAddress;
  } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractEvent({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    eventName: "Initialize",
    ...config,
  } as UseContractEventConfig<typeof poolManagerABI, "Initialize">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolManagerABI}__ and `eventName` set to `"ModifyLiquidity"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerModifyLiquidityEvent(
  config: Omit<UseContractEventConfig<typeof poolManagerABI, "ModifyLiquidity">, "abi" | "address" | "eventName"> & {
    chainId?: keyof typeof poolManagerAddress;
  } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractEvent({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    eventName: "ModifyLiquidity",
    ...config,
  } as UseContractEventConfig<typeof poolManagerABI, "ModifyLiquidity">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolManagerABI}__ and `eventName` set to `"OperatorSet"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerOperatorSetEvent(
  config: Omit<UseContractEventConfig<typeof poolManagerABI, "OperatorSet">, "abi" | "address" | "eventName"> & {
    chainId?: keyof typeof poolManagerAddress;
  } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractEvent({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    eventName: "OperatorSet",
    ...config,
  } as UseContractEventConfig<typeof poolManagerABI, "OperatorSet">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolManagerABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof poolManagerABI, "OwnershipTransferred">,
    "abi" | "address" | "eventName"
  > & { chainId?: keyof typeof poolManagerAddress } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractEvent({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    eventName: "OwnershipTransferred",
    ...config,
  } as UseContractEventConfig<typeof poolManagerABI, "OwnershipTransferred">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolManagerABI}__ and `eventName` set to `"ProtocolFeeControllerUpdated"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerProtocolFeeControllerUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof poolManagerABI, "ProtocolFeeControllerUpdated">,
    "abi" | "address" | "eventName"
  > & { chainId?: keyof typeof poolManagerAddress } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractEvent({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    eventName: "ProtocolFeeControllerUpdated",
    ...config,
  } as UseContractEventConfig<typeof poolManagerABI, "ProtocolFeeControllerUpdated">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolManagerABI}__ and `eventName` set to `"ProtocolFeeUpdated"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerProtocolFeeUpdatedEvent(
  config: Omit<UseContractEventConfig<typeof poolManagerABI, "ProtocolFeeUpdated">, "abi" | "address" | "eventName"> & {
    chainId?: keyof typeof poolManagerAddress;
  } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractEvent({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    eventName: "ProtocolFeeUpdated",
    ...config,
  } as UseContractEventConfig<typeof poolManagerABI, "ProtocolFeeUpdated">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolManagerABI}__ and `eventName` set to `"Swap"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerSwapEvent(
  config: Omit<UseContractEventConfig<typeof poolManagerABI, "Swap">, "abi" | "address" | "eventName"> & {
    chainId?: keyof typeof poolManagerAddress;
  } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractEvent({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    eventName: "Swap",
    ...config,
  } as UseContractEventConfig<typeof poolManagerABI, "Swap">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolManagerABI}__ and `eventName` set to `"Transfer"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x0Bf5c45Bc0419229FB512bb00366A612877ffF2D)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xC94a4C0a89937E278a0d427bb393134E68d5ec09)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xb673AE03413860776497B8C9b3E3F8d4D8745cB3)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x7B2B5A2c377B34079589DDbCeA20427cdb7C8219)
 */
export function usePoolManagerTransferEvent(
  config: Omit<UseContractEventConfig<typeof poolManagerABI, "Transfer">, "abi" | "address" | "eventName"> & {
    chainId?: keyof typeof poolManagerAddress;
  } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractEvent({
    abi: poolManagerABI,
    address: poolManagerAddress[chainId as keyof typeof poolManagerAddress],
    eventName: "Transfer",
    ...config,
  } as UseContractEventConfig<typeof poolManagerABI, "Transfer">);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolModifyLiquidityTestABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x83feDBeD11B3667f40263a88e8435fca51A03F8C)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x30654C69B212AD057E817EcA26da6c5edA32E2E7)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x30654C69B212AD057E817EcA26da6c5edA32E2E7)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xB7b74B407E9bA6c070C5B5CC7E6B8E59e4642763)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xaFB341c8a50e4Bdec4E419Be7F3a6127E3BD6710)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xeb1aAdAC0a10Ac2eDFCbE496C3BCBc1dea4F994b)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x30654C69B212AD057E817EcA26da6c5edA32E2E7)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 */
export function usePoolModifyLiquidityTestRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof poolModifyLiquidityTestABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolModifyLiquidityTestABI, TFunctionName, TSelectData>,
    "abi" | "address"
  > & { chainId?: keyof typeof poolModifyLiquidityTestAddress } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: poolModifyLiquidityTestABI,
    address: poolModifyLiquidityTestAddress[chainId as keyof typeof poolModifyLiquidityTestAddress],
    ...config,
  } as UseContractReadConfig<typeof poolModifyLiquidityTestABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolModifyLiquidityTestABI}__ and `functionName` set to `"manager"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x83feDBeD11B3667f40263a88e8435fca51A03F8C)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x30654C69B212AD057E817EcA26da6c5edA32E2E7)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x30654C69B212AD057E817EcA26da6c5edA32E2E7)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xB7b74B407E9bA6c070C5B5CC7E6B8E59e4642763)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xaFB341c8a50e4Bdec4E419Be7F3a6127E3BD6710)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xeb1aAdAC0a10Ac2eDFCbE496C3BCBc1dea4F994b)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x30654C69B212AD057E817EcA26da6c5edA32E2E7)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 */
export function usePoolModifyLiquidityTestManager<
  TFunctionName extends "manager",
  TSelectData = ReadContractResult<typeof poolModifyLiquidityTestABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolModifyLiquidityTestABI, TFunctionName, TSelectData>,
    "abi" | "address" | "functionName"
  > & { chainId?: keyof typeof poolModifyLiquidityTestAddress } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: poolModifyLiquidityTestABI,
    address: poolModifyLiquidityTestAddress[chainId as keyof typeof poolModifyLiquidityTestAddress],
    functionName: "manager",
    ...config,
  } as UseContractReadConfig<typeof poolModifyLiquidityTestABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolModifyLiquidityTestABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x83feDBeD11B3667f40263a88e8435fca51A03F8C)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x30654C69B212AD057E817EcA26da6c5edA32E2E7)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x30654C69B212AD057E817EcA26da6c5edA32E2E7)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xB7b74B407E9bA6c070C5B5CC7E6B8E59e4642763)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xaFB341c8a50e4Bdec4E419Be7F3a6127E3BD6710)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xeb1aAdAC0a10Ac2eDFCbE496C3BCBc1dea4F994b)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x30654C69B212AD057E817EcA26da6c5edA32E2E7)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 */
export function usePoolModifyLiquidityTestWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof poolModifyLiquidityTestAddress,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolModifyLiquidityTestABI, string>["request"]["abi"],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof poolModifyLiquidityTestABI, TFunctionName, TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
      } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof poolModifyLiquidityTestABI, TFunctionName, TMode>({
    abi: poolModifyLiquidityTestABI,
    address: poolModifyLiquidityTestAddress[chainId as keyof typeof poolModifyLiquidityTestAddress],
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolModifyLiquidityTestABI}__ and `functionName` set to `"modifyLiquidity"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x83feDBeD11B3667f40263a88e8435fca51A03F8C)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x30654C69B212AD057E817EcA26da6c5edA32E2E7)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x30654C69B212AD057E817EcA26da6c5edA32E2E7)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xB7b74B407E9bA6c070C5B5CC7E6B8E59e4642763)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xaFB341c8a50e4Bdec4E419Be7F3a6127E3BD6710)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xeb1aAdAC0a10Ac2eDFCbE496C3BCBc1dea4F994b)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x30654C69B212AD057E817EcA26da6c5edA32E2E7)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 */
export function usePoolModifyLiquidityTestModifyLiquidity<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof poolModifyLiquidityTestAddress,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolModifyLiquidityTestABI, "modifyLiquidity">["request"]["abi"],
        "modifyLiquidity",
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: "modifyLiquidity" }
    : UseContractWriteConfig<typeof poolModifyLiquidityTestABI, "modifyLiquidity", TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: "modifyLiquidity";
      } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof poolModifyLiquidityTestABI, "modifyLiquidity", TMode>({
    abi: poolModifyLiquidityTestABI,
    address: poolModifyLiquidityTestAddress[chainId as keyof typeof poolModifyLiquidityTestAddress],
    functionName: "modifyLiquidity",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolModifyLiquidityTestABI}__ and `functionName` set to `"unlockCallback"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x83feDBeD11B3667f40263a88e8435fca51A03F8C)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x30654C69B212AD057E817EcA26da6c5edA32E2E7)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x30654C69B212AD057E817EcA26da6c5edA32E2E7)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xB7b74B407E9bA6c070C5B5CC7E6B8E59e4642763)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xaFB341c8a50e4Bdec4E419Be7F3a6127E3BD6710)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xeb1aAdAC0a10Ac2eDFCbE496C3BCBc1dea4F994b)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x30654C69B212AD057E817EcA26da6c5edA32E2E7)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 */
export function usePoolModifyLiquidityTestUnlockCallback<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof poolModifyLiquidityTestAddress,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolModifyLiquidityTestABI, "unlockCallback">["request"]["abi"],
        "unlockCallback",
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: "unlockCallback" }
    : UseContractWriteConfig<typeof poolModifyLiquidityTestABI, "unlockCallback", TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: "unlockCallback";
      } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof poolModifyLiquidityTestABI, "unlockCallback", TMode>({
    abi: poolModifyLiquidityTestABI,
    address: poolModifyLiquidityTestAddress[chainId as keyof typeof poolModifyLiquidityTestAddress],
    functionName: "unlockCallback",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolModifyLiquidityTestABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x83feDBeD11B3667f40263a88e8435fca51A03F8C)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x30654C69B212AD057E817EcA26da6c5edA32E2E7)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x30654C69B212AD057E817EcA26da6c5edA32E2E7)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xB7b74B407E9bA6c070C5B5CC7E6B8E59e4642763)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xaFB341c8a50e4Bdec4E419Be7F3a6127E3BD6710)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xeb1aAdAC0a10Ac2eDFCbE496C3BCBc1dea4F994b)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x30654C69B212AD057E817EcA26da6c5edA32E2E7)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 */
export function usePreparePoolModifyLiquidityTestWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof poolModifyLiquidityTestABI, TFunctionName>, "abi" | "address"> & {
    chainId?: keyof typeof poolModifyLiquidityTestAddress;
  } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: poolModifyLiquidityTestABI,
    address: poolModifyLiquidityTestAddress[chainId as keyof typeof poolModifyLiquidityTestAddress],
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolModifyLiquidityTestABI, TFunctionName>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolModifyLiquidityTestABI}__ and `functionName` set to `"modifyLiquidity"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x83feDBeD11B3667f40263a88e8435fca51A03F8C)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x30654C69B212AD057E817EcA26da6c5edA32E2E7)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x30654C69B212AD057E817EcA26da6c5edA32E2E7)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xB7b74B407E9bA6c070C5B5CC7E6B8E59e4642763)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xaFB341c8a50e4Bdec4E419Be7F3a6127E3BD6710)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xeb1aAdAC0a10Ac2eDFCbE496C3BCBc1dea4F994b)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x30654C69B212AD057E817EcA26da6c5edA32E2E7)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 */
export function usePreparePoolModifyLiquidityTestModifyLiquidity(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolModifyLiquidityTestABI, "modifyLiquidity">,
    "abi" | "address" | "functionName"
  > & { chainId?: keyof typeof poolModifyLiquidityTestAddress } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: poolModifyLiquidityTestABI,
    address: poolModifyLiquidityTestAddress[chainId as keyof typeof poolModifyLiquidityTestAddress],
    functionName: "modifyLiquidity",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolModifyLiquidityTestABI, "modifyLiquidity">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolModifyLiquidityTestABI}__ and `functionName` set to `"unlockCallback"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x83feDBeD11B3667f40263a88e8435fca51A03F8C)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x30654C69B212AD057E817EcA26da6c5edA32E2E7)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x30654C69B212AD057E817EcA26da6c5edA32E2E7)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xB7b74B407E9bA6c070C5B5CC7E6B8E59e4642763)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xaFB341c8a50e4Bdec4E419Be7F3a6127E3BD6710)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xeb1aAdAC0a10Ac2eDFCbE496C3BCBc1dea4F994b)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x30654C69B212AD057E817EcA26da6c5edA32E2E7)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 */
export function usePreparePoolModifyLiquidityTestUnlockCallback(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolModifyLiquidityTestABI, "unlockCallback">,
    "abi" | "address" | "functionName"
  > & { chainId?: keyof typeof poolModifyLiquidityTestAddress } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: poolModifyLiquidityTestABI,
    address: poolModifyLiquidityTestAddress[chainId as keyof typeof poolModifyLiquidityTestAddress],
    functionName: "unlockCallback",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolModifyLiquidityTestABI, "unlockCallback">);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolModifyLiquidityTestNoChecksABI}__.
 */
export function usePoolModifyLiquidityTestNoChecksRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof poolModifyLiquidityTestNoChecksABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolModifyLiquidityTestNoChecksABI, TFunctionName, TSelectData>,
    "abi"
  > = {} as any,
) {
  return useContractRead({ abi: poolModifyLiquidityTestNoChecksABI, ...config } as UseContractReadConfig<
    typeof poolModifyLiquidityTestNoChecksABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolModifyLiquidityTestNoChecksABI}__ and `functionName` set to `"manager"`.
 */
export function usePoolModifyLiquidityTestNoChecksManager<
  TFunctionName extends "manager",
  TSelectData = ReadContractResult<typeof poolModifyLiquidityTestNoChecksABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolModifyLiquidityTestNoChecksABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: poolModifyLiquidityTestNoChecksABI,
    functionName: "manager",
    ...config,
  } as UseContractReadConfig<typeof poolModifyLiquidityTestNoChecksABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolModifyLiquidityTestNoChecksABI}__.
 */
export function usePoolModifyLiquidityTestNoChecksWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolModifyLiquidityTestNoChecksABI, string>["request"]["abi"],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof poolModifyLiquidityTestNoChecksABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof poolModifyLiquidityTestNoChecksABI, TFunctionName, TMode>({
    abi: poolModifyLiquidityTestNoChecksABI,
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolModifyLiquidityTestNoChecksABI}__ and `functionName` set to `"modifyLiquidity"`.
 */
export function usePoolModifyLiquidityTestNoChecksModifyLiquidity<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolModifyLiquidityTestNoChecksABI, "modifyLiquidity">["request"]["abi"],
        "modifyLiquidity",
        TMode
      > & { functionName?: "modifyLiquidity" }
    : UseContractWriteConfig<typeof poolModifyLiquidityTestNoChecksABI, "modifyLiquidity", TMode> & {
        abi?: never;
        functionName?: "modifyLiquidity";
      } = {} as any,
) {
  return useContractWrite<typeof poolModifyLiquidityTestNoChecksABI, "modifyLiquidity", TMode>({
    abi: poolModifyLiquidityTestNoChecksABI,
    functionName: "modifyLiquidity",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolModifyLiquidityTestNoChecksABI}__ and `functionName` set to `"unlockCallback"`.
 */
export function usePoolModifyLiquidityTestNoChecksUnlockCallback<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolModifyLiquidityTestNoChecksABI, "unlockCallback">["request"]["abi"],
        "unlockCallback",
        TMode
      > & { functionName?: "unlockCallback" }
    : UseContractWriteConfig<typeof poolModifyLiquidityTestNoChecksABI, "unlockCallback", TMode> & {
        abi?: never;
        functionName?: "unlockCallback";
      } = {} as any,
) {
  return useContractWrite<typeof poolModifyLiquidityTestNoChecksABI, "unlockCallback", TMode>({
    abi: poolModifyLiquidityTestNoChecksABI,
    functionName: "unlockCallback",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolModifyLiquidityTestNoChecksABI}__.
 */
export function usePreparePoolModifyLiquidityTestNoChecksWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolModifyLiquidityTestNoChecksABI, TFunctionName>,
    "abi"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: poolModifyLiquidityTestNoChecksABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolModifyLiquidityTestNoChecksABI, TFunctionName>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolModifyLiquidityTestNoChecksABI}__ and `functionName` set to `"modifyLiquidity"`.
 */
export function usePreparePoolModifyLiquidityTestNoChecksModifyLiquidity(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolModifyLiquidityTestNoChecksABI, "modifyLiquidity">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: poolModifyLiquidityTestNoChecksABI,
    functionName: "modifyLiquidity",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolModifyLiquidityTestNoChecksABI, "modifyLiquidity">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolModifyLiquidityTestNoChecksABI}__ and `functionName` set to `"unlockCallback"`.
 */
export function usePreparePoolModifyLiquidityTestNoChecksUnlockCallback(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolModifyLiquidityTestNoChecksABI, "unlockCallback">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: poolModifyLiquidityTestNoChecksABI,
    functionName: "unlockCallback",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolModifyLiquidityTestNoChecksABI, "unlockCallback">);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolNestedActionsTestABI}__.
 */
export function usePoolNestedActionsTestRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof poolNestedActionsTestABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof poolNestedActionsTestABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: poolNestedActionsTestABI, ...config } as UseContractReadConfig<
    typeof poolNestedActionsTestABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolNestedActionsTestABI}__ and `functionName` set to `"IS_TEST"`.
 */
export function usePoolNestedActionsTestIsTest<
  TFunctionName extends "IS_TEST",
  TSelectData = ReadContractResult<typeof poolNestedActionsTestABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolNestedActionsTestABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: poolNestedActionsTestABI, functionName: "IS_TEST", ...config } as UseContractReadConfig<
    typeof poolNestedActionsTestABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolNestedActionsTestABI}__ and `functionName` set to `"excludeArtifacts"`.
 */
export function usePoolNestedActionsTestExcludeArtifacts<
  TFunctionName extends "excludeArtifacts",
  TSelectData = ReadContractResult<typeof poolNestedActionsTestABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolNestedActionsTestABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: poolNestedActionsTestABI,
    functionName: "excludeArtifacts",
    ...config,
  } as UseContractReadConfig<typeof poolNestedActionsTestABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolNestedActionsTestABI}__ and `functionName` set to `"excludeContracts"`.
 */
export function usePoolNestedActionsTestExcludeContracts<
  TFunctionName extends "excludeContracts",
  TSelectData = ReadContractResult<typeof poolNestedActionsTestABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolNestedActionsTestABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: poolNestedActionsTestABI,
    functionName: "excludeContracts",
    ...config,
  } as UseContractReadConfig<typeof poolNestedActionsTestABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolNestedActionsTestABI}__ and `functionName` set to `"excludeSelectors"`.
 */
export function usePoolNestedActionsTestExcludeSelectors<
  TFunctionName extends "excludeSelectors",
  TSelectData = ReadContractResult<typeof poolNestedActionsTestABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolNestedActionsTestABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: poolNestedActionsTestABI,
    functionName: "excludeSelectors",
    ...config,
  } as UseContractReadConfig<typeof poolNestedActionsTestABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolNestedActionsTestABI}__ and `functionName` set to `"excludeSenders"`.
 */
export function usePoolNestedActionsTestExcludeSenders<
  TFunctionName extends "excludeSenders",
  TSelectData = ReadContractResult<typeof poolNestedActionsTestABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolNestedActionsTestABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: poolNestedActionsTestABI,
    functionName: "excludeSenders",
    ...config,
  } as UseContractReadConfig<typeof poolNestedActionsTestABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolNestedActionsTestABI}__ and `functionName` set to `"executor"`.
 */
export function usePoolNestedActionsTestExecutor<
  TFunctionName extends "executor",
  TSelectData = ReadContractResult<typeof poolNestedActionsTestABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolNestedActionsTestABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: poolNestedActionsTestABI,
    functionName: "executor",
    ...config,
  } as UseContractReadConfig<typeof poolNestedActionsTestABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolNestedActionsTestABI}__ and `functionName` set to `"failed"`.
 */
export function usePoolNestedActionsTestFailed<
  TFunctionName extends "failed",
  TSelectData = ReadContractResult<typeof poolNestedActionsTestABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolNestedActionsTestABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: poolNestedActionsTestABI, functionName: "failed", ...config } as UseContractReadConfig<
    typeof poolNestedActionsTestABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolNestedActionsTestABI}__ and `functionName` set to `"targetArtifactSelectors"`.
 */
export function usePoolNestedActionsTestTargetArtifactSelectors<
  TFunctionName extends "targetArtifactSelectors",
  TSelectData = ReadContractResult<typeof poolNestedActionsTestABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolNestedActionsTestABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: poolNestedActionsTestABI,
    functionName: "targetArtifactSelectors",
    ...config,
  } as UseContractReadConfig<typeof poolNestedActionsTestABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolNestedActionsTestABI}__ and `functionName` set to `"targetArtifacts"`.
 */
export function usePoolNestedActionsTestTargetArtifacts<
  TFunctionName extends "targetArtifacts",
  TSelectData = ReadContractResult<typeof poolNestedActionsTestABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolNestedActionsTestABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: poolNestedActionsTestABI,
    functionName: "targetArtifacts",
    ...config,
  } as UseContractReadConfig<typeof poolNestedActionsTestABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolNestedActionsTestABI}__ and `functionName` set to `"targetContracts"`.
 */
export function usePoolNestedActionsTestTargetContracts<
  TFunctionName extends "targetContracts",
  TSelectData = ReadContractResult<typeof poolNestedActionsTestABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolNestedActionsTestABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: poolNestedActionsTestABI,
    functionName: "targetContracts",
    ...config,
  } as UseContractReadConfig<typeof poolNestedActionsTestABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolNestedActionsTestABI}__ and `functionName` set to `"targetInterfaces"`.
 */
export function usePoolNestedActionsTestTargetInterfaces<
  TFunctionName extends "targetInterfaces",
  TSelectData = ReadContractResult<typeof poolNestedActionsTestABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolNestedActionsTestABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: poolNestedActionsTestABI,
    functionName: "targetInterfaces",
    ...config,
  } as UseContractReadConfig<typeof poolNestedActionsTestABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolNestedActionsTestABI}__ and `functionName` set to `"targetSelectors"`.
 */
export function usePoolNestedActionsTestTargetSelectors<
  TFunctionName extends "targetSelectors",
  TSelectData = ReadContractResult<typeof poolNestedActionsTestABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolNestedActionsTestABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: poolNestedActionsTestABI,
    functionName: "targetSelectors",
    ...config,
  } as UseContractReadConfig<typeof poolNestedActionsTestABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolNestedActionsTestABI}__ and `functionName` set to `"targetSenders"`.
 */
export function usePoolNestedActionsTestTargetSenders<
  TFunctionName extends "targetSenders",
  TSelectData = ReadContractResult<typeof poolNestedActionsTestABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolNestedActionsTestABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: poolNestedActionsTestABI,
    functionName: "targetSenders",
    ...config,
  } as UseContractReadConfig<typeof poolNestedActionsTestABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolNestedActionsTestABI}__.
 */
export function usePoolNestedActionsTestWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolNestedActionsTestABI, string>["request"]["abi"],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof poolNestedActionsTestABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof poolNestedActionsTestABI, TFunctionName, TMode>({
    abi: poolNestedActionsTestABI,
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolNestedActionsTestABI}__ and `functionName` set to `"unlock"`.
 */
export function usePoolNestedActionsTestUnlock<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolNestedActionsTestABI, "unlock">["request"]["abi"],
        "unlock",
        TMode
      > & { functionName?: "unlock" }
    : UseContractWriteConfig<typeof poolNestedActionsTestABI, "unlock", TMode> & {
        abi?: never;
        functionName?: "unlock";
      } = {} as any,
) {
  return useContractWrite<typeof poolNestedActionsTestABI, "unlock", TMode>({
    abi: poolNestedActionsTestABI,
    functionName: "unlock",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolNestedActionsTestABI}__ and `functionName` set to `"unlockCallback"`.
 */
export function usePoolNestedActionsTestUnlockCallback<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolNestedActionsTestABI, "unlockCallback">["request"]["abi"],
        "unlockCallback",
        TMode
      > & { functionName?: "unlockCallback" }
    : UseContractWriteConfig<typeof poolNestedActionsTestABI, "unlockCallback", TMode> & {
        abi?: never;
        functionName?: "unlockCallback";
      } = {} as any,
) {
  return useContractWrite<typeof poolNestedActionsTestABI, "unlockCallback", TMode>({
    abi: poolNestedActionsTestABI,
    functionName: "unlockCallback",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolNestedActionsTestABI}__.
 */
export function usePreparePoolNestedActionsTestWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof poolNestedActionsTestABI, TFunctionName>, "abi"> = {} as any,
) {
  return usePrepareContractWrite({ abi: poolNestedActionsTestABI, ...config } as UsePrepareContractWriteConfig<
    typeof poolNestedActionsTestABI,
    TFunctionName
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolNestedActionsTestABI}__ and `functionName` set to `"unlock"`.
 */
export function usePreparePoolNestedActionsTestUnlock(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolNestedActionsTestABI, "unlock">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: poolNestedActionsTestABI,
    functionName: "unlock",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolNestedActionsTestABI, "unlock">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolNestedActionsTestABI}__ and `functionName` set to `"unlockCallback"`.
 */
export function usePreparePoolNestedActionsTestUnlockCallback(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolNestedActionsTestABI, "unlockCallback">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: poolNestedActionsTestABI,
    functionName: "unlockCallback",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolNestedActionsTestABI, "unlockCallback">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolNestedActionsTestABI}__.
 */
export function usePoolNestedActionsTestEvent<TEventName extends string>(
  config: Omit<UseContractEventConfig<typeof poolNestedActionsTestABI, TEventName>, "abi"> = {} as any,
) {
  return useContractEvent({ abi: poolNestedActionsTestABI, ...config } as UseContractEventConfig<
    typeof poolNestedActionsTestABI,
    TEventName
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolNestedActionsTestABI}__ and `eventName` set to `"log"`.
 */
export function usePoolNestedActionsTestLogEvent(
  config: Omit<UseContractEventConfig<typeof poolNestedActionsTestABI, "log">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: poolNestedActionsTestABI, eventName: "log", ...config } as UseContractEventConfig<
    typeof poolNestedActionsTestABI,
    "log"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolNestedActionsTestABI}__ and `eventName` set to `"log_address"`.
 */
export function usePoolNestedActionsTestLogAddressEvent(
  config: Omit<UseContractEventConfig<typeof poolNestedActionsTestABI, "log_address">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({
    abi: poolNestedActionsTestABI,
    eventName: "log_address",
    ...config,
  } as UseContractEventConfig<typeof poolNestedActionsTestABI, "log_address">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolNestedActionsTestABI}__ and `eventName` set to `"log_array"`.
 */
export function usePoolNestedActionsTestLogArrayEvent(
  config: Omit<UseContractEventConfig<typeof poolNestedActionsTestABI, "log_array">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({
    abi: poolNestedActionsTestABI,
    eventName: "log_array",
    ...config,
  } as UseContractEventConfig<typeof poolNestedActionsTestABI, "log_array">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolNestedActionsTestABI}__ and `eventName` set to `"log_bytes"`.
 */
export function usePoolNestedActionsTestLogBytesEvent(
  config: Omit<UseContractEventConfig<typeof poolNestedActionsTestABI, "log_bytes">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({
    abi: poolNestedActionsTestABI,
    eventName: "log_bytes",
    ...config,
  } as UseContractEventConfig<typeof poolNestedActionsTestABI, "log_bytes">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolNestedActionsTestABI}__ and `eventName` set to `"log_bytes32"`.
 */
export function usePoolNestedActionsTestLogBytes32Event(
  config: Omit<UseContractEventConfig<typeof poolNestedActionsTestABI, "log_bytes32">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({
    abi: poolNestedActionsTestABI,
    eventName: "log_bytes32",
    ...config,
  } as UseContractEventConfig<typeof poolNestedActionsTestABI, "log_bytes32">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolNestedActionsTestABI}__ and `eventName` set to `"log_int"`.
 */
export function usePoolNestedActionsTestLogIntEvent(
  config: Omit<UseContractEventConfig<typeof poolNestedActionsTestABI, "log_int">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: poolNestedActionsTestABI, eventName: "log_int", ...config } as UseContractEventConfig<
    typeof poolNestedActionsTestABI,
    "log_int"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolNestedActionsTestABI}__ and `eventName` set to `"log_named_address"`.
 */
export function usePoolNestedActionsTestLogNamedAddressEvent(
  config: Omit<
    UseContractEventConfig<typeof poolNestedActionsTestABI, "log_named_address">,
    "abi" | "eventName"
  > = {} as any,
) {
  return useContractEvent({
    abi: poolNestedActionsTestABI,
    eventName: "log_named_address",
    ...config,
  } as UseContractEventConfig<typeof poolNestedActionsTestABI, "log_named_address">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolNestedActionsTestABI}__ and `eventName` set to `"log_named_array"`.
 */
export function usePoolNestedActionsTestLogNamedArrayEvent(
  config: Omit<
    UseContractEventConfig<typeof poolNestedActionsTestABI, "log_named_array">,
    "abi" | "eventName"
  > = {} as any,
) {
  return useContractEvent({
    abi: poolNestedActionsTestABI,
    eventName: "log_named_array",
    ...config,
  } as UseContractEventConfig<typeof poolNestedActionsTestABI, "log_named_array">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolNestedActionsTestABI}__ and `eventName` set to `"log_named_bytes"`.
 */
export function usePoolNestedActionsTestLogNamedBytesEvent(
  config: Omit<
    UseContractEventConfig<typeof poolNestedActionsTestABI, "log_named_bytes">,
    "abi" | "eventName"
  > = {} as any,
) {
  return useContractEvent({
    abi: poolNestedActionsTestABI,
    eventName: "log_named_bytes",
    ...config,
  } as UseContractEventConfig<typeof poolNestedActionsTestABI, "log_named_bytes">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolNestedActionsTestABI}__ and `eventName` set to `"log_named_bytes32"`.
 */
export function usePoolNestedActionsTestLogNamedBytes32Event(
  config: Omit<
    UseContractEventConfig<typeof poolNestedActionsTestABI, "log_named_bytes32">,
    "abi" | "eventName"
  > = {} as any,
) {
  return useContractEvent({
    abi: poolNestedActionsTestABI,
    eventName: "log_named_bytes32",
    ...config,
  } as UseContractEventConfig<typeof poolNestedActionsTestABI, "log_named_bytes32">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolNestedActionsTestABI}__ and `eventName` set to `"log_named_decimal_int"`.
 */
export function usePoolNestedActionsTestLogNamedDecimalIntEvent(
  config: Omit<
    UseContractEventConfig<typeof poolNestedActionsTestABI, "log_named_decimal_int">,
    "abi" | "eventName"
  > = {} as any,
) {
  return useContractEvent({
    abi: poolNestedActionsTestABI,
    eventName: "log_named_decimal_int",
    ...config,
  } as UseContractEventConfig<typeof poolNestedActionsTestABI, "log_named_decimal_int">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolNestedActionsTestABI}__ and `eventName` set to `"log_named_decimal_uint"`.
 */
export function usePoolNestedActionsTestLogNamedDecimalUintEvent(
  config: Omit<
    UseContractEventConfig<typeof poolNestedActionsTestABI, "log_named_decimal_uint">,
    "abi" | "eventName"
  > = {} as any,
) {
  return useContractEvent({
    abi: poolNestedActionsTestABI,
    eventName: "log_named_decimal_uint",
    ...config,
  } as UseContractEventConfig<typeof poolNestedActionsTestABI, "log_named_decimal_uint">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolNestedActionsTestABI}__ and `eventName` set to `"log_named_int"`.
 */
export function usePoolNestedActionsTestLogNamedIntEvent(
  config: Omit<
    UseContractEventConfig<typeof poolNestedActionsTestABI, "log_named_int">,
    "abi" | "eventName"
  > = {} as any,
) {
  return useContractEvent({
    abi: poolNestedActionsTestABI,
    eventName: "log_named_int",
    ...config,
  } as UseContractEventConfig<typeof poolNestedActionsTestABI, "log_named_int">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolNestedActionsTestABI}__ and `eventName` set to `"log_named_string"`.
 */
export function usePoolNestedActionsTestLogNamedStringEvent(
  config: Omit<
    UseContractEventConfig<typeof poolNestedActionsTestABI, "log_named_string">,
    "abi" | "eventName"
  > = {} as any,
) {
  return useContractEvent({
    abi: poolNestedActionsTestABI,
    eventName: "log_named_string",
    ...config,
  } as UseContractEventConfig<typeof poolNestedActionsTestABI, "log_named_string">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolNestedActionsTestABI}__ and `eventName` set to `"log_named_uint"`.
 */
export function usePoolNestedActionsTestLogNamedUintEvent(
  config: Omit<
    UseContractEventConfig<typeof poolNestedActionsTestABI, "log_named_uint">,
    "abi" | "eventName"
  > = {} as any,
) {
  return useContractEvent({
    abi: poolNestedActionsTestABI,
    eventName: "log_named_uint",
    ...config,
  } as UseContractEventConfig<typeof poolNestedActionsTestABI, "log_named_uint">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolNestedActionsTestABI}__ and `eventName` set to `"log_string"`.
 */
export function usePoolNestedActionsTestLogStringEvent(
  config: Omit<UseContractEventConfig<typeof poolNestedActionsTestABI, "log_string">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({
    abi: poolNestedActionsTestABI,
    eventName: "log_string",
    ...config,
  } as UseContractEventConfig<typeof poolNestedActionsTestABI, "log_string">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolNestedActionsTestABI}__ and `eventName` set to `"log_uint"`.
 */
export function usePoolNestedActionsTestLogUintEvent(
  config: Omit<UseContractEventConfig<typeof poolNestedActionsTestABI, "log_uint">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: poolNestedActionsTestABI, eventName: "log_uint", ...config } as UseContractEventConfig<
    typeof poolNestedActionsTestABI,
    "log_uint"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolNestedActionsTestABI}__ and `eventName` set to `"logs"`.
 */
export function usePoolNestedActionsTestLogsEvent(
  config: Omit<UseContractEventConfig<typeof poolNestedActionsTestABI, "logs">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: poolNestedActionsTestABI, eventName: "logs", ...config } as UseContractEventConfig<
    typeof poolNestedActionsTestABI,
    "logs"
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolSettleTestABI}__.
 */
export function usePoolSettleTestRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof poolSettleTestABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof poolSettleTestABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: poolSettleTestABI, ...config } as UseContractReadConfig<
    typeof poolSettleTestABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolSettleTestABI}__ and `functionName` set to `"manager"`.
 */
export function usePoolSettleTestManager<
  TFunctionName extends "manager",
  TSelectData = ReadContractResult<typeof poolSettleTestABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolSettleTestABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: poolSettleTestABI, functionName: "manager", ...config } as UseContractReadConfig<
    typeof poolSettleTestABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolSettleTestABI}__.
 */
export function usePoolSettleTestWrite<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolSettleTestABI, string>["request"]["abi"],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof poolSettleTestABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof poolSettleTestABI, TFunctionName, TMode>({ abi: poolSettleTestABI, ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolSettleTestABI}__ and `functionName` set to `"settle"`.
 */
export function usePoolSettleTestSettle<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolSettleTestABI, "settle">["request"]["abi"],
        "settle",
        TMode
      > & { functionName?: "settle" }
    : UseContractWriteConfig<typeof poolSettleTestABI, "settle", TMode> & {
        abi?: never;
        functionName?: "settle";
      } = {} as any,
) {
  return useContractWrite<typeof poolSettleTestABI, "settle", TMode>({
    abi: poolSettleTestABI,
    functionName: "settle",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolSettleTestABI}__ and `functionName` set to `"unlockCallback"`.
 */
export function usePoolSettleTestUnlockCallback<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolSettleTestABI, "unlockCallback">["request"]["abi"],
        "unlockCallback",
        TMode
      > & { functionName?: "unlockCallback" }
    : UseContractWriteConfig<typeof poolSettleTestABI, "unlockCallback", TMode> & {
        abi?: never;
        functionName?: "unlockCallback";
      } = {} as any,
) {
  return useContractWrite<typeof poolSettleTestABI, "unlockCallback", TMode>({
    abi: poolSettleTestABI,
    functionName: "unlockCallback",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolSettleTestABI}__.
 */
export function usePreparePoolSettleTestWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof poolSettleTestABI, TFunctionName>, "abi"> = {} as any,
) {
  return usePrepareContractWrite({ abi: poolSettleTestABI, ...config } as UsePrepareContractWriteConfig<
    typeof poolSettleTestABI,
    TFunctionName
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolSettleTestABI}__ and `functionName` set to `"settle"`.
 */
export function usePreparePoolSettleTestSettle(
  config: Omit<UsePrepareContractWriteConfig<typeof poolSettleTestABI, "settle">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: poolSettleTestABI,
    functionName: "settle",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolSettleTestABI, "settle">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolSettleTestABI}__ and `functionName` set to `"unlockCallback"`.
 */
export function usePreparePoolSettleTestUnlockCallback(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolSettleTestABI, "unlockCallback">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: poolSettleTestABI,
    functionName: "unlockCallback",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolSettleTestABI, "unlockCallback">);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolSwapTestABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF8AADC65Bf1Ec1645ef931317fD48ffa734a185c)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x24C731645ee1e35C3219153d370EBd79784D1E91)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x24C731645ee1e35C3219153d370EBd79784D1E91)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6550fa0D92B38F52C37D32d71084A7B270226Ba5)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xe99395035e1a89b6da10a73821Fc60158d5e59E9)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xa26b026581Fa923CFf3084119bf2d14060945a63)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x24C731645ee1e35C3219153d370EBd79784D1E91)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x3A0c2cF7c40A7B417AE9aB6ccBF60e86d8437395)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 */
export function usePoolSwapTestRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof poolSwapTestABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof poolSwapTestABI, TFunctionName, TSelectData>, "abi" | "address"> & {
    chainId?: keyof typeof poolSwapTestAddress;
  } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: poolSwapTestABI,
    address: poolSwapTestAddress[chainId as keyof typeof poolSwapTestAddress],
    ...config,
  } as UseContractReadConfig<typeof poolSwapTestABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolSwapTestABI}__ and `functionName` set to `"manager"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF8AADC65Bf1Ec1645ef931317fD48ffa734a185c)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x24C731645ee1e35C3219153d370EBd79784D1E91)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x24C731645ee1e35C3219153d370EBd79784D1E91)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6550fa0D92B38F52C37D32d71084A7B270226Ba5)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xe99395035e1a89b6da10a73821Fc60158d5e59E9)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xa26b026581Fa923CFf3084119bf2d14060945a63)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x24C731645ee1e35C3219153d370EBd79784D1E91)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x3A0c2cF7c40A7B417AE9aB6ccBF60e86d8437395)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 */
export function usePoolSwapTestManager<
  TFunctionName extends "manager",
  TSelectData = ReadContractResult<typeof poolSwapTestABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolSwapTestABI, TFunctionName, TSelectData>,
    "abi" | "address" | "functionName"
  > & { chainId?: keyof typeof poolSwapTestAddress } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: poolSwapTestABI,
    address: poolSwapTestAddress[chainId as keyof typeof poolSwapTestAddress],
    functionName: "manager",
    ...config,
  } as UseContractReadConfig<typeof poolSwapTestABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolSwapTestABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF8AADC65Bf1Ec1645ef931317fD48ffa734a185c)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x24C731645ee1e35C3219153d370EBd79784D1E91)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x24C731645ee1e35C3219153d370EBd79784D1E91)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6550fa0D92B38F52C37D32d71084A7B270226Ba5)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xe99395035e1a89b6da10a73821Fc60158d5e59E9)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xa26b026581Fa923CFf3084119bf2d14060945a63)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x24C731645ee1e35C3219153d370EBd79784D1E91)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x3A0c2cF7c40A7B417AE9aB6ccBF60e86d8437395)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 */
export function usePoolSwapTestWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof poolSwapTestAddress,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolSwapTestABI, string>["request"]["abi"],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof poolSwapTestABI, TFunctionName, TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
      } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof poolSwapTestABI, TFunctionName, TMode>({
    abi: poolSwapTestABI,
    address: poolSwapTestAddress[chainId as keyof typeof poolSwapTestAddress],
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolSwapTestABI}__ and `functionName` set to `"swap"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF8AADC65Bf1Ec1645ef931317fD48ffa734a185c)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x24C731645ee1e35C3219153d370EBd79784D1E91)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x24C731645ee1e35C3219153d370EBd79784D1E91)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6550fa0D92B38F52C37D32d71084A7B270226Ba5)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xe99395035e1a89b6da10a73821Fc60158d5e59E9)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xa26b026581Fa923CFf3084119bf2d14060945a63)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x24C731645ee1e35C3219153d370EBd79784D1E91)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x3A0c2cF7c40A7B417AE9aB6ccBF60e86d8437395)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 */
export function usePoolSwapTestSwap<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof poolSwapTestAddress,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolSwapTestABI, "swap">["request"]["abi"],
        "swap",
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: "swap" }
    : UseContractWriteConfig<typeof poolSwapTestABI, "swap", TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: "swap";
      } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof poolSwapTestABI, "swap", TMode>({
    abi: poolSwapTestABI,
    address: poolSwapTestAddress[chainId as keyof typeof poolSwapTestAddress],
    functionName: "swap",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolSwapTestABI}__ and `functionName` set to `"unlockCallback"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF8AADC65Bf1Ec1645ef931317fD48ffa734a185c)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x24C731645ee1e35C3219153d370EBd79784D1E91)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x24C731645ee1e35C3219153d370EBd79784D1E91)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6550fa0D92B38F52C37D32d71084A7B270226Ba5)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xe99395035e1a89b6da10a73821Fc60158d5e59E9)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xa26b026581Fa923CFf3084119bf2d14060945a63)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x24C731645ee1e35C3219153d370EBd79784D1E91)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x3A0c2cF7c40A7B417AE9aB6ccBF60e86d8437395)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 */
export function usePoolSwapTestUnlockCallback<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof poolSwapTestAddress,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolSwapTestABI, "unlockCallback">["request"]["abi"],
        "unlockCallback",
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: "unlockCallback" }
    : UseContractWriteConfig<typeof poolSwapTestABI, "unlockCallback", TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: "unlockCallback";
      } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof poolSwapTestABI, "unlockCallback", TMode>({
    abi: poolSwapTestABI,
    address: poolSwapTestAddress[chainId as keyof typeof poolSwapTestAddress],
    functionName: "unlockCallback",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolSwapTestABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF8AADC65Bf1Ec1645ef931317fD48ffa734a185c)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x24C731645ee1e35C3219153d370EBd79784D1E91)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x24C731645ee1e35C3219153d370EBd79784D1E91)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6550fa0D92B38F52C37D32d71084A7B270226Ba5)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xe99395035e1a89b6da10a73821Fc60158d5e59E9)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xa26b026581Fa923CFf3084119bf2d14060945a63)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x24C731645ee1e35C3219153d370EBd79784D1E91)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x3A0c2cF7c40A7B417AE9aB6ccBF60e86d8437395)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 */
export function usePreparePoolSwapTestWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof poolSwapTestABI, TFunctionName>, "abi" | "address"> & {
    chainId?: keyof typeof poolSwapTestAddress;
  } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: poolSwapTestABI,
    address: poolSwapTestAddress[chainId as keyof typeof poolSwapTestAddress],
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolSwapTestABI, TFunctionName>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolSwapTestABI}__ and `functionName` set to `"swap"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF8AADC65Bf1Ec1645ef931317fD48ffa734a185c)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x24C731645ee1e35C3219153d370EBd79784D1E91)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x24C731645ee1e35C3219153d370EBd79784D1E91)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6550fa0D92B38F52C37D32d71084A7B270226Ba5)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xe99395035e1a89b6da10a73821Fc60158d5e59E9)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xa26b026581Fa923CFf3084119bf2d14060945a63)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x24C731645ee1e35C3219153d370EBd79784D1E91)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x3A0c2cF7c40A7B417AE9aB6ccBF60e86d8437395)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 */
export function usePreparePoolSwapTestSwap(
  config: Omit<UsePrepareContractWriteConfig<typeof poolSwapTestABI, "swap">, "abi" | "address" | "functionName"> & {
    chainId?: keyof typeof poolSwapTestAddress;
  } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: poolSwapTestABI,
    address: poolSwapTestAddress[chainId as keyof typeof poolSwapTestAddress],
    functionName: "swap",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolSwapTestABI, "swap">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolSwapTestABI}__ and `functionName` set to `"unlockCallback"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0xF8AADC65Bf1Ec1645ef931317fD48ffa734a185c)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x24C731645ee1e35C3219153d370EBd79784D1E91)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x24C731645ee1e35C3219153d370EBd79784D1E91)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x6550fa0D92B38F52C37D32d71084A7B270226Ba5)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0xe99395035e1a89b6da10a73821Fc60158d5e59E9)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0xa26b026581Fa923CFf3084119bf2d14060945a63)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x24C731645ee1e35C3219153d370EBd79784D1E91)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x3A0c2cF7c40A7B417AE9aB6ccBF60e86d8437395)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 */
export function usePreparePoolSwapTestUnlockCallback(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolSwapTestABI, "unlockCallback">,
    "abi" | "address" | "functionName"
  > & { chainId?: keyof typeof poolSwapTestAddress } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: poolSwapTestABI,
    address: poolSwapTestAddress[chainId as keyof typeof poolSwapTestAddress],
    functionName: "unlockCallback",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolSwapTestABI, "unlockCallback">);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolTakeTestABI}__.
 */
export function usePoolTakeTestRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof poolTakeTestABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof poolTakeTestABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: poolTakeTestABI, ...config } as UseContractReadConfig<
    typeof poolTakeTestABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolTakeTestABI}__ and `functionName` set to `"manager"`.
 */
export function usePoolTakeTestManager<
  TFunctionName extends "manager",
  TSelectData = ReadContractResult<typeof poolTakeTestABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolTakeTestABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: poolTakeTestABI, functionName: "manager", ...config } as UseContractReadConfig<
    typeof poolTakeTestABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolTakeTestABI}__.
 */
export function usePoolTakeTestWrite<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolTakeTestABI, string>["request"]["abi"],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof poolTakeTestABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof poolTakeTestABI, TFunctionName, TMode>({ abi: poolTakeTestABI, ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolTakeTestABI}__ and `functionName` set to `"take"`.
 */
export function usePoolTakeTestTake<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolTakeTestABI, "take">["request"]["abi"],
        "take",
        TMode
      > & { functionName?: "take" }
    : UseContractWriteConfig<typeof poolTakeTestABI, "take", TMode> & {
        abi?: never;
        functionName?: "take";
      } = {} as any,
) {
  return useContractWrite<typeof poolTakeTestABI, "take", TMode>({
    abi: poolTakeTestABI,
    functionName: "take",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolTakeTestABI}__ and `functionName` set to `"unlockCallback"`.
 */
export function usePoolTakeTestUnlockCallback<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolTakeTestABI, "unlockCallback">["request"]["abi"],
        "unlockCallback",
        TMode
      > & { functionName?: "unlockCallback" }
    : UseContractWriteConfig<typeof poolTakeTestABI, "unlockCallback", TMode> & {
        abi?: never;
        functionName?: "unlockCallback";
      } = {} as any,
) {
  return useContractWrite<typeof poolTakeTestABI, "unlockCallback", TMode>({
    abi: poolTakeTestABI,
    functionName: "unlockCallback",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolTakeTestABI}__.
 */
export function usePreparePoolTakeTestWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof poolTakeTestABI, TFunctionName>, "abi"> = {} as any,
) {
  return usePrepareContractWrite({ abi: poolTakeTestABI, ...config } as UsePrepareContractWriteConfig<
    typeof poolTakeTestABI,
    TFunctionName
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolTakeTestABI}__ and `functionName` set to `"take"`.
 */
export function usePreparePoolTakeTestTake(
  config: Omit<UsePrepareContractWriteConfig<typeof poolTakeTestABI, "take">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: poolTakeTestABI,
    functionName: "take",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolTakeTestABI, "take">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolTakeTestABI}__ and `functionName` set to `"unlockCallback"`.
 */
export function usePreparePoolTakeTestUnlockCallback(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolTakeTestABI, "unlockCallback">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: poolTakeTestABI,
    functionName: "unlockCallback",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolTakeTestABI, "unlockCallback">);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolTestBaseABI}__.
 */
export function usePoolTestBaseRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof poolTestBaseABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof poolTestBaseABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: poolTestBaseABI, ...config } as UseContractReadConfig<
    typeof poolTestBaseABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolTestBaseABI}__ and `functionName` set to `"manager"`.
 */
export function usePoolTestBaseManager<
  TFunctionName extends "manager",
  TSelectData = ReadContractResult<typeof poolTestBaseABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolTestBaseABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: poolTestBaseABI, functionName: "manager", ...config } as UseContractReadConfig<
    typeof poolTestBaseABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolTestBaseABI}__.
 */
export function usePoolTestBaseWrite<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolTestBaseABI, string>["request"]["abi"],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof poolTestBaseABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof poolTestBaseABI, TFunctionName, TMode>({ abi: poolTestBaseABI, ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolTestBaseABI}__ and `functionName` set to `"unlockCallback"`.
 */
export function usePoolTestBaseUnlockCallback<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof poolTestBaseABI, "unlockCallback">["request"]["abi"],
        "unlockCallback",
        TMode
      > & { functionName?: "unlockCallback" }
    : UseContractWriteConfig<typeof poolTestBaseABI, "unlockCallback", TMode> & {
        abi?: never;
        functionName?: "unlockCallback";
      } = {} as any,
) {
  return useContractWrite<typeof poolTestBaseABI, "unlockCallback", TMode>({
    abi: poolTestBaseABI,
    functionName: "unlockCallback",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolTestBaseABI}__.
 */
export function usePreparePoolTestBaseWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof poolTestBaseABI, TFunctionName>, "abi"> = {} as any,
) {
  return usePrepareContractWrite({ abi: poolTestBaseABI, ...config } as UsePrepareContractWriteConfig<
    typeof poolTestBaseABI,
    TFunctionName
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolTestBaseABI}__ and `functionName` set to `"unlockCallback"`.
 */
export function usePreparePoolTestBaseUnlockCallback(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolTestBaseABI, "unlockCallback">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: poolTestBaseABI,
    functionName: "unlockCallback",
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolTestBaseABI, "unlockCallback">);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link protocolFeeControllerTestABI}__.
 */
export function useProtocolFeeControllerTestRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof protocolFeeControllerTestABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof protocolFeeControllerTestABI, TFunctionName, TSelectData>,
    "abi"
  > = {} as any,
) {
  return useContractRead({ abi: protocolFeeControllerTestABI, ...config } as UseContractReadConfig<
    typeof protocolFeeControllerTestABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link protocolFeeControllerTestABI}__ and `functionName` set to `"protocolFee"`.
 */
export function useProtocolFeeControllerTestProtocolFee<
  TFunctionName extends "protocolFee",
  TSelectData = ReadContractResult<typeof protocolFeeControllerTestABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof protocolFeeControllerTestABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: protocolFeeControllerTestABI,
    functionName: "protocolFee",
    ...config,
  } as UseContractReadConfig<typeof protocolFeeControllerTestABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link protocolFeeControllerTestABI}__ and `functionName` set to `"protocolFeeForPool"`.
 */
export function useProtocolFeeControllerTestProtocolFeeForPool<
  TFunctionName extends "protocolFeeForPool",
  TSelectData = ReadContractResult<typeof protocolFeeControllerTestABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof protocolFeeControllerTestABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: protocolFeeControllerTestABI,
    functionName: "protocolFeeForPool",
    ...config,
  } as UseContractReadConfig<typeof protocolFeeControllerTestABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link protocolFeeControllerTestABI}__.
 */
export function useProtocolFeeControllerTestWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof protocolFeeControllerTestABI, string>["request"]["abi"],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof protocolFeeControllerTestABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof protocolFeeControllerTestABI, TFunctionName, TMode>({
    abi: protocolFeeControllerTestABI,
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link protocolFeeControllerTestABI}__ and `functionName` set to `"setProtocolFeeForPool"`.
 */
export function useProtocolFeeControllerTestSetProtocolFeeForPool<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof protocolFeeControllerTestABI, "setProtocolFeeForPool">["request"]["abi"],
        "setProtocolFeeForPool",
        TMode
      > & { functionName?: "setProtocolFeeForPool" }
    : UseContractWriteConfig<typeof protocolFeeControllerTestABI, "setProtocolFeeForPool", TMode> & {
        abi?: never;
        functionName?: "setProtocolFeeForPool";
      } = {} as any,
) {
  return useContractWrite<typeof protocolFeeControllerTestABI, "setProtocolFeeForPool", TMode>({
    abi: protocolFeeControllerTestABI,
    functionName: "setProtocolFeeForPool",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link protocolFeeControllerTestABI}__.
 */
export function usePrepareProtocolFeeControllerTestWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof protocolFeeControllerTestABI, TFunctionName>, "abi"> = {} as any,
) {
  return usePrepareContractWrite({ abi: protocolFeeControllerTestABI, ...config } as UsePrepareContractWriteConfig<
    typeof protocolFeeControllerTestABI,
    TFunctionName
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link protocolFeeControllerTestABI}__ and `functionName` set to `"setProtocolFeeForPool"`.
 */
export function usePrepareProtocolFeeControllerTestSetProtocolFeeForPool(
  config: Omit<
    UsePrepareContractWriteConfig<typeof protocolFeeControllerTestABI, "setProtocolFeeForPool">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: protocolFeeControllerTestABI,
    functionName: "setProtocolFeeForPool",
    ...config,
  } as UsePrepareContractWriteConfig<typeof protocolFeeControllerTestABI, "setProtocolFeeForPool">);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link protocolFeeLibraryABI}__.
 */
export function useProtocolFeeLibraryRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof protocolFeeLibraryABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof protocolFeeLibraryABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: protocolFeeLibraryABI, ...config } as UseContractReadConfig<
    typeof protocolFeeLibraryABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link protocolFeeLibraryABI}__ and `functionName` set to `"MAX_PROTOCOL_FEE"`.
 */
export function useProtocolFeeLibraryMaxProtocolFee<
  TFunctionName extends "MAX_PROTOCOL_FEE",
  TSelectData = ReadContractResult<typeof protocolFeeLibraryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof protocolFeeLibraryABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: protocolFeeLibraryABI,
    functionName: "MAX_PROTOCOL_FEE",
    ...config,
  } as UseContractReadConfig<typeof protocolFeeLibraryABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link protocolFeesABI}__.
 */
export function useProtocolFeesRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof protocolFeesABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof protocolFeesABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: protocolFeesABI, ...config } as UseContractReadConfig<
    typeof protocolFeesABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link protocolFeesABI}__ and `functionName` set to `"owner"`.
 */
export function useProtocolFeesOwner<
  TFunctionName extends "owner",
  TSelectData = ReadContractResult<typeof protocolFeesABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof protocolFeesABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: protocolFeesABI, functionName: "owner", ...config } as UseContractReadConfig<
    typeof protocolFeesABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link protocolFeesABI}__ and `functionName` set to `"protocolFeeController"`.
 */
export function useProtocolFeesProtocolFeeController<
  TFunctionName extends "protocolFeeController",
  TSelectData = ReadContractResult<typeof protocolFeesABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof protocolFeesABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: protocolFeesABI,
    functionName: "protocolFeeController",
    ...config,
  } as UseContractReadConfig<typeof protocolFeesABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link protocolFeesABI}__ and `functionName` set to `"protocolFeesAccrued"`.
 */
export function useProtocolFeesProtocolFeesAccrued<
  TFunctionName extends "protocolFeesAccrued",
  TSelectData = ReadContractResult<typeof protocolFeesABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof protocolFeesABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: protocolFeesABI,
    functionName: "protocolFeesAccrued",
    ...config,
  } as UseContractReadConfig<typeof protocolFeesABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link protocolFeesABI}__.
 */
export function useProtocolFeesWrite<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof protocolFeesABI, string>["request"]["abi"],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof protocolFeesABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof protocolFeesABI, TFunctionName, TMode>({ abi: protocolFeesABI, ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link protocolFeesABI}__ and `functionName` set to `"collectProtocolFees"`.
 */
export function useProtocolFeesCollectProtocolFees<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof protocolFeesABI, "collectProtocolFees">["request"]["abi"],
        "collectProtocolFees",
        TMode
      > & { functionName?: "collectProtocolFees" }
    : UseContractWriteConfig<typeof protocolFeesABI, "collectProtocolFees", TMode> & {
        abi?: never;
        functionName?: "collectProtocolFees";
      } = {} as any,
) {
  return useContractWrite<typeof protocolFeesABI, "collectProtocolFees", TMode>({
    abi: protocolFeesABI,
    functionName: "collectProtocolFees",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link protocolFeesABI}__ and `functionName` set to `"setProtocolFee"`.
 */
export function useProtocolFeesSetProtocolFee<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof protocolFeesABI, "setProtocolFee">["request"]["abi"],
        "setProtocolFee",
        TMode
      > & { functionName?: "setProtocolFee" }
    : UseContractWriteConfig<typeof protocolFeesABI, "setProtocolFee", TMode> & {
        abi?: never;
        functionName?: "setProtocolFee";
      } = {} as any,
) {
  return useContractWrite<typeof protocolFeesABI, "setProtocolFee", TMode>({
    abi: protocolFeesABI,
    functionName: "setProtocolFee",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link protocolFeesABI}__ and `functionName` set to `"setProtocolFeeController"`.
 */
export function useProtocolFeesSetProtocolFeeController<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof protocolFeesABI, "setProtocolFeeController">["request"]["abi"],
        "setProtocolFeeController",
        TMode
      > & { functionName?: "setProtocolFeeController" }
    : UseContractWriteConfig<typeof protocolFeesABI, "setProtocolFeeController", TMode> & {
        abi?: never;
        functionName?: "setProtocolFeeController";
      } = {} as any,
) {
  return useContractWrite<typeof protocolFeesABI, "setProtocolFeeController", TMode>({
    abi: protocolFeesABI,
    functionName: "setProtocolFeeController",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link protocolFeesABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function useProtocolFeesTransferOwnership<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof protocolFeesABI, "transferOwnership">["request"]["abi"],
        "transferOwnership",
        TMode
      > & { functionName?: "transferOwnership" }
    : UseContractWriteConfig<typeof protocolFeesABI, "transferOwnership", TMode> & {
        abi?: never;
        functionName?: "transferOwnership";
      } = {} as any,
) {
  return useContractWrite<typeof protocolFeesABI, "transferOwnership", TMode>({
    abi: protocolFeesABI,
    functionName: "transferOwnership",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link protocolFeesABI}__.
 */
export function usePrepareProtocolFeesWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof protocolFeesABI, TFunctionName>, "abi"> = {} as any,
) {
  return usePrepareContractWrite({ abi: protocolFeesABI, ...config } as UsePrepareContractWriteConfig<
    typeof protocolFeesABI,
    TFunctionName
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link protocolFeesABI}__ and `functionName` set to `"collectProtocolFees"`.
 */
export function usePrepareProtocolFeesCollectProtocolFees(
  config: Omit<
    UsePrepareContractWriteConfig<typeof protocolFeesABI, "collectProtocolFees">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: protocolFeesABI,
    functionName: "collectProtocolFees",
    ...config,
  } as UsePrepareContractWriteConfig<typeof protocolFeesABI, "collectProtocolFees">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link protocolFeesABI}__ and `functionName` set to `"setProtocolFee"`.
 */
export function usePrepareProtocolFeesSetProtocolFee(
  config: Omit<
    UsePrepareContractWriteConfig<typeof protocolFeesABI, "setProtocolFee">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: protocolFeesABI,
    functionName: "setProtocolFee",
    ...config,
  } as UsePrepareContractWriteConfig<typeof protocolFeesABI, "setProtocolFee">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link protocolFeesABI}__ and `functionName` set to `"setProtocolFeeController"`.
 */
export function usePrepareProtocolFeesSetProtocolFeeController(
  config: Omit<
    UsePrepareContractWriteConfig<typeof protocolFeesABI, "setProtocolFeeController">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: protocolFeesABI,
    functionName: "setProtocolFeeController",
    ...config,
  } as UsePrepareContractWriteConfig<typeof protocolFeesABI, "setProtocolFeeController">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link protocolFeesABI}__ and `functionName` set to `"transferOwnership"`.
 */
export function usePrepareProtocolFeesTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof protocolFeesABI, "transferOwnership">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: protocolFeesABI,
    functionName: "transferOwnership",
    ...config,
  } as UsePrepareContractWriteConfig<typeof protocolFeesABI, "transferOwnership">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link protocolFeesABI}__.
 */
export function useProtocolFeesEvent<TEventName extends string>(
  config: Omit<UseContractEventConfig<typeof protocolFeesABI, TEventName>, "abi"> = {} as any,
) {
  return useContractEvent({ abi: protocolFeesABI, ...config } as UseContractEventConfig<
    typeof protocolFeesABI,
    TEventName
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link protocolFeesABI}__ and `eventName` set to `"OwnershipTransferred"`.
 */
export function useProtocolFeesOwnershipTransferredEvent(
  config: Omit<UseContractEventConfig<typeof protocolFeesABI, "OwnershipTransferred">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({
    abi: protocolFeesABI,
    eventName: "OwnershipTransferred",
    ...config,
  } as UseContractEventConfig<typeof protocolFeesABI, "OwnershipTransferred">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link protocolFeesABI}__ and `eventName` set to `"ProtocolFeeControllerUpdated"`.
 */
export function useProtocolFeesProtocolFeeControllerUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof protocolFeesABI, "ProtocolFeeControllerUpdated">,
    "abi" | "eventName"
  > = {} as any,
) {
  return useContractEvent({
    abi: protocolFeesABI,
    eventName: "ProtocolFeeControllerUpdated",
    ...config,
  } as UseContractEventConfig<typeof protocolFeesABI, "ProtocolFeeControllerUpdated">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link protocolFeesABI}__ and `eventName` set to `"ProtocolFeeUpdated"`.
 */
export function useProtocolFeesProtocolFeeUpdatedEvent(
  config: Omit<UseContractEventConfig<typeof protocolFeesABI, "ProtocolFeeUpdated">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({
    abi: protocolFeesABI,
    eventName: "ProtocolFeeUpdated",
    ...config,
  } as UseContractEventConfig<typeof protocolFeesABI, "ProtocolFeeUpdated">);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link revertingProtocolFeeControllerTestABI}__.
 */
export function useRevertingProtocolFeeControllerTestRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof revertingProtocolFeeControllerTestABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof revertingProtocolFeeControllerTestABI, TFunctionName, TSelectData>,
    "abi"
  > = {} as any,
) {
  return useContractRead({ abi: revertingProtocolFeeControllerTestABI, ...config } as UseContractReadConfig<
    typeof revertingProtocolFeeControllerTestABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link revertingProtocolFeeControllerTestABI}__ and `functionName` set to `"protocolFeeForPool"`.
 */
export function useRevertingProtocolFeeControllerTestProtocolFeeForPool<
  TFunctionName extends "protocolFeeForPool",
  TSelectData = ReadContractResult<typeof revertingProtocolFeeControllerTestABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof revertingProtocolFeeControllerTestABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: revertingProtocolFeeControllerTestABI,
    functionName: "protocolFeeForPool",
    ...config,
  } as UseContractReadConfig<typeof revertingProtocolFeeControllerTestABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link safeCallbackABI}__.
 */
export function useSafeCallbackRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof safeCallbackABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof safeCallbackABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: safeCallbackABI, ...config } as UseContractReadConfig<
    typeof safeCallbackABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link safeCallbackABI}__ and `functionName` set to `"poolManager"`.
 */
export function useSafeCallbackPoolManager<
  TFunctionName extends "poolManager",
  TSelectData = ReadContractResult<typeof safeCallbackABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof safeCallbackABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: safeCallbackABI, functionName: "poolManager", ...config } as UseContractReadConfig<
    typeof safeCallbackABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link safeCallbackABI}__.
 */
export function useSafeCallbackWrite<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof safeCallbackABI, string>["request"]["abi"],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof safeCallbackABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof safeCallbackABI, TFunctionName, TMode>({ abi: safeCallbackABI, ...config } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link safeCallbackABI}__ and `functionName` set to `"unlockCallback"`.
 */
export function useSafeCallbackUnlockCallback<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof safeCallbackABI, "unlockCallback">["request"]["abi"],
        "unlockCallback",
        TMode
      > & { functionName?: "unlockCallback" }
    : UseContractWriteConfig<typeof safeCallbackABI, "unlockCallback", TMode> & {
        abi?: never;
        functionName?: "unlockCallback";
      } = {} as any,
) {
  return useContractWrite<typeof safeCallbackABI, "unlockCallback", TMode>({
    abi: safeCallbackABI,
    functionName: "unlockCallback",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link safeCallbackABI}__.
 */
export function usePrepareSafeCallbackWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof safeCallbackABI, TFunctionName>, "abi"> = {} as any,
) {
  return usePrepareContractWrite({ abi: safeCallbackABI, ...config } as UsePrepareContractWriteConfig<
    typeof safeCallbackABI,
    TFunctionName
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link safeCallbackABI}__ and `functionName` set to `"unlockCallback"`.
 */
export function usePrepareSafeCallbackUnlockCallback(
  config: Omit<
    UsePrepareContractWriteConfig<typeof safeCallbackABI, "unlockCallback">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: safeCallbackABI,
    functionName: "unlockCallback",
    ...config,
  } as UsePrepareContractWriteConfig<typeof safeCallbackABI, "unlockCallback">);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stateLibraryABI}__.
 */
export function useStateLibraryRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof stateLibraryABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof stateLibraryABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: stateLibraryABI, ...config } as UseContractReadConfig<
    typeof stateLibraryABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stateLibraryABI}__ and `functionName` set to `"FEE_GROWTH_GLOBAL0_OFFSET"`.
 */
export function useStateLibraryFeeGrowthGlobal0Offset<
  TFunctionName extends "FEE_GROWTH_GLOBAL0_OFFSET",
  TSelectData = ReadContractResult<typeof stateLibraryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stateLibraryABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: stateLibraryABI,
    functionName: "FEE_GROWTH_GLOBAL0_OFFSET",
    ...config,
  } as UseContractReadConfig<typeof stateLibraryABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stateLibraryABI}__ and `functionName` set to `"FEE_GROWTH_GLOBAL1_OFFSET"`.
 */
export function useStateLibraryFeeGrowthGlobal1Offset<
  TFunctionName extends "FEE_GROWTH_GLOBAL1_OFFSET",
  TSelectData = ReadContractResult<typeof stateLibraryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stateLibraryABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: stateLibraryABI,
    functionName: "FEE_GROWTH_GLOBAL1_OFFSET",
    ...config,
  } as UseContractReadConfig<typeof stateLibraryABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stateLibraryABI}__ and `functionName` set to `"LIQUIDITY_OFFSET"`.
 */
export function useStateLibraryLiquidityOffset<
  TFunctionName extends "LIQUIDITY_OFFSET",
  TSelectData = ReadContractResult<typeof stateLibraryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stateLibraryABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: stateLibraryABI, functionName: "LIQUIDITY_OFFSET", ...config } as UseContractReadConfig<
    typeof stateLibraryABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stateLibraryABI}__ and `functionName` set to `"POOLS_SLOT"`.
 */
export function useStateLibraryPoolsSlot<
  TFunctionName extends "POOLS_SLOT",
  TSelectData = ReadContractResult<typeof stateLibraryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stateLibraryABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: stateLibraryABI, functionName: "POOLS_SLOT", ...config } as UseContractReadConfig<
    typeof stateLibraryABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stateLibraryABI}__ and `functionName` set to `"POSITIONS_OFFSET"`.
 */
export function useStateLibraryPositionsOffset<
  TFunctionName extends "POSITIONS_OFFSET",
  TSelectData = ReadContractResult<typeof stateLibraryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stateLibraryABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: stateLibraryABI, functionName: "POSITIONS_OFFSET", ...config } as UseContractReadConfig<
    typeof stateLibraryABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stateLibraryABI}__ and `functionName` set to `"TICKS_OFFSET"`.
 */
export function useStateLibraryTicksOffset<
  TFunctionName extends "TICKS_OFFSET",
  TSelectData = ReadContractResult<typeof stateLibraryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stateLibraryABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: stateLibraryABI, functionName: "TICKS_OFFSET", ...config } as UseContractReadConfig<
    typeof stateLibraryABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link stateLibraryABI}__ and `functionName` set to `"TICK_BITMAP_OFFSET"`.
 */
export function useStateLibraryTickBitmapOffset<
  TFunctionName extends "TICK_BITMAP_OFFSET",
  TSelectData = ReadContractResult<typeof stateLibraryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof stateLibraryABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({
    abi: stateLibraryABI,
    functionName: "TICK_BITMAP_OFFSET",
    ...config,
  } as UseContractReadConfig<typeof stateLibraryABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link swapRouterNoChecksABI}__.
 */
export function useSwapRouterNoChecksRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof swapRouterNoChecksABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof swapRouterNoChecksABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: swapRouterNoChecksABI, ...config } as UseContractReadConfig<
    typeof swapRouterNoChecksABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link swapRouterNoChecksABI}__ and `functionName` set to `"manager"`.
 */
export function useSwapRouterNoChecksManager<
  TFunctionName extends "manager",
  TSelectData = ReadContractResult<typeof swapRouterNoChecksABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof swapRouterNoChecksABI, TFunctionName, TSelectData>,
    "abi" | "functionName"
  > = {} as any,
) {
  return useContractRead({ abi: swapRouterNoChecksABI, functionName: "manager", ...config } as UseContractReadConfig<
    typeof swapRouterNoChecksABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link swapRouterNoChecksABI}__.
 */
export function useSwapRouterNoChecksWrite<TFunctionName extends string, TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof swapRouterNoChecksABI, string>["request"]["abi"],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof swapRouterNoChecksABI, TFunctionName, TMode> & {
        abi?: never;
      } = {} as any,
) {
  return useContractWrite<typeof swapRouterNoChecksABI, TFunctionName, TMode>({
    abi: swapRouterNoChecksABI,
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link swapRouterNoChecksABI}__ and `functionName` set to `"swap"`.
 */
export function useSwapRouterNoChecksSwap<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof swapRouterNoChecksABI, "swap">["request"]["abi"],
        "swap",
        TMode
      > & { functionName?: "swap" }
    : UseContractWriteConfig<typeof swapRouterNoChecksABI, "swap", TMode> & {
        abi?: never;
        functionName?: "swap";
      } = {} as any,
) {
  return useContractWrite<typeof swapRouterNoChecksABI, "swap", TMode>({
    abi: swapRouterNoChecksABI,
    functionName: "swap",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link swapRouterNoChecksABI}__ and `functionName` set to `"unlockCallback"`.
 */
export function useSwapRouterNoChecksUnlockCallback<TMode extends WriteContractMode = undefined>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof swapRouterNoChecksABI, "unlockCallback">["request"]["abi"],
        "unlockCallback",
        TMode
      > & { functionName?: "unlockCallback" }
    : UseContractWriteConfig<typeof swapRouterNoChecksABI, "unlockCallback", TMode> & {
        abi?: never;
        functionName?: "unlockCallback";
      } = {} as any,
) {
  return useContractWrite<typeof swapRouterNoChecksABI, "unlockCallback", TMode>({
    abi: swapRouterNoChecksABI,
    functionName: "unlockCallback",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link swapRouterNoChecksABI}__.
 */
export function usePrepareSwapRouterNoChecksWrite<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof swapRouterNoChecksABI, TFunctionName>, "abi"> = {} as any,
) {
  return usePrepareContractWrite({ abi: swapRouterNoChecksABI, ...config } as UsePrepareContractWriteConfig<
    typeof swapRouterNoChecksABI,
    TFunctionName
  >);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link swapRouterNoChecksABI}__ and `functionName` set to `"swap"`.
 */
export function usePrepareSwapRouterNoChecksSwap(
  config: Omit<UsePrepareContractWriteConfig<typeof swapRouterNoChecksABI, "swap">, "abi" | "functionName"> = {} as any,
) {
  return usePrepareContractWrite({
    abi: swapRouterNoChecksABI,
    functionName: "swap",
    ...config,
  } as UsePrepareContractWriteConfig<typeof swapRouterNoChecksABI, "swap">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link swapRouterNoChecksABI}__ and `functionName` set to `"unlockCallback"`.
 */
export function usePrepareSwapRouterNoChecksUnlockCallback(
  config: Omit<
    UsePrepareContractWriteConfig<typeof swapRouterNoChecksABI, "unlockCallback">,
    "abi" | "functionName"
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: swapRouterNoChecksABI,
    functionName: "unlockCallback",
    ...config,
  } as UsePrepareContractWriteConfig<typeof swapRouterNoChecksABI, "unlockCallback">);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link testABI}__.
 */
export function useTestRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof testABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof testABI, TFunctionName, TSelectData>, "abi"> = {} as any) {
  return useContractRead({ abi: testABI, ...config } as UseContractReadConfig<
    typeof testABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link testABI}__ and `functionName` set to `"IS_TEST"`.
 */
export function useTestIsTest<
  TFunctionName extends "IS_TEST",
  TSelectData = ReadContractResult<typeof testABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof testABI, TFunctionName, TSelectData>, "abi" | "functionName"> = {} as any) {
  return useContractRead({ abi: testABI, functionName: "IS_TEST", ...config } as UseContractReadConfig<
    typeof testABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link testABI}__ and `functionName` set to `"excludeArtifacts"`.
 */
export function useTestExcludeArtifacts<
  TFunctionName extends "excludeArtifacts",
  TSelectData = ReadContractResult<typeof testABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof testABI, TFunctionName, TSelectData>, "abi" | "functionName"> = {} as any) {
  return useContractRead({ abi: testABI, functionName: "excludeArtifacts", ...config } as UseContractReadConfig<
    typeof testABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link testABI}__ and `functionName` set to `"excludeContracts"`.
 */
export function useTestExcludeContracts<
  TFunctionName extends "excludeContracts",
  TSelectData = ReadContractResult<typeof testABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof testABI, TFunctionName, TSelectData>, "abi" | "functionName"> = {} as any) {
  return useContractRead({ abi: testABI, functionName: "excludeContracts", ...config } as UseContractReadConfig<
    typeof testABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link testABI}__ and `functionName` set to `"excludeSelectors"`.
 */
export function useTestExcludeSelectors<
  TFunctionName extends "excludeSelectors",
  TSelectData = ReadContractResult<typeof testABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof testABI, TFunctionName, TSelectData>, "abi" | "functionName"> = {} as any) {
  return useContractRead({ abi: testABI, functionName: "excludeSelectors", ...config } as UseContractReadConfig<
    typeof testABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link testABI}__ and `functionName` set to `"excludeSenders"`.
 */
export function useTestExcludeSenders<
  TFunctionName extends "excludeSenders",
  TSelectData = ReadContractResult<typeof testABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof testABI, TFunctionName, TSelectData>, "abi" | "functionName"> = {} as any) {
  return useContractRead({ abi: testABI, functionName: "excludeSenders", ...config } as UseContractReadConfig<
    typeof testABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link testABI}__ and `functionName` set to `"failed"`.
 */
export function useTestFailed<
  TFunctionName extends "failed",
  TSelectData = ReadContractResult<typeof testABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof testABI, TFunctionName, TSelectData>, "abi" | "functionName"> = {} as any) {
  return useContractRead({ abi: testABI, functionName: "failed", ...config } as UseContractReadConfig<
    typeof testABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link testABI}__ and `functionName` set to `"targetArtifactSelectors"`.
 */
export function useTestTargetArtifactSelectors<
  TFunctionName extends "targetArtifactSelectors",
  TSelectData = ReadContractResult<typeof testABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof testABI, TFunctionName, TSelectData>, "abi" | "functionName"> = {} as any) {
  return useContractRead({ abi: testABI, functionName: "targetArtifactSelectors", ...config } as UseContractReadConfig<
    typeof testABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link testABI}__ and `functionName` set to `"targetArtifacts"`.
 */
export function useTestTargetArtifacts<
  TFunctionName extends "targetArtifacts",
  TSelectData = ReadContractResult<typeof testABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof testABI, TFunctionName, TSelectData>, "abi" | "functionName"> = {} as any) {
  return useContractRead({ abi: testABI, functionName: "targetArtifacts", ...config } as UseContractReadConfig<
    typeof testABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link testABI}__ and `functionName` set to `"targetContracts"`.
 */
export function useTestTargetContracts<
  TFunctionName extends "targetContracts",
  TSelectData = ReadContractResult<typeof testABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof testABI, TFunctionName, TSelectData>, "abi" | "functionName"> = {} as any) {
  return useContractRead({ abi: testABI, functionName: "targetContracts", ...config } as UseContractReadConfig<
    typeof testABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link testABI}__ and `functionName` set to `"targetInterfaces"`.
 */
export function useTestTargetInterfaces<
  TFunctionName extends "targetInterfaces",
  TSelectData = ReadContractResult<typeof testABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof testABI, TFunctionName, TSelectData>, "abi" | "functionName"> = {} as any) {
  return useContractRead({ abi: testABI, functionName: "targetInterfaces", ...config } as UseContractReadConfig<
    typeof testABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link testABI}__ and `functionName` set to `"targetSelectors"`.
 */
export function useTestTargetSelectors<
  TFunctionName extends "targetSelectors",
  TSelectData = ReadContractResult<typeof testABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof testABI, TFunctionName, TSelectData>, "abi" | "functionName"> = {} as any) {
  return useContractRead({ abi: testABI, functionName: "targetSelectors", ...config } as UseContractReadConfig<
    typeof testABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link testABI}__ and `functionName` set to `"targetSenders"`.
 */
export function useTestTargetSenders<
  TFunctionName extends "targetSenders",
  TSelectData = ReadContractResult<typeof testABI, TFunctionName>,
>(config: Omit<UseContractReadConfig<typeof testABI, TFunctionName, TSelectData>, "abi" | "functionName"> = {} as any) {
  return useContractRead({ abi: testABI, functionName: "targetSenders", ...config } as UseContractReadConfig<
    typeof testABI,
    TFunctionName,
    TSelectData
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link testABI}__.
 */
export function useTestEvent<TEventName extends string>(
  config: Omit<UseContractEventConfig<typeof testABI, TEventName>, "abi"> = {} as any,
) {
  return useContractEvent({ abi: testABI, ...config } as UseContractEventConfig<typeof testABI, TEventName>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link testABI}__ and `eventName` set to `"log"`.
 */
export function useTestLogEvent(
  config: Omit<UseContractEventConfig<typeof testABI, "log">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: testABI, eventName: "log", ...config } as UseContractEventConfig<
    typeof testABI,
    "log"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link testABI}__ and `eventName` set to `"log_address"`.
 */
export function useTestLogAddressEvent(
  config: Omit<UseContractEventConfig<typeof testABI, "log_address">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: testABI, eventName: "log_address", ...config } as UseContractEventConfig<
    typeof testABI,
    "log_address"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link testABI}__ and `eventName` set to `"log_array"`.
 */
export function useTestLogArrayEvent(
  config: Omit<UseContractEventConfig<typeof testABI, "log_array">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: testABI, eventName: "log_array", ...config } as UseContractEventConfig<
    typeof testABI,
    "log_array"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link testABI}__ and `eventName` set to `"log_bytes"`.
 */
export function useTestLogBytesEvent(
  config: Omit<UseContractEventConfig<typeof testABI, "log_bytes">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: testABI, eventName: "log_bytes", ...config } as UseContractEventConfig<
    typeof testABI,
    "log_bytes"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link testABI}__ and `eventName` set to `"log_bytes32"`.
 */
export function useTestLogBytes32Event(
  config: Omit<UseContractEventConfig<typeof testABI, "log_bytes32">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: testABI, eventName: "log_bytes32", ...config } as UseContractEventConfig<
    typeof testABI,
    "log_bytes32"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link testABI}__ and `eventName` set to `"log_int"`.
 */
export function useTestLogIntEvent(
  config: Omit<UseContractEventConfig<typeof testABI, "log_int">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: testABI, eventName: "log_int", ...config } as UseContractEventConfig<
    typeof testABI,
    "log_int"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link testABI}__ and `eventName` set to `"log_named_address"`.
 */
export function useTestLogNamedAddressEvent(
  config: Omit<UseContractEventConfig<typeof testABI, "log_named_address">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: testABI, eventName: "log_named_address", ...config } as UseContractEventConfig<
    typeof testABI,
    "log_named_address"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link testABI}__ and `eventName` set to `"log_named_array"`.
 */
export function useTestLogNamedArrayEvent(
  config: Omit<UseContractEventConfig<typeof testABI, "log_named_array">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: testABI, eventName: "log_named_array", ...config } as UseContractEventConfig<
    typeof testABI,
    "log_named_array"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link testABI}__ and `eventName` set to `"log_named_bytes"`.
 */
export function useTestLogNamedBytesEvent(
  config: Omit<UseContractEventConfig<typeof testABI, "log_named_bytes">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: testABI, eventName: "log_named_bytes", ...config } as UseContractEventConfig<
    typeof testABI,
    "log_named_bytes"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link testABI}__ and `eventName` set to `"log_named_bytes32"`.
 */
export function useTestLogNamedBytes32Event(
  config: Omit<UseContractEventConfig<typeof testABI, "log_named_bytes32">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: testABI, eventName: "log_named_bytes32", ...config } as UseContractEventConfig<
    typeof testABI,
    "log_named_bytes32"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link testABI}__ and `eventName` set to `"log_named_decimal_int"`.
 */
export function useTestLogNamedDecimalIntEvent(
  config: Omit<UseContractEventConfig<typeof testABI, "log_named_decimal_int">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: testABI, eventName: "log_named_decimal_int", ...config } as UseContractEventConfig<
    typeof testABI,
    "log_named_decimal_int"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link testABI}__ and `eventName` set to `"log_named_decimal_uint"`.
 */
export function useTestLogNamedDecimalUintEvent(
  config: Omit<UseContractEventConfig<typeof testABI, "log_named_decimal_uint">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: testABI, eventName: "log_named_decimal_uint", ...config } as UseContractEventConfig<
    typeof testABI,
    "log_named_decimal_uint"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link testABI}__ and `eventName` set to `"log_named_int"`.
 */
export function useTestLogNamedIntEvent(
  config: Omit<UseContractEventConfig<typeof testABI, "log_named_int">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: testABI, eventName: "log_named_int", ...config } as UseContractEventConfig<
    typeof testABI,
    "log_named_int"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link testABI}__ and `eventName` set to `"log_named_string"`.
 */
export function useTestLogNamedStringEvent(
  config: Omit<UseContractEventConfig<typeof testABI, "log_named_string">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: testABI, eventName: "log_named_string", ...config } as UseContractEventConfig<
    typeof testABI,
    "log_named_string"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link testABI}__ and `eventName` set to `"log_named_uint"`.
 */
export function useTestLogNamedUintEvent(
  config: Omit<UseContractEventConfig<typeof testABI, "log_named_uint">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: testABI, eventName: "log_named_uint", ...config } as UseContractEventConfig<
    typeof testABI,
    "log_named_uint"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link testABI}__ and `eventName` set to `"log_string"`.
 */
export function useTestLogStringEvent(
  config: Omit<UseContractEventConfig<typeof testABI, "log_string">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: testABI, eventName: "log_string", ...config } as UseContractEventConfig<
    typeof testABI,
    "log_string"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link testABI}__ and `eventName` set to `"log_uint"`.
 */
export function useTestLogUintEvent(
  config: Omit<UseContractEventConfig<typeof testABI, "log_uint">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: testABI, eventName: "log_uint", ...config } as UseContractEventConfig<
    typeof testABI,
    "log_uint"
  >);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link testABI}__ and `eventName` set to `"logs"`.
 */
export function useTestLogsEvent(
  config: Omit<UseContractEventConfig<typeof testABI, "logs">, "abi" | "eventName"> = {} as any,
) {
  return useContractEvent({ abi: testABI, eventName: "logs", ...config } as UseContractEventConfig<
    typeof testABI,
    "logs"
  >);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link token0ABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6aed99B81255c1d8D7b222A5F16290741B9DcD39)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x841B5A0b3DBc473c8A057E2391014aa4C4751351)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x73666807a1Ed304C2993C72D2b07434a4a561d26)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x5cbA23E581A5cBee77BE4E98Df0bCea74C0B5C9a)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5bA874E13D2Cf3161F89D1B1d1732D14226dBF16)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 */
export function useToken0Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof token0ABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof token0ABI, TFunctionName, TSelectData>, "abi" | "address"> & {
    chainId?: keyof typeof token0Address;
  } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: token0ABI,
    address: token0Address[chainId as keyof typeof token0Address],
    ...config,
  } as UseContractReadConfig<typeof token0ABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link token0ABI}__ and `functionName` set to `"allowance"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6aed99B81255c1d8D7b222A5F16290741B9DcD39)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x841B5A0b3DBc473c8A057E2391014aa4C4751351)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x73666807a1Ed304C2993C72D2b07434a4a561d26)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x5cbA23E581A5cBee77BE4E98Df0bCea74C0B5C9a)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5bA874E13D2Cf3161F89D1B1d1732D14226dBF16)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 */
export function useToken0Allowance<
  TFunctionName extends "allowance",
  TSelectData = ReadContractResult<typeof token0ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof token0ABI, TFunctionName, TSelectData>,
    "abi" | "address" | "functionName"
  > & { chainId?: keyof typeof token0Address } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: token0ABI,
    address: token0Address[chainId as keyof typeof token0Address],
    functionName: "allowance",
    ...config,
  } as UseContractReadConfig<typeof token0ABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link token0ABI}__ and `functionName` set to `"balanceOf"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6aed99B81255c1d8D7b222A5F16290741B9DcD39)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x841B5A0b3DBc473c8A057E2391014aa4C4751351)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x73666807a1Ed304C2993C72D2b07434a4a561d26)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x5cbA23E581A5cBee77BE4E98Df0bCea74C0B5C9a)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5bA874E13D2Cf3161F89D1B1d1732D14226dBF16)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 */
export function useToken0BalanceOf<
  TFunctionName extends "balanceOf",
  TSelectData = ReadContractResult<typeof token0ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof token0ABI, TFunctionName, TSelectData>,
    "abi" | "address" | "functionName"
  > & { chainId?: keyof typeof token0Address } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: token0ABI,
    address: token0Address[chainId as keyof typeof token0Address],
    functionName: "balanceOf",
    ...config,
  } as UseContractReadConfig<typeof token0ABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link token0ABI}__ and `functionName` set to `"decimals"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6aed99B81255c1d8D7b222A5F16290741B9DcD39)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x841B5A0b3DBc473c8A057E2391014aa4C4751351)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x73666807a1Ed304C2993C72D2b07434a4a561d26)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x5cbA23E581A5cBee77BE4E98Df0bCea74C0B5C9a)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5bA874E13D2Cf3161F89D1B1d1732D14226dBF16)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 */
export function useToken0Decimals<
  TFunctionName extends "decimals",
  TSelectData = ReadContractResult<typeof token0ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof token0ABI, TFunctionName, TSelectData>,
    "abi" | "address" | "functionName"
  > & { chainId?: keyof typeof token0Address } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: token0ABI,
    address: token0Address[chainId as keyof typeof token0Address],
    functionName: "decimals",
    ...config,
  } as UseContractReadConfig<typeof token0ABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link token0ABI}__ and `functionName` set to `"name"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6aed99B81255c1d8D7b222A5F16290741B9DcD39)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x841B5A0b3DBc473c8A057E2391014aa4C4751351)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x73666807a1Ed304C2993C72D2b07434a4a561d26)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x5cbA23E581A5cBee77BE4E98Df0bCea74C0B5C9a)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5bA874E13D2Cf3161F89D1B1d1732D14226dBF16)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 */
export function useToken0Name<
  TFunctionName extends "name",
  TSelectData = ReadContractResult<typeof token0ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof token0ABI, TFunctionName, TSelectData>,
    "abi" | "address" | "functionName"
  > & { chainId?: keyof typeof token0Address } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: token0ABI,
    address: token0Address[chainId as keyof typeof token0Address],
    functionName: "name",
    ...config,
  } as UseContractReadConfig<typeof token0ABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link token0ABI}__ and `functionName` set to `"symbol"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6aed99B81255c1d8D7b222A5F16290741B9DcD39)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x841B5A0b3DBc473c8A057E2391014aa4C4751351)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x73666807a1Ed304C2993C72D2b07434a4a561d26)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x5cbA23E581A5cBee77BE4E98Df0bCea74C0B5C9a)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5bA874E13D2Cf3161F89D1B1d1732D14226dBF16)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 */
export function useToken0Symbol<
  TFunctionName extends "symbol",
  TSelectData = ReadContractResult<typeof token0ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof token0ABI, TFunctionName, TSelectData>,
    "abi" | "address" | "functionName"
  > & { chainId?: keyof typeof token0Address } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: token0ABI,
    address: token0Address[chainId as keyof typeof token0Address],
    functionName: "symbol",
    ...config,
  } as UseContractReadConfig<typeof token0ABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link token0ABI}__ and `functionName` set to `"totalSupply"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6aed99B81255c1d8D7b222A5F16290741B9DcD39)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x841B5A0b3DBc473c8A057E2391014aa4C4751351)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x73666807a1Ed304C2993C72D2b07434a4a561d26)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x5cbA23E581A5cBee77BE4E98Df0bCea74C0B5C9a)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5bA874E13D2Cf3161F89D1B1d1732D14226dBF16)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 */
export function useToken0TotalSupply<
  TFunctionName extends "totalSupply",
  TSelectData = ReadContractResult<typeof token0ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof token0ABI, TFunctionName, TSelectData>,
    "abi" | "address" | "functionName"
  > & { chainId?: keyof typeof token0Address } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: token0ABI,
    address: token0Address[chainId as keyof typeof token0Address],
    functionName: "totalSupply",
    ...config,
  } as UseContractReadConfig<typeof token0ABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link token0ABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6aed99B81255c1d8D7b222A5F16290741B9DcD39)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x841B5A0b3DBc473c8A057E2391014aa4C4751351)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x73666807a1Ed304C2993C72D2b07434a4a561d26)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x5cbA23E581A5cBee77BE4E98Df0bCea74C0B5C9a)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5bA874E13D2Cf3161F89D1B1d1732D14226dBF16)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 */
export function useToken0Write<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof token0Address,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof token0ABI, string>["request"]["abi"],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof token0ABI, TFunctionName, TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
      } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof token0ABI, TFunctionName, TMode>({
    abi: token0ABI,
    address: token0Address[chainId as keyof typeof token0Address],
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link token0ABI}__ and `functionName` set to `"approve"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6aed99B81255c1d8D7b222A5F16290741B9DcD39)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x841B5A0b3DBc473c8A057E2391014aa4C4751351)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x73666807a1Ed304C2993C72D2b07434a4a561d26)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x5cbA23E581A5cBee77BE4E98Df0bCea74C0B5C9a)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5bA874E13D2Cf3161F89D1B1d1732D14226dBF16)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 */
export function useToken0Approve<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof token0Address,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof token0ABI, "approve">["request"]["abi"],
        "approve",
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: "approve" }
    : UseContractWriteConfig<typeof token0ABI, "approve", TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: "approve";
      } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof token0ABI, "approve", TMode>({
    abi: token0ABI,
    address: token0Address[chainId as keyof typeof token0Address],
    functionName: "approve",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link token0ABI}__ and `functionName` set to `"transfer"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6aed99B81255c1d8D7b222A5F16290741B9DcD39)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x841B5A0b3DBc473c8A057E2391014aa4C4751351)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x73666807a1Ed304C2993C72D2b07434a4a561d26)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x5cbA23E581A5cBee77BE4E98Df0bCea74C0B5C9a)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5bA874E13D2Cf3161F89D1B1d1732D14226dBF16)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 */
export function useToken0Transfer<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof token0Address,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof token0ABI, "transfer">["request"]["abi"],
        "transfer",
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: "transfer" }
    : UseContractWriteConfig<typeof token0ABI, "transfer", TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: "transfer";
      } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof token0ABI, "transfer", TMode>({
    abi: token0ABI,
    address: token0Address[chainId as keyof typeof token0Address],
    functionName: "transfer",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link token0ABI}__ and `functionName` set to `"transferFrom"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6aed99B81255c1d8D7b222A5F16290741B9DcD39)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x841B5A0b3DBc473c8A057E2391014aa4C4751351)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x73666807a1Ed304C2993C72D2b07434a4a561d26)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x5cbA23E581A5cBee77BE4E98Df0bCea74C0B5C9a)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5bA874E13D2Cf3161F89D1B1d1732D14226dBF16)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 */
export function useToken0TransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof token0Address,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof token0ABI, "transferFrom">["request"]["abi"],
        "transferFrom",
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: "transferFrom" }
    : UseContractWriteConfig<typeof token0ABI, "transferFrom", TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: "transferFrom";
      } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof token0ABI, "transferFrom", TMode>({
    abi: token0ABI,
    address: token0Address[chainId as keyof typeof token0Address],
    functionName: "transferFrom",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link token0ABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6aed99B81255c1d8D7b222A5F16290741B9DcD39)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x841B5A0b3DBc473c8A057E2391014aa4C4751351)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x73666807a1Ed304C2993C72D2b07434a4a561d26)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x5cbA23E581A5cBee77BE4E98Df0bCea74C0B5C9a)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5bA874E13D2Cf3161F89D1B1d1732D14226dBF16)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 */
export function usePrepareToken0Write<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof token0ABI, TFunctionName>, "abi" | "address"> & {
    chainId?: keyof typeof token0Address;
  } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: token0ABI,
    address: token0Address[chainId as keyof typeof token0Address],
    ...config,
  } as UsePrepareContractWriteConfig<typeof token0ABI, TFunctionName>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link token0ABI}__ and `functionName` set to `"approve"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6aed99B81255c1d8D7b222A5F16290741B9DcD39)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x841B5A0b3DBc473c8A057E2391014aa4C4751351)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x73666807a1Ed304C2993C72D2b07434a4a561d26)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x5cbA23E581A5cBee77BE4E98Df0bCea74C0B5C9a)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5bA874E13D2Cf3161F89D1B1d1732D14226dBF16)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 */
export function usePrepareToken0Approve(
  config: Omit<UsePrepareContractWriteConfig<typeof token0ABI, "approve">, "abi" | "address" | "functionName"> & {
    chainId?: keyof typeof token0Address;
  } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: token0ABI,
    address: token0Address[chainId as keyof typeof token0Address],
    functionName: "approve",
    ...config,
  } as UsePrepareContractWriteConfig<typeof token0ABI, "approve">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link token0ABI}__ and `functionName` set to `"transfer"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6aed99B81255c1d8D7b222A5F16290741B9DcD39)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x841B5A0b3DBc473c8A057E2391014aa4C4751351)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x73666807a1Ed304C2993C72D2b07434a4a561d26)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x5cbA23E581A5cBee77BE4E98Df0bCea74C0B5C9a)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5bA874E13D2Cf3161F89D1B1d1732D14226dBF16)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 */
export function usePrepareToken0Transfer(
  config: Omit<UsePrepareContractWriteConfig<typeof token0ABI, "transfer">, "abi" | "address" | "functionName"> & {
    chainId?: keyof typeof token0Address;
  } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: token0ABI,
    address: token0Address[chainId as keyof typeof token0Address],
    functionName: "transfer",
    ...config,
  } as UsePrepareContractWriteConfig<typeof token0ABI, "transfer">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link token0ABI}__ and `functionName` set to `"transferFrom"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6aed99B81255c1d8D7b222A5F16290741B9DcD39)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x841B5A0b3DBc473c8A057E2391014aa4C4751351)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x73666807a1Ed304C2993C72D2b07434a4a561d26)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x5cbA23E581A5cBee77BE4E98Df0bCea74C0B5C9a)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5bA874E13D2Cf3161F89D1B1d1732D14226dBF16)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 */
export function usePrepareToken0TransferFrom(
  config: Omit<UsePrepareContractWriteConfig<typeof token0ABI, "transferFrom">, "abi" | "address" | "functionName"> & {
    chainId?: keyof typeof token0Address;
  } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: token0ABI,
    address: token0Address[chainId as keyof typeof token0Address],
    functionName: "transferFrom",
    ...config,
  } as UsePrepareContractWriteConfig<typeof token0ABI, "transferFrom">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link token0ABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6aed99B81255c1d8D7b222A5F16290741B9DcD39)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x841B5A0b3DBc473c8A057E2391014aa4C4751351)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x73666807a1Ed304C2993C72D2b07434a4a561d26)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x5cbA23E581A5cBee77BE4E98Df0bCea74C0B5C9a)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5bA874E13D2Cf3161F89D1B1d1732D14226dBF16)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 */
export function useToken0Event<TEventName extends string>(
  config: Omit<UseContractEventConfig<typeof token0ABI, TEventName>, "abi" | "address"> & {
    chainId?: keyof typeof token0Address;
  } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractEvent({
    abi: token0ABI,
    address: token0Address[chainId as keyof typeof token0Address],
    ...config,
  } as UseContractEventConfig<typeof token0ABI, TEventName>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link token0ABI}__ and `eventName` set to `"Approval"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6aed99B81255c1d8D7b222A5F16290741B9DcD39)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x841B5A0b3DBc473c8A057E2391014aa4C4751351)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x73666807a1Ed304C2993C72D2b07434a4a561d26)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x5cbA23E581A5cBee77BE4E98Df0bCea74C0B5C9a)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5bA874E13D2Cf3161F89D1B1d1732D14226dBF16)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 */
export function useToken0ApprovalEvent(
  config: Omit<UseContractEventConfig<typeof token0ABI, "Approval">, "abi" | "address" | "eventName"> & {
    chainId?: keyof typeof token0Address;
  } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractEvent({
    abi: token0ABI,
    address: token0Address[chainId as keyof typeof token0Address],
    eventName: "Approval",
    ...config,
  } as UseContractEventConfig<typeof token0ABI, "Approval">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link token0ABI}__ and `eventName` set to `"Transfer"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6aed99B81255c1d8D7b222A5F16290741B9DcD39)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0xeb4708989b42f0cd327A6Bd8f76a931429137fd7)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x841B5A0b3DBc473c8A057E2391014aa4C4751351)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x73666807a1Ed304C2993C72D2b07434a4a561d26)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x5cbA23E581A5cBee77BE4E98Df0bCea74C0B5C9a)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5bA874E13D2Cf3161F89D1B1d1732D14226dBF16)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x615bCf3371F7daF8E8f7d26db10e12F0F4830C94)
 */
export function useToken0TransferEvent(
  config: Omit<UseContractEventConfig<typeof token0ABI, "Transfer">, "abi" | "address" | "eventName"> & {
    chainId?: keyof typeof token0Address;
  } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractEvent({
    abi: token0ABI,
    address: token0Address[chainId as keyof typeof token0Address],
    eventName: "Transfer",
    ...config,
  } as UseContractEventConfig<typeof token0ABI, "Transfer">);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link token1ABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x77513a96372816fBD0Ab84D897cF261656208B18)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xFB3e0C6F74eB1a21CC1Da29aeC80D2Dfe6C9a317)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x482Bf489989ea9c40aC978739E11f1699384dd7F)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5C038EE8AB7bD7699037E277874F1c611aD0C28F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 */
export function useToken1Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof token1ABI, TFunctionName>,
>(
  config: Omit<UseContractReadConfig<typeof token1ABI, TFunctionName, TSelectData>, "abi" | "address"> & {
    chainId?: keyof typeof token1Address;
  } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: token1ABI,
    address: token1Address[chainId as keyof typeof token1Address],
    ...config,
  } as UseContractReadConfig<typeof token1ABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link token1ABI}__ and `functionName` set to `"allowance"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x77513a96372816fBD0Ab84D897cF261656208B18)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xFB3e0C6F74eB1a21CC1Da29aeC80D2Dfe6C9a317)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x482Bf489989ea9c40aC978739E11f1699384dd7F)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5C038EE8AB7bD7699037E277874F1c611aD0C28F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 */
export function useToken1Allowance<
  TFunctionName extends "allowance",
  TSelectData = ReadContractResult<typeof token1ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof token1ABI, TFunctionName, TSelectData>,
    "abi" | "address" | "functionName"
  > & { chainId?: keyof typeof token1Address } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: token1ABI,
    address: token1Address[chainId as keyof typeof token1Address],
    functionName: "allowance",
    ...config,
  } as UseContractReadConfig<typeof token1ABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link token1ABI}__ and `functionName` set to `"balanceOf"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x77513a96372816fBD0Ab84D897cF261656208B18)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xFB3e0C6F74eB1a21CC1Da29aeC80D2Dfe6C9a317)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x482Bf489989ea9c40aC978739E11f1699384dd7F)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5C038EE8AB7bD7699037E277874F1c611aD0C28F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 */
export function useToken1BalanceOf<
  TFunctionName extends "balanceOf",
  TSelectData = ReadContractResult<typeof token1ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof token1ABI, TFunctionName, TSelectData>,
    "abi" | "address" | "functionName"
  > & { chainId?: keyof typeof token1Address } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: token1ABI,
    address: token1Address[chainId as keyof typeof token1Address],
    functionName: "balanceOf",
    ...config,
  } as UseContractReadConfig<typeof token1ABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link token1ABI}__ and `functionName` set to `"decimals"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x77513a96372816fBD0Ab84D897cF261656208B18)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xFB3e0C6F74eB1a21CC1Da29aeC80D2Dfe6C9a317)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x482Bf489989ea9c40aC978739E11f1699384dd7F)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5C038EE8AB7bD7699037E277874F1c611aD0C28F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 */
export function useToken1Decimals<
  TFunctionName extends "decimals",
  TSelectData = ReadContractResult<typeof token1ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof token1ABI, TFunctionName, TSelectData>,
    "abi" | "address" | "functionName"
  > & { chainId?: keyof typeof token1Address } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: token1ABI,
    address: token1Address[chainId as keyof typeof token1Address],
    functionName: "decimals",
    ...config,
  } as UseContractReadConfig<typeof token1ABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link token1ABI}__ and `functionName` set to `"name"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x77513a96372816fBD0Ab84D897cF261656208B18)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xFB3e0C6F74eB1a21CC1Da29aeC80D2Dfe6C9a317)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x482Bf489989ea9c40aC978739E11f1699384dd7F)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5C038EE8AB7bD7699037E277874F1c611aD0C28F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 */
export function useToken1Name<
  TFunctionName extends "name",
  TSelectData = ReadContractResult<typeof token1ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof token1ABI, TFunctionName, TSelectData>,
    "abi" | "address" | "functionName"
  > & { chainId?: keyof typeof token1Address } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: token1ABI,
    address: token1Address[chainId as keyof typeof token1Address],
    functionName: "name",
    ...config,
  } as UseContractReadConfig<typeof token1ABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link token1ABI}__ and `functionName` set to `"symbol"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x77513a96372816fBD0Ab84D897cF261656208B18)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xFB3e0C6F74eB1a21CC1Da29aeC80D2Dfe6C9a317)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x482Bf489989ea9c40aC978739E11f1699384dd7F)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5C038EE8AB7bD7699037E277874F1c611aD0C28F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 */
export function useToken1Symbol<
  TFunctionName extends "symbol",
  TSelectData = ReadContractResult<typeof token1ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof token1ABI, TFunctionName, TSelectData>,
    "abi" | "address" | "functionName"
  > & { chainId?: keyof typeof token1Address } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: token1ABI,
    address: token1Address[chainId as keyof typeof token1Address],
    functionName: "symbol",
    ...config,
  } as UseContractReadConfig<typeof token1ABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link token1ABI}__ and `functionName` set to `"totalSupply"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x77513a96372816fBD0Ab84D897cF261656208B18)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xFB3e0C6F74eB1a21CC1Da29aeC80D2Dfe6C9a317)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x482Bf489989ea9c40aC978739E11f1699384dd7F)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5C038EE8AB7bD7699037E277874F1c611aD0C28F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 */
export function useToken1TotalSupply<
  TFunctionName extends "totalSupply",
  TSelectData = ReadContractResult<typeof token1ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof token1ABI, TFunctionName, TSelectData>,
    "abi" | "address" | "functionName"
  > & { chainId?: keyof typeof token1Address } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractRead({
    abi: token1ABI,
    address: token1Address[chainId as keyof typeof token1Address],
    functionName: "totalSupply",
    ...config,
  } as UseContractReadConfig<typeof token1ABI, TFunctionName, TSelectData>);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link token1ABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x77513a96372816fBD0Ab84D897cF261656208B18)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xFB3e0C6F74eB1a21CC1Da29aeC80D2Dfe6C9a317)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x482Bf489989ea9c40aC978739E11f1699384dd7F)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5C038EE8AB7bD7699037E277874F1c611aD0C28F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 */
export function useToken1Write<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof token1Address,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof token1ABI, string>["request"]["abi"],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof token1ABI, TFunctionName, TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
      } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof token1ABI, TFunctionName, TMode>({
    abi: token1ABI,
    address: token1Address[chainId as keyof typeof token1Address],
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link token1ABI}__ and `functionName` set to `"approve"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x77513a96372816fBD0Ab84D897cF261656208B18)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xFB3e0C6F74eB1a21CC1Da29aeC80D2Dfe6C9a317)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x482Bf489989ea9c40aC978739E11f1699384dd7F)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5C038EE8AB7bD7699037E277874F1c611aD0C28F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 */
export function useToken1Approve<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof token1Address,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof token1ABI, "approve">["request"]["abi"],
        "approve",
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: "approve" }
    : UseContractWriteConfig<typeof token1ABI, "approve", TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: "approve";
      } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof token1ABI, "approve", TMode>({
    abi: token1ABI,
    address: token1Address[chainId as keyof typeof token1Address],
    functionName: "approve",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link token1ABI}__ and `functionName` set to `"transfer"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x77513a96372816fBD0Ab84D897cF261656208B18)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xFB3e0C6F74eB1a21CC1Da29aeC80D2Dfe6C9a317)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x482Bf489989ea9c40aC978739E11f1699384dd7F)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5C038EE8AB7bD7699037E277874F1c611aD0C28F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 */
export function useToken1Transfer<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof token1Address,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof token1ABI, "transfer">["request"]["abi"],
        "transfer",
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: "transfer" }
    : UseContractWriteConfig<typeof token1ABI, "transfer", TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: "transfer";
      } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof token1ABI, "transfer", TMode>({
    abi: token1ABI,
    address: token1Address[chainId as keyof typeof token1Address],
    functionName: "transfer",
    ...config,
  } as any);
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link token1ABI}__ and `functionName` set to `"transferFrom"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x77513a96372816fBD0Ab84D897cF261656208B18)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xFB3e0C6F74eB1a21CC1Da29aeC80D2Dfe6C9a317)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x482Bf489989ea9c40aC978739E11f1699384dd7F)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5C038EE8AB7bD7699037E277874F1c611aD0C28F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 */
export function useToken1TransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof token1Address,
>(
  config: TMode extends "prepared"
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof token1ABI, "transferFrom">["request"]["abi"],
        "transferFrom",
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: "transferFrom" }
    : UseContractWriteConfig<typeof token1ABI, "transferFrom", TMode> & {
        abi?: never;
        address?: never;
        chainId?: TChainId;
        functionName?: "transferFrom";
      } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractWrite<typeof token1ABI, "transferFrom", TMode>({
    abi: token1ABI,
    address: token1Address[chainId as keyof typeof token1Address],
    functionName: "transferFrom",
    ...config,
  } as any);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link token1ABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x77513a96372816fBD0Ab84D897cF261656208B18)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xFB3e0C6F74eB1a21CC1Da29aeC80D2Dfe6C9a317)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x482Bf489989ea9c40aC978739E11f1699384dd7F)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5C038EE8AB7bD7699037E277874F1c611aD0C28F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 */
export function usePrepareToken1Write<TFunctionName extends string>(
  config: Omit<UsePrepareContractWriteConfig<typeof token1ABI, TFunctionName>, "abi" | "address"> & {
    chainId?: keyof typeof token1Address;
  } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: token1ABI,
    address: token1Address[chainId as keyof typeof token1Address],
    ...config,
  } as UsePrepareContractWriteConfig<typeof token1ABI, TFunctionName>);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link token1ABI}__ and `functionName` set to `"approve"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x77513a96372816fBD0Ab84D897cF261656208B18)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xFB3e0C6F74eB1a21CC1Da29aeC80D2Dfe6C9a317)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x482Bf489989ea9c40aC978739E11f1699384dd7F)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5C038EE8AB7bD7699037E277874F1c611aD0C28F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 */
export function usePrepareToken1Approve(
  config: Omit<UsePrepareContractWriteConfig<typeof token1ABI, "approve">, "abi" | "address" | "functionName"> & {
    chainId?: keyof typeof token1Address;
  } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: token1ABI,
    address: token1Address[chainId as keyof typeof token1Address],
    functionName: "approve",
    ...config,
  } as UsePrepareContractWriteConfig<typeof token1ABI, "approve">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link token1ABI}__ and `functionName` set to `"transfer"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x77513a96372816fBD0Ab84D897cF261656208B18)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xFB3e0C6F74eB1a21CC1Da29aeC80D2Dfe6C9a317)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x482Bf489989ea9c40aC978739E11f1699384dd7F)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5C038EE8AB7bD7699037E277874F1c611aD0C28F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 */
export function usePrepareToken1Transfer(
  config: Omit<UsePrepareContractWriteConfig<typeof token1ABI, "transfer">, "abi" | "address" | "functionName"> & {
    chainId?: keyof typeof token1Address;
  } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: token1ABI,
    address: token1Address[chainId as keyof typeof token1Address],
    functionName: "transfer",
    ...config,
  } as UsePrepareContractWriteConfig<typeof token1ABI, "transfer">);
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link token1ABI}__ and `functionName` set to `"transferFrom"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x77513a96372816fBD0Ab84D897cF261656208B18)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xFB3e0C6F74eB1a21CC1Da29aeC80D2Dfe6C9a317)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x482Bf489989ea9c40aC978739E11f1699384dd7F)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5C038EE8AB7bD7699037E277874F1c611aD0C28F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 */
export function usePrepareToken1TransferFrom(
  config: Omit<UsePrepareContractWriteConfig<typeof token1ABI, "transferFrom">, "abi" | "address" | "functionName"> & {
    chainId?: keyof typeof token1Address;
  } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return usePrepareContractWrite({
    abi: token1ABI,
    address: token1Address[chainId as keyof typeof token1Address],
    functionName: "transferFrom",
    ...config,
  } as UsePrepareContractWriteConfig<typeof token1ABI, "transferFrom">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link token1ABI}__.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x77513a96372816fBD0Ab84D897cF261656208B18)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xFB3e0C6F74eB1a21CC1Da29aeC80D2Dfe6C9a317)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x482Bf489989ea9c40aC978739E11f1699384dd7F)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5C038EE8AB7bD7699037E277874F1c611aD0C28F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 */
export function useToken1Event<TEventName extends string>(
  config: Omit<UseContractEventConfig<typeof token1ABI, TEventName>, "abi" | "address"> & {
    chainId?: keyof typeof token1Address;
  } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractEvent({
    abi: token1ABI,
    address: token1Address[chainId as keyof typeof token1Address],
    ...config,
  } as UseContractEventConfig<typeof token1ABI, TEventName>);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link token1ABI}__ and `eventName` set to `"Approval"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x77513a96372816fBD0Ab84D897cF261656208B18)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xFB3e0C6F74eB1a21CC1Da29aeC80D2Dfe6C9a317)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x482Bf489989ea9c40aC978739E11f1699384dd7F)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5C038EE8AB7bD7699037E277874F1c611aD0C28F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 */
export function useToken1ApprovalEvent(
  config: Omit<UseContractEventConfig<typeof token1ABI, "Approval">, "abi" | "address" | "eventName"> & {
    chainId?: keyof typeof token1Address;
  } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractEvent({
    abi: token1ABI,
    address: token1Address[chainId as keyof typeof token1Address],
    eventName: "Approval",
    ...config,
  } as UseContractEventConfig<typeof token1ABI, "Approval">);
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link token1ABI}__ and `eventName` set to `"Transfer"`.
 *
 * - [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x77513a96372816fBD0Ab84D897cF261656208B18)
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * - [__View Contract on Polygon Zk Evm Testnet Polygon Scan__](https://testnet-zkevm.polygonscan.com/address/0x5Bf9FAbb0d56515658b7d5CC4B1F5c4EaED09e49)
 * -
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xFB3e0C6F74eB1a21CC1Da29aeC80D2Dfe6C9a317)
 * - [__View Contract on Base Goerli Basescan__](https://goerli.basescan.org/address/0x482Bf489989ea9c40aC978739E11f1699384dd7F)
 * - [__View Contract on Arbitrum Goerli Arbiscan__](https://goerli.arbiscan.io/address/0x84642fEf6ef575e3B2f4d7C72022F24AB9C9Ffa6)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x5C038EE8AB7bD7699037E277874F1c611aD0C28F)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3D5e538D212b05bc4b3F70520189AA3dEA588B1E)
 */
export function useToken1TransferEvent(
  config: Omit<UseContractEventConfig<typeof token1ABI, "Transfer">, "abi" | "address" | "eventName"> & {
    chainId?: keyof typeof token1Address;
  } = {} as any,
) {
  const { chain } = useNetwork();
  const defaultChainId = useChainId();
  const chainId = config.chainId ?? chain?.id ?? defaultChainId;
  return useContractEvent({
    abi: token1ABI,
    address: token1Address[chainId as keyof typeof token1Address],
    eventName: "Transfer",
    ...config,
  } as UseContractEventConfig<typeof token1ABI, "Transfer">);
}
