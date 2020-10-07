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

```
yarn
yarn build
yarn test:e2e
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
