import { useState } from "react";
import accounts from "./accounts";
import cards from "./cards";
import "./App.css";

function App() {
  // =====================================================
  // PAGE
  // =====================================================

  const [page, setPage] = useState("home");

  // =====================================================
  // BANK ACCOUNT STATES
  // =====================================================

  const [userData, setUserData] = useState({
    age: "",
    occupation: "",
    income: "",
    priority: "",
  });

  const [questionIndex, setQuestionIndex] = useState(0);

  const [recommendations, setRecommendations] = useState([]);

  const [selectedAccount, setSelectedAccount] = useState(null);

  const [compareAccounts, setCompareAccounts] = useState([]);

  // =====================================================
  // CREDIT CARD STATES
  // =====================================================

  const [cardUserData, setCardUserData] = useState({
    income: "",
    cardPriority: "",
    spending: "",
  });

  const [cardQuestionIndex, setCardQuestionIndex] = useState(0);

  const [cardRecommendations, setCardRecommendations] =
    useState([]);

  const [selectedCard, setSelectedCard] = useState(null);

  const [compareCards, setCompareCards] = useState([]);

  // =====================================================
  // BANK ACCOUNT QUESTIONS
  // =====================================================

  const questions = [
    {
      key: "age",
      title: "How old are you?",
      options: [
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
      ],
    },

    {
      key: "occupation",
      title: "What best describes you?",
      options: [
        "Student",
        "Working Professional",
        "Self Employed",
      ],
    },

    {
      key: "income",
      title: "What is your monthly income?",
      options: [
        "0",
        "10000",
        "15000",
        "25000",
        "50000",
        "100000",
      ],
    },

    {
      key: "priority",
      title: "What matters most to you?",
      options: [
        "Low fees",
        "Digital banking",
        "Rewards",
        "International",
      ],
    },
  ];

  // =====================================================
  // CREDIT CARD QUESTIONS
  // =====================================================

  const cardQuestions = [
    {
      key: "income",
      title: "What is your monthly income?",
      options: [
        "15000",
        "25000",
        "50000",
        "100000",
        "200000",
      ],
    },

    {
      key: "cardPriority",
      title: "What do you want most from your credit card?",
      options: [
        "Cashback",
        "Rewards",
        "Travel",
        "Dining",
      ],
    },

    {
      key: "spending",
      title: "Where do you spend the most?",
      options: [
        "Online Shopping",
        "Bills",
        "Dining",
        "Travel",
      ],
    },
  ];

  // =====================================================
  // START BANK QUESTIONNAIRE
  // =====================================================

  const startQuestionnaire = () => {
    setQuestionIndex(0);

    setUserData({
      age: "",
      occupation: "",
      income: "",
      priority: "",
    });

    setPage("bank-questionnaire");
  };

  // =====================================================
  // BANK QUESTION ANSWER
  // =====================================================

  const handleAnswer = (value) => {
    const currentQuestion = questions[questionIndex];

    const updatedData = {
      ...userData,
      [currentQuestion.key]: value,
    };

    setUserData(updatedData);

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      generateRecommendations(updatedData);
    }
  };

  // =====================================================
  // BANK RECOMMENDATION ENGINE
  // =====================================================

  const generateRecommendations = (profile) => {
    const userAge = Number(profile.age);
    const userIncome = Number(profile.income);

    const results = accounts
      .map((account) => {
        if (
          account.minimumAge &&
          userAge < Number(account.minimumAge)
        ) {
          return null;
        }

        if (
          account.maximumAge !== undefined &&
          account.maximumAge !== null &&
          userAge > Number(account.maximumAge)
        ) {
          return null;
        }

        if (
          account.incomeRequirement &&
          userIncome < Number(account.incomeRequirement)
        ) {
          return null;
        }

        const breakdown = {
          age: 10,
          occupation: 0,
          income: 15,
          balance: 0,
          priority: 0,
          digital: 0,
          benefits: 0,
          suitability: 10,
        };

        const reasons = [];

        reasons.push("You meet the age requirement");

        // OCCUPATION
        if (
          profile.occupation === "Student" &&
          account.studentFriendly
        ) {
          breakdown.occupation = 15;

          reasons.push("Suitable for students");
        } else if (profile.occupation !== "Student") {
          breakdown.occupation = 15;

          reasons.push(
            "Suitable for your occupation"
          );
        } else {
          breakdown.occupation = 5;
        }

        // BALANCE
        const balance = Number(
          account.minimumBalance || 0
        );

        if (balance === 0) {
          breakdown.balance = 15;

          reasons.push(
            "No minimum balance requirement"
          );
        } else if (balance <= 1000) {
          breakdown.balance = 12;

          reasons.push("Low minimum balance");
        } else if (balance <= 5000) {
          breakdown.balance = 8;
        } else {
          breakdown.balance = 3;
        }

        // PRIORITY
        if (profile.priority === "Low fees") {
          if (
            balance === 0 &&
            Number(account.annualFee || 0) === 0
          ) {
            breakdown.priority = 20;

            reasons.push(
              "Excellent match for low fees"
            );
          } else {
            breakdown.priority = 8;
          }
        } else if (
          profile.priority === "Digital banking"
        ) {
          if (account.digitalBanking) {
            breakdown.priority = 20;

            reasons.push(
              "Strong digital banking features"
            );
          } else {
            breakdown.priority = 5;
          }
        } else if (
          profile.priority === "Rewards"
        ) {
          if (account.rewards) {
            breakdown.priority = 20;

            reasons.push(
              "Good rewards potential"
            );
          } else {
            breakdown.priority = 5;
          }
        } else if (
          profile.priority === "International"
        ) {
          if (account.international) {
            breakdown.priority = 20;

            reasons.push(
              "Good international support"
            );
          } else {
            breakdown.priority = 5;
          }
        }

        // DIGITAL
        if (account.digitalBanking) {
          breakdown.digital += 5;
        }

        if (account.upi) {
          breakdown.digital += 5;
        }

        // BENEFITS
        if (
          account.rewards ||
          account.international
        ) {
          breakdown.benefits = 5;
        }

        const score =
          breakdown.age +
          breakdown.occupation +
          breakdown.income +
          breakdown.balance +
          breakdown.priority +
          breakdown.digital +
          breakdown.benefits +
          breakdown.suitability;

        return {
          ...account,
          score,
          breakdown,
          reasons,
        };
      })
      .filter(Boolean);

    results.sort((a, b) => b.score - a.score);

    setRecommendations(results);

    setPage("bank-results");
  };

  // =====================================================
  // BANK ACCOUNT COMPARE
  // =====================================================

  const toggleCompareAccount = (account) => {
    const exists = compareAccounts.some(
      (item) => item.id === account.id
    );

    if (exists) {
      setCompareAccounts(
        compareAccounts.filter(
          (item) => item.id !== account.id
        )
      );

      return;
    }

    if (compareAccounts.length >= 3) {
      alert("You can compare up to 3 accounts.");
      return;
    }

    setCompareAccounts([
      ...compareAccounts,
      account,
    ]);
  };

  // =====================================================
  // START CREDIT CARD QUESTIONNAIRE
  // =====================================================

  const startCardQuestionnaire = () => {
    setCardQuestionIndex(0);

    setCardUserData({
      income: "",
      cardPriority: "",
      spending: "",
    });

    setPage("card-questionnaire");
  };

  // =====================================================
  // CREDIT CARD ANSWER
  // =====================================================

  const handleCardAnswer = (value) => {
    const currentQuestion =
      cardQuestions[cardQuestionIndex];

    const updatedData = {
      ...cardUserData,
      [currentQuestion.key]: value,
    };

    setCardUserData(updatedData);

    if (
      cardQuestionIndex <
      cardQuestions.length - 1
    ) {
      setCardQuestionIndex(
        cardQuestionIndex + 1
      );
    } else {
      generateCardRecommendations(updatedData);
    }
  };

  // =====================================================
  // CREDIT CARD RECOMMENDATION ENGINE
  // =====================================================

  const generateCardRecommendations = (profile) => {
    const income = Number(profile.income);

    const results = cards
      .map((card) => {
        // Eligibility
        if (
          card.minimumIncome &&
          income < Number(card.minimumIncome)
        ) {
          return null;
        }

        const breakdown = {
          income: 20,
          priority: 0,
          spending: 0,
          fee: 0,
          benefits: 0,
        };

        const reasons = [];

        // INCOME
        reasons.push(
          "You meet the stated income requirement"
        );

        // PRIORITY
        if (
          profile.cardPriority === "Cashback" &&
          card.cashback
        ) {
          breakdown.priority = 30;

          reasons.push(
            "Strong cashback benefits"
          );
        } else if (
          profile.cardPriority === "Rewards" &&
          card.rewards
        ) {
          breakdown.priority = 30;

          reasons.push(
            "Good rewards potential"
          );
        } else if (
          profile.cardPriority === "Travel" &&
          card.travel
        ) {
          breakdown.priority = 30;

          reasons.push(
            "Travel-oriented benefits"
          );
        } else if (
          profile.cardPriority === "Dining" &&
          card.dining
        ) {
          breakdown.priority = 30;

          reasons.push(
            "Good dining benefits"
          );
        } else {
          breakdown.priority = 10;
        }

        // SPENDING
        if (
          profile.spending ===
            "Online Shopping" &&
          card.onlineShopping
        ) {
          breakdown.spending = 20;

          reasons.push(
            "Good for online shopping"
          );
        } else if (
          profile.spending === "Dining" &&
          card.dining
        ) {
          breakdown.spending = 20;

          reasons.push(
            "Good for dining"
          );
        } else if (
          profile.spending === "Travel" &&
          card.travel
        ) {
          breakdown.spending = 20;

          reasons.push(
            "Good for travel spending"
          );
        } else if (
          profile.spending === "Bills" &&
          card.cashback
        ) {
          breakdown.spending = 20;

          reasons.push(
            "Good for bill payments"
          );
        } else {
          breakdown.spending = 10;
        }

        // FEES
        if (Number(card.annualFee) === 0) {
          breakdown.fee = 15;

          reasons.push(
            "No annual fee"
          );
        } else if (
          Number(card.annualFee) <= 500
        ) {
          breakdown.fee = 12;
        } else {
          breakdown.fee = 7;
        }

        // BENEFITS
        let benefits = 0;

        if (card.cashback) {
          benefits += 3;
        }

        if (card.rewards) {
          benefits += 3;
        }

        if (card.onlineShopping) {
          benefits += 3;
        }

        if (card.dining) {
          benefits += 3;
        }

        if (card.travel) {
          benefits += 3;
        }

        breakdown.benefits = benefits;

        // TOTAL SCORE
        const score =
          breakdown.income +
          breakdown.priority +
          breakdown.spending +
          breakdown.fee +
          breakdown.benefits;

        return {
          ...card,
          score,
          breakdown,
          reasons,
        };
      })
      .filter(Boolean);

    results.sort((a, b) => b.score - a.score);

    setCardRecommendations(results);

    setPage("card-results");
  };

  // =====================================================
  // CREDIT CARD COMPARE
  // =====================================================

  const toggleCompareCard = (card) => {
    const exists = compareCards.some(
      (item) => item.id === card.id
    );

    if (exists) {
      setCompareCards(
        compareCards.filter(
          (item) => item.id !== card.id
        )
      );

      return;
    }

    if (compareCards.length >= 3) {
      alert("You can compare up to 3 cards.");
      return;
    }

    setCompareCards([
      ...compareCards,
      card,
    ]);
  };

  // =====================================================
  // HOME PAGE
  // =====================================================

  if (page === "home") {
    return (
      <div className="app">

        <nav className="navbar">

          <div className="logo">
            Fin<span>Match</span>
          </div>

          <div className="nav-links">

            <button
              onClick={() => setPage("home")}
            >
              Home
            </button>

            <button
              onClick={startQuestionnaire}
            >
              Bank Accounts
            </button>

            <button
              onClick={startCardQuestionnaire}
            >
              Credit Cards
            </button>

          </div>

        </nav>


        <main className="hero-section">

          <div className="hero-content">

            <div className="hero-badge">
              SMART FINANCIAL MATCHING
            </div>

            <h1>
              Find the financial
              <span>
                product that's right for you.
              </span>
            </h1>

            <p>
              Stop comparing dozens of banks
              and cards manually. Tell us about
              yourself and FinMatch finds the
              products that fit your lifestyle,
              income and goals.
            </p>


            <div className="hero-buttons">

              <button
                className="primary-button"
                onClick={startQuestionnaire}
              >
                Find My Bank Account →
              </button>

              <button
                className="secondary-button"
                onClick={startCardQuestionnaire}
              >
                Find a Credit Card
              </button>

            </div>


            <div className="trust-points">

              <span>✓ Personalized</span>

              <span>✓ Transparent</span>

              <span>✓ Free to use</span>

            </div>

          </div>


          <div className="hero-card">

            <div className="hero-card-header">

              <span>
                YOUR FINMATCH
              </span>

              <span>✦</span>

            </div>


            <div className="hero-score">

              <div className="hero-score-circle">
                94%
              </div>

              <div>
                <strong>
                  Best Match
                </strong>

                <p>
                  Personalized for you
                </p>
              </div>

            </div>


            <div className="hero-product">

              <div>

                <small>
                  RECOMMENDED
                </small>

                <h3>
                  Financial Product
                </h3>

                <p>
                  Matched to your needs
                </p>

              </div>

              <span>→</span>

            </div>


            <div className="hero-features">

              <div>
                <strong>Banks</strong>
                <span>Compare</span>
              </div>

              <div>
                <strong>Cards</strong>
                <span>Discover</span>
              </div>

              <div>
                <strong>Match</strong>
                <span>Score</span>
              </div>

            </div>

          </div>

        </main>


        <section className="stats-section">

          <div>
            <strong>10+</strong>
            <span>Banks</span>
          </div>

          <div>
            <strong>50+</strong>
            <span>Products</span>
          </div>

          <div>
            <strong>100%</strong>
            <span>Transparent</span>
          </div>

          <div>
            <strong>₹0</strong>
            <span>Cost to users</span>
          </div>

        </section>


        <section className="how-section">

          <div className="section-heading">

            <p className="step">
              HOW IT WORKS
            </p>

            <h2>
              Smarter financial decisions.
            </h2>

          </div>


          <div className="steps-grid">

            <div className="step-card">

              <div className="step-number">
                01
              </div>

              <h3>
                Tell us about you
              </h3>

              <p>
                Answer a few questions
                about your income,
                lifestyle and priorities.
              </p>

            </div>


            <div className="step-card">

              <div className="step-number">
                02
              </div>

              <h3>
                We analyze
              </h3>

              <p>
                FinMatch evaluates
                eligibility, fees,
                features and benefits.
              </p>

            </div>


            <div className="step-card">

              <div className="step-number">
                03
              </div>

              <h3>
                Get your match
              </h3>

              <p>
                See your best financial
                products with a
                transparent match score.
              </p>

            </div>

          </div>

        </section>


        <section className="final-cta">

          <p className="step">
            READY?
          </p>

          <h2>
            Find your financial match.
          </h2>

          <p>
            Choose a bank account or
            credit card.
          </p>


          <div className="hero-buttons">

            <button
              className="primary-button"
              onClick={startQuestionnaire}
            >
              Find Bank Account
            </button>

            <button
              className="secondary-button"
              onClick={startCardQuestionnaire}
            >
              Find Credit Card
            </button>

          </div>

        </section>


        <footer className="footer">

          <div className="logo">
            Fin<span>Match</span>
          </div>

          <p>
            Smarter financial decisions,
            made simple.
          </p>

          <small>
            © 2026 FinMatch
          </small>

        </footer>

      </div>
    );
  }

  // =====================================================
  // BANK QUESTIONNAIRE
  // =====================================================

  if (page === "bank-questionnaire") {
    const question =
      questions[questionIndex];

    return (
      <div className="questionnaire">

        <div className="question-container">

          <button
            className="back-button"
            onClick={() => setPage("home")}
          >
            ← Back
          </button>


          <p className="step">
            BANK ACCOUNT • QUESTION{" "}
            {questionIndex + 1} OF{" "}
            {questions.length}
          </p>


          <h1>
            {question.title}
          </h1>


          <div className="options">

            {question.options.map(
              (option) => (
                <button
                  key={option}
                  onClick={() =>
                    handleAnswer(option)
                  }
                >
                  {question.key === "income"
                    ? `₹${Number(
                        option
                      ).toLocaleString(
                        "en-IN"
                      )}`
                    : option}
                </button>
              )
            )}

          </div>

        </div>

      </div>
    );
  }

  // =====================================================
  // BANK RESULTS
  // =====================================================

  if (page === "bank-results") {
    return (
      <div className="questionnaire">

        <div className="results-container">

          <button
            className="back-button"
            onClick={() => setPage("home")}
          >
            ← Home
          </button>


          <p className="step">
            BANK ACCOUNT RESULTS
          </p>


          <h1>
            Accounts matched to you.
          </h1>


          <p className="results-description">
            Ranked according to your
            profile and preferences.
          </p>


          <div className="results-grid">

            {recommendations.map(
              (account, index) => (

                <div
                  className="account-card"
                  key={account.id}
                >

                  {index === 0 && (
                    <div className="top-match">
                      TOP MATCH
                    </div>
                  )}


                  <p className="bank-name">
                    {account.bank}
                  </p>


                  <h2>
                    {account.name}
                  </h2>


                  <p>
                    {account.accountType}
                  </p>


                  <div className="match-score">

                    <div className="score-display">

                      <div className="score-number">
                        {account.score ?? 0}%
                      </div>

                      <span>
                        match
                      </span>

                    </div>


                    <div className="score-breakdown">

                      <h4>
                        Why you got this score
                      </h4>


                      <div className="score-row">
                        <span>Age fit</span>

                        <strong>
                          {account.breakdown?.age ?? 0}/10
                        </strong>
                      </div>


                      <div className="score-row">
                        <span>Occupation</span>

                        <strong>
                          {account.breakdown?.occupation ?? 0}/15
                        </strong>
                      </div>


                      <div className="score-row">
                        <span>Income</span>

                        <strong>
                          {account.breakdown?.income ?? 0}/15
                        </strong>
                      </div>


                      <div className="score-row">
                        <span>Minimum balance</span>

                        <strong>
                          {account.breakdown?.balance ?? 0}/15
                        </strong>
                      </div>


                      <div className="score-row">
                        <span>Your priority</span>

                        <strong>
                          {account.breakdown?.priority ?? 0}/20
                        </strong>
                      </div>


                      <div className="score-row">
                        <span>Digital features</span>

                        <strong>
                          {account.breakdown?.digital ?? 0}/10
                        </strong>
                      </div>


                      <div className="score-row">
                        <span>Benefits</span>

                        <strong>
                          {account.breakdown?.benefits ?? 0}/5
                        </strong>
                      </div>


                      <div className="score-row">
                        <span>Suitability</span>

                        <strong>
                          {account.breakdown?.suitability ?? 0}/10
                        </strong>
                      </div>

                    </div>

                  </div>


                  <div className="reasons">

                    <h3>
                      Why we recommend it
                    </h3>

                    <ul>

                      {account.reasons
                        ?.slice(0, 5)
                        .map(
                          (reason, index) => (
                            <li key={index}>
                              ✓ {reason}
                            </li>
                          )
                        )}

                    </ul>

                  </div>


                  <div className="account-actions">

                    <button
                      onClick={() => {
                        setSelectedAccount(account);
                        setPage("account-details");
                      }}
                    >
                      View Account
                    </button>


                    <button
                      onClick={() =>
                        toggleCompareAccount(
                          account
                        )
                      }
                    >
                      {compareAccounts.some(
                        (item) =>
                          item.id === account.id
                      )
                        ? "✓ Comparing"
                        : "Compare"}
                    </button>

                  </div>

                </div>

              )
            )}

          </div>


          {compareAccounts.length >= 2 && (
            <div className="compare-bar">

              <p>
                {compareAccounts.length} accounts
                selected
              </p>

              <button
                onClick={() =>
                  setPage("account-compare")
                }
              >
                Compare Accounts →
              </button>

            </div>
          )}

        </div>

      </div>
    );
  }

  // =====================================================
  // ACCOUNT DETAILS
  // =====================================================

  if (
    page === "account-details" &&
    selectedAccount
  ) {
    return (
      <div className="questionnaire">

        <div className="details-container">

          <button
            className="back-button"
            onClick={() =>
              setPage("bank-results")
            }
          >
            ← Back to Results
          </button>


          <p className="step">
            ACCOUNT DETAILS
          </p>


          <h1>
            {selectedAccount.name}
          </h1>


          <p className="bank-name">
            {selectedAccount.bank}
          </p>


          <div className="details-score">

            <strong>
              {selectedAccount.score ?? 0}%
            </strong>

            <span>
              match for your profile
            </span>

          </div>


          <h2 className="details-heading">
            Account Information
          </h2>


          <div className="details-grid">

            <div className="detail-card">
              <h3>Minimum Balance</h3>

              <p>
                ₹{selectedAccount.minimumBalance ?? 0}
              </p>
            </div>


            <div className="detail-card">
              <h3>Minimum Age</h3>

              <p>
                {selectedAccount.minimumAge ?? "N/A"}
              </p>
            </div>


            <div className="detail-card">
              <h3>Student Friendly</h3>

              <p>
                {selectedAccount.studentFriendly
                  ? "Yes"
                  : "No"}
              </p>
            </div>


            <div className="detail-card">
              <h3>Digital Banking</h3>

              <p>
                {selectedAccount.digitalBanking
                  ? "Available"
                  : "Not available"}
              </p>
            </div>

          </div>


          <div className="why-section">

            <h2>
              Why FinMatch recommends this
            </h2>

            <ul>

              {selectedAccount.reasons?.map(
                (reason, index) => (
                  <li key={index}>
                    ✓ {reason}
                  </li>
                )
              )}

            </ul>

          </div>


          <div className="source-section">

            <p>
              Always verify current fees,
              eligibility and features on
              the official bank website
              before applying.
            </p>


            {selectedAccount.officialUrl && (
              <a
                href={selectedAccount.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Official Bank Website →
              </a>
            )}

          </div>

        </div>

      </div>
    );
  }

  // =====================================================
  // ACCOUNT COMPARISON
  // =====================================================

  if (page === "account-compare") {
    return (
      <div className="questionnaire">

        <div className="compare-container">

          <button
            className="back-button"
            onClick={() =>
              setPage("bank-results")
            }
          >
            ← Back to Results
          </button>


          <p className="step">
            ACCOUNT COMPARISON
          </p>


          <h1>
            Compare accounts.
          </h1>


          <div className="comparison-wrapper">

            <div
              className="comparison-table"
              style={{
                gridTemplateColumns:
                  `180px repeat(${compareAccounts.length}, minmax(200px, 1fr))`,
              }}
            >

              <div className="comparison-feature">
                Feature
              </div>


              {compareAccounts.map(
                (account) => (
                  <div
                    className="comparison-account"
                    key={account.id}
                  >
                    <h3>
                      {account.name}
                    </h3>

                    <p>
                      {account.bank}
                    </p>
                  </div>
                )
              )}


              <div className="comparison-feature">
                Match Score
              </div>


              {compareAccounts.map(
                (account) => (
                  <div
                    className="comparison-value"
                    key={`score-${account.id}`}
                  >
                    {account.score ?? 0}%
                  </div>
                )
              )}


              <div className="comparison-feature">
                Minimum Balance
              </div>


              {compareAccounts.map(
                (account) => (
                  <div
                    className="comparison-value"
                    key={`balance-${account.id}`}
                  >
                    ₹{account.minimumBalance ?? 0}
                  </div>
                )
              )}


              <div className="comparison-feature">
                Student Friendly
              </div>


              {compareAccounts.map(
                (account) => (
                  <div
                    className="comparison-value"
                    key={`student-${account.id}`}
                  >
                    {account.studentFriendly
                      ? "✓ Yes"
                      : "No"}
                  </div>
                )
              )}

            </div>

          </div>

        </div>

      </div>
    );
  }

  // =====================================================
  // CREDIT CARD QUESTIONNAIRE
  // =====================================================

  if (page === "card-questionnaire") {
    const question =
      cardQuestions[cardQuestionIndex];

    return (
      <div className="questionnaire">

        <div className="question-container">

          <button
            className="back-button"
            onClick={() =>
              setPage("home")
            }
          >
            ← Back
          </button>


          <p className="step">
            CREDIT CARD • QUESTION{" "}
            {cardQuestionIndex + 1} OF{" "}
            {cardQuestions.length}
          </p>


          <h1>
            {question.title}
          </h1>


          <div className="options">

            {question.options.map(
              (option) => (
                <button
                  key={option}
                  onClick={() =>
                    handleCardAnswer(
                      option
                    )
                  }
                >
                  {question.key === "income"
                    ? `₹${Number(
                        option
                      ).toLocaleString(
                        "en-IN"
                      )}`
                    : option}
                </button>
              )
            )}

          </div>

        </div>

      </div>
    );
  }

  // =====================================================
  // CREDIT CARD RESULTS
  // =====================================================

  if (page === "card-results") {
    return (
      <div className="questionnaire">

        <div className="results-container">

          <button
            className="back-button"
            onClick={() =>
              setPage("home")
            }
          >
            ← Home
          </button>


          <p className="step">
            CREDIT CARD RESULTS
          </p>


          <h1>
            Cards matched to you.
          </h1>


          <p className="results-description">
            Based on your income,
            priorities and spending
            habits.
          </p>


          <div className="results-grid">

            {cardRecommendations.map(
              (card, index) => (

                <div
                  className="account-card"
                  key={card.id}
                >

                  {index === 0 && (
                    <div className="top-match">
                      TOP MATCH
                    </div>
                  )}


                  <p className="bank-name">
                    {card.bank}
                  </p>


                  <h2>
                    {card.name}
                  </h2>


                  <p>
                    {card.type}
                  </p>


                  <div className="match-score">

                    <div className="score-display">

                      <div className="score-number">
                        {card.score ?? 0}%
                      </div>

                      <span>
                        match
                      </span>

                    </div>


                    <div className="score-breakdown">

                      <h4>
                        Why you got this score
                      </h4>


                      <div className="score-row">
                        <span>Income</span>

                        <strong>
                          {card.breakdown?.income ?? 0}/20
                        </strong>
                      </div>


                      <div className="score-row">
                        <span>Your priority</span>

                        <strong>
                          {card.breakdown?.priority ?? 0}/30
                        </strong>
                      </div>


                      <div className="score-row">
                        <span>Spending</span>

                        <strong>
                          {card.breakdown?.spending ?? 0}/20
                        </strong>
                      </div>


                      <div className="score-row">
                        <span>Fees</span>

                        <strong>
                          {card.breakdown?.fee ?? 0}/15
                        </strong>
                      </div>


                      <div className="score-row">
                        <span>Benefits</span>

                        <strong>
                          {card.breakdown?.benefits ?? 0}/15
                        </strong>
                      </div>

                    </div>

                  </div>


                  <div className="reasons">

                    <h3>
                      Why we recommend it
                    </h3>


                    <ul>

                      {card.reasons
                        ?.slice(0, 5)
                        .map(
                          (reason, index) => (
                            <li key={index}>
                              ✓ {reason}
                            </li>
                          )
                        )}

                    </ul>

                  </div>


                  <div className="account-actions">

                    <button
                      onClick={() => {
                        setSelectedCard(card);
                        setPage("card-details");
                      }}
                    >
                      View Card
                    </button>


                    <button
                      onClick={() =>
                        toggleCompareCard(card)
                      }
                    >
                      {compareCards.some(
                        (item) =>
                          item.id === card.id
                      )
                        ? "✓ Comparing"
                        : "Compare"}
                    </button>

                  </div>

                </div>

              )
            )}

          </div>


          {compareCards.length >= 2 && (
            <div className="compare-bar">

              <p>
                {compareCards.length} cards
                selected
              </p>


              <button
                onClick={() =>
                  setPage("card-compare")
                }
              >
                Compare Cards →
              </button>

            </div>
          )}

        </div>

      </div>
    );
  }

  // =====================================================
  // CREDIT CARD DETAILS
  // =====================================================

  if (
    page === "card-details" &&
    selectedCard
  ) {
    return (
      <div className="questionnaire">

        <div className="details-container">

          <button
            className="back-button"
            onClick={() =>
              setPage("card-results")
            }
          >
            ← Back to Cards
          </button>


          <p className="step">
            CREDIT CARD DETAILS
          </p>


          <h1>
            {selectedCard.name}
          </h1>


          <p className="bank-name">
            {selectedCard.bank}
          </p>


          <div className="details-score">

            <strong>
              {selectedCard.score ?? 0}%
            </strong>

            <span>
              match for your profile
            </span>

          </div>


          <h2 className="details-heading">
            Card Information
          </h2>


          <div className="details-grid">

            <div className="detail-card">

              <h3>
                Joining Fee
              </h3>

              <p>
                ₹{selectedCard.joiningFee ?? 0}
              </p>

            </div>


            <div className="detail-card">

              <h3>
                Annual Fee
              </h3>

              <p>
                ₹{selectedCard.annualFee ?? 0}
              </p>

            </div>


            <div className="detail-card">

              <h3>
                Cashback
              </h3>

              <p>
                {selectedCard.cashback
                  ? selectedCard.cashbackRate ||
                    "Available"
                  : "Not available"}
              </p>

            </div>


            <div className="detail-card">

              <h3>
                Rewards
              </h3>

              <p>
                {selectedCard.rewards
                  ? selectedCard.rewardRate ||
                    "Available"
                  : "Not available"}
              </p>

            </div>

          </div>


          <h2 className="details-heading">
            Best For
          </h2>


          <div className="why-section">

            <ul>

              {selectedCard.bestFor?.map(
                (item, index) => (
                  <li key={index}>
                    ✓ {item}
                  </li>
                )
              )}

            </ul>

          </div>


          <h2 className="details-heading">
            Why FinMatch recommends this
          </h2>


          <div className="why-section">

            <ul>

              {selectedCard.reasons?.map(
                (reason, index) => (
                  <li key={index}>
                    ✓ {reason}
                  </li>
                )
              )}

            </ul>

          </div>


          <div className="source-section">

            <p>
              Always verify current fees,
              eligibility, rewards and
              terms on the official issuer
              website before applying.
            </p>


            {selectedCard.officialUrl && (
              <a
                href={selectedCard.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Official Card Website →
              </a>
            )}

          </div>

        </div>

      </div>
    );
  }

  // =====================================================
  // CREDIT CARD COMPARISON
  // =====================================================

  if (page === "card-compare") {
    return (
      <div className="questionnaire">

        <div className="compare-container">

          <button
            className="back-button"
            onClick={() =>
              setPage("card-results")
            }
          >
            ← Back to Cards
          </button>


          <p className="step">
            CREDIT CARD COMPARISON
          </p>


          <h1>
            Compare cards.
          </h1>


          <div className="comparison-wrapper">

            <div
              className="comparison-table"
              style={{
                gridTemplateColumns:
                  `180px repeat(${compareCards.length}, minmax(200px, 1fr))`,
              }}
            >

              <div className="comparison-feature">
                Feature
              </div>


              {compareCards.map(
                (card) => (
                  <div
                    className="comparison-account"
                    key={card.id}
                  >

                    <h3>
                      {card.name}
                    </h3>

                    <p>
                      {card.bank}
                    </p>

                  </div>
                )
              )}


              <div className="comparison-feature">
                Match Score
              </div>


              {compareCards.map(
                (card) => (
                  <div
                    className="comparison-value"
                    key={`score-${card.id}`}
                  >
                    {card.score ?? 0}%
                  </div>
                )
              )}


              <div className="comparison-feature">
                Annual Fee
              </div>


              {compareCards.map(
                (card) => (
                  <div
                    className="comparison-value"
                    key={`fee-${card.id}`}
                  >
                    ₹{card.annualFee ?? 0}
                  </div>
                )
              )}


              <div className="comparison-feature">
                Cashback
              </div>


              {compareCards.map(
                (card) => (
                  <div
                    className="comparison-value"
                    key={`cashback-${card.id}`}
                  >
                    {card.cashback
                      ? card.cashbackRate ||
                        "Available"
                      : "No"}
                  </div>
                )
              )}


              <div className="comparison-feature">
                Rewards
              </div>


              {compareCards.map(
                (card) => (
                  <div
                    className="comparison-value"
                    key={`rewards-${card.id}`}
                  >
                    {card.rewards
                      ? "✓ Available"
                      : "No"}
                  </div>
                )
              )}

            </div>

          </div>

        </div>

      </div>
    );
  }

  return null;
}

export default App;