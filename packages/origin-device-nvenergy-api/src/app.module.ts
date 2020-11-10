import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { EnergyModule } from "./energy/energy.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: "../../.env",
    }),
    EnergyModule,
  ],
})
export class AppModule {}
