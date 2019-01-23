/* global artifacts */
var TWX = artifacts.require('./TWX.sol')
var OwnableMock = artifacts.require('./OwnableMock.sol')
var BaseCappedTokenMock = artifacts.require('./BaseCappedTokenMock.sol')

module.exports = function (deployer) {
  deployer.deploy(TWX)
  deployer.deploy(OwnableMock)
  deployer.deploy(BaseCappedTokenMock)
}
