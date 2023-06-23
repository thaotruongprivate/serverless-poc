import { v4 } from 'uuid';
import { getBullfinchUrl, makeBullfinchRequest } from '../utilities/bullfinchApi';
import { fetchResourceId } from '../utilities/fetchResourceId';

export const createContract = async (customers: Array<string>) => {
  const commandId = v4();
  await makeBullfinchRequest(
    getBullfinchUrl('contracts', 'contracts/create'),
    'PUT',
    {
      command_id: commandId,
      data: {
        customers
      }
    }
  );
  return await fetchResourceId(commandId);
}