
"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

type ProgressContextType = {
  completedLessons: { [lessonId: string]: boolean };
  toggleLesson: (lessonId: string) => void;
  isLoaded: boolean;
  streak: number;
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const PROGRESS_STORAGE_KEY = 'lesson-progress';
const STREAK_STORAGE_KEY = 'lesson-streak';

// Helper to get the date as YYYY-MM-DD
const getTodayDateString = () => {
    return new Date().toISOString().split('T')[0];
}

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [completedLessons, setCompletedLessons] = useState<{ [lessonId: string]: boolean }>({});
  const [streak, setStreak] = useState(0);
  const [lastActivityDate, setLastActivityDate] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (savedProgress) {
        setCompletedLessons(JSON.parse(savedProgress));
      }
      
      const savedStreakData = localStorage.getItem(STREAK_STORAGE_KEY);
      if(savedStreakData) {
        const { streak: savedStreak, lastActivityDate: savedLastActivityDate } = JSON.parse(savedStreakData);
        
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const lastActivity = new Date(savedLastActivityDate);

        if (lastActivity.toDateString() === yesterday.toDateString()) {
           setStreak(savedStreak); // Streak continues
        } else if (lastActivity.toDateString() === today.toDateString()) {
           setStreak(savedStreak); // Already active today
        } else {
           setStreak(0); // Streak broken
        }
        setLastActivityDate(savedLastActivityDate);
      }

    } catch (error) {
      console.error("Failed to load progress from localStorage", error);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(completedLessons));
        localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify({ streak, lastActivityDate }));
      } catch (error) {
        console.error("Failed to save progress to localStorage", error);
      }
    }
  }, [completedLessons, streak, lastActivityDate, isLoaded]);

  const updateStreak = () => {
    const todayStr = getTodayDateString();
    
    // Only update streak if the last activity was not today
    if (lastActivityDate !== todayStr) {
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);

      const lastDate = lastActivityDate ? new Date(lastActivityDate) : null;

      if (lastDate && lastDate.toDateString() === yesterday.toDateString()) {
        // Last activity was yesterday, increment streak
        setStreak(prev => prev + 1);
      } else {
        // Last activity was before yesterday or never, reset streak to 1
        setStreak(1);
      }
      setLastActivityDate(todayStr);
    }
  };

  const toggleLesson = useCallback((lessonId: string) => {
    setCompletedLessons(prev => {
      const newCompleted = {
        ...prev,
        [lessonId]: !prev[lessonId],
      };
      // If marking as complete, update streak
      if (newCompleted[lessonId]) {
        updateStreak();
      }
      return newCompleted;
    });
  }, [lastActivityDate]);

  return (
    <ProgressContext.Provider value={{ completedLessons, toggleLesson, isLoaded, streak }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
