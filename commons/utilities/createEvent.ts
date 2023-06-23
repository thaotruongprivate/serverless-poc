import { EventBridgeClient, PutEventsCommand } from '@aws-sdk/client-eventbridge';
import { REGION } from '../constants/constants';

export const createEvent = async (source: string, type: string, details: Object) => {
  const client = new EventBridgeClient({region: REGION});
  const params = {
    Entries: [
      {
        Source: source,
        DetailType: type,
        Detail: JSON.stringify(details)
      },
    ],
  };
  try {
    return await client.send(new PutEventsCommand(params));
  } catch (err) {
    return false;
  }
}