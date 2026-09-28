import { useState, useMemo, useEffect } from "react";
import Button from "./Button";
import { IconCalendar } from "./Icons";

// Comprehensive events list for Orbit Smart City
const initialEvents = [
  {
    id: "EVT1",
    date: "2026-08-15",
    day: "15",
    month: "Aug",
    year: 2026,
    time: "08:30 AM – 01:00 PM",
    tag: "National Celebration",
    category: "Celebration",
    title: "Independence Day Civic Parade & Cultural Mela",
    text: "Civic Square Central Grounds · Flag hoisting, patriotic songs, flower shows, and public felicitation.",
    location: "Civic Square Ground, Gate 2",
    seats: 5,
    totalSeats: 300,
    organizer: "Orbit Municipal Corporation & Dept. of Culture",
    entryType: "Free Entry (Digital Pass Required)",
  },
  {
    id: "EVT2",
    date: "2026-08-28",
    day: "28",
    month: "Aug",
    year: 2026,
    time: "07:00 PM – 10:30 PM",
    tag: "Sports & Fitness",
    category: "Sports",
    title: "Orbit Smart City Annual Night Marathon (10K & 21K)",
    text: "Starts at Riverfront Promenade · Eco-friendly illuminated marathon promoting green urban living.",
    location: "Riverfront Promenade Gate 1",
    seats: 3,
    totalSeats: 500,
    organizer: "Orbit Sports & Youth Council",
    entryType: "Registration Mandatory",
  },
  {
    id: "EVT3",
    date: "2026-09-10",
    day: "10",
    month: "Sep",
    year: 2026,
    time: "10:00 AM – 05:00 PM",
    tag: "Innovation Expo",
    category: "Tech & Innovation",
    title: "National Smart City & Clean Mobility Expo 2026",
    text: "Orbit Smart City International Convention Centre · Showcasing EV infrastructure, IoT water sensors, and civic tech.",
    location: "Convention Centre, Sector 7, Hall A",
    seats: 8,
    totalSeats: 400,
    organizer: "Ministry of Housing & Urban Affairs & Orbit Smart Mission",
    entryType: "Open to All Citizens & Delegates",
  },
  {
    id: "EVT4",
    date: "2026-09-10",
    day: "10",
    month: "Sep",
    year: 2026,
    time: "05:30 PM – 10:00 PM",
    tag: "Cultural Festival",
    category: "Culture",
    title: "Heritage Handloom & Food Festival",
    text: "Old Town Heritage Courtyard · Artisanal stalls, classical music concerts, and regional cuisines.",
    location: "Old Quarter Heritage Street, Courtyard 4",
    seats: 6,
    totalSeats: 250,
    organizer: "Handloom Weavers Guild & Tourism Board",
    entryType: "Free Entry",
  },
  {
    id: "EVT5",
    date: "2026-09-10",
    day: "10",
    month: "Sep",
    year: 2026,
    time: "02:00 PM – 04:30 PM",
    tag: "Tech Workshop",
    category: "Tech & Innovation",
    title: "Smart Citizen IoT & Robotics Workshop",
    text: "Innovation Hub Labs · Hands-on demo on building air quality sensors and smart automation prototypes.",
    location: "Innovation Hub, Block B, Lab 3",
    seats: 12,
    totalSeats: 60,
    organizer: "Orbit Innovation Cell",
    entryType: "Student & Citizen Pass",
  },
  {
    id: "EVT6",
    date: "2026-09-18",
    day: "18",
    month: "Sep",
    year: 2026,
    time: "07:30 AM – 11:30 AM",
    tag: "Clean Environment",
    category: "Environment",
    title: "Mega Urban Green Plantation & Biodiversity Drive",
    text: "Eco-Park North Extension · Mass tree plantation drive with free native sapling distribution.",
    location: "Eco Park North Extension, Zone 3",
    seats: 25,
    totalSeats: 200,
    organizer: "Department of Environment & Forests",
    entryType: "Volunteer Drive",
  },
  {
    id: "EVT7",
    date: "2026-09-24",
    day: "24",
    month: "Sep",
    year: 2026,
    time: "07:00 PM – 09:30 PM",
    tag: "Light & Music",
    category: "Culture",
    title: "Orbit Drone Light Symphony & Civic Gala",
    text: "Central Waterfront Stage · 500-drone synchronized aerial display celebrating clean energy milestones.",
    location: "Central Waterfront Amphitheatre",
    seats: 14,
    totalSeats: 600,
    organizer: "Orbit Tourism & Cultural Affairs",
    entryType: "Public Viewing Free",
  },
  {
    id: "EVT8",
    date: "2026-10-02",
    day: "02",
    month: "Oct",
    year: 2026,
    time: "08:00 AM – 12:00 PM",
    tag: "Swachh Mission",
    category: "Civic Action",
    title: "Gandhi Jayanti Swachhata Pakhwada Mega Drive",
    text: "City-wide municipal wards · Cleanliness campaign, plastic-free market pledge, and citizen awards.",
    location: "Town Hall & All 12 Municipal Zones",
    seats: 40,
    totalSeats: 1000,
    organizer: "Orbit Municipal Corporation",
    entryType: "Open Community Drive",
  },
  {
    id: "EVT9",
    date: "2026-10-02",
    day: "02",
    month: "Oct",
    year: 2026,
    time: "04:00 PM – 07:00 PM",
    tag: "Youth Dialogue",
    category: "Civic Action",
    title: "Youth Leadership & Clean Governance Townhall",
    text: "Main Auditorium, Town Hall · Open dialogue with the City Commissioner and youth leaders.",
    location: "Town Hall Main Auditorium",
    seats: 18,
    totalSeats: 200,
    organizer: "Civic Leadership Forum",
    entryType: "Prior Registration Required",
  },
  {
    id: "EVT10",
    date: "2026-10-15",
    day: "15",
    month: "Oct",
    year: 2026,
    time: "10:30 AM – 03:00 PM",
    tag: "Clean Energy",
    category: "Tech & Innovation",
    title: "Solar Net-Metering & Rooftop Power Symposium",
    text: "Energy Transition Pavilion · Learn about government subsidies and rooftop solar net-metering schemes.",
    location: "Pavilion 2, Energy Park",
    seats: 20,
    totalSeats: 180,
    organizer: "Orbit Renewable Energy Agency",
    entryType: "Free Entry",
  },
];

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function SmartEventCalendar() {
  // Calendar viewed month (Default: September 2026 to showcase the multi-event case)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(8); // 8 = September (0-indexed)

  // Selected date string (e.g., '2026-09-10')
  const [selectedDate, setSelectedDate] = useState("2026-09-10");

  // Filter category & search query
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Selected event modal/detail
  const [activeModalEvent, setActiveModalEvent] = useState(null);

  // Booked pass IDs state (backed by localStorage)
  const [bookedEvents, setBookedEvents] = useState(() => {
    try {
      const saved = localStorage.getItem("orbit_booked_events");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem("orbit_booked_events", JSON.stringify(bookedEvents));
    } catch {
      // ignore storage errors
    }
  }, [bookedEvents]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Filtered events based on Category + Search Query
  const filteredEvents = useMemo(() => {
    let result = initialEvents;

    // Apply category filter
    if (categoryFilter !== "All") {
      result = result.filter((e) => e.category === categoryFilter);
    }

    // Apply search query across title, tag, location, description, organizer, and date
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter((e) => {
        return (
          e.title.toLowerCase().includes(query) ||
          e.tag.toLowerCase().includes(query) ||
          e.category.toLowerCase().includes(query) ||
          e.text.toLowerCase().includes(query) ||
          e.location.toLowerCase().includes(query) ||
          (e.organizer && e.organizer.toLowerCase().includes(query)) ||
          e.date.includes(query)
        );
      });
    }

    return result;
  }, [categoryFilter, searchQuery]);

  // Map of events by date 'YYYY-MM-DD'
  const eventsByDate = useMemo(() => {
    const map = {};
    filteredEvents.forEach((evt) => {
      if (!map[evt.date]) {
        map[evt.date] = [];
      }
      map[evt.date].push(evt);
    });
    return map;
  }, [filteredEvents]);

  // Days in selected month
  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(currentYear, currentMonthIndex, 1).getDay();
    const daysInCurrentMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonthIndex, 0).getDate();

    const days = [];

    // Previous month padding days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i;
      const prevMonthIdx = currentMonthIndex === 0 ? 11 : currentMonthIndex - 1;
      const prevYear = currentMonthIndex === 0 ? currentYear - 1 : currentYear;
      const dateStr = `${prevYear}-${String(prevMonthIdx + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
      days.push({
        dayNumber: dayNum,
        dateStr,
        isCurrentMonth: false,
        events: eventsByDate[dateStr] || [],
      });
    }

    // Current month days
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      const dateStr = `${currentYear}-${String(currentMonthIndex + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
      days.push({
        dayNumber: i,
        dateStr,
        isCurrentMonth: true,
        events: eventsByDate[dateStr] || [],
      });
    }

    // Next month padding days to complete 35 or 42 grid
    const totalSlots = days.length <= 35 ? 35 : 42;
    const remainingSlots = totalSlots - days.length;
    for (let i = 1; i <= remainingSlots; i++) {
      const nextMonthIdx = currentMonthIndex === 11 ? 0 : currentMonthIndex + 1;
      const nextYear = currentMonthIndex === 11 ? currentYear + 1 : currentYear;
      const dateStr = `${nextYear}-${String(nextMonthIdx + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
      days.push({
        dayNumber: i,
        dateStr,
        isCurrentMonth: false,
        events: eventsByDate[dateStr] || [],
      });
    }

    return days;
  }, [currentYear, currentMonthIndex, eventsByDate]);

  // Selected day's events
  const selectedDayEvents = useMemo(() => {
    if (!selectedDate) return [];
    return eventsByDate[selectedDate] || [];
  }, [selectedDate, eventsByDate]);

  // Handlers for month navigation
  const handlePrevMonth = () => {
    if (currentMonthIndex === 0) {
      setCurrentMonthIndex(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonthIndex((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIndex === 11) {
      setCurrentMonthIndex(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonthIndex((m) => m + 1);
    }
  };

  const handleQuickJump = (monthIdx, year = 2026) => {
    setCurrentMonthIndex(monthIdx);
    setCurrentYear(year);
    if (monthIdx === 8) {
      setSelectedDate("2026-09-10");
    } else if (monthIdx === 7) {
      setSelectedDate("2026-08-15");
    } else if (monthIdx === 9) {
      setSelectedDate("2026-10-02");
    }
  };

  const handleBookPass = (evt) => {
    if (bookedEvents.includes(evt.id)) {
      setBookedEvents((prev) => prev.filter((id) => id !== evt.id));
      showToast(`Pass for "${evt.title}" has been cancelled.`);
    } else {
      setBookedEvents((prev) => [...prev, evt.id]);
      showToast(`🎉 Pass Confirmed! Digital Pass ID: ORB-2026-${evt.id}-${Math.floor(1000 + Math.random() * 9000)}`);
    }
  };

  const formatDisplayDate = (dateString) => {
    if (!dateString) return "";
    const [y, m, d] = dateString.split("-").map(Number);
    const dateObj = new Date(y, m - 1, d);
    return dateObj.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-paper border border-line rounded-xl shadow-sm overflow-hidden mb-10 transition-all">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-ink-navy text-paper border border-civic-amber/50 px-5 py-3.5 rounded-lg shadow-xl flex items-center gap-3 animate-fade-in text-sm font-medium">
          <span className="text-civic-amber text-lg">✦</span>
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-paper/60 hover:text-paper font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Header bar: Controls, Quick Jumps, and Category Filters */}
      <div className="bg-ink-navy text-paper px-5 sm:px-8 py-5 border-b border-white/10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <span className="p-1.5 rounded-md bg-civic-amber/20 text-civic-amber">
              <IconCalendar className="w-5 h-5" />
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-paper">
              Smart Event Calendar
            </h3>
            <span className="hidden sm:inline-block font-mono text-[0.65rem] tracking-wider uppercase bg-transit-teal/30 text-transit-teal border border-transit-teal/40 px-2 py-0.5 rounded">
              Interactive Month View
            </span>
          </div>
          <p className="text-paper/70 text-xs sm:text-sm">
            Search events, filter categories, inspect multi-event dates with <span className="text-civic-amber font-semibold font-mono bg-white/10 px-1.5 py-0.5 rounded">+N more</span> badges, and reserve passes.
          </p>
        </div>

        {/* Quick Month Shortcuts */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="text-paper/60 uppercase text-[0.68rem]">Featured:</span>
          <button
            onClick={() => handleQuickJump(7, 2026)}
            className={`px-3 py-1.5 rounded-md transition-all ${
              currentMonthIndex === 7
                ? "bg-civic-amber text-ink-navy font-bold shadow-sm"
                : "bg-white/10 text-paper/80 hover:bg-white/20 hover:text-white"
            }`}
          >
            Aug 2026
          </button>
          <button
            onClick={() => handleQuickJump(8, 2026)}
            className={`px-3 py-1.5 rounded-md transition-all ${
              currentMonthIndex === 8
                ? "bg-civic-amber text-ink-navy font-bold shadow-sm"
                : "bg-white/10 text-paper/80 hover:bg-white/20 hover:text-white"
            }`}
          >
            Sep 2026 (Multiple Events)
          </button>
          <button
            onClick={() => handleQuickJump(9, 2026)}
            className={`px-3 py-1.5 rounded-md transition-all ${
              currentMonthIndex === 9
                ? "bg-civic-amber text-ink-navy font-bold shadow-sm"
                : "bg-white/10 text-paper/80 hover:bg-white/20 hover:text-white"
            }`}
          >
            Oct 2026
          </button>
        </div>
      </div>

      {/* Filter and Search Navigation Toolbar */}
      <div className="p-4 sm:p-6 bg-mist/40 border-b border-line flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Month Navigation */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center border border-line bg-paper rounded-lg p-1 shadow-xs">
            <button
              onClick={handlePrevMonth}
              aria-label="Previous Month"
              className="p-1.5 sm:p-2 rounded hover:bg-mist text-ink-navy transition-colors font-bold text-sm"
            >
              ◀
            </button>
            <span className="px-4 font-display font-bold text-base sm:text-lg text-ink-navy min-w-[170px] text-center select-none">
              {months[currentMonthIndex]} {currentYear}
            </span>
            <button
              onClick={handleNextMonth}
              aria-label="Next Month"
              className="p-1.5 sm:p-2 rounded hover:bg-mist text-ink-navy transition-colors font-bold text-sm"
            >
              ▶
            </button>
          </div>

          <button
            onClick={() => {
              setCurrentYear(2026);
              setCurrentMonthIndex(8);
              setSelectedDate("2026-09-10");
              setSearchQuery("");
              setCategoryFilter("All");
            }}
            className="text-xs font-mono font-semibold text-transit-teal hover:text-transit-teal-dark bg-transit-teal/10 hover:bg-transit-teal/20 px-3 py-2 rounded-md transition-colors"
          >
            Reset
          </button>
        </div>

        {/* Right: Search Input + Category Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Global Event Search Box */}
          <div className="relative min-w-[240px] sm:w-[280px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-light text-xs">
              🔍
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search all events..."
              className="w-full pl-8 pr-8 py-2 text-xs font-mono bg-paper border border-line rounded-lg text-ink-navy placeholder:text-slate/40 focus:outline-none focus:ring-2 focus:ring-transit-teal shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-light hover:text-ink-navy text-xs font-bold"
                title="Clear Search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <span className="text-xs font-mono text-slate-light mr-1 flex-shrink-0">Filter:</span>
            {["All", "Tech & Innovation", "Culture", "Sports", "Civic Action", "Environment"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`text-xs px-2.5 py-1.5 rounded-full font-medium transition-all whitespace-nowrap ${
                  categoryFilter === cat
                    ? "bg-ink-navy text-paper shadow-xs font-semibold"
                    : "bg-paper border border-line text-slate hover:bg-mist hover:text-ink-navy"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search Results Alert Bar (Shows when user is actively searching) */}
      {searchQuery.trim() && (
        <div className="px-5 sm:px-7 py-3 bg-civic-amber/15 border-b border-civic-amber/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono animate-fade-in">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-ink-navy flex items-center gap-1.5">
              <span>🔎</span>
              <span>
                Found {filteredEvents.length} event{filteredEvents.length === 1 ? "" : "s"} matching &quot;{searchQuery}&quot;:
              </span>
            </span>

            {filteredEvents.length > 0 ? (
              filteredEvents.map((evt) => (
                <button
                  key={evt.id}
                  onClick={() => {
                    const [y, m, d] = evt.date.split("-").map(Number);
                    setCurrentYear(y);
                    setCurrentMonthIndex(m - 1);
                    setSelectedDate(evt.date);
                  }}
                  className="bg-paper hover:bg-white text-ink-navy border border-line hover:border-transit-teal px-2.5 py-1 rounded font-semibold transition-all shadow-2xs flex items-center gap-1.5 text-[0.72rem]"
                >
                  <span className="truncate max-w-[140px] sm:max-w-[200px]">{evt.title}</span>
                  <span className="text-transit-teal font-bold bg-transit-teal/10 px-1 rounded">
                    {evt.month} {evt.day}
                  </span>
                </button>
              ))
            ) : (
              <span className="text-signal-red font-semibold">
                No events matched &quot;{searchQuery}&quot;. Try terms like &quot;Marathon&quot;, &quot;Expo&quot;, &quot;Parade&quot;, &quot;Culture&quot;, or &quot;Swachhata&quot;.
              </span>
            )}
          </div>

          <button
            onClick={() => setSearchQuery("")}
            className="text-slate hover:text-ink-navy font-bold underline text-[0.72rem] self-start sm:self-auto flex-shrink-0"
          >
            Clear Search ✕
          </button>
        </div>
      )}

      {/* Main Calendar View & Day Detail Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left: The Month Grid (7-Columns) */}
        <div className="lg:col-span-8 p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-line bg-paper">
          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2 mb-2 text-center">
            {weekDays.map((d, i) => (
              <div
                key={d}
                className={`py-2 text-[0.72rem] sm:text-xs font-mono font-bold uppercase tracking-wider rounded ${
                  i === 0 || i === 6 ? "text-signal-red/80 bg-signal-red/5" : "text-slate-light bg-mist/60"
                }`}
              >
                {d}
              </div>
            ))}
          </div>

          {/* Calendar Day Cells */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {calendarDays.map((dayObj, index) => {
              const isSelected = selectedDate === dayObj.dateStr;
              const hasEvents = dayObj.events.length > 0;
              const eventCount = dayObj.events.length;
              const hasMultiple = eventCount > 1;

              return (
                <div
                  key={`${dayObj.dateStr}-${index}`}
                  onClick={() => setSelectedDate(dayObj.dateStr)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSelectedDate(dayObj.dateStr);
                    }
                  }}
                  className={`min-h-[82px] sm:min-h-[106px] p-1.5 sm:p-2 rounded-lg border text-left transition-all relative flex flex-col justify-between cursor-pointer select-none group ${
                    isSelected
                      ? "border-transit-teal bg-transit-teal/[0.07] ring-2 ring-transit-teal shadow-sm"
                      : hasEvents
                      ? "border-line bg-paper hover:border-transit-teal/60 hover:bg-mist/40 shadow-xs"
                      : dayObj.isCurrentMonth
                      ? "border-line/60 bg-paper/60 hover:bg-mist/30 hover:border-line text-slate"
                      : "border-transparent bg-mist/20 text-slate/35 hover:bg-mist/40"
                  }`}
                >
                  {/* Top Day Header: Number & Event Counter Dot */}
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`text-xs sm:text-sm font-mono font-bold rounded-full w-6 h-6 flex items-center justify-center ${
                        isSelected
                          ? "bg-transit-teal text-white shadow-xs"
                          : hasEvents
                          ? "text-ink-navy bg-mist"
                          : dayObj.isCurrentMonth
                          ? "text-slate"
                          : "text-slate/40"
                      }`}
                    >
                      {dayObj.dayNumber}
                    </span>

                    {hasEvents && (
                      <span className="font-mono text-[0.62rem] font-bold px-1.5 py-0.5 rounded-full bg-transit-teal/10 text-transit-teal flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-transit-teal animate-pulse"></span>
                        <span className="hidden sm:inline">{eventCount}</span>
                      </span>
                    )}
                  </div>

                  {/* Event Badges inside Calendar Cell */}
                  <div className="mt-1 space-y-1 w-full overflow-hidden">
                    {hasEvents && (
                      <>
                        {/* First Event Preview */}
                        <div
                          className="bg-transit-teal/15 hover:bg-transit-teal/25 border border-transit-teal/30 text-transit-teal-dark text-[0.65rem] sm:text-[0.7rem] px-1.5 py-0.5 rounded font-medium truncate block transition-colors leading-tight"
                          title={dayObj.events[0].title}
                        >
                          <span className="font-semibold">{dayObj.events[0].tag}:</span>{" "}
                          {dayObj.events[0].title}
                        </div>

                        {/* +N More Label for days with more than 1 event */}
                        {hasMultiple && (
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedDate(dayObj.dateStr);
                            }}
                            className="bg-civic-amber text-ink-navy border border-civic-amber-dark/30 font-bold text-[0.65rem] sm:text-[0.72rem] px-2 py-0.5 rounded-full flex items-center justify-between hover:bg-civic-amber-dark hover:text-white transition-all shadow-xs"
                            title={`Click to view all ${eventCount} events on this day`}
                          >
                            <span>+{eventCount - 1} more</span>
                            <span className="text-[0.65rem]">›</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Empty state subtle hint on hover */}
                  {!hasEvents && dayObj.isCurrentMonth && (
                    <div className="text-[0.65rem] text-slate/30 font-mono italic hidden group-hover:block">
                      No events
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Calendar Legend */}
          <div className="mt-4 pt-4 border-t border-line flex flex-wrap items-center justify-between gap-3 text-xs text-slate-light font-mono">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-transit-teal/20 border border-transit-teal/40"></span>
                <span>Scheduled Event</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-civic-amber border border-civic-amber-dark/30"></span>
                <span className="font-bold text-ink-navy">+N More Multi-Event Badge</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded border-2 border-transit-teal bg-transit-teal/10"></span>
                <span>Selected Date</span>
              </div>
            </div>
            <span>💡 Tip: Click on Sept 10 to test the 3-event picker!</span>
          </div>
        </div>

        {/* Right: Selected Day Events Drawer & Picker */}
        <div className="lg:col-span-4 p-5 sm:p-6 bg-gradient-to-b from-mist/30 to-paper flex flex-col justify-between">
          <div>
            {/* Header for Selected Day */}
            <div className="border-b border-line pb-4 mb-4">
              <span className="text-[0.7rem] font-mono uppercase tracking-wider text-transit-teal font-bold bg-transit-teal/10 px-2 py-0.5 rounded">
                Day Schedule Inspector
              </span>
              <h4 className="text-lg sm:text-xl font-display font-bold text-ink-navy mt-1.5 leading-snug">
                {formatDisplayDate(selectedDate)}
              </h4>
              <p className="text-xs text-slate-light font-mono mt-0.5">
                {selectedDayEvents.length === 0
                  ? "No events on this date"
                  : `${selectedDayEvents.length} Event${selectedDayEvents.length > 1 ? "s" : ""} Scheduled`}
              </p>
            </div>

            {/* List of events for the selected day */}
            {selectedDayEvents.length > 0 ? (
              <div className="space-y-3.5 max-h-[480px] overflow-y-auto pr-1">
                {selectedDayEvents.map((evt, idx) => {
                  const isBooked = bookedEvents.includes(evt.id);
                  return (
                    <div
                      key={evt.id}
                      className="p-4 rounded-xl border border-line bg-paper hover:border-transit-teal/60 shadow-xs hover:shadow-sm transition-all group"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                        <span className="font-mono text-[0.65rem] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-transit-teal/10 text-transit-teal">
                          {evt.tag}
                        </span>
                        <span className="font-mono text-[0.68rem] text-civic-amber-dark font-bold bg-civic-amber/15 px-2 py-0.5 rounded">
                          {evt.seats} passes left
                        </span>
                      </div>

                      <h5 className="font-display font-bold text-[0.98rem] text-ink-navy group-hover:text-transit-teal transition-colors leading-tight mb-1">
                        {evt.title}
                      </h5>

                      <p className="text-xs text-slate-light mb-2 line-clamp-2 leading-relaxed">
                        {evt.text}
                      </p>

                      <div className="text-[0.72rem] text-slate font-mono space-y-0.5 mb-3 bg-mist/50 p-2 rounded border border-line/60">
                        <div className="flex items-center gap-1.5">
                          <span>⏰</span>
                          <span>{evt.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span>📍</span>
                          <span className="truncate">{evt.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleBookPass(evt)}
                          className={`flex-1 text-xs py-2 px-3 rounded font-semibold transition-all shadow-xs flex items-center justify-center gap-1.5 ${
                            isBooked
                              ? "bg-transit-teal text-white hover:bg-transit-teal-dark"
                              : "bg-civic-amber text-ink-navy hover:bg-civic-amber-dark"
                          }`}
                        >
                          {isBooked ? "✓ Pass Reserved" : "Get Free Pass"}
                        </button>

                        <button
                          onClick={() => setActiveModalEvent(evt)}
                          className="text-xs py-2 px-2.5 rounded font-mono font-medium border border-line hover:bg-mist text-slate hover:text-ink-navy transition-colors"
                          title="View Full Details"
                        >
                          Details ℹ
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 text-center">
                <div className="w-12 h-12 rounded-full bg-mist text-slate-light flex items-center justify-center mx-auto mb-3 text-xl">
                  📅
                </div>
                <h5 className="font-display font-bold text-ink-navy text-sm mb-1">
                  No Civic Events on this Day
                </h5>
                <p className="text-xs text-slate-light max-w-[220px] mx-auto mb-4">
                  Select another day or try our featured dates in August, September, and October.
                </p>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => {
                      setCurrentMonthIndex(8);
                      setSelectedDate("2026-09-10");
                    }}
                    className="text-xs font-mono font-bold text-transit-teal bg-transit-teal/10 hover:bg-transit-teal/20 py-2 px-3 rounded transition-colors"
                  >
                    👉 Jump to Sep 10 (3 Events)
                  </button>
                  <button
                    onClick={() => {
                      setCurrentMonthIndex(7);
                      setSelectedDate("2026-08-15");
                    }}
                    className="text-xs font-mono text-slate hover:text-ink-navy bg-mist py-1.5 px-3 rounded transition-colors"
                  >
                    Jump to Aug 15 (Parade)
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Summary Footer */}
          <div className="mt-4 pt-3 border-t border-line text-[0.72rem] text-slate-light flex items-center justify-between font-mono">
            <span>Passes Reserved: {bookedEvents.length}</span>
            <button
              onClick={() => {
                if (bookedEvents.length > 0) {
                  setBookedEvents([]);
                  showToast("All reserved passes cleared.");
                }
              }}
              className="hover:text-signal-red transition-colors underline"
            >
              Clear Passes
            </button>
          </div>
        </div>
      </div>

      {/* Full Event Details & Pass Modal */}
      {activeModalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-navy/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-paper border border-line rounded-xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setActiveModalEvent(null)}
              className="absolute top-4 right-4 text-slate hover:text-ink-navy bg-mist hover:bg-mist/80 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors"
              aria-label="Close Modal"
            >
              ✕
            </button>

            <span className="font-mono text-xs font-bold uppercase tracking-wider text-transit-teal bg-transit-teal/10 px-2.5 py-1 rounded">
              {activeModalEvent.tag}
            </span>

            <h3 className="text-xl font-display font-bold text-ink-navy mt-2 mb-2 leading-tight">
              {activeModalEvent.title}
            </h3>

            <div className="bg-mist p-3.5 rounded-lg border border-line space-y-1.5 font-mono text-xs mb-4">
              <div className="flex items-center gap-2">
                <span className="text-transit-teal font-bold">📅 Date:</span>
                <span>{formatDisplayDate(activeModalEvent.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-transit-teal font-bold">⏰ Time:</span>
                <span>{activeModalEvent.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-transit-teal font-bold">📍 Location:</span>
                <span>{activeModalEvent.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-transit-teal font-bold">🏛️ Organizer:</span>
                <span>{activeModalEvent.organizer}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-transit-teal font-bold">🎟️ Admission:</span>
                <span>{activeModalEvent.entryType}</span>
              </div>
            </div>

            <h4 className="font-bold text-sm text-ink-navy mb-1">About this Event:</h4>
            <p className="text-sm text-slate leading-relaxed mb-5">
              {activeModalEvent.text}
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  handleBookPass(activeModalEvent);
                  setActiveModalEvent(null);
                }}
                className={`flex-1 py-2.5 px-4 rounded-md font-semibold text-sm transition-all shadow-sm ${
                  bookedEvents.includes(activeModalEvent.id)
                    ? "bg-transit-teal text-white hover:bg-transit-teal-dark"
                    : "bg-civic-amber text-ink-navy hover:bg-civic-amber-dark"
                }`}
              >
                {bookedEvents.includes(activeModalEvent.id) ? "✓ Pass Reserved (Click to Cancel)" : "Confirm Digital Event Pass"}
              </button>

              <button
                onClick={() => {
                  const details = `${activeModalEvent.title}\nDate: ${activeModalEvent.date}\nTime: ${activeModalEvent.time}\nLocation: ${activeModalEvent.location}`;
                  navigator.clipboard?.writeText(details);
                  showToast("Event details copied to clipboard!");
                }}
                className="px-4 py-2.5 rounded-md font-mono text-xs font-semibold border border-line hover:bg-mist text-slate hover:text-ink-navy transition-colors"
              >
                Copy Info 📋
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
