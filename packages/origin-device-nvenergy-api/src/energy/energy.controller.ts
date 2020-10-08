import { ReadsService, FilterDTO } from "@energyweb/energy-api";
import { Body, Controller, Get, Param, Post, Query, HttpException, HttpStatus } from "@nestjs/common";
import {
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
  ApiQuery,
  ApiResponse,
  ApiProperty,
} from "@nestjs/swagger";

import { EnergyService } from "./energy.service";
import { SaltDTO } from "./salt.dto";
import { SmartMeterReadDTO } from "./smart-meter-read.dto";

@Controller("meter-read")
export class EnergyController {
  constructor(
    private readonly energyService: EnergyService,
    private readonly readsService: ReadsService
  ) {}

  @Post()
  @ApiUnauthorizedResponse({
    description: "Signature address does not match payload address",
  })
  @ApiUnprocessableEntityResponse({
    description: "Unable to verify the payload",
  })
  public async store(@Body() smartMeterRead: SmartMeterReadDTO) {
    await this.energyService.store(smartMeterRead);
  }

  @Get("/salt")
  public generateSalt(): SaltDTO {
    return this.energyService.generateSalt();
  }

  @Get("/salt/:salt")
  public getSalt(
    @Param("salt") salt: string
    ): SaltDTO {
    const res = this.energyService.getSalt(salt)
    if (!res) throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    return res
  }

  @Get("/:meter")
  public async getReads(
    @Param("meter") meterId: string,
    @Query() filter: FilterDTO
  ) {
    const res = await this.readsService.find(meterId, filter);
    return res;
  }

  @Get("/:meter/difference")
  public async getReadsDifference(
    @Param("meter") meterId: string,
    @Query() filter: FilterDTO
  ) {
    const res = await this.readsService.findDifference(meterId, filter);
    return res;
  }
}
