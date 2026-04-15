import React, { useState, useEffect } from 'react';
import { Car, Truck, Bike, Info, CheckCircle2, XCircle, Timer } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Spot {
  id: number;
  type: 'compact' | 'large' | 'motorcycle';
  isOccupied: boolean;
  vehicle?: {
    type: string;
    plate: string;
    entryTime: number;
  };
}

export const ParkingLotSim: React.FC = () => {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [stats, setStats] = useState({ occupied: 0, total: 20 });

  useEffect(() => {
    const initialSpots: Spot[] = [];
    for (let i = 0; i < 20; i++) {
      let type: 'compact' | 'large' | 'motorcycle' = 'compact';
      if (i < 4) type = 'motorcycle';
      else if (i > 15) type = 'large';
      
      initialSpots.push({ id: i, type, isOccupied: false });
    }
    setSpots(initialSpots);
  }, []);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  const parkVehicle = (type: 'CAR' | 'TRUCK' | 'BIKE') => {
    const plate = `ABC-${Math.floor(Math.random() * 9000) + 1000}`;
    let spotType: 'compact' | 'large' | 'motorcycle' = 'compact';
    if (type === 'TRUCK') spotType = 'large';
    if (type === 'BIKE') spotType = 'motorcycle';

    const availableSpot = spots.find(s => !s.isOccupied && s.type === spotType);

    if (availableSpot) {
      setSpots(prev => prev.map(s => s.id === availableSpot.id ? {
        ...s,
        isOccupied: true,
        vehicle: { type, plate, entryTime: Date.now() }
      } : s));
      setStats(prev => ({ ...prev, occupied: prev.occupied + 1 }));
      addLog(`Parked ${type} (${plate}) in spot #${availableSpot.id}`);
    } else {
      addLog(`FAILED: No ${spotType} spots available for ${type}`);
    }
  };

  const unparkVehicle = (id: number) => {
    const spot = spots.find(s => s.id === id);
    if (spot && spot.isOccupied) {
      const duration = Math.floor((Date.now() - spot.vehicle!.entryTime) / 1000);
      const fee = duration * 10 + 50; // Base 50 + 10 per sec for sim
      
      setSpots(prev => prev.map(s => s.id === id ? { ...s, isOccupied: false, vehicle: undefined } : s));
      setStats(prev => ({ ...prev, occupied: prev.occupied - 1 }));
      addLog(`Unparked ${spot.vehicle!.type} from #${id}. Fee: $${fee}`);
    }
  };

  return (
    <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-800">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            Parking Lot Simulation
          </h3>
          <p className="text-sm text-zinc-500">Real-time Spot Management & Pricing Strategy</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => parkVehicle('BIKE')}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg border border-zinc-700 transition-colors text-sm"
          >
            <Bike className="w-4 h-4" /> +Bike
          </button>
          <button 
            onClick={() => parkVehicle('CAR')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors text-sm"
          >
            <Car className="w-4 h-4" /> +Car
          </button>
          <button 
            onClick={() => parkVehicle('TRUCK')}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg border border-zinc-700 transition-colors text-sm"
          >
            <Truck className="w-4 h-4" /> +Truck
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
            {spots.map(spot => (
              <motion.div
                key={spot.id}
                whileHover={{ scale: 1.05 }}
                onClick={() => spot.isOccupied && unparkVehicle(spot.id)}
                className={`relative aspect-square rounded-lg border-2 flex flex-col items-center justify-center cursor-pointer transition-all ${
                  spot.isOccupied 
                    ? 'bg-zinc-800 border-blue-500/50 shadow-lg shadow-blue-500/10' 
                    : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <span className="absolute top-1 left-1 text-[8px] font-mono text-zinc-600">#{spot.id}</span>
                <div className="absolute top-1 right-1">
                  {spot.type === 'motorcycle' && <Bike className="w-2 h-2 text-zinc-700" />}
                  {spot.type === 'large' && <Truck className="w-2 h-2 text-zinc-700" />}
                </div>
                
                {spot.isOccupied ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex flex-col items-center"
                  >
                    {spot.vehicle?.type === 'CAR' && <Car className="w-6 h-6 text-blue-400" />}
                    {spot.vehicle?.type === 'TRUCK' && <Truck className="w-6 h-6 text-amber-400" />}
                    {spot.vehicle?.type === 'BIKE' && <Bike className="w-6 h-6 text-emerald-400" />}
                    <span className="text-[8px] font-mono text-zinc-500 mt-1">{spot.vehicle?.plate}</span>
                  </motion.div>
                ) : (
                  <div className="text-[10px] text-zinc-700 font-bold uppercase tracking-tighter">
                    {spot.type.charAt(0)}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800">
            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Status</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-zinc-400">Occupancy</span>
                  <span className="text-white font-mono">{stats.occupied}/{stats.total}</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all duration-500" 
                    style={{ width: `${(stats.occupied / stats.total) * 100}%` }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 bg-zinc-900 rounded border border-zinc-800 flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  <span className="text-[10px] text-zinc-400">{stats.total - stats.occupied} Free</span>
                </div>
                <div className="p-2 bg-zinc-900 rounded border border-zinc-800 flex items-center gap-2">
                  <XCircle className="w-3 h-3 text-red-500" />
                  <span className="text-[10px] text-zinc-400">{stats.occupied} Busy</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800">
            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Activity Log</h4>
            <div className="space-y-2">
              {logs.length === 0 && <p className="text-[10px] text-zinc-600 italic">No recent activity...</p>}
              {logs.map((log, i) => (
                <div key={i} className="text-[10px] text-zinc-400 flex gap-2 items-start">
                  <span className="text-zinc-600 mt-0.5">•</span>
                  {log}
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/20">
            <div className="flex items-center gap-2 text-blue-400 mb-2">
              <Info className="w-3 h-3" />
              <span className="text-[10px] font-bold uppercase">Strategy Tip</span>
            </div>
            <p className="text-[10px] text-zinc-400 leading-relaxed">
              Click on an occupied spot to unpark and calculate the fee based on the Strategy Pattern.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
