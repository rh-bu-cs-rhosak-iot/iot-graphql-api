import axios, { AxiosError } from 'axios';
import { METER_STATUS_SERVICE_URL } from '../config';
import log from '../log';

export class MeterStatus {
  meterId: string;
  timestamp: number;
  status: string;
}

export interface IMeterStatusService {
  getStatus: IGetStatus;
}

export interface IGetStatus {
  (id: string): Promise<MeterStatus | null>;
}

export const MeterStatusService: IMeterStatusService = {
  getStatus: getStatus as IGetStatus
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

async function handleError(message: string, error: AxiosError): Promise<null> {
  log.error(`${message} ${error.message}`);
  return null;
}
