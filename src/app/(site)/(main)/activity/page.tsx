import ActivityList from "../../../../components/ActivityList";
import { getRecentActivity } from "../../../../lib/activity";

export default async function ActivityPage() {
  const activities = await getRecentActivity();

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center font-mono text-white">
      <div className="flex flex-col items-center w-full px-6 pt-24 pb-12" style={{ minHeight: '70vh' }}>
        <h1 className="text-4xl md:text-6xl font-orbitron font-black text-white mb-6 tracking-tight text-center retro-shadow glow-text-cyan">Activity</h1>
        <ActivityList activities={activities} />
      </div>
    </main>
  );
}
