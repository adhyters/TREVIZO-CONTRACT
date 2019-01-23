/* global artifacts */
var TWX = artifacts.require('./TWX.sol')
var TWDex = artifacts.require('./TWDex.sol')
var OwnableMock = artifacts.require('./OwnableMock.sol')
var BaseCappedTokenMock = artifacts.require('./BaseCappedTokenMock.sol')

module.exports = function (deployer) {
  deployer.deploy(TWX)
  deployer.deploy(TWDex)
  deployer.deploy(OwnableMock)
  deployer.deploy(BaseCappedTokenMock)
}
