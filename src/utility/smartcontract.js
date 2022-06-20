export const address = "0x0e56a578758bcc862c8a8648e0609199404d9d1c";
export const abi = [
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
				"internalType": "string",
				"name": "created_at",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "hashed",
				"type": "string"
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
						"internalType": "string",
						"name": "created_at",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "hashed",
						"type": "string"
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
						"internalType": "string",
						"name": "created_at",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "hashed",
						"type": "string"
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
		"inputs": [
			{
				"internalType": "string",
				"name": "_created_at",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_hashed",
				"type": "string"
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