// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.27;

contract DataVault {
    struct DataAccess {
        uint256 expiry;
        bool granted;
    }

    mapping(address => bytes) private userData; // Map each user to their data
    mapping(address => mapping(address => DataAccess)) public accessList; // Map user's permissions for each third-party app

    event DataAccessed(
        address indexed app,
        address indexed user,
        uint256 timestamp
    );
    event AccessGranted(
        address indexed user,
        address indexed app,
        uint256 expiry
    );
    event AccessRevoked(address indexed user, address indexed app);

    // Store data for the calling user
    function storeData(bytes memory data) public {
        userData[msg.sender] = data;
    }

    // Grant access to a specific app with a duration (expiry time)
    function grantAccess(address app, uint256 duration) public {
        accessList[msg.sender][app] = DataAccess(
            block.timestamp + duration,
            true
        );
        emit AccessGranted(msg.sender, app, block.timestamp + duration);
    }

    // Revoke access for a specific app
    function revokeAccess(address app) public {
        accessList[msg.sender][app].granted = false;
        emit AccessRevoked(msg.sender, app);
    }

    // Retrieve data for a specific user, only if access is granted
    function retrieveData(address user) public view returns (string memory) {
        require(
            accessList[user][msg.sender].granted &&
                accessList[user][msg.sender].expiry > block.timestamp,
            "Access expired or not granted"
        );
        // emit DataAccessed(msg.sender, user, block.timestamp);
        return string(userData[user]);
    }
}
