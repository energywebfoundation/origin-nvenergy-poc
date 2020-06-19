import { Controller, Post, Body, Get } from "@nestjs/common";
import { SmartMeterReadDTO } from "./smart-meter-read.dto";
import { EnergyService } from "./energy.service";
import { SaltDTO } from "./salt.dto";
import { ApiUnauthorizedResponse, ApiUnprocessableEntityResponse } from "@nestjs/swagger";

@Controller("meter-read")
export class EnergyController {
  constructor(private readonly energyService: EnergyService) {}

  @Post()
  @ApiUnauthorizedResponse({description: "Signature address does not match payload address"})
  @ApiUnprocessableEntityResponse({description: "Unable to verify the payload"})
  public async store(@Body() smartMeterRead: SmartMeterReadDTO) {
    await this.energyService.store(smartMeterRead);
  }

  @Get("/salt")
  public generateSalt(): SaltDTO {
    return this.energyService.generateSalt();
  }
}
