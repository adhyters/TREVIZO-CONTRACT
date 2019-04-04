pragma solidity ^0.4.23;

import "./TRC20.sol";
import "./TRC20Capped.sol";
import "./TRC20Burnable.sol";
import "./TRC20Detailed.sol";
import "./../../ownership/Ownable.sol";

contract TVZ is TRC20Detailed, TRC20Capped, Ownable  {

    string constant _name = "TREVIZO";
    string constant _symbol = "TVZ";
    uint8 constant _decimals = 6;
    uint256 constant _totalSupply = 999999000 * (10 ** uint256(_decimals));

    constructor()
        TRC20Detailed(_name, _symbol, _decimals)
        TRC20Capped(_totalSupply)
        public {
        _mint(msg.sender, _totalSupply);
    }
}
