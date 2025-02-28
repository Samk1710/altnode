compile:
	npx hardhat compile

deploy:
	npx hardhat run ignition/modules/AltNode.ts --network sonicTestnet

verify:
	npx hardhat verify --network sonicTestnet 0x9d0e07732Bc3db8DD91110aA970abC26B11D0DF8

deploy-token:
	npx hardhat run ignition/modules/token.ts --network sonicTestnet

verify-token:
	npx hardhat verify --network sonicTestnet 0x49E8c60458f7938D63164D2c115E07D58a64De64

deploy-accessControl:
	npx hardhat run ignition/modules/AccessControl.ts --network baseSepolia

verify-accessControl:
	npx hardhat verify --network baseSepolia 0x438E8847Eff0AB47b4a626B5Bb4F4e28b85cb0e1
