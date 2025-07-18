/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// https://rnfirebase.io/migrating-to-v22#switching-off-warning-logs
global.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true;
AppRegistry.registerComponent(appName, () => App);
