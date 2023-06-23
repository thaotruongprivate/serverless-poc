import { BullfinchGetCommandResponse } from '../types/types';
import { sleep } from './sleep';
import { getBullfinchUrl, makeBullfinchRequest } from './bullfinchApi';

export const fetchResourceId = async (commandId: string) => {
  await sleep(3000);
  const response = await makeBullfinchRequest<BullfinchGetCommandResponse>(
    getBullfinchUrl('commands', commandId)
  );
  return response.data.resource_id ?? null;
}