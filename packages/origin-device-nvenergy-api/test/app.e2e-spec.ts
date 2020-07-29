import { ethers as factory } from "@energyweb/origin-device-nvenergy";
import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { ethers } from "ethers";
import moment from "moment";
import { SaltDTO } from "src/energy/salt.dto";
import { SmartMeterReadDTO } from "src/energy/smart-meter-read.dto";
import request from "supertest";

import { AppModule } from "./../src/app.module";
import { SmartMeterReadsRegistry } from "@energyweb/origin-device-nvenergy/dist/src/ethers/SmartMeterReadsRegistry";

const ganache = require("ganache-core");
ganache.server().listen(8545);

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const fetchSalt = async () => {
    let saltInfo: SaltDTO;

    await request(app.getHttpServer())
      .get("/meter-read/salt")
      .expect(200)
      .expect((res) => (saltInfo = res.body as SaltDTO));

    return saltInfo;
  };

  const getRegistryAndSignerAddress = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      "http://localhost:8545"
    );
    const signer = provider.getSigner();

    const registry = await new factory.SmartMeterReadsRegistryFactory(
      signer
    ).deploy();

    return { registry, address: await signer.getAddress() };
  };

  const storeRead = async (
    registry: SmartMeterReadsRegistry,
    meterAddress: string,
    energy: string,
    salt: string
  ) => {
    const hashedEnergy = ethers.utils.keccak256(`${salt}${energy}`);

    const transaction = await registry.store(
      meterAddress,
      hashedEnergy,
      moment().unix(),
      1
    );
    await transaction.wait();

    return transaction.hash;
  };

  it("should store and read smart contract read", async () => {
    const { id: saltId, salt } = await fetchSalt();

    const {
      registry,
      address: meterAddress,
    } = await getRegistryAndSignerAddress();

    const energy = "100000";

    const transactionHash = await storeRead(
      registry,
      meterAddress,
      energy,
      salt
    );

    const signature = await registry.signer.signMessage(
      `${saltId};${energy};${transactionHash}`
    );

    const payload: SmartMeterReadDTO = {
      meterRead: energy,
      meterAddress,
      saltId,
      transactionHash,
      signature,
    };

    const server = app.getHttpServer();

    await request(server)
      .post("/meter-read")
      .send(payload)
      .expect(201);

    const start = moment()
      .add(-1, "day")
      .toISOString();
    const end = moment().toISOString();

    await request(server)
      .get(`/meter-read/${meterAddress}?start=${start}&end=${end}`)
      .expect(200)
      .expect((res) => {
        const [[timestamp, value]] = res.body as string[][];

        expect(value).toBe(energy);
      });
  });
});
