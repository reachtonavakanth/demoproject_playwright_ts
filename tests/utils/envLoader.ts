import path from 'path';

export function loadEnvConfig() {
  const env = process.env.TEST_ENV || 'test02';
  const configPath = path.resolve(__dirname, '..', 'envConfigs', `${env}.config.js`);

  try {
    return require(configPath).envConfig;
  } catch (err) {
    throw new Error(`Failed to load config for environment "${env}": ${err.message}`);
  }
}
