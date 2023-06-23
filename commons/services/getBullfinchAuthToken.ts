import { BullfinchSecrets } from '../types/types';
import { getSecret } from '../utilities/secretManager';
import { BULLFINCH_AUTH_URI, BULLFINCH_SCOPE } from '../constants/constants';
import axios, { AxiosError } from 'axios';

export const getBullfinchAuthToken = async () => {
  const secrets: BullfinchSecrets = JSON.parse(await getSecret('dev/bullfinch'));
  try {
    const response: {data: {access_token: string}} = await axios({
      url: BULLFINCH_AUTH_URI,
      method: 'POST',
      data: {
        client_id: secrets.bullfinch_api_client_id,
        grant_type: 'client_credentials',
        scope: BULLFINCH_SCOPE
      },
      auth: {
        username: secrets.bullfinch_id,
        password: secrets.bullfinch_api_client_secret
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data.access_token;
  } catch (error: AxiosError) {
    console.log(error)
  }
}