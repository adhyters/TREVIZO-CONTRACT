/* global artifacts */
var TVZ = artifacts.require('./TVZ.sol')
var OwnableMock = artifacts.require('./OwnableMock.sol')
var BaseCappedTokenMock = artifacts.require('./BaseCappedTokenMock.sol')

module.exports = function (deployer) {
  deployer.deploy(TVZ)
  deployer.deploy(OwnableMock)
  deployer.deploy(BaseCappedTokenMock)
}
