import { MOTOR_API_KEY } from '@env';
import axios from 'axios';
import { MotorAPIResponse } from './types';
const config = {
    baseURL: 'https://v1.motorapi.dk' ?? '',
    headers: {
        accept: 'text/plain',
        'Content-Type': 'application/json',
        'X-AUTH-TOKEN': MOTOR_API_KEY
    }
};

const axiosInstance = axios.create(config);

const getVehiclesByRegNumber = async (
    registrationNumber: string
): Promise<MotorAPIResponse[]> => {
    const response = await axiosInstance.get('/vehicles', {
        params: {
            registration_number: registrationNumber
        }
    });

    const responseData = response.data;

    // check if responseData has any keys
    if (Object.keys(responseData).length === 0) {
        throw new Error('No data found');
    }

    return responseData;
};

export const motorAPI = { getVehiclesByRegNumber };
