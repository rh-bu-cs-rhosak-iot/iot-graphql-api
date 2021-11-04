import axios, { AxiosError } from 'axios';
import { METER_STATUS_SERVICE_URL, METER_AGGREGATED_STATUS_SERVICE_URL } from '../config';
import log from '../log';

export class MeterStatus {
  meterId: string;
  timestamp: number;
  status: string;
}

export class AggregatedMeterStatus {
  street: string;
  available: number;
  occupied: number;
  outoforder: number;
  updated: number;
}

export interface IMeterStatusService {
  getStatus: IGetStatus;
}

export interface IMeterAggregatedService {
  getMetersStatus: IGetMetersStatus;
}

export interface IGetStatus {
  (id: string): Promise<MeterStatus | null>;
}

export interface IGetMetersStatus {
  (street: string): Promise<AggregatedMeterStatus | null>;
}

export const MeterStatusService: IMeterStatusService = {
  getStatus: getStatus as IGetStatus
};

export const MeterAggregatedService: IMeterAggregatedService = {
  getMetersStatus: getMetersStatus as IGetMetersStatus
};

export async function getStatus(id: string): Promise<MeterStatus | null> {
  const url = METER_STATUS_SERVICE_URL!.replace(/{id}/g, id);
  return axios
    .get<MeterStatus>(url, {
      validateStatus: (status) => status == 200 || status == 404
    })
    .then((response) => {
      if (response.status === 404) {
        return null;
      } else {
        return response.data;
      }
    })
    .catch((ex) =>
      handleError('Error retrieving meterstatus for id ' + id, ex)
    );
}

export async function getMetersStatus(street: string): Promise<AggregatedMeterStatus | null> {
  const url = METER_AGGREGATED_STATUS_SERVICE_URL!.replace(/{street}/g, street);
  return axios
    .get<AggregatedMeterStatus>(url, {
      validateStatus: (status) => status == 200 || status == 404
    })
    .then((response) => {
      if (response.status === 404) {
        return {street: street, available: 0, occupied: 0, outoforder:0, updated: 0} as AggregatedMeterStatus;
      } else {
        return response.data;
      }
    })
    .catch((ex) =>
      handleError('Error retrieving aggregated meter status for street ' + street, ex)
    );
}

async function handleError(message: string, error: AxiosError): Promise<null> {
  log.error(`${message} ${error.message}`);
  return null;
}
