import { dummyProjects } from './projects';
import { dummyPosts } from './posts';

// Merge and sort by date descending
export const dummyActivities = [
  // ...dummyProjects.map(item => ({
  //   ...item,
  //   type: 'Project',
  // })),
  // ...dummyPosts.map(item => ({
  //   ...item,
  //   type: 'Post',
  // })),
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
