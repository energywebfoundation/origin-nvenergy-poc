pragma solidity ^0.5.2;

contract SmartMeterReadsRegistry {
  uint constant public DAILY_BUCKET = 3600 * 24;

  event NewReadStored(address indexed meter, uint indexed bucket, address operator, uint timestamp, bytes data);

  function store(address meter, bytes memory data, uint timestamp, uint bucket) public {
    if (timestamp > now) {
      revert("Future timestamp provided");
    }

    emit NewReadStored(meter, bucket, msg.sender, timestamp, data);
  }

  function storeWithDailyBucket(address meter, bytes memory data, uint timestamp) public {
    uint bucket = timestamp - (timestamp % DAILY_BUCKET);
    store(meter, data, timestamp, bucket);
  }
}