import { int } from 'aws-sdk/clients/datapipeline';

export type OpportunityChangeType = {
  id: string,
  changed_property: string,
  old_value: string,
  new_value: string,
  record: {
    cleantech_order_id__c: string
  },
  related_objects: {
    synced_quote: {
      record_type_id: string,
    },
    account: {

    },
    contacts: Array<{
      id: string,
      street_address: string,
      city: string,
      postcode: string,
      first_name: string,
      last_name: string,
      phone_number: string,
      country?: string,
      gender: string,
    }>
  }
};

export type EventBrideEvent<T> = {
  version: string,
  id: string,
  'detail-type': string,
  source: string,
  account: string,
  time: string,
  region: string,
  resources: Array<string>,
  detail: T
}

export type BullfinchSecrets = {
  bullfinch_api_client_id: string,
  bullfinch_api_client_secret: string,
  bullfinch_id: string
}

export type BullfinchGetCommandResponse = {
  command_id: string,
  status: int,
  message: string,
  resource_id: string,
  error: {
    msg: string
  }
}