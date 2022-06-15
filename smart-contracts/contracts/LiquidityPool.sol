// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./PantherToken.sol";
import "./USN.sol";

contract LPOOL {
    PantherToken public pnt;
    USN public usn;
    address owner;

    constructor (PantherToken _PNT ,USN _USN ) {
        owner = msg.sender;
        pnt = _PNT;
        usn = _USN;
    }

    modifier OnlyOwner {
        require(msg.sender == owner , "You arent owner");
        _;
    }

    mapping(address => uint) public StakingRecord;
    mapping(address => bool) POOLPASS;

    address[] public investors;

    function Stake(uint amount) public {
        require(amount > 0, "DUDE SOME FINITE TOKEN NOT 0");

        usn.transferFrom(msg.sender, address(this), amount);

        StakingRecord[msg.sender] += amount;

        if(!POOLPASS[msg.sender]) {
            investors.push(msg.sender);
            POOLPASS[msg.sender] = true;
        }
    }

    function Unstake() public {
        require(StakingRecord[msg.sender] > 0 , "You arent staking to unstake");
        usn.transfer(msg.sender, StakingRecord[msg.sender]);
        StakingRecord[msg.sender] = 0;
    }

    function RewardTokens() public OnlyOwner{
        for (uint i = 0 ; i < investors.length ; i++) {
            address investor =  investors[i];
            uint reward = StakingRecord[investor];
            if (reward > 0) {
                pnt.transfer(investor, reward);
            }
        } 
    }

    
}