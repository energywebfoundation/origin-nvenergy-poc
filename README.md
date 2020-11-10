<h1 align="center">
  <br>
  <a href="https://www.energyweb.org/"><img src="https://www.energyweb.org/wp-content/uploads/2019/04/logo-brand.png" alt="EnergyWeb" width="150"></a>
  <br>
  EnergyWeb Origin NVEnergy POC
  <br>
  <br>
</h1>

Minimal repository for on-chain reads registry and Origin Energy API for NVEnergy project

## How to use

Make sure InfluxDB is running, for more details refer to https://github.com/energywebfoundation/energy-api#influx-db-installation

Setup the `.env` file with INFLUX DB required items, for more details refer to https://github.com/energywebfoundation/energy-api#configuration

Install `rush` and `pnpm` if you don't have it:

```
npm i -g rush
npm i -g pnpm
```

```
rush install
rush build
```

Create DB
```
psql -h localhost -p 5432 -U postgres -c "CREATE DATABASE origin_nv"
```

Run ganache and migrations
```
rush start:ganache
rush migrate:dev
```

Run UI and API projects
```
rush start:dev
```

## Start influxdb

```
docker-compose up
```

### SmartMeterReadsRegistry ABI

`packages/origin-device-nvenergy/build/contracts/SmartMeterReadsRegistry.json`

### Swagger API

`yarn start`

navigate to `http://localhost:3000/api/#/`


### Try it

Run a RPC on `http://localhost:8545` or set env variable `WEB3` to the RPC endpoint.

1. Get salt for smart meter reading: GET `http://localhost:3001/meter-read/salt`

  You should get a response like: `{"id":0,"salt":"0x43917c1054e07bb874618ef02922a799"}`

2. Store a meter read: POST `http://localhost:3001/meter-read` with json body:

```
{
  "saltId": 0,
  "meterRead": "120",
  "meterAddress": "0xbF1c090D78ea98e9366b9b97b07238e8C0330120",
  "transactionHash": "0x8a7c394168143d79c6ef4a864f6807ae2dd640c2950296bfb2ccdd266bac8431",
  "signature": "0x3b2e11497b15b95ac5ede6fdd272b3c3b4095710879eb2eb746c3ef9131fc3d41f15742af2dbb1023896592f329b55d3023afda515b5b54a085dc3706354687f01"
}
```
