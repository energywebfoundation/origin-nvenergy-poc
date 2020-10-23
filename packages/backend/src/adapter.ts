import { ReadsService } from "@energyweb/energy-api";
import {
  IDevice,
  ISmartMeterRead,
  ISmartMeterReadingsAdapter,
} from "@energyweb/origin-backend-core";
import moment from "moment";

export class EnergyAPISmartMeterReadingAdapter
  implements ISmartMeterReadingsAdapter {
  constructor(private readonly readsService: ReadsService) {}

  async getAll(device: IDevice): Promise<ISmartMeterRead[]> {
    const start = moment()
      .subtract(3, "month")
      .toISOString();
    const end = moment().toISOString();

    const res = await this.readsService.find(device.id.toString(), {
      start,
      end,
    });

    return res.map((read) => ({
      meterReading: read.value.toString(),
      timestamp: read.timestamp.getTime(),
    }));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async save(device: IDevice, smRead: ISmartMeterRead[]): Promise<void> {
    return null;
  }
}
