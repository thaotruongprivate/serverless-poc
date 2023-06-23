import { EventBrideEvent, OpportunityChangeType } from '../commons/types/types';
import { createCustomers } from '../commons/services/createCustomers';
import { createContract } from '../commons/services/createContract';
import { createEvent } from '../commons/utilities/createEvent';

module.exports.handler = async (event: EventBrideEvent<OpportunityChangeType>) => {
  if (!!event.detail.record.cleantech_order_id__c) {
    console.log('Contract already exist for opp ' + event.detail.id);
    return;
  }
  const customerIds = await createCustomers(event.detail);
  const contractId = await createContract(customerIds);
  return await createEvent('lambda', 'contract_created', {
    opp_changed_event: event,
    'contract_id': contractId
  });
}