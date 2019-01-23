/* global artifacts, contract, it, assert, before, beforeEach, describe, tronWeb, done */
/* eslint-disable prefer-reflect */
const wait = require('./../helpers/wait')

function shouldBeOwnable (accounts) {
  describe('as an ownable', async function () {
    it('should have an owner', async function () {
      const owner = await this.token.owner()
      assert.equal(accounts[0], tronWeb.address.fromHex(owner))
    })

    it('should change owner after transfer', async function () {
      return new Promise(async function (resolve, reject) {
        try {
          console.log('this.token', this.token)
          const isOwner = await this.token.isOwner({ from: accounts[3] })
          assert.equal(isOwner, false)

          const _instance = await tronWeb.contract().at(this.token.address)
          wait(3)
          const watcher = await _instance.OwnershipTransferred().watch(async (err, res) => {
            if (err) throw err
            if (res) {
              assert.equal(res.name, 'OwnershipTransferred')
              assert.equal(tronWeb.address.toHex(res.contract), this.token.address)
              assert.equal(res.result.previousOwner, tronWeb.address.toHex(accounts[0]))
              assert.equal(res.result.newOwner, tronWeb.address.toHex(accounts[3]))

              watcher.stop()
              resolve()
            }
          })

          await this.token.transferOwnership(accounts[3], { from: accounts[0] })
          wait(3)
          const isNewOwner = await this.token.isOwner({ from: accounts[3] })
          assert.equal(isNewOwner, true)
        } catch (e) {
          reject(e)
        }
      })
    })

    it('should prevent non-owners from transfering', async function () {
      try {
        await this.token.transferOwnership(accounts[4], { from: accounts[5], shouldPollResponse: true })
        assert(false, "didn't throw should prevent non-owners from transferin")
      } catch (error) {
        assert.equal(error, 'REVERT opcode executed')
      }
    })

    it('should guard ownership against stuck state', async function () {
      try {
        await this.token.transferOwnership(null, { from: accounts[0] })
        assert(false, "didn't throw should guard ownership against stuck state")
      } catch (error) {
        assert.equal(error.reason, 'invalid address')
      }
    })

    it('should lose owner after renouncement', async function () {
      return new Promise(async (resolve, reject) => {
        try {
          const isOwner = await this.token.isOwner({ from: accounts[9] })
          assert.equal(isOwner, false)

          const isOwner2 = await this.token.isOwner({ from: accounts[3] })
          assert.equal(isOwner2, true)

          const _instance = await tronWeb.contract().at(this.token.address)
          wait(3)
          const watcher = await _instance.OwnershipTransferred().watch(async (err, res) => {
            if (err) throw err
            if (res) {
              assert.equal(res.name, 'OwnershipTransferred')
              assert.equal(tronWeb.address.toHex(res.contract), this.token.address)
              assert.equal(tronWeb.address.toHex(res.result.previousOwner), tronWeb.address.toHex(accounts[3]))
              assert.equal(res.result.newOwner, '410000000000000000000000000000000000000000')

              watcher.stop()
              resolve()
            }
          })

          await this.token.renounceOwnership({ from: accounts[3] })
          wait(3)
          const isOwner3 = await this.token.isOwner({ from: accounts[3] })
          assert.equal(isOwner3, false)

          const owner = await this.token.owner()
          assert.equal(owner, '410000000000000000000000000000000000000000')
        } catch (e) {
          reject(e)
        }
      })
    })

    it('should prevent non-owners from renouncement', async function () {
      try {
        await this.token.renounceOwnership({ from: accounts[5], shouldPollResponse: true })
        assert(false, "didn't throw should prevent non-owners from renouncement")
      } catch (error) {
        assert.equal(error, 'REVERT opcode executed')
      }
    })
  })
}

module.exports = {
  shouldBeOwnable
}
