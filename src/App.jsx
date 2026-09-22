import React, { useState } from 'react';
import { products } from './data/financialProducts';
import { calculateMatchScore } from './logic/recommendationEngine';

export default function App() {
  const [step, setStep] = useState('home');
  const [userProfile, setUserProfile] = useState({
    age: 22,
    income: 30000,
    preferredMaxFee: 500,
    spendingCategories: ['shopping', 'food']
  });

  const rankedProducts = products.map(product => ({
    ...product,
    matchDetails: calculateMatchScore(userProfile, product)
  })).sort((a, b) => b.matchDetails.score - a.matchDetails.score);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8 font-sans">
      <header className="flex justify-between items-center mb-12 border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-indigo-400">FINMATCH</h1>
        <nav className="flex gap-4">
          <button onClick={() => setStep('home')} className="hover:text-indigo-400">Home</button>
          <button onClick={() => setStep('results')} className="hover:text-indigo-400">Matches</button>
        </nav>
      </header>

      {step === 'home' ? (
        <div className="max-w-2xl mx-auto text-center py-12">
          <h2 className="text-4xl font-extrabold mb-4">Find Financial Products Built for You</h2>
          <p className="text-slate-400 mb-8">Stop guessing. Get personalized bank accounts and credit cards matched to your income and spending habits.</p>
          <button 
            onClick={() => setStep('results')}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition"
          >
            Find My Matches
          </button>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Your Top Matches</h2>
          <div className="grid gap-6">
            {rankedProducts.map(item => (
              <div key={item.id} className="bg-slate-800 border border-slate-700 rounded-2xl p-6 flex justify-between items-center">
                <div>
                  <span className="text-xs uppercase tracking-wider text-indigo-400 font-semibold">{item.bank}</span>
                  <h3 className="text-xl font-bold mt-1">{item.name}</h3>
                  <p className="text-slate-400 text-sm mt-1">{item.description}</p>
                  
                  <div className="mt-4 flex gap-2 flex-wrap">
                    {item.matchDetails.reasons.map((reason, idx) => (
                      <span key={idx} className="text-xs bg-slate-700 text-slate-300 px-2.5 py-1 rounded-md">
                        {reason}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-right pl-6 border-l border-slate-700 min-w-[120px]">
                  <div className="text-3xl font-black text-emerald-400">{item.matchDetails.score}%</div>
                  <div className="text-xs text-slate-400 mt-1">Match Score</div>
                  <a 
                    href={item.officialUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-block mt-4 text-xs font-semibold bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-lg text-indigo-300"
                  >
                    Apply Now ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}