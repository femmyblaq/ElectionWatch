export type PollingUnit = {
  id: string;
  name: string;
  code: string;
};

export type Ward = {
  id: string;
  name: string;
  pollingUnits: PollingUnit[];
};

export type LGA = {
  id: string;
  name: string;
  wards: Ward[];
};

export type StateGeography = {
  id: string;
  name: string;
  lgas: LGA[];
};