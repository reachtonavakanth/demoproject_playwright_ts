export interface FullName {
  first: string;
  last: string;
}

export interface Employment {
  status: 'Employed' | 'Unemployed' | 'Self-Employed' | 'Retired';
  employerName: string;
  annualIncome: number;
}

export interface ApplicantBlock {
  applicantID: string;
  fullName: FullName;
  dob: string;
  country: string;
  employment: Employment;
}

export interface MetaBlock {
  submissionID: string;
  submittedBy: string;
  submissionTimestamp: string;
}

export interface UserRegistrationPayload {
  ApplicantBlock: ApplicantBlock;
  MetaBlock: MetaBlock;
}
