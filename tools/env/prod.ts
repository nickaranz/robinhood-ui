import { EnvConfig } from './env-config.interface';

const ProdConfig: EnvConfig = {
    ENV: 'PROD',
    API: 'https://api.robinhood.com/'
};

export = ProdConfig;

