import { Module, ValidationPipe } from "@nestjs/common";
import { EnergyModule } from "./energy/energy.module";
import { ConfigModule } from "@nestjs/config";
import { APP_PIPE } from "@nestjs/core";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: "../../.env",
      isGlobal: true,
    }),
    EnergyModule,
  ],
  providers: [{ provide: APP_PIPE, useClass: ValidationPipe }],
})
export class AppModule {}
