// import { IF041Payload } from '../../types/inbound/payload/IF-041';
import { IF041Payload } from '@inbound_payloads/IF-041';
import { generateSenderUniqueReference } from '@utils/DynamicDataGenerators';
import { generateSenderTimestamp } from '@utils/DynamicDataGenerators';
import { generateSenderCorrelationID } from '@utils/DynamicDataGenerators';
import { generateTransactionID } from '@utils/DynamicDataGenerators';
import { generateTransactionTimestamp } from '@utils/DynamicDataGenerators';
import { generateInitialCorrelationID } from '@utils/DynamicDataGenerators';


// import { generateCorrelationID, generateTransactionID } from '../utils/idGenerator';

export function buildIF041Payload(): IF041Payload {
//   const timestamp = getUTCTimestamp();
//   const correlationID = generateCorrelationID();
//   const transactionID = generateTransactionID();

  const timestamp = '';
  const correlationID = '';
  const transactionID = '';

  return {
    CommonBlock: {
      M0: {
        MPANCore: '1234567891',
        distributorDIPID: '2500000002',
        gspGroupID: '_N'
      },
      S0: {
        interfaceID: 'IF-041',
        schemaVersion: '011',
        eventCode: ['ReadingCos']
      },
      S1: {
        environmentTag: 'DEV',
        subText: null,
        senderUniqueReference: `S-IF-041-22000000002-REGS-${timestamp}-XYZ`,
        senderTimestamp: timestamp,
        senderDIPID: '22000000002',
        senderRoleID: 'REGS',
        senderCorrelationID: correlationID,
        DIPConnectionProviderID: '1046217565'
      },
      A0: {
        primaryRecipients: ['140000003'],
        secondaryRecipients: [],
        always: []
      },
      D0: {
        transactionID,
        transactionTimestamp: timestamp,
        publicationID: 'IF-041',
        initialCorrelationID: correlationID,
        replayIndicator: false,
        serviceTicketURL: null
      }
    },
    CustomBlock: {
      B064List: [
        {
          meterID: 'M1234568',
          cumulativeRegisterReading: '1000',
          cumulativeRegisterReadingDateTime: '24-07-2025',
          readingMethod: 'A',
          siteVisitCheckCode: '01'
        }
      ]
    }
  };
}
