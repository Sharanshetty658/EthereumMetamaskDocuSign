export const address = "0xf1cd32768890f8a9404e048580848299d0767cb1";
export const abi = [
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "_created_at",
				"type": "uint32"
			},
			{
				"internalType": "uint256",
				"name": "_hashed",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_detail",
				"type": "string"
			}
		],
		"name": "store",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Contracts",
		"outputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "uint32",
				"name": "created_at",
				"type": "uint32"
			},
			{
				"internalType": "uint256",
				"name": "hashed",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "detail",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "numContract",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "retrieve",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "user",
						"type": "address"
					},
					{
						"internalType": "uint32",
						"name": "created_at",
						"type": "uint32"
					},
					{
						"internalType": "uint256",
						"name": "hashed",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "detail",
						"type": "string"
					}
				],
				"internalType": "struct openThaiContract.Contract",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "retrieveAll",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "user",
						"type": "address"
					},
					{
						"internalType": "uint32",
						"name": "created_at",
						"type": "uint32"
					},
					{
						"internalType": "uint256",
						"name": "hashed",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "detail",
						"type": "string"
					}
				],
				"internalType": "struct openThaiContract.Contract[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "wave",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	}
]