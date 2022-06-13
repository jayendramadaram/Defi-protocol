//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SimpleToken
 * @dev Very simple ERC20 Token example, where all tokens are pre-assigned to the creator.
 * Note they can later distribute these tokens as they wish using `transfer` and other
 * `ERC20` functions.
 */
contract USN is ERC20  {
    

    /**
     * @dev Constructor that gives msg.sender all of existing tokens.
     */
    constructor ()  ERC20("USN", "USN") {
        _mint(msg.sender, 100 * (10 ** uint256(decimals())));
    }
    function MintMore() public {
        _mint(msg.sender, 100 * (10 ** uint256(decimals())));
    }
}