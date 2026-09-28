import { useState } from "react";
import Container from "./Container";
import SectionHeader from "./SectionHeader";
import Button from "./Button";
import SmartEventCalendar from "./SmartEventCalendar";

const events = [
  {
    day: "15",
    month: "Aug",
    tag: "National Celebration",
    title: "Independence Day Civic Parade & Cultural Mela",
    text: "Civic Square Central Grounds · Flag hoisting, patriotic songs, flower shows, and public felicitation.",
    location: "Civic Square Ground",
  },
  {
    day: "28",
    month: "Aug",
    tag: "Sports & Fitness",
    title: "Orbit Smart City Annual Night Marathon (10K & 21K)",
    text: "Starts at Riverfront Promenade · Eco-friendly illuminated marathon promoting green urban living.",
    location: "Riverfront Promenade Gate 1",
  },
  {
    day: "10",
    month: "Sep",
    tag: "Innovation Expo",
    title: "National Smart City & Clean Mobility Expo 2026",
    text: "Orbit Smart City International Convention Centre · Showcasing EV infrastructure, IoT water sensors, and civic tech.",
    location: "Convention Centre, Sector 7",
  },
  {
    day: "10",
    month: "Sep",
    tag: "Cultural Festival",
    title: "Heritage Handloom & Food Festival",
    text: "Old Town Heritage Courtyard · Artisanal stalls, classical music concerts, and regional cuisines.",
    location: "Old Quarter Heritage Street",
  },
  {
    day: "18",
    month: "Sep",
    tag: "Clean Environment",
    title: "Mega Urban Green Plantation & Biodiversity Drive",
    text: "Eco-Park North Extension · Mass tree plantation drive with free native sapling distribution.",
    location: "Eco Park North Extension",
  },
  {
    day: "24",
    month: "Sep",
    tag: "Cultural Festival",
    title: "Orbit Drone Light Symphony & Civic Gala",
    text: "Old Town Heritage Courtyard · Artisanal stalls, classical music concerts, and regional cuisines.",
    location: "Central Waterfront Amphitheatre",
  },
];

export default function Events() {
  const [viewMode, setViewMode] = useState("calendar"); // "calendar" | "list"

  return (
    <section id="events" className="py-16 lg:py-section">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <SectionHeader
            eyebrow="Upcoming City Events"
            title="What's Happening in Orbit Smart City."
            description="Festivals, cleanliness drives, citizen hackathons, and cultural programmes across the city."
            className="mb-0"
          />

          {/* View Mode Toggle: Smart Calendar vs Agenda List */}
          <div className="flex items-center bg-mist border border-line p-1 rounded-lg shadow-xs flex-shrink-0 self-start md:self-auto">
            <button
              onClick={() => setViewMode("calendar")}
              className={`flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-md transition-all ${
                viewMode === "calendar"
                  ? "bg-ink-navy text-paper shadow-sm"
                  : "text-slate hover:text-ink-navy"
              }`}
            >
              <span>📅</span>
              <span>Month Calendar View</span>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-md transition-all ${
                viewMode === "list"
                  ? "bg-ink-navy text-paper shadow-sm"
                  : "text-slate hover:text-ink-navy"
              }`}
            >
              <span>📋</span>
              <span>Agenda List View</span>
            </button>
          </div>
        </div>

        {/* Smart Month View Calendar */}
        {viewMode === "calendar" ? (
          <SmartEventCalendar />
        ) : (
          <div className="grid gap-4 animate-fade-in">
            {events.map((e) => (
              <div
                key={e.title}
                className="grid grid-cols-[72px_1fr] sm:grid-cols-[92px_1fr_auto] gap-[22px] items-center bg-paper border border-line rounded-lg px-6 py-5 hover:border-transit-teal/50 shadow-xs hover:shadow-sm transition-all"
              >
                <div className="bg-gradient-to-b from-mist to-paper rounded-md border border-line text-center py-[10px] font-mono shadow-xs">
                  <span className="block text-[1.4rem] font-bold text-ink-navy">{e.day}</span>
                  <span className="block text-[0.7rem] tracking-[0.1em] text-transit-teal uppercase font-bold">{e.month}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-mono text-[0.66rem] uppercase text-transit-teal font-semibold tracking-[0.06em] bg-transit-teal/10 px-2 py-0.5 rounded">
                      {e.tag}
                    </span>
                    <span className="text-[0.76rem] text-slate-light font-mono">📍 {e.location}</span>
                  </div>
                  <h3 className="text-[1.05rem] font-display font-bold text-ink-navy mb-1">{e.title}</h3>
                  <p className="text-[0.88rem] text-slate-light leading-relaxed">{e.text}</p>
                </div>
                <Button href="#events" variant="outline" className="col-span-2 sm:col-span-1 whitespace-nowrap">
                  Event Pass & Details
                </Button>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

