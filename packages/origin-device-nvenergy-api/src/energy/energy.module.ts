import { Module } from '@nestjs/common';
import { EnergyController } from './energy.controller';
import { EnergyService } from './energy.service';

@Module({
  controllers: [EnergyController],
  providers: [EnergyService]
})
export class EnergyModule {}
