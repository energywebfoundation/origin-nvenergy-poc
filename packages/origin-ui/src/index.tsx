/* global document */

import { render } from "react-dom";
import React from "react";

import {
  Origin,
  OriginConfigurationProvider,
  createOriginConfiguration,
  createStyleConfigFromSCSSVariables,
} from "@energyweb/origin-ui-core";

import { allOriginFeatures, OriginFeature } from "@energyweb/utils-general";

import "./styles/app.scss";
import variables from "./styles/variables.scss";
import nvtrecLogo from "../assets/logo-nvtrec.svg";

const originConfiguration = createOriginConfiguration({
  enabledFeatures: allOriginFeatures.filter(
    (feature) =>
      feature !== OriginFeature.IRec && feature !== OriginFeature.IRecConnect
  ),
  logo: <img src={nvtrecLogo} className="nvtrec-logo" />,
  styleConfig: createStyleConfigFromSCSSVariables(variables),
});

render(
  <OriginConfigurationProvider value={originConfiguration}>
    <Origin />
  </OriginConfigurationProvider>,
  document.getElementById("root")
);
