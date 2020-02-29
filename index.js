/**
 * @format
 */
import {decode, encode} from 'base-64';
if (!global.btoa) {
	global.btoa = encode;
}

if (!global.atob) {
	global.atob = decode;
}
import {AppRegistry, YellowBox} from 'react-native';
import _ from 'lodash';
import App from './App';
import {name as appName} from './app.json';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
	if (message.indexOf('Setting a timer') <= -1) {
		_console.warn(message);
	}
};

AppRegistry.registerComponent(appName, () => App);
