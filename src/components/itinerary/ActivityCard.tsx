import React from 'react';
import { Clock, MapPin, Trash2, GripVertical, Plane, Hotel, Utensils, Camera, Coffee, LucideIcon } from 'lucide-react';

interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  type: string;
}

const ICON_MAP: Record<string, LucideIcon> = {
  'Transport': Plane,
  'Accommodation': Hotel,
  'Meal': Utensils,
  'Sightseeing': Camera,
  'Activity': Coffee,
};

const ActivityCard = ({ activity }: { activity: Activity }) => {
  const Icon = ICON_MAP[activity.type] || MapPin;

  return (
    <div className="group relative bg-white border rounded-xl p-4 shadow-sm hover:border-blue-300 hover:shadow-md transition-all flex gap-4">
      <div className="flex-shrink-0 flex flex-col items-center justify-center text-slate-300 hover:text-slate-500 cursor-grab active:cursor-grabbing">
        <GripVertical className="h-5 w-5" />
      </div>

      <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
        <Icon className="h-6 w-6" />
      </div>

      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 px-2 py-0.5 bg-blue-50 rounded">
              {activity.type}
            </span>
            <div className="flex items-center text-xs text-slate-400 font-medium">
              <Clock className="mr-1 h-3 w-3" />
              {activity.time}
            </div>
          </div>
          <button className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        <h4 className="font-bold text-slate-900">{activity.title}</h4>
        <p className="text-sm text-slate-600 leading-relaxed">{activity.description}</p>
      </div>
    </div>
  );
};

export default ActivityCard;
