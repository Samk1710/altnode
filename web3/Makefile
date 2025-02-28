-include .env

# Paths
JSON_FILE = broadcast/Altnode.s.sol/57054/run-latest.json
CONTRACT_ADDRESS = $(shell jq -r '.transactions[0].contractAddress' $(JSON_FILE))
ALT_TOKENS_ADDRESS = $(shell jq -r '.transactions[0].contractAddress' broadcast/AltTokens.s.sol/57054/run-latest.json)

compile:
	forge compile src/Altnode.sol:Altnode --optimize

deploy:
	forge script script/Altnode.s.sol:AltnodeScript --rpc-url $(RPC_URL_SONIC) --private-key $(PRIVATE_KEY) --broadcast

verify:
	forge verify-contract $(CONTRACT_ADDRESS) --etherscan-api-key $(ETHERSCAN_API_KEY) src/Altnode.sol:Altnode --chain 57054 --watch

deploy-token:
	forge script script/AltTokens.s.sol:AltnodeTokenScript --rpc-url $(RPC_URL_SONIC) --private-key $(PRIVATE_KEY) --broadcast

verify-token:
	forge verify-contract $(ALT_TOKENS_ADDRESS) --etherscan-api-key $(ETHERSCAN_API_KEY) src/AltTokens.sol:AltTokens --chain 421614 --watch
