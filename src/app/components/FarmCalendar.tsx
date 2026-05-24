import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus, Clock, AlertCircle, Leaf, Syringe, Users, DollarSign } from 'lucide-react';

interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  type: 'vaccination' | 'planting' | 'harvesting' | 'feeding' | 'staff' | 'financial' | 'general';
  description: string;
  status: 'completed' | 'upcoming' | 'overdue';
  animalType?: string;
  cropType?: string;
}

export function FarmCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 17)); // May 17, 2026
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'agenda'>('month');

  // Sample events
  const events: CalendarEvent[] = [
    {
      id: 1,
      title: 'Newcastle Disease Vaccination - Chickens',
      date: '2026-05-18',
      type: 'vaccination',
      description: 'Vaccinate all 120 chickens against Newcastle Disease',
      status: 'upcoming',
      animalType: 'Chickens'
    },
    {
      id: 2,
      title: 'Maize Planting - Field A',
      date: '2026-05-20',
      type: 'planting',
      description: 'Plant maize in 2 hectares (Field A)',
      status: 'upcoming',
      cropType: 'Maize'
    },
    {
      id: 3,
      title: 'Bean Harvest - Field B',
      date: '2026-05-22',
      type: 'harvesting',
      description: 'Harvest beans from 1 hectare',
      status: 'upcoming',
      cropType: 'Beans'
    },
    {
      id: 4,
      title: 'Feed Delivery',
      date: '2026-05-19',
      type: 'feeding',
      description: 'Receive 500kg layer mash delivery',
      status: 'upcoming'
    },
    {
      id: 5,
      title: 'Staff Training Session',
      date: '2026-05-21',
      type: 'staff',
      description: 'Training on new health monitoring procedures',
      status: 'upcoming'
    },
    {
      id: 6,
      title: 'Pay Suppliers',
      date: '2026-05-23',
      type: 'financial',
      description: 'Payment due for last month feed supplies',
      status: 'upcoming'
    },
    {
      id: 7,
      title: 'Goat Deworming',
      date: '2026-05-15',
      type: 'vaccination',
      description: 'Deworm all 35 goats',
      status: 'overdue',
      animalType: 'Goats'
    },
    {
      id: 8,
      title: 'Cassava Harvest - Field C',
      date: '2026-05-25',
      type: 'harvesting',
      description: 'Harvest cassava from 1.5 hectares',
      status: 'upcoming',
      cropType: 'Cassava'
    },
    {
      id: 9,
      title: 'Pig ASF Vaccination',
      date: '2026-05-28',
      type: 'vaccination',
      description: 'African Swine Fever vaccination for all pigs',
      status: 'upcoming',
      animalType: 'Pigs'
    },
    {
      id: 10,
      title: 'Monthly Financial Review',
      date: '2026-05-30',
      type: 'financial',
      description: 'Review month end financials and prepare reports',
      status: 'upcoming'
    }
  ];

  const getEventTypeColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'vaccination': return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'planting': return 'bg-green-100 text-green-700 border-green-300';
      case 'harvesting': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'feeding': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'staff': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'financial': return 'bg-red-100 text-red-700 border-red-300';
      case 'general': return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getEventIcon = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'vaccination': return <Syringe className="w-4 h-4" />;
      case 'planting': return <Leaf className="w-4 h-4" />;
      case 'harvesting': return <Leaf className="w-4 h-4" />;
      case 'feeding': return <Clock className="w-4 h-4" />;
      case 'staff': return <Users className="w-4 h-4" />;
      case 'financial': return <DollarSign className="w-4 h-4" />;
      case 'general': return <Calendar className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: CalendarEvent['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'upcoming': return 'bg-blue-100 text-blue-700';
      case 'overdue': return 'bg-red-100 text-red-700';
    }
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date === dateStr);
  };

  const isToday = (day: number) => {
    const today = new Date(2026, 4, 17);
    return day === today.getDate() &&
           currentDate.getMonth() === today.getMonth() &&
           currentDate.getFullYear() === today.getFullYear();
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const dayNumber = i - firstDay + 1;
    return dayNumber > 0 && dayNumber <= daysInMonth ? dayNumber : null;
  });

  const upcomingEvents = events
    .filter(e => e.status === 'upcoming' || e.status === 'overdue')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const handleAddEvent = () => {
    alert('Add Event functionality\n\nIn production, this would open a form to create a new calendar event with:\n- Title and description\n- Date and time\n- Event type\n- Related animals/crops\n- Recurring options');
    setShowAddEvent(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold mb-2">Farm Calendar</h1>
          <p className="text-gray-600">Schedule and track all farm activities</p>
        </div>
        <button
          onClick={() => setShowAddEvent(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Event
        </button>
      </div>

      {/* View Mode Toggle */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex gap-2">
          {(['month', 'agenda'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                viewMode === mode
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-2">
          {viewMode === 'month' ? (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={previousMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCurrentDate(new Date(2026, 4, 17))}
                    className="px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors text-sm"
                  >
                    Today
                  </button>
                  <button
                    onClick={nextMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Day Names */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {dayNames.map(day => (
                  <div key={day} className="text-center font-semibold text-gray-600 text-sm py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day, index) => {
                  if (day === null) {
                    return <div key={index} className="aspect-square" />;
                  }

                  const dayEvents = getEventsForDate(day);
                  const hasOverdue = dayEvents.some(e => e.status === 'overdue');

                  return (
                    <div
                      key={index}
                      className={`aspect-square border rounded-lg p-1 relative ${
                        isToday(day)
                          ? 'bg-blue-50 border-blue-500'
                          : 'border-gray-200 hover:border-gray-300'
                      } ${hasOverdue ? 'border-red-300' : ''}`}
                    >
                      <div className={`text-sm font-semibold ${isToday(day) ? 'text-blue-600' : 'text-gray-700'}`}>
                        {day}
                      </div>
                      <div className="mt-1 space-y-0.5">
                        {dayEvents.slice(0, 2).map((event, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedEvent(event)}
                            className={`w-full text-xs px-1 py-0.5 rounded truncate text-left ${getEventTypeColor(event.type)}`}
                          >
                            {event.title}
                          </button>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-gray-500 px-1">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="font-semibold mb-4">Upcoming Events</h2>
              <div className="space-y-3">
                {events
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .map((event) => (
                    <button
                      key={event.id}
                      onClick={() => setSelectedEvent(event)}
                      className={`w-full p-4 border rounded-lg text-left hover:bg-gray-50 transition-colors ${getEventTypeColor(event.type)}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getEventIcon(event.type)}
                          <h3 className="font-semibold">{event.title}</h3>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusBadge(event.status)}`}>
                          {event.status}
                        </span>
                      </div>
                      <p className="text-sm mb-2">{event.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span>📅 {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        {event.animalType && <span>🐾 {event.animalType}</span>}
                        {event.cropType && <span>🌾 {event.cropType}</span>}
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold mb-3">This Month</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Events</span>
                <span className="font-semibold">{events.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Completed</span>
                <span className="font-semibold text-green-600">
                  {events.filter(e => e.status === 'completed').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Upcoming</span>
                <span className="font-semibold text-blue-600">
                  {events.filter(e => e.status === 'upcoming').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Overdue</span>
                <span className="font-semibold text-red-600">
                  {events.filter(e => e.status === 'overdue').length}
                </span>
              </div>
            </div>
          </div>

          {/* Upcoming Events List */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold mb-3">Next 5 Events</h3>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <button
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-2 mb-1">
                    <div className={`mt-0.5 ${event.status === 'overdue' ? 'text-red-600' : 'text-gray-600'}`}>
                      {getEventIcon(event.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{event.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  {event.status === 'overdue' && (
                    <div className="flex items-center gap-1 text-xs text-red-600 mt-2">
                      <AlertCircle className="w-3 h-3" />
                      <span>Overdue</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Event Type Legend */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold mb-3">Event Types</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
                <span>Vaccination</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span>Planting</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span>Harvesting</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span>Feeding</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span>Staff</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span>Financial</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                {getEventIcon(selectedEvent.type)}
                <h2 className="font-semibold">{selectedEvent.title}</h2>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-gray-600">Date:</span>
                <p className="font-semibold">
                  {new Date(selectedEvent.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>

              <div>
                <span className="text-gray-600">Type:</span>
                <p className="font-semibold capitalize">{selectedEvent.type}</p>
              </div>

              <div>
                <span className="text-gray-600">Status:</span>
                <span className={`ml-2 px-2 py-1 rounded text-sm font-semibold ${getStatusBadge(selectedEvent.status)}`}>
                  {selectedEvent.status}
                </span>
              </div>

              {selectedEvent.animalType && (
                <div>
                  <span className="text-gray-600">Animal Type:</span>
                  <p className="font-semibold">{selectedEvent.animalType}</p>
                </div>
              )}

              {selectedEvent.cropType && (
                <div>
                  <span className="text-gray-600">Crop Type:</span>
                  <p className="font-semibold">{selectedEvent.cropType}</p>
                </div>
              )}

              <div>
                <span className="text-gray-600">Description:</span>
                <p className="mt-1">{selectedEvent.description}</p>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => {
                  alert('Mark as completed');
                  setSelectedEvent(null);
                }}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Mark Complete
              </button>
              <button
                onClick={() => {
                  alert('Edit event');
                  setSelectedEvent(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {showAddEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="font-semibold mb-4">Add New Event</h2>
            <p className="text-gray-600 mb-4">
              This would open a form to create a new calendar event with title, date, type, and related information.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleAddEvent}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Create Event
              </button>
              <button
                onClick={() => setShowAddEvent(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
