const cards = [
  {
    id: 1,
    bank: "HDFC Bank",
    name: "HDFC Millennia Credit Card",
    type: "Cashback",
    annualFee: 1000,
    joiningFee: 1000,
    minimumIncome: 25000,

    cashback: true,
    rewards: true,
    dining: true,
    travel: false,
    onlineShopping: true,

    cashbackRate: "5%",
    rewardRate: "1%",
    
    bestFor: [
      "Online shopping",
      "Cashback",
      "Digital payments",
    ],

    officialUrl:
      "https://www.hdfcbank.com/",
  },

  {
    id: 2,
    bank: "SBI Card",
    name: "SBI Cashback Credit Card",
    type: "Cashback",
    annualFee: 999,
    joiningFee: 999,
    minimumIncome: 25000,

    cashback: true,
    rewards: true,
    dining: false,
    travel: false,
    onlineShopping: true,

    cashbackRate: "5%",
    rewardRate: "1%",

    bestFor: [
      "Online shopping",
      "Cashback",
      "Everyday spending",
    ],

    officialUrl:
      "https://www.sbicard.com/",
  },

  {
    id: 3,
    bank: "ICICI Bank",
    name: "Amazon Pay ICICI Credit Card",
    type: "Cashback",
    annualFee: 0,
    joiningFee: 0,
    minimumIncome: 20000,

    cashback: true,
    rewards: true,
    dining: false,
    travel: false,
    onlineShopping: true,

    cashbackRate: "5%",
    rewardRate: "1%",

    bestFor: [
      "Amazon shopping",
      "Cashback",
      "No annual fee",
    ],

    officialUrl:
      "https://www.icicibank.com/",
  },

  {
    id: 4,
    bank: "Axis Bank",
    name: "Axis Bank ACE Credit Card",
    type: "Cashback",
    annualFee: 499,
    joiningFee: 499,
    minimumIncome: 25000,

    cashback: true,
    rewards: true,
    dining: true,
    travel: false,
    onlineShopping: true,

    cashbackRate: "5%",
    rewardRate: "2%",

    bestFor: [
      "Bill payments",
      "Cashback",
      "Dining",
    ],

    officialUrl:
      "https://www.axisbank.com/",
  },

  {
    id: 5,
    bank: "ICICI Bank",
    name: "ICICI Coral Credit Card",
    type: "Rewards",
    annualFee: 500,
    joiningFee: 500,
    minimumIncome: 25000,

    cashback: false,
    rewards: true,
    dining: true,
    travel: true,
    onlineShopping: true,

    cashbackRate: "1%",
    rewardRate: "2x",

    bestFor: [
      "Dining",
      "Movies",
      "Rewards",
    ],

    officialUrl:
      "https://www.icicibank.com/",
  },

  {
    id: 6,
    bank: "Axis Bank",
    name: "Axis Bank Airtel Credit Card",
    type: "Cashback",
    annualFee: 500,
    joiningFee: 500,
    minimumIncome: 25000,

    cashback: true,
    rewards: true,
    dining: false,
    travel: false,
    onlineShopping: true,

    cashbackRate: "25%",
    rewardRate: "1%",

    bestFor: [
      "Airtel users",
      "Utility bills",
      "Online spending",
    ],

    officialUrl:
      "https://www.axisbank.com/",
  },
];

export default cards;