import fs from "fs";
import { AppModule as ExchangeModule } from "@energyweb/exchange";
import { LoggerService } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { useContainer } from "class-validator";

import { EnergyAPISmartMeterReadingAdapter } from "./adapter";
import { OriginAppModule } from "./origin-app.module";
import { getPort } from "./port";
import { ReadsService } from "@energyweb/energy-api";
import { ConfigService } from "@nestjs/config";

export async function startAPI(logger?: LoggerService) {
  const PORT = getPort();
  const getVersion = () => {
    let info;
    if (fs.existsSync(`${__dirname}/../package.json`)) {
      info = fs.readFileSync(`${__dirname}/../package.json`);
    } else {
      return "unknown";
    }

    const parsed = JSON.parse(info.toString());

    return {
      "@ptt-origin/backend": parsed.version,
      exchange: parsed.dependencies["@energyweb/exchange"],
      "origin-backend": parsed.dependencies["@energyweb/origin-backend"],
    };
  };

  console.log(`Backend starting on port: ${PORT}`);
  console.log(`Backend versions: ${JSON.stringify(getVersion())}`);

  const adapter = new EnergyAPISmartMeterReadingAdapter(
    new ReadsService(new ConfigService())
  );

  const app = await NestFactory.create(OriginAppModule.register(adapter));
  app.enableCors();
  app.setGlobalPrefix("api");

  if (logger) {
    app.useLogger(logger);
  }

  await app.listen(PORT);

  // TODO: this should be OriginAppModule but for some reason it crashes, probably due to the fact it's dynamic module
  useContainer(app.select(ExchangeModule), { fallbackOnErrors: true });

  return app;
}
