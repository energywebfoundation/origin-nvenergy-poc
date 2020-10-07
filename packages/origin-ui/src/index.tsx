import { render } from 'react-dom';
import React from 'react';

import {
    Origin,
    OriginConfigurationProvider,
    createOriginConfiguration,
    createStyleConfigFromSCSSVariables
} from '@energyweb/origin-ui-core';

import './styles/app.scss';
import variables from './styles/variables.scss';
import pttLogo from '../assets/logo-ptt.png';

const originConfiguration = createOriginConfiguration({
    logo: <img src={pttLogo} className="ptt-logo" />,
    styleConfig: createStyleConfigFromSCSSVariables(variables)
});

render(
    <OriginConfigurationProvider value={originConfiguration}>
        <Origin />
    </OriginConfigurationProvider>,
    document.getElementById('root')
);
