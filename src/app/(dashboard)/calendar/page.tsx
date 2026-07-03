import { WidgetCard } from "@/components/dashboard/widgets";
import { cn } from "@/lib/utils";
import { calendarEvents } from "@/data/dashboard";

const impactLabel = { high: "HIGH", medium: "MED", low: "LOW" };
const impactColor = { high: "bg-brand-danger text-white", medium: "bg-brand-accent text-white", low: "bg-slate-200 text-slate-600" };
const countryFlag: Record<string, string> = { USD: "🇺🇸", GBP: "🇬🇧", EUR: "🇪🇺", JPY: "🇯🇵" };

export default function CalendarPage() {
  const grouped = calendarEvents.reduce<Record<string, typeof calendarEvents>>((acc, ev) => {
    if (!acc[ev.date]) acc[ev.date] = [];
    acc[ev.date].push(ev);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="font-display text-xl font-bold text-foreground">Economic Calendar</h2>
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-brand-danger" /> High</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-brand-accent" /> Medium</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-slate-300" /> Low</span>
        </div>
      </div>

      {Object.entries(grouped).map(([date, events]) => (
        <WidgetCard key={date} title={new Date(date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-xs font-medium text-foreground/50 dark:border-slate-800">
                  {["Time (UTC)", "Currency", "Event", "Impact", "Forecast", "Previous", "Actual"].map((h) => (
                    <th key={h} className="whitespace-nowrap pb-3 pr-6 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {events.map((ev) => (
                  <tr key={ev.id} className="hover:bg-brand-muted/40 dark:hover:bg-slate-900/20">
                    <td className="tabular py-3 pr-6 font-mono text-xs text-foreground/60">{ev.time}</td>
                    <td className="py-3 pr-6">
                      <span className="flex items-center gap-1.5">
                        <span>{countryFlag[ev.country] ?? "🌐"}</span>
                        <span className="font-semibold text-foreground">{ev.country}</span>
                      </span>
                    </td>
                    <td className="py-3 pr-6 font-medium text-foreground max-w-xs">{ev.event}</td>
                    <td className="py-3 pr-6">
                      <span className={cn("rounded-full px-2.5 py-0.5 text-[10px] font-bold", impactColor[ev.impact])}>
                        {impactLabel[ev.impact]}
                      </span>
                    </td>
                    <td className="tabular py-3 pr-6 text-foreground/60">{ev.forecast ?? "—"}</td>
                    <td className="tabular py-3 pr-6 text-foreground/60">{ev.previous ?? "—"}</td>
                    <td className="tabular py-3 font-semibold text-foreground">{ev.actual ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </WidgetCard>
      ))}
    </div>
  );
}
