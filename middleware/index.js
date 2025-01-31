import {setupMiddlewares} from './commonMiddleware.js';
import { csrfProtection } from './csrfMiddleWare.js';
import { setupConfig } from './setupConfigs.js';
import { setupDB } from './setupDB.js';

export { setupMiddlewares, csrfProtection, setupConfig, setupDB };