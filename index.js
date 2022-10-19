import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {CacheManager} from '@georstat/react-native-image-cache';
import {Dirs} from 'react-native-file-access';

CacheManager.config = {
  baseDir: `${Dirs.CacheDir}/image_cache/`,
  blurRadius: 15,
  cacheLimit: 1024 * 1024 * 256,
  sourceAnimationDuration: 500,
  thumbnailAnimationDuration: 1000,
};

AppRegistry.registerComponent(appName, () => App);
