import { Module } from "@nestjs/common";
import { EnergyModule } from "./energy/energy.module";

@Module({
  imports: [EnergyModule],
})
export class AppModule {}
