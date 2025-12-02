export function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

export function secondsToTimecode(seconds: number | null | undefined) {
  if (seconds == null || Number.isNaN(seconds)) {
    return "0:00";
  }
  const totalSeconds = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(1, "0");
  const secs = (totalSeconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

const RELATIVE_TIME = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

export function formatRelativeTimestamp(isoDate: string) {
  const created = new Date(isoDate);
  const diffMs = created.getTime() - Date.now();
  const diffMinutes = Math.round(diffMs / (1000 * 60));
  if (Math.abs(diffMinutes) < 60) {
    return RELATIVE_TIME.format(diffMinutes, "minute");
  }
  const diffHours = Math.round(diffMinutes / 60);
  if (Math.abs(diffHours) < 24) {
    return RELATIVE_TIME.format(diffHours, "hour");
  }
  const diffDays = Math.round(diffHours / 24);
  return RELATIVE_TIME.format(diffDays, "day");
}

const AUTO_NAMES = [
  "Haunted Alley",
  "Neon Pulse",
  "Astral Echo",
  "Ember Drift",
  "Subsystem Bloom",
  "Quantum Signal",
];

export function generateSoundName(type: string, seed: number) {
  const index = Math.abs(seed) % AUTO_NAMES.length;
  const version = (Math.abs(seed) % 4) + 1;
  return `${AUTO_NAMES[index]} ${type} v${version}`;
}
