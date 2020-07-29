import { Module } from "@nestjs/common";
import { ReadsService } from "@energyweb/energy-api";

import { EnergyController } from "./energy.controller";
import { EnergyService } from "./energy.service";

@Module({
  controllers: [EnergyController],
  providers: [EnergyService, ReadsService],
})
export class EnergyModule {}
