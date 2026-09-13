import React, { useState, useEffect, useMemo } from 'react';
import { CalendarDay, DayMarkerStore } from './types';
import {
  buildMonthCalendarGrid,
  formatDayToCopyString,
} from './utils/calendarBuilder';
import { CalendarHeader } from './components/CalendarHeader';
import { CalendarGrid } from './components/CalendarGrid';
import { DayDetailModal } from './components/DayDetailModal';
import { PwaModal } from './components/PwaModal';
import { SyncModal } from './components/SyncModal';
import { DivinationModal } from './components/DivinationModal';
import { AlicePandaMascot } from './components/AlicePandaMascot';

const STORAGE_KEY = 'panda_calendar_markers_v1';

export default function App() {
  const today = useMemo(() => new Date(), []);
  const initialYear = Math.max(2026, Math.min(2033, today.getFullYear()));
  const initialMonth = today.getMonth() + 1;

  // Current view state (starts at today's year and month)
  const [currentYear, setCurrentYear] = useState<number>(initialYear);
  const [currentMonth, setCurrentMonth] = useState<number>(initialMonth);

  // User Markers Store (persisted in localStorage)
  const [markerStore, setMarkerStore] = useState<DayMarkerStore>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load marker store from localStorage', e);
    }
    return {};
  });

  // Modals state
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);
  const [isPwaModalOpen, setIsPwaModalOpen] = useState(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isDivinationModalOpen, setIsDivinationModalOpen] = useState(false);
  const [copiedToday, setCopiedToday] = useState(false);

  // Save marker store to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(markerStore));
    } catch (e) {
      console.error('Failed to persist marker store to localStorage', e);
    }
  }, [markerStore]);

  // Build the 42-day fixed grid for current year & month
  const gridDays = useMemo(() => {
    return buildMonthCalendarGrid(currentYear, currentMonth, markerStore);
  }, [currentYear, currentMonth, markerStore]);

  // Today object representation
  const todayDayObject = useMemo(() => {
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const found = gridDays.find((d) => d.dateString === todayStr);
    if (found) return found;

    // Fallback if current month is not today's month
    const singleGrid = buildMonthCalendarGrid(today.getFullYear(), today.getMonth() + 1, markerStore);
    return singleGrid.find((d) => d.dateString === todayStr) || singleGrid[0];
  }, [gridDays, today, markerStore]);

  // Navigation handlers
  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      if (currentYear > 2026) {
        setCurrentYear((y) => y - 1);
        setCurrentMonth(12);
      }
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      if (currentYear < 2033) {
        setCurrentYear((y) => y + 1);
        setCurrentMonth(1);
      }
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleJumpToToday = () => {
    setCurrentYear(Math.max(2026, Math.min(2033, today.getFullYear())));
    setCurrentMonth(today.getMonth() + 1);
  };

  // Copy today date string (格式：年月日農曆日期星期)
  const handleCopyTodayDate = () => {
    const text = formatDayToCopyString(todayDayObject);
    navigator.clipboard.writeText(text).then(() => {
      setCopiedToday(true);
      setTimeout(() => setCopiedToday(false), 2200);
    });
  };

  // Update emojis and notes for a specific day
  const handleUpdateMarkers = (dateString: string, emojis: string[], notes: string) => {
    setMarkerStore((prev) => {
      const next = { ...prev };
      if (emojis.length === 0 && !notes.trim()) {
        delete next[dateString];
      } else {
        next[dateString] = {
          emojis,
          notes,
          updatedAt: new Date().toISOString(),
        };
      }
      return next;
    });

    // Also update current active selected day object if open
    if (selectedDay && selectedDay.dateString === dateString) {
      setSelectedDay((prev) =>
        prev
          ? {
              ...prev,
              emojiMarkers: emojis,
              notes,
              hasSchedule: emojis.length > 0 || notes.trim().length > 0,
            }
          : null
      );
    }
  };

  // Replace entire store on backup import
  const handleImportSuccess = (newStore: DayMarkerStore) => {
    setMarkerStore(newStore);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/40 via-pink-50/30 to-amber-50/40 text-slate-900 flex flex-col antialiased selection:bg-pink-200">
      {/* Top Main Navigation Header */}
      <CalendarHeader
        currentYear={currentYear}
        currentMonth={currentMonth}
        onYearChange={setCurrentYear}
        onMonthChange={setCurrentMonth}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onJumpToToday={handleJumpToToday}
        todayDayObject={todayDayObject}
        onOpenPwaModal={() => setIsPwaModalOpen(true)}
        onOpenSyncModal={() => setIsSyncModalOpen(true)}
        onOpenDivinationModal={() => setIsDivinationModalOpen(true)}
        copiedToday={copiedToday}
        onCopyTodayDate={handleCopyTodayDate}
      />

      {/* Main Calendar Viewport (Fixed Size Layout) */}
      <main className="flex-1 pb-10">
        <CalendarGrid
          days={gridDays}
          onSelectDay={(day) => setSelectedDay(day)}
          selectedDayString={selectedDay?.dateString}
        />
      </main>

      {/* Bottom Subtle Footer */}
      <footer className="w-full border-t border-pink-200/60 bg-white/70 backdrop-blur-xs py-3 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-base">🍄</span>
            <span>愛麗絲童話風・貓熊每月月曆 (2026~2033)</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span>行政院人事行政總處行事曆</span>
            <span>•</span>
            <span>iCalendar (.ics) 同步</span>
            <span>•</span>
            <span>PWA 離線支援</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {/* 1. Day Detail & Emoji Picker Modal */}
      <DayDetailModal
        day={selectedDay}
        onClose={() => setSelectedDay(null)}
        markerStore={markerStore}
        onUpdateMarkers={handleUpdateMarkers}
      />

      {/* 2. PWA QR Code & Install Modal */}
      <PwaModal
        isOpen={isPwaModalOpen}
        onClose={() => setIsPwaModalOpen(false)}
      />

      {/* 3. Export / Import / Sync Modal */}
      <SyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        markerStore={markerStore}
        onImportSuccess={handleImportSuccess}
      />

      {/* 4. Divination & Oracles Modal */}
      <DivinationModal
        isOpen={isDivinationModalOpen}
        onClose={() => setIsDivinationModalOpen(false)}
      />
    </div>
  );
}
