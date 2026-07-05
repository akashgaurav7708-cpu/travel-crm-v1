import React from 'react';
import { Plus, GripVertical } from 'lucide-react';
import ActivityCard from './ActivityCard';

interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  type: string;
}

interface Day {
  id: number;
  activities: Activity[];
}

const ItineraryTimeline = ({ days }: { days: Day[] }) => {
  return (
    <div className="space-y-12 relative before:absolute before:left-4 before:top-4 before:bottom-0 before:w-0.5 before:bg-slate-200 lg:before:left-[3.25rem]">
      {days.map((day) => (
        <div key={day.id} className="relative z-10">
          <div className="flex items-center gap-6 mb-6">
            <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-lg shadow-blue-200">
              {day.id}
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Day {day.id}</h3>
              <p className="text-sm text-slate-500 italic">No date set</p>
            </div>
            <div className="flex-1 border-t border-dashed border-slate-300 mx-4 hidden sm:block"></div>
            <button className="text-xs font-medium text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 transition-colors">
              Add Note
            </button>
          </div>

          <div className="space-y-4 pl-14 lg:pl-24">
            {day.activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}

            {day.activities.length === 0 && (
              <div className="p-8 border-2 border-dashed border-slate-100 rounded-xl text-center text-slate-400 text-sm">
                No activities planned for this day yet.
              </div>
            )}

            <button className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 group transition-colors pt-2">
              <div className="h-8 w-8 rounded-full border border-dashed border-slate-300 flex items-center justify-center group-hover:border-blue-400 group-hover:bg-blue-50">
                <Plus className="h-4 w-4" />
              </div>
              Add activity, meal, or transport
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItineraryTimeline;
