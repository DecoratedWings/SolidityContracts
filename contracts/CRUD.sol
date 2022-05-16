// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract CRUD {
    uint[] public arr;
    mapping(uint=>string) map;

    //CRUD ARRAY:
    function createEntryForArray(uint entry) external {
        arr.push(entry);
    }
    function readFromArray(uint index) external view returns(uint){
        return arr[index];
    }
    function updateArray(uint index, uint value) external {
        arr[index] = value;
    }
    function deleteFromArray(uint index) external{
        delete arr[index];
    }

    //CRUD MAPPING : 

    function createOrUpdateMap(uint key, string memory val) external {
        map[key] = val;
    }

    function readMap(uint key) external view returns(string memory){
        return map[key];
    }

    function deleteFromMap(uint key) external {
        delete map[key];
    }


}