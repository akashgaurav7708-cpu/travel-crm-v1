'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Plus,
  MapPin,
  Clock,
  Utensils,
  Camera,
  Hotel,
  Bus,
  Save,
  Loader2,
  Trash2,
  Calendar
} from 'lucide-react';
import { format } from 'date-fns';
import { itineraryService, bookingsService } from '@/lib/services';

function ItineraryBuilderContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');

  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<any>(null);
  const [itinerary, setItinerary] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [newActivity, setNewActivity] = useState({
    day_number: 1,
    start_time: '09:00',
    activity_name: '',
    location: '',
    type: 'sightseeing',
    description: ''
  });

  useEffect(() => {
    if (bookingId) {
      async function loadData() {
        try {
          const [bookingData, itineraryData] = await Promise.all([
            bookingsService.getById(bookingId as string),
            itineraryService.getByBooking(bookingId as string)
          ]);

          setBooking(bookingData);
          if (itineraryData) {
            setItinerary(itineraryData);
            setActivities(itineraryData.itinerary_activities || []);
          } else {
            // Create itinerary if it doesn't exist
            const newItin = await itineraryService.create({
              booking_id: bookingId as string,
              title: `Itinerary for ${bookingData.customers?.first_name} ${bookingData.customers?.last_name}`,
            });
            setItinerary(newItin);
          }
        } catch (error) {
          console.error('Failed to load itinerary:', error);
        } finally {
          setLoading(false);
        }
      }
      loadData();
    } else {
      setLoading(false);
    }
  }, [bookingId]);

  const handleAddActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itinerary) return;

    setLoading(true);
    try {
      const activity = await itineraryService.addActivity({
        itinerary_id: itinerary.id,
        ...newActivity
      });
      setActivities([...activities, activity].sort((a, b) => {
        if (a.day_number !== b.day_number) return a.day_number - b.day_number;
        return a.start_time.localeCompare(b.start_time);
      }));
      setNewActivity({ ...newActivity, activity_name: '', location: '', description: '' });
    } catch (error) {
      console.error('Failed to add activity:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveActivity = async (id: string) => {
    try {
      await itineraryService.removeActivity(id);
      setActivities(activities.filter(a => a.id !== id));
    } catch (error) {
      console.error('Failed to remove activity:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!bookingId) {
    return (
      <div className="rounded-xl border border-dashed p-12 text-center bg-white">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 mb-4">
          <Calendar className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">No Booking Selected</h3>
        <p className="mt-1 text-slate-500">Select a booking from the Bookings page to start building its itinerary.</p>
        <div className="mt-6">
          <button
            onClick={() => window.location.href = '/bookings'}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
          >
            Go to Bookings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Itinerary Builder</h2>
          <p className="text-slate-500">
            Booking Ref: <span className="font-medium text-blue-600">#{bookingId.substring(0, 8)}</span> •
            Customer: <span className="font-medium text-slate-900">{booking?.customers?.first_name} {booking?.customers?.last_name}</span>
          </p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-lg border bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
            Preview PDF
          </button>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors">
            Share with Client
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Activity Form */}
        <div className="lg:col-span-1">
          <div className="rounded-xl border bg-white p-6 shadow-sm sticky top-6">
            <h3 className="font-bold text-slate-900 mb-4">Add Activity</h3>
            <form onSubmit={handleAddActivity} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-500">Day</label>
                  <input
                    type="number"
                    min="1"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    value={newActivity.day_number}
                    onChange={(e) => setNewActivity({...newActivity, day_number: parseInt(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-500">Time</label>
                  <input
                    type="time"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    value={newActivity.start_time}
                    onChange={(e) => setNewActivity({...newActivity, start_time: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-500">Activity Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Eiffel Tower Visit"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  value={newActivity.activity_name}
                  onChange={(e) => setNewActivity({...newActivity, activity_name: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-500">Type</label>
                <select
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  value={newActivity.type}
                  onChange={(e) => setNewActivity({...newActivity, type: e.target.value})}
                >
                  <option value="sightseeing">Sightseeing</option>
                  <option value="transport">Transport</option>
                  <option value="hotel">Hotel Check-in</option>
                  <option value="meal">Meal</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-500">Location</label>
                <input
                  type="text"
                  placeholder="City or Address"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  value={newActivity.location}
                  onChange={(e) => setNewActivity({...newActivity, location: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-500">Description</label>
                <textarea
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
                  placeholder="Notes for the client..."
                  value={newActivity.description}
                  onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center rounded-lg bg-slate-900 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add to Timeline
              </button>
            </form>
          </div>
        </div>

        {/* Timeline View */}
        <div className="lg:col-span-2 space-y-6">
          {activities.length > 0 ? (
            <div className="space-y-8">
              {[...new Set(activities.map(a => a.day_number))].sort((a, b) => a - b).map(dayNum => (
                <div key={dayNum} className="relative pl-8">
                  <div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white uppercase">
                    D{dayNum}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">Day {dayNum}</h4>

                  <div className="space-y-4">
                    {activities.filter(a => a.day_number === dayNum).map((activity) => (
                      <div key={activity.id} className="relative rounded-xl border bg-white p-4 shadow-sm group">
                        <div className="flex items-start justify-between">
                          <div className="flex gap-4">
                            <div className="mt-1 rounded-lg bg-blue-50 p-2 text-blue-600">
                              {activity.type === 'transport' ? <Bus className="h-4 w-4" /> :
                               activity.type === 'hotel' ? <Hotel className="h-4 w-4" /> :
                               activity.type === 'meal' ? <Utensils className="h-4 w-4" /> :
                               <Camera className="h-4 w-4" />}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-400 flex items-center">
                                  <Clock className="mr-1 h-3 w-3" />
                                  {activity.start_time}
                                </span>
                                <h5 className="font-bold text-slate-900">{activity.activity_name}</h5>
                              </div>
                              <p className="mt-1 flex items-center text-xs text-slate-500">
                                <MapPin className="mr-1 h-3 w-3" />
                                {activity.location}
                              </p>
                              {activity.description && (
                                <p className="mt-2 text-sm text-slate-600 border-l-2 border-slate-100 pl-3 italic">
                                  {activity.description}
                                </p>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveActivity(activity.id)}
                            className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Vertical line connector */}
                  <div className="absolute left-3 top-6 bottom-0 w-px bg-slate-200 -ml-[0.5px] -z-10"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed p-12 text-center bg-white">
              <p className="text-slate-500">Your itinerary is empty. Add activities to see them on the timeline.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ItineraryBuilderPage() {
  return (
    <Suspense fallback={<div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>}>
      <ItineraryBuilderContent />
    </Suspense>
  );
}
