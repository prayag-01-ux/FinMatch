export function calculateMatchScore(userProfile, product) {
  let subScores = {
    eligibility: 100,
    income: 100,
    spending: 70,
    feePreference: 100,
    rewards: 80
  };
  
  let matchReasons = [];

  // Age Eligibility
  if (userProfile.age < product.minAge) {
    subScores.eligibility = 0;
    matchReasons.push("❌ Below minimum age requirement");
  } else {
    matchReasons.push("✓ Age requirement met");
  }

  // Income Eligibility
  if (userProfile.income < product.minIncome) {
    subScores.income = 40;
    matchReasons.push("⚠️ Below recommended income tier");
  } else {
    matchReasons.push("✓ Suitable for your income level");
  }

  // Fee Preference Match
  if (userProfile.preferredMaxFee === 0 && product.annualFee === 0) {
    subScores.feePreference = 100;
    matchReasons.push("✓ Zero annual fee matches preference");
  } else if (product.annualFee <= userProfile.preferredMaxFee) {
    subScores.feePreference = 90;
    matchReasons.push("✓ Within your annual fee limit");
  } else {
    subScores.feePreference = 40;
  }

  // Spending Category Alignment
  const categoryMatches = product.topCategories.filter(cat => 
    userProfile.spendingCategories?.includes(cat)
  );
  
  if (categoryMatches.length > 0) {
    subScores.spending = 100;
    matchReasons.push(`✓ High cashback for your spending: ${categoryMatches.join(", ")}`);
  }

  // Weighted Overall Match Calculation
  const overall = Math.round(
    subScores.eligibility * 0.30 +
    subScores.income * 0.25 +
    subScores.spending * 0.25 +
    subScores.feePreference * 0.20
  );

  return {
    score: overall,
    subScores,
    reasons: matchReasons
  };
}