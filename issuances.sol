// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Issuance {
    address public issuer;
    uint256 public targetValue;
    uint256 public minimumLotsValue;
    uint256 public remainingValue;
    bool public isClosed;
    
    struct Investor {
        address investorAddress;
        uint256 investedAmount;
    }
    
    Investor[] public investors;
    
    constructor(uint256 _targetValue, uint256 _minimumLotsValue) {
        issuer = msg.sender;
        targetValue = _targetValue;
        minimumLotsValue = _minimumLotsValue;
        remainingValue = _targetValue;
    }
    
    modifier onlyIssuer() {
        require(msg.sender == issuer, "Only the issuer can call this function");
        _;
    }
    
    modifier isOpen() {
        require(!isClosed, "The issuance is closed");
        _;
    }
    
    function invest() external payable isOpen {
        require(msg.value >= minimumLotsValue, "Investment amount is less than the minimum");
        require(remainingValue >= msg.value, "Not enough remaining value in the issuance");
        
        investors.push(Investor({
            investorAddress: msg.sender,
            investedAmount: msg.value
        }));
        
        remainingValue -= msg.value;
    }
    
    function closeIssuance() external onlyIssuer isOpen {
        require(remainingValue == 0, "Not all funds have been invested");
        
        isClosed = true;
        
        // Transfer the total amount to the issuer
        payable(issuer).transfer(address(this).balance);
    }
    
    function getInvestorsCount() external view returns (uint256) {
        return investors.length;
    }
}

contract IssuanceFactory {
    address[] public issuances;

    function createIssuance(uint256 _targetValue, uint256 _minimumLotsValue) external {
        address newIssuance = address(new Issuance(_targetValue, _minimumLotsValue));
        issuances.push(newIssuance);
    }

    function getIssuancesCount() external view returns (uint256) {
        return issuances.length;
    }
}