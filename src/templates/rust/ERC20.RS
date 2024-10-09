use stylus_sdk::prelude::*;

#[derive(storage::Storage)]
struct ERC20 {
    name: storage::String,
    symbol: storage::String,
    total_supply: U256,
    balances: storage::Mapping<Address, U256>,
    allowances: storage::Mapping<(Address, Address), U256>,
}

impl ERC20 {
    pub fn new(name: &str, symbol: &str, total_supply: U256) -> Self {
        let mut contract = Self {
            name: storage::String::new(),
            symbol: storage::String::new(),
            total_supply,
            balances: storage::Mapping::new(),
            allowances: storage::Mapping::new(),
        };
        contract.name.set(name);
        contract.symbol.set(symbol);
        contract.balances.insert(msg::sender(), total_supply);
        contract
    }

    // ... (transfer, approve, transfer_from functions would go here)
}
