
"use client";

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

// Fictional world time parameters
const REAL_WORLD_BASE_DATE = new Date('2025-09-01T00:00:00Z');
const LAPA_BASE_YEAR = 2080;
const LAPA_MONTHS = ["Primus", "Secundus", "Tertius", "Quartus", "Quintus", "Sextus", "Septimus", "Octavus", "Nonus", "Decimus", "Undecimus", "Duodecimus"];
const LAPA_DAYS_IN_MONTH = 30;
const LAPA_MONTHS_IN_YEAR = 12;

function calculateLapaTime(currentRealDate: Date) {
    const realTimeDiffMs = currentRealDate.getTime() - REAL_WORLD_BASE_DATE.getTime();
    
    const realMonthsPassed = realTimeDiffMs / (1000 * 60 * 60 * 24 * 30.4375); // Average days in a month
    const lapaYearsPassed = Math.floor(realMonthsPassed);

    const lapaCurrentYear = LAPA_BASE_YEAR + lapaYearsPassed;
    
    const fractionOfMonthPassed = realMonthsPassed - lapaYearsPassed;
    const lapaDaysIntoYear = fractionOfMonthPassed * LAPA_DAYS_IN_MONTH * LAPA_MONTHS_IN_YEAR;
    
    const lapaMonthIndex = Math.floor(lapaDaysIntoYear / LAPA_DAYS_IN_MONTH) % LAPA_MONTHS_IN_YEAR;
    const lapaDay = Math.floor(lapaDaysIntoYear % LAPA_DAYS_IN_MONTH) + 1;

    const lapaMonth = LAPA_MONTHS[lapaMonthIndex];

    const lapaHour = currentRealDate.getUTCHours();
    const lapaMinute = currentRealDate.getUTCMinutes();
    const lapaSecond = currentRealDate.getUTCSeconds();
    
    return {
        year: lapaCurrentYear,
        month: lapaMonth,
        day: lapaDay,
        hour: lapaHour,
        minute: lapaMinute,
        second: lapaSecond,
    };
}


export default function LapaClock() {
    const [lapaTime, setLapaTime] = useState({ year: 0, month: '', day: 0, hour: 0, minute: 0, second: 0 });

    useEffect(() => {
        const timer = setInterval(() => {
            setLapaTime(calculateLapaTime(new Date()));
        }, 1000);
        
        // Set initial time
        setLapaTime(calculateLapaTime(new Date()));

        return () => clearInterval(timer);
    }, []);

    if (lapaTime.year === 0) {
        return null; // Don't render until client-side hydration and calculation is complete
    }

    return (
        <div className="font-mono text-xs p-3 rounded-lg border border-accent/50 bg-card/80 text-card-foreground/90 backdrop-blur-sm flex items-center justify-center gap-4">
             <Clock className="h-5 w-5 text-primary" />
             <div className="flex flex-col sm:flex-row items-center sm:gap-4 text-center">
                <span>
                    LAPA DATE: {String(lapaTime.day).padStart(2, '0')} {lapaTime.month}, {lapaTime.year}
                </span>
                <span className="hidden sm:inline">|</span>
                <span>
                    TIME: {String(lapaTime.hour).padStart(2, '0')}:{String(lapaTime.minute).padStart(2, '0')}:{String(lapaTime.second).padStart(2, '0')} (UTC)
                </span>
             </div>
        </div>
    );
}
