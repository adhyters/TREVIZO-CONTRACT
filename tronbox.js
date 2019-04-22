module.exports = {
  networks: {
    development: {
      privateKey: 'fdf7b4e04cb7fd41caae418712c08a8b2e5d3d164b39939a0cd569baf26f4613',
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
