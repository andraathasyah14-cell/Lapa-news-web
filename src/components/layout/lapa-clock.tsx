
"use client";

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

// Fictional world time parameters
const REAL_WORLD_BASE_DATE = new Date('2025-09-01T00:00:00Z');
const LAPA_BASE_YEAR = 2080;
const LAPA_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const LAPA_DAYS_IN_MONTH = 30;
const LAPA_MONTHS_IN_YEAR = 12;

// Conversion factors based on: 1 Lapa Day = 2 Earth Hours
const LAPA_SECOND_IN_MS = (2 * 60 * 60 * 1000) / (24 * 60 * 60); 
const LAPA_MINUTE_IN_MS = LAPA_SECOND_IN_MS * 60;
const LAPA_HOUR_IN_MS = LAPA_MINUTE_IN_MS * 60;
const LAPA_DAY_IN_MS = LAPA_HOUR_IN_MS * 24;

const LAPA_MONTH_IN_MS = LAPA_DAY_IN_MS * LAPA_DAYS_IN_MONTH;
const LAPA_YEAR_IN_MS = LAPA_MONTH_IN_MS * LAPA_MONTHS_IN_YEAR;


function calculateLapaTime(currentRealDate: Date) {
    const realTimeDiffMs = currentRealDate.getTime() - REAL_WORLD_BASE_DATE.getTime();

    if (realTimeDiffMs < 0) {
        return {
            year: LAPA_BASE_YEAR,
            month: LAPA_MONTHS[0],
            day: 1,
            hour: 0,
            minute: 0,
            second: 0,
        };
    }
    
    // Calculate total Lapa years passed
    const totalLapaYearsPassed = Math.floor(realTimeDiffMs / LAPA_YEAR_IN_MS);
    const lapaCurrentYear = LAPA_BASE_YEAR + totalLapaYearsPassed;
    
    // Calculate remainder for months
    const remainderAfterYears = realTimeDiffMs % LAPA_YEAR_IN_MS;
    const lapaMonthIndex = Math.floor(remainderAfterYears / LAPA_MONTH_IN_MS);
    const lapaMonth = LAPA_MONTHS[lapaMonthIndex];

    // Calculate remainder for days
    const remainderAfterMonths = remainderAfterYears % LAPA_MONTH_IN_MS;
    const lapaDay = Math.floor(remainderAfterMonths / LAPA_DAY_IN_MS) + 1;

    // Calculate remainder for time
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
    const [isMounted, setIsMounted] = useState(false);


    useEffect(() => {
        setIsMounted(true);
        // Set initial time right away
        setLapaTime(calculateLapaTime(new Date()));

        const timer = setInterval(() => {
            setLapaTime(calculateLapaTime(new Date()));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!isMounted || lapaTime.month === '') {
        return (
            <div className="font-mono text-xs p-3 rounded-lg border border-accent/50 bg-card/80 text-card-foreground/90 backdrop-blur-sm flex items-center justify-center gap-4">
                 <Clock className="h-5 w-5 text-primary" />
                 <span>Loading Lapa Time...</span>
            </div>
        );
    }

    return (
        <div className="font-mono text-xs p-3 rounded-lg border border-accent/50 bg-card/80 text-card-foreground/90 backdrop-blur-sm flex items-center justify-center gap-4">
             <Clock className="h-5 w-5 text-primary" />
             <div className="flex flex-col sm:flex-row items-center sm:gap-4 text-center">
                <span>
                    LAPA DATE: {String(lapaTime.day).padStart(2, '0')} {lapaTime.month}, Year {lapaTime.year}
                </span>
                <span className="hidden sm:inline">|</span>
                <span>
                    TIME: {String(lapaTime.hour).padStart(2, '0')}:{String(lapaTime.minute).padStart(2, '0')}:{String(lapaTime.second).padStart(2, '0')} (LST)
                </span>
             </div>
        </div>
    );
}
