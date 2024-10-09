export function generateCode(template, parameters) {
  switch (template) {
    case 'ERC20':
      return generateERC20(parameters);
    case 'ERC721':
      return generateERC721(parameters);
    default:
      return { solidity: '// Unsupported template', rust: '// Unsupported template' };
  }
}

function generateERC20(parameters) {
  const { name, symbol, totalSupply } = parameters;

  const solidityCode = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ${name}Token {
    string public name = "${name}";
    string public symbol = "${symbol}";
    uint256 public totalSupply = ${totalSupply};

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address to, uint256 value) public returns (bool success) {
        require(balanceOf[msg.sender] >= value);
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }

    function approve(address spender, uint256 value) public returns (bool success) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) public returns (bool success) {
        require(value <= balanceOf[from]);
        require(value <= allowance[from][msg.sender]);
        balanceOf[from] -= value;
        balanceOf[to] += value;
        allowance[from][msg.sender] -= value;
        emit Transfer(from, to, value);
        return true;
    }
}
`;

  const rustCode = `
use stylus_sdk::prelude::*;

#[derive(storage::Storage)]
pub struct ${name}Token {
    name: storage::String,
    symbol: storage::String,
    total_supply: U256,
    balances: storage::Mapping<Address, U256>,
    allowances: storage::Mapping<(Address, Address), U256>,
}

#[external]
impl ${name}Token {
    pub fn new() -> Self {
        let mut contract = Self {
            name: storage::String::new(),
            symbol: storage::String::new(),
            total_supply: U256::from(${totalSupply}),
            balances: storage::Mapping::new(),
            allowances: storage::Mapping::new(),
        };
        contract.name.set("${name}");
        contract.symbol.set("${symbol}");
        contract.balances.insert(msg::sender(), contract.total_supply);
        contract
    }

    pub fn transfer(&mut self, to: Address, value: U256) -> bool {
        let from = msg::sender();
        let from_balance = self.balances.get(&from).unwrap_or_default();
        require!(from_balance >= value, "Insufficient balance");
        self.balances.insert(from, from_balance - value);
        let to_balance = self.balances.get(&to).unwrap_or_default();
        self.balances.insert(to, to_balance + value);
        evm::log(Transfer { from, to, value });
        true
    }

    pub fn approve(&mut self, spender: Address, value: U256) -> bool {
        let owner = msg::sender();
        self.allowances.insert((owner, spender), value);
        evm::log(Approval { owner, spender, value });
        true
    }

    pub fn transfer_from(&mut self, from: Address, to: Address, value: U256) -> bool {
        let spender = msg::sender();
        let from_balance = self.balances.get(&from).unwrap_or_default();
        let allowed = self.allowances.get(&(from, spender)).unwrap_or_default();
        require!(from_balance >= value, "Insufficient balance");
        require!(allowed >= value, "Insufficient allowance");
        self.balances.insert(from, from_balance - value);
        let to_balance = self.balances.get(&to).unwrap_or_default();
        self.balances.insert(to, to_balance + value);
        self.allowances.insert((from, spender), allowed - value);
        evm::log(Transfer { from, to, value });
        true
    }
}

#[derive(solidity::Event)]
struct Transfer {
    #[indexed]
    from: Address,
    #[indexed]
    to: Address,
    value: U256,
}

#[derive(solidity::Event)]
struct Approval {
    #[indexed]
    owner: Address,
    #[indexed]
    spender: Address,
    value: U256,
}
`;

  return { solidity: solidityCode, rust: rustCode };
}

function generateERC721(parameters) {
  // Implement ERC721 generation here
  // This is a placeholder and should be implemented similarly to ERC20
  return {
    solidity: `// ERC721 contract for ${parameters.name} (${parameters.symbol})`,
    rust: `// ERC721 contract for ${parameters.name} (${parameters.symbol})`,
  };
}