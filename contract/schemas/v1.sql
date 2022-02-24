-- Store the location of the contract on various networks (mainnet, Gorli, etc.)
CREATE TABLE IF NOT EXISTS wager_contract_address (
  TEXT network,
  TEXT address
);

-- Store each wager as it was constructed, rely on chain for state?
CREATE TABLE IF NOT EXISTS wagers (
  TEXT network,
  TEXT address,
  TEXT owner,
  TEXT proposition,
  INTEGER bettor_count,
  INTEGER state,
  TEXT wager_config_json -- this contains the rest of the initial contract data
);
