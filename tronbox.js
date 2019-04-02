module.exports = {
  networks: {
    development: {
      privateKey: '85ce66cabea4a85e2c3acd66b7f7e927cb5213efe2aa5354c8d71bcc796f9f73',
      consume_user_resource_percent: 30,
      fee_limit: 1000000000,
      fullHost: 'http://127.0.0.1:9090',
      network_id: '*'
    },
    mainnet: {
      privateKey: process.env.PK,
      userFeePercentage: 30,
      feeLimit: 100000000,
      fullHost: 'https://api.trongrid.io',
      network_id: '*'
    },
    shasta: {
      privateKey: process.env.PK,
      consume_user_resource_percent: 30,
      userFeePercentage: 30,
      fee_limit: 1000000000,
      fullHost: 'https://api.shasta.trongrid.io',
      network_id: '*'
    }
  }

}
