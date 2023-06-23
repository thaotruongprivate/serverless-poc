import { OpportunityChangeType } from '../commons/types/types';
import { createEvent } from '../commons/utilities/createEvent';

module.exports.handler = async (event) => {
    const body: {
        source: string,
        detail_type: string,
        detail: OpportunityChangeType
    } = JSON.parse(event.body);
    return createEvent(body.source, body.detail_type, body.detail);
};
