"use client";
import { useState } from 'react';
import { dummyProjects } from '../dummy/projects';

export function useProjects() {
  // In the future, replace with fetch/API logic
  const [projects] = useState(dummyProjects);
  return { projects };
}
