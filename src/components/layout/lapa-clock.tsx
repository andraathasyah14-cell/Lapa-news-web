
"use client";

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

// Fictional world time parameters
const REAL_WORLD_BASE_DATE = new Date('2025-09-01T00:00:00Z');
const LAPA_BASE_YEAR = 2080;
const LAPA_MONTHS = ["Primus", "Secundus", "Tertius", "Quartus", "Quintus", "Sextus", "Septimus", "Octavus", "Nonus", "Decimus", "Undecimus", "Duodecimus"];
const LAPA_DAYS_IN_MONTH = 30;
const LAPA_MONTHS_IN_YEAR = 12;

// Conversion factors based on user's logic
// 1 Lapa year = 1 Earth month
// 1 Lapa month = 2.5 Earth days
// 1 Lapa day = 2 Earth hours
const LAPA_YEAR_IN_MS = 1000 * 60 * 60 * 24 * 30.4375; // Approx 1 month in ms
const LAPA_MONTH_IN_MS = LAPA_YEAR_IN_MS / LAPA_MONTHS_IN_YEAR;
const LAPA_DAY_IN_MS = LAPA_MONTH_IN_MS / LAPA_DAYS_IN_MONTH;
const LAPA_HOUR_IN_MS = LAPA_DAY_IN_MS / 24;
const LAPA_MINUTE_IN_MS = LAPA_HOUR_IN_MS / 60;
const LAPA_SECOND_IN_MS = LAPA_MINUTE_IN_MS / 60;

function calculateLapaTime(currentRealDate: Date) {
    const realTimeDiffMs = currentRealDate.getTime() - REAL_WORLD_BASE_DATE.getTime();

    // Total Lapa milliseconds passed since base date
    const lapaTimeDiffMs = realTimeDiffMs * 12; // Time is 12x faster

    // Calculate Lapa date components
    const lapaYearsPassed = Math.floor(lapaTimeDiffMs / LAPA_YEAR_IN_MS);
    const lapaCurrentYear = LAPA_BASE_YEAR + lapaYearsPassed;
    
    const remainderAfterYears = lapaTimeDiffMs % LAPA_YEAR_IN_MS;
    const lapaMonthIndex = Math.floor(remainderAfterYears / LAPA_MONTH_IN_MS);
    const lapaMonth = LAPA_MONTHS[lapaMonthIndex];

    const remainderAfterMonths = remainderAfterYears % LAPA_MONTH_IN_MS;
    const lapaDay = Math.floor(remainderAfterMonths / LAPA_DAY_IN_MS) + 1;

    // Calculate Lapa time components
    const remainderAfterDays = remainderAfterMonths % LAPA_DAY_IN_MS;
    const lapaHour = Math.floor(remainderAfterDays / LAPA_HOUR_IN_MS);
    const remainderAfterHours = remainderAfterDays % LAPA_HOUR_IN_MS;
    const lapaMinute = Math.floor(remainderAfterHours / LAPA_MINUTE_IN_MS);
    const remainderAfterMinutes = remainderAfterHours % LAPA_MINUTE_IN_MS;
    const lapaSecond = Math.floor(remainderAfterMinutes / LAPA_SECOND_IN_MS);

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
