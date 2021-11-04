'use strict';

import { get } from 'env-var';

const config = {
  NODE_ENV: get('NODE_ENV').default('dev').asEnum(['dev', 'prod']),
  LOG_LEVEL: get('LOG_LEVEL').asString(),

  HTTP_PORT: get('HTTP_PORT').default(8080).asPortNumber(),

  DB_CLIENT: get('DB_CLIENT').default('pg').asString(),
  DB_HOST: get('DB_HOST').default('iot-postgresql').asString(),
  DB_PORT: get('DB_PORT').default('5432').asPortNumber(),
  DB_USER: get('DB_USER').default('iotuser').asString(),
  DB_PASSWORD: get('DB_PASSWORD').default('iotuser').asString(),
  DB_DATABASE: get('DB_DATABASE').default('city_info').asString(),

  METER_STATUS_SERVICE_URL: get('METER_STATUS_SERVICE_URL').asString(),
  METER_AGGREGATED_STATUS_SERVICE_URL: get('METER_AGGREGATED_STATUS_SERVICE_URL').asString(),
};

export = config;
