import { Controller, Post, Body, Get } from "@nestjs/common";
import { SmartMeterReadDTO } from "./smart-meter-read.dto";
import { EnergyService } from "./energy.service";
import { SaltDTO } from "./salt.dto";

@Controller("energy")
export class EnergyController {
  constructor(private readonly energyService: EnergyService) {}

  @Post()
  public async store(@Body() smartMeterRead: SmartMeterReadDTO) {
    await this.energyService.store(smartMeterRead);
  }

  @Get("/salt")
  public generateSalt(): SaltDTO {
    return this.energyService.generateSalt();
  }
}
