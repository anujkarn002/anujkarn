import { dummyProjects } from "../dummy/projects";
import { getAllPosts } from "../sanity/lib/queries";
import type { ActivityItem } from "../components/ActivityList";

export async function getRecentActivity(): Promise<ActivityItem[]> {
  const posts = await getAllPosts();
  const activities: ActivityItem[] = [
    ...dummyProjects.map((p) => ({ type: "Project" as const, id: p.id, title: p.title, date: p.date, tags: p.tags })),
    ...posts.map((p) => ({ type: "Post" as const, id: p.slug, title: p.title, date: p.publishedAt, tags: p.tags })),
  ];
  return activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
