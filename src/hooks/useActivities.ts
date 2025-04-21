"use client";
import { useState } from 'react';
import { dummyActivities } from '../dummy/activities';

export function useActivities() {
  // In the future, replace with fetch/API logic
  const [activities] = useState(dummyActivities);
  return { activities };
}
