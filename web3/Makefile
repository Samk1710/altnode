-include .env

# Paths
JSON_FILE = broadcast/Altnode.s.sol/84532/run-latest.json
CONTRACT_ADDRESS = $(shell jq -r '.transactions[0].contractAddress' $(JSON_FILE))

compile:
	forge compile src/Altnode.sol:Altnode --optimize

deploy:
	forge script script/Altnode.s.sol:AltnodeScript --rpc-url $(RPC_URL_BASE) --private-key $(PRIVATE_KEY) --broadcast

verify:
	forge verify-contract $(CONTRACT_ADDRESS) --etherscan-api-key $(ETHERSCAN_API_KEY) src/Altnode.sol:Altnode --chain 84532 --watch
