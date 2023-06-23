import { OpportunityChangeType } from '../types/types';
import { AxiosError } from 'axios';
import { fetchResourceId } from '../utilities/fetchResourceId';
import { v4 as uuidv4 } from 'uuid';
import { getBullfinchUrl, makeBullfinchRequest } from '../utilities/bullfinchApi';

export const createCustomers = async (event: OpportunityChangeType) => {
  const customers = [];
  for (const contact of event.related_objects.contacts) {
    const commandId = uuidv4();
    try {
      await makeBullfinchRequest(
        getBullfinchUrl('contracts', 'customers/create'),
        'PUT',
        {
          command_id: commandId,
          data: {
            first_name: contact.first_name,
            last_name: contact.last_name,
            e_mail: commandId + '@gmail.com',
            phone_number: contact.phone_number,
            gender: contact.gender,
            primary_address: {
              'line1': contact.street_address,
              'city': contact.city,
              postal_code: contact.postcode,
              country: contact.country ?? 'DE'
            }
          }
        }
      )
      const custId = await fetchResourceId(commandId);
      customers.push(custId);
    } catch (error: AxiosError) {
      customers.push(error.response.data);
    }
  }
  return customers;
}