export type CommonBlock = {
  M0: {
    MPANCore: string;
    distributorDIPID: string;
    gspGroupID: string;
  };
  S0: {
    interfaceID: string;
    schemaVersion: string;
    eventCode: string[];
  };
  S1: {
    environmentTag: string;
    subText: string | null;
    senderUniqueReference: string;
    senderTimestamp: string;
    senderDIPID: string;
    senderRoleID: string;
    senderCorrelationID: string;
    DIPConnectionProviderID: string;
  };
  A0: {
    primaryRecipients: string[];
    secondaryRecipients: string[];
    always: string[];
  };
  D0: {
    transactionID: string;
    transactionTimestamp: string;
    publicationID: string;
    initialCorrelationID: string;
    replayIndicator: boolean;
    serviceTicketURL: string | null;
  };
};
