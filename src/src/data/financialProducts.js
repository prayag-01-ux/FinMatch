export const products = [
  {
    id: "hdfc-millennia",
    name: "HDFC Millennia Credit Card",
    bank: "HDFC Bank",
    type: "credit-card",
    minAge: 21,
    minIncome: 35000,
    annualFee: 1000,
    joiningFee: 1000,
    feeWaiverThreshold: 100000,
    cashbackPercent: 5,
    topCategories: ["shopping", "food", "entertainment"],
    benefits: {
      loungeAccess: true,
      fuelWaiver: true,
      forexMarkup: 3.5,
      zeroBalance: false
    },
    studentFriendly: false,
    description: "Great for online shoppers seeking cashbacks on Amazon, Flipkart, and Swiggy.",
    officialUrl: "https://www.hdfcbank.com"
  },
  {
    id: "sbi-simplyclick",
    name: "SBI SimplyCLICK Credit Card",
    bank: "State Bank of India",
    type: "credit-card",
    minAge: 18,
    minIncome: 20000,
    annualFee: 499,
    joiningFee: 499,
    feeWaiverThreshold: 100000,
    cashbackPercent: 2.5,
    topCategories: ["shopping", "utilities"],
    benefits: {
      loungeAccess: false,
      fuelWaiver: true,
      forexMarkup: 3.5,
      zeroBalance: false
    },
    studentFriendly: true,
    description: "Ideal entry-level credit card for young professionals and students.",
    officialUrl: "https://www.sbicard.com"
  },
  {
    id: "kotak-811",
    name: "Kotak 811 Zero Balance Account",
    bank: "Kotak Mahindra Bank",
    type: "bank-account",
    minAge: 18,
    minIncome: 0,
    annualFee: 0,
    joiningFee: 0,
    cashbackPercent: 1,
    topCategories: ["shopping", "food"],
    benefits: {
      loungeAccess: false,
      fuelWaiver: false,
      forexMarkup: 3.5,
      zeroBalance: true
    },
    studentFriendly: true,
    description: "Full-featured digital savings account with no minimum balance requirement.",
    officialUrl: "https://www.kotak.com"
  }
];