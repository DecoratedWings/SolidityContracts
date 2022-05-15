// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";

contract BasicWallet is Ownable {

    event Transaction(uint amount, uint balance, string transaction);

    function deposit() external payable {
        emit Transaction(msg.value, getWalletBalance(), "deposit");
    }

    function withdraw(uint _amount) onlyOwner external payable {
        require(_amount>0 && address(this).balance-_amount >= 0, "Invalid withdrawal");
        (bool success, ) = payable(msg.sender).call{value: _amount}('');
        require(success, "Withdrawal failed");
        emit Transaction(_amount, getWalletBalance(), "withdrawal");
    }
    
    function getWalletBalance() public view returns(uint){
        return address(this).balance;
    }
    receive() external payable {}
 
}