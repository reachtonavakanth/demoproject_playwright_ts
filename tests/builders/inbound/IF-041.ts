// import { IF041Payload } from '../../types/inbound/payload/IF-041';
import { IF041Payload } from '@inbound_payloads/IF-041';
import { generateSenderUniqueReference } from '@utils/DynamicDataGenerators';
import { generateSenderTimestamp } from '@utils/DynamicDataGenerators';
import { generateSenderCorrelationID } from '@utils/DynamicDataGenerators';
import { generateTransactionID } from '@utils/DynamicDataGenerators';
import { generateTransactionTimestamp } from '@utils/DynamicDataGenerators';
import { generateInitialCorrelationID } from '@utils/DynamicDataGenerators';
import { loadEnvConfig } from '@test_utils/envLoader';
import { InterfaceID } from 'constants/enum';
import { EventTypes_IF041 } from 'constants/enum';


export function buildIF041Payload(MPANCore :string,gspGroupID :string, senderRoleID :string,meterID :string,
   cumulativeRegisterReading :string,cumulativeRegisterReadingDateTime :string, readingMethod :string, siteVisitCheckCode :string ): IF041Payload {


  const timestamp = '';
  const correlationID = '';
  const transactionID = ''; 

const testEnvConfig = loadEnvConfig();

  return {
    CommonBlock: {
      M0: {
        MPANCore: MPANCore,
        distributorDIPID: testEnvConfig.distributorDipID,
        gspGroupID: gspGroupID
      },
      S0: {
        interfaceID: InterfaceID.IF041,
        schemaVersion: testEnvConfig.schemaVersion,
        eventCode: [EventTypes_IF041.ReadingCos]
      },
      S1: {
        environmentTag: testEnvConfig.environmentTag,
        subText: null,
        senderUniqueReference: generateSenderUniqueReference(InterfaceID.IF041, testEnvConfig.senderDipID, senderRoleID),
        senderTimestamp: generateSenderTimestamp(),
        senderDIPID: testEnvConfig.senderDipID,
        senderRoleID: senderRoleID,
        senderCorrelationID: generateSenderCorrelationID(),
        DIPConnectionProviderID: testEnvConfig.dipConnectionProviderID
      },
      A0: {
        primaryRecipients: [testEnvConfig.sdsDipId],
        secondaryRecipients: [],
        always: []
      },
      D0: {
        transactionID:generateTransactionID(InterfaceID.IF041, testEnvConfig.senderDipID, senderRoleID),
        transactionTimestamp: generateTransactionTimestamp(),
        publicationID: InterfaceID.IF041,
        initialCorrelationID: generateInitialCorrelationID(),
        replayIndicator: false,
        serviceTicketURL: null
      }
    },
    CustomBlock: {
      B064List: [
        {
          meterID: meterID,
          cumulativeRegisterReading: cumulativeRegisterReading,
          cumulativeRegisterReadingDateTime: cumulativeRegisterReadingDateTime,
          readingMethod: readingMethod,
          siteVisitCheckCode: siteVisitCheckCode
        }
      ]
    }
  };
}
