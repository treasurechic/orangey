// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

contract Transactions {
    uint256 txnCount;

    event Transfer(
        address from,
        address receiver,
        uint amount,
        string message,
        uint256 timeStamp,
        string keyword
    );

    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timeStamp;
        string keyword;
    }

    TransferStruct[] transactions;

    function createTxn(
        address payable receiver,
        uint amount,
        string memory message,
        string memory keyword
    ) public {
        txnCount += 1;
        transactions.push(
            TransferStruct(
                msg.sender,
                receiver,
                amount,
                message,
                block.timestamp,
                keyword
            )
        );
        emit Transfer(
            msg.sender,
            receiver,
            amount,
            message,
            block.timestamp,
            keyword
        );
    }

    function getAllTxns() public view returns (TransferStruct[] memory) {
        return transactions;
    }

    function getTxnCount() public view returns (uint256) {
        return txnCount;
    }
}
