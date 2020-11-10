import { Module } from "@nestjs/common";
import { ReadsModule, ReadsService } from "@energyweb/energy-api";

import { EnergyController } from "./energy.controller";
import { EnergyService } from "./energy.service";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [ReadsModule, ConfigModule],
  controllers: [EnergyController],
  providers: [EnergyService, ReadsService, ConfigService],
})
export class EnergyModule {}
