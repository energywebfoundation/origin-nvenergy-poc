import moment from "moment";
import axios from "axios";

import {
  ISmartMeterReadingsAdapter,
  ISmartMeterRead,
  IDevice,
  IExternalDeviceId,
} from "@energyweb/origin-backend-core";
import { BigNumber } from "ethers";

export class ReaccSmartMeterReadingAdapter
  implements ISmartMeterReadingsAdapter {
  baseUrl = "http://www.reacc.io:3032";

  headers: any = {
    accept: "application/json",
  };

  async getLatest(device: IDevice): Promise<ISmartMeterRead> {
    let realtimeGenerationId: IExternalDeviceId;

    try {
      realtimeGenerationId = this.getRealtimeGenerationId(device);
    } catch (e) {
      console.warn(e);
      return {
        meterReading: BigNumber.from(0),
        timestamp: 0,
      };
    }

    const getRequest = await axios.get(
      `${this.baseUrl}/device/${realtimeGenerationId.id}/energy`,
      {
        headers: this.headers,
        params: {
          accumulated: true,
          timeStart: 0,
          timeEnd: moment().unix(),
          limit: -1,
        },
      }
    );

    return {
      meterReading: BigNumber.from(Math.round(getRequest.data[0].energy)),
      timestamp: moment(getRequest.data[0].measurementTime).unix(),
    };
  }

  async getAll(device: IDevice): Promise<ISmartMeterRead[]> {
    let realtimeGenerationId: IExternalDeviceId;

    try {
      realtimeGenerationId = this.getRealtimeGenerationId(device);
    } catch (e) {
      console.warn(e);
      return [];
    }

    const getRequest = await axios.get(
      `${this.baseUrl}/device/${realtimeGenerationId.id}/energy`,
      {
        headers: this.headers,
        params: {
          accumulated: false,
          timeStart: moment()
            .subtract(1, "month")
            .endOf("month")
            .unix(),
          timeEnd: moment().unix(),
          limit: -1,
        },
      }
    );

    const smartMeterReadingsByHour: { [key: number]: BigNumber } = {};

    for (const generationData of getRequest.data) {
      const energy = BigNumber.from(Math.round(generationData.energy));

      if (energy.gt(0)) {
        const hour =
          moment(generationData.measurementTime)
            .endOf("hour")
            .unix() + 1;

        if (!smartMeterReadingsByHour[hour]) {
          smartMeterReadingsByHour[hour] = energy;
        } else {
          smartMeterReadingsByHour[hour] = smartMeterReadingsByHour[hour].add(
            energy
          );
        }
      }
    }

    let currentSmartMeterReading = BigNumber.from(0);
    const finalSortedAndHourAccumulatedSmReads: ISmartMeterRead[] = [];

    for (const unixTimestamp of Object.keys(smartMeterReadingsByHour)) {
      currentSmartMeterReading = currentSmartMeterReading.add(
        smartMeterReadingsByHour[Number(unixTimestamp)]
      );

      finalSortedAndHourAccumulatedSmReads.push({
        meterReading: currentSmartMeterReading,
        timestamp: Number(unixTimestamp),
      });
    }

    const latestMeterReading = (await this.getLatest(device)).meterReading;

    // Reacc API only provides us with energy generation, not smart meter readings
    // We need to offset those reading with the last smart meter reading (from getLatest)
    // to get the correct smart meter reading values
    const unShownReadsCompensation = latestMeterReading.sub(
      finalSortedAndHourAccumulatedSmReads[
        finalSortedAndHourAccumulatedSmReads.length - 1
      ].meterReading
    );
    const unShownReadsCompensated = finalSortedAndHourAccumulatedSmReads.map(
      (reading) => {
        return {
          meterReading: BigNumber.from(reading.meterReading).add(
            unShownReadsCompensation
          ),
          timestamp: reading.timestamp,
        };
      }
    );

    return unShownReadsCompensated;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async save(device: IDevice, smRead: ISmartMeterRead[]): Promise<void> {
    return null;
  }

  private getRealtimeGenerationId(device: IDevice): IExternalDeviceId {
    const nonExistingIdError = new Error(
      `Device ${device.facilityName} with id ${device.id} doesn't have a Real-time Generation ID set.`
    );

    if (!device.externalDeviceIds) {
      throw nonExistingIdError;
    }

    const realtimeGenerationId = device.externalDeviceIds.find(
      (externalDeviceId) => externalDeviceId.type === "Real-time Generation ID"
    );

    if (!realtimeGenerationId?.id) {
      throw nonExistingIdError;
    }

    return realtimeGenerationId;
  }
}
