import {
  Injectable,
  UnauthorizedException,
  Logger,
  UnprocessableEntityException,
} from "@nestjs/common";
import { SmartMeterReadDTO } from "./smart-meter-read.dto";
import { ethers, utils } from "ethers";
import { ethers as ethersContract } from "@energyweb/origin-device-nvenergy";
import { ReadsService, Unit } from "@energyweb/energy-api";

@Injectable()
export class EnergyService {
  private logger = new Logger(EnergyService.name);
  private web3ProviderUrl: string;
  private salt: string[] = [];

  constructor(private readonly readsService: ReadsService) {
    this.web3ProviderUrl = process.env.WEB3 || "http://localhost:8545";
  }

  public async store(payload: SmartMeterReadDTO) {
    const signatureMessage = this.createMessage(payload);

    const recoveredAddress = ethers.utils.verifyMessage(
      signatureMessage,
      payload.signature
    );

    if (recoveredAddress !== ethers.utils.getAddress(payload.meterAddress)) {
      throw new UnauthorizedException(
        "payload.meterAddress does not match signature recovered address"
      );
    }

    const onChainHash = await this.smartMeterReadHashFromTransaction(
      payload.transactionHash
    );
    const localHash = this.calculateLocalHash(payload);

    if (onChainHash !== localHash) {
      throw new UnprocessableEntityException();
    }

    await this.readsService.store(payload.meterAddress, {
      unit: Unit.Wh,
      reads: [{ timestamp: new Date(), value: parseInt(payload.meterRead) }],
    });
  }

  public generateSalt() {
    const bytes = ethers.utils.randomBytes(16);
    const hex = ethers.utils.hexlify(bytes);

    const id = this.salt.push(hex);

    return { id: id - 1, salt: hex };
  }

  private createMessage(payload: SmartMeterReadDTO) {
    return `${payload.saltId};${payload.meterRead};${payload.transactionHash}`;
  }

  private async smartMeterReadHashFromTransaction(transactionHash: string) {
    const provider = new ethers.providers.JsonRpcProvider(this.web3ProviderUrl);
    const transaction = await provider.getTransactionReceipt(transactionHash);

    const registry = new ethersContract.SmartMeterReadsRegistryFactory(
      provider.getSigner()
    ).attach(transaction.to);
    const logs = registry.interface.parseLog(transaction.logs[0]);

    return logs.values.data as string;
  }

  private calculateLocalHash(payload: SmartMeterReadDTO) {
    const salt = this.salt[payload.saltId];

    return utils.keccak256(`${salt}${payload.meterRead}`);
  }
}
