const accounts = [
  {
    id: "account-001",

    // BASIC INFORMATION
    bank: "Bank Name",
    name: "Account Name",
    accountType: "Savings Account",

    // ELIGIBILITY
    minimumAge: 18,
    maximumAge: null,
    studentFriendly: true,
    incomeRequirement: 0,

    // BALANCE & INTEREST
    minimumBalance: 0,
    interestRate: null,

    // DIGITAL FEATURES
    digitalBanking: true,
    upi: true,

    // BENEFITS
    rewards: false,
    international: false,
    highInterest: false,

    // FEES
    accountOpeningFee: 0,
    annualFee: null,
    debitCardFee: null,
    atmFee: null,

    // OTHER
    bestFor: [
      "Students",
      "First-time account holders",
      "Digital banking users",
    ],

    // OFFICIAL INFORMATION
    officialUrl: "",
    lastVerified: "",
    source: "Official bank website",

    disclaimer:
      "Fees, eligibility and features may change. Verify the latest information on the bank's official website before applying.",
  },

  {
    id: "account-002",

    // BASIC INFORMATION
    bank: "Bank Name",
    name: "Digital Savings Account",
    accountType: "Savings Account",

    // ELIGIBILITY
    minimumAge: 18,
    maximumAge: null,
    studentFriendly: true,
    incomeRequirement: 0,

    // BALANCE & INTEREST
    minimumBalance: 0,
    interestRate: null,

    // DIGITAL FEATURES
    digitalBanking: true,
    upi: true,

    // BENEFITS
    rewards: true,
    international: false,
    highInterest: false,

    // FEES
    accountOpeningFee: 0,
    annualFee: null,
    debitCardFee: null,
    atmFee: null,

    // OTHER
    bestFor: [
      "Digital banking",
      "UPI users",
      "Young users",
    ],

    // OFFICIAL INFORMATION
    officialUrl: "",
    lastVerified: "",
    source: "Official bank website",

    disclaimer:
      "Fees, eligibility and features may change. Verify the latest information on the bank's official website before applying.",
  },
];

export default accounts;