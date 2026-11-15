import type { StateGeography } from "@/types/geography";

export const nigerianStates = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
  "Federal Capital Territory",
];

export const demoGeography: StateGeography[] = [
  {
    id: "demo-lagos",
    name: "Lagos",
    lgas: [
      {
        id: "demo-ikeja",
        name: "Ikeja",
        wards: [
          {
            id: "demo-ikeja-ward-1",
            name: "Sample Ward 01",
            pollingUnits: [
              {
                id: "demo-pu-001",
                name: "Sample Polling Unit 001",
                code: "DEMO-LAG-001",
              },
              {
                id: "demo-pu-002",
                name: "Sample Polling Unit 002",
                code: "DEMO-LAG-002",
              },
              {
                id: "demo-pu-003",
                name: "Sample Polling Unit 003",
                code: "DEMO-LAG-003",
              },
            ],
          },
          {
            id: "demo-ikeja-ward-2",
            name: "Sample Ward 02",
            pollingUnits: [
              {
                id: "demo-pu-004",
                name: "Sample Polling Unit 004",
                code: "DEMO-LAG-004",
              },
              {
                id: "demo-pu-005",
                name: "Sample Polling Unit 005",
                code: "DEMO-LAG-005",
              },
            ],
          },
        ],
      },
      {
        id: "demo-etiosa",
        name: "Eti-Osa",
        wards: [
          {
            id: "demo-etiosa-ward-1",
            name: "Sample Ward 01",
            pollingUnits: [
              {
                id: "demo-pu-006",
                name: "Sample Polling Unit 006",
                code: "DEMO-LAG-006",
              },
              {
                id: "demo-pu-007",
                name: "Sample Polling Unit 007",
                code: "DEMO-LAG-007",
              },
            ],
          },
        ],
      },
    ],
  },
];