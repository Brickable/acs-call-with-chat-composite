// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ShakeToSendLogs } from './app/utils/ShakeToSendLogs';
import { setLogLevel } from '@azure/logger';
import { initializeIcons as initializeFluentIcons } from '@fluentui/react';
import { initializeFileTypeIcons } from '@fluentui/react-file-type-icons';
import App from './app/App';

const domNode = document.getElementById('root');
if (!domNode) {
  throw new Error('Failed to find the root element');
}

setLogLevel('verbose');
initializeFluentIcons();
initializeFileTypeIcons();

createRoot(domNode).render(
  <div className="wrapper">
    <App />
    <ShakeToSendLogs />
  </div>
);
