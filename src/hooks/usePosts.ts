"use client";
import { useState } from 'react';
import { dummyPosts } from '../dummy/posts';

export function usePosts() {
  // In the future, replace with fetch/API logic
  const [posts] = useState(dummyPosts);
  return { posts };
}
