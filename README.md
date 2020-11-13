<h1 align="center">
  <br>
  <a href="https://www.energyweb.org/"><img src="https://www.energyweb.org/wp-content/uploads/2019/04/logo-brand.png" alt="EnergyWeb" width="150"></a>
  <br>
  EnergyWeb Origin NVEnergy POC
  <br>
  <br>
</h1>

Minimal repository for on-chain reads registry and Origin Energy API for NVEnergy project

![CI](https://github.com/energywebfoundation/origin-nvenergy-poc/workflows/CI/badge.svg)

## How to use

Make sure InfluxDB is running, for more details refer to https://github.com/energywebfoundation/energy-api#influx-db-installation

Setup the `.env` file with INFLUX DB required items, for more details refer to https://github.com/energywebfoundation/energy-api#configuration

Install `rush` and `pnpm` if you don't have it:

```
npm i -g @microsoft/rush
npm i -g pnpm
npm i -g concurrently
```

```
rush install
rush build
```

Copy `.env.example` to `.env` and adjust `.env` with your environment specific parameters. 

Start Postgres instance

```
docker pull postgres
docker run --name origin-postgres -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 postgres
```

Create DB
```
psql -h localhost -p 5432 -U postgres -c "CREATE DATABASE origin_nv"
```

Start InfluxDB instance

Run init script to set credentials and default DB:

```
./influxdb-init.sh
```

```
./influxdb-run.sh
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

### SmartMeterReadsRegistry ABI

`packages/origin-device-nvenergy/build/contracts/SmartMeterReadsRegistry.json`

### Swagger API

```
rush start:dev
```

navigate to `http://localhost:3000/api/#/`

## Heroku deployment script

This repo has a script for easy Heroku deployments for UI And API project. Script assumes that Heroku applications are already created and Postgres DB is provisioned.

```
HEROKU_API_KEY=<APIKEY> HEROKU_STABLE_APP_API=<APP_NAME> HEROKU_STABLE_APP_UI=<APP_NAME> rush deploy:heroku
```
