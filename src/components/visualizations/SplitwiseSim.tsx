import React, { useState } from 'react';
import { Users, Receipt, ArrowRight, UserPlus, Calculator, History } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface User {
  id: string;
  name: string;
  balance: number;
}

interface Expense {
  description: string;
  amount: number;
  paidBy: string;
  splitWith: string[];
}

export const SplitwiseSim: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Alice', balance: 0 },
    { id: '2', name: 'Bob', balance: 0 },
    { id: '3', name: 'Charlie', balance: 0 }
  ]);

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [amount, setAmount] = useState<string>('30');
  const [description, setDescription] = useState<string>('Dinner');

  const addExpense = () => {
    const totalAmount = parseFloat(amount);
    if (isNaN(totalAmount) || totalAmount <= 0) return;

    const paidBy = users[0]; // Alice pays for now
    const splitCount = users.length;
    const share = totalAmount / splitCount;

    setUsers(prev => prev.map(u => {
      if (u.id === paidBy.id) {
        return { ...u, balance: u.balance + (totalAmount - share) };
      } else {
        return { ...u, balance: u.balance - share };
      }
    }));

    setExpenses(prev => [
      { 
        description, 
        amount: totalAmount, 
        paidBy: paidBy.name, 
        splitWith: users.map(u => u.name) 
      },
      ...prev
    ].slice(0, 5));
  };

  return (
    <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800 shadow-2xl">
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-zinc-800">
        <div className="p-2 bg-emerald-500/10 rounded-lg">
          <Calculator className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Splitwise Simulation</h3>
          <p className="text-sm text-zinc-500">Expense Sharing & Balance Tracking</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800">
            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Add Expense</h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] text-zinc-500 uppercase">Description</label>
                <input 
                  type="text" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-zinc-500 uppercase">Amount ($)</label>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                />
              </div>
              <button 
                onClick={addExpense}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-bold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <Receipt className="w-4 h-4" /> Split Equally
              </button>
            </div>
          </div>

          <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800">
            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Recent Activity</h4>
            <div className="space-y-3">
              {expenses.length === 0 && <p className="text-[10px] text-zinc-600 italic">No expenses yet...</p>}
              {expenses.map((exp, i) => (
                <div key={i} className="p-2 bg-zinc-900 rounded border border-zinc-800 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-zinc-200 font-medium">{exp.description}</p>
                    <p className="text-[10px] text-zinc-500">Paid by {exp.paidBy}</p>
                  </div>
                  <span className="text-xs font-mono text-emerald-400">${exp.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800 h-full">
            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6 flex justify-between">
              Balances
              <Users className="w-3 h-3" />
            </h4>
            <div className="space-y-6">
              {users.map(user => (
                <div key={user.id} className="relative">
                  <div className="flex justify-between items-end mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400 border border-zinc-700">
                        {user.name[0]}
                      </div>
                      <span className="text-sm font-medium text-zinc-200">{user.name}</span>
                    </div>
                    <span className={`text-sm font-mono font-bold ${user.balance >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {user.balance >= 0 ? '+' : ''}{user.balance.toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: '50%' }}
                      animate={{ width: `${50 + (user.balance / 100) * 50}%` }}
                      className={`h-full ${user.balance >= 0 ? 'bg-emerald-500' : 'bg-red-500'}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-4 bg-emerald-500/5 rounded-lg border border-emerald-500/20">
              <p className="text-[10px] text-zinc-400 leading-relaxed">
                <span className="text-emerald-400 font-bold">Flow:</span> When Alice pays $30, her balance increases by $20 (what others owe her), while Bob and Charlie's balances decrease by $10 each.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
