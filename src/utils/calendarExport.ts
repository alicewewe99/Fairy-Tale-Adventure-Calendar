import { DayMarkerStore } from '../types';

/**
 * Generate RFC 5545 iCalendar (.ics) content for user events
 * Compatible with Apple Calendar (iPhone/Mac), Google Calendar, and Android
 */
export function generateIcsContent(markerStore: DayMarkerStore): string {
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Panda Monthly Calendar//Alice Wonderland Panda//ZH',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:貓熊童話月曆行程與提醒',
    'X-WR-TIMEZONE:Asia/Taipei',
  ];

  const now = new Date();
  const dtStamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  Object.entries(markerStore).forEach(([dateString, data], index) => {
    const emojis = data.emojis || [];
    const notes = (data.notes || '').trim();

    if (emojis.length === 0 && !notes) return;

    // Date format YYYYMMDD
    const cleanDate = dateString.replace(/-/g, '');
    const summary = emojis.length > 0 
      ? `${emojis.join(' ')} ${notes ? notes : '貓熊月曆標記'}`
      : notes;

    lines.push('BEGIN:VEVENT');
    lines.push(`UID:panda-cal-${cleanDate}-${index}@pandacalendar.app`);
    lines.push(`DTSTAMP:${dtStamp}`);
    lines.push(`DTSTART;VALUE=DATE:${cleanDate}`);
    // For all-day event, DTEND is next day
    const [y, m, d] = dateString.split('-').map(Number);
    const nextDay = new Date(y, m - 1, d + 1);
    const nextClean = `${nextDay.getFullYear()}${String(nextDay.getMonth() + 1).padStart(2, '0')}${String(nextDay.getDate()).padStart(2, '0')}`;
    lines.push(`DTEND;VALUE=DATE:${nextClean}`);
    lines.push(`SUMMARY:${summary}`);
    if (notes) {
      lines.push(`DESCRIPTION:${notes.replace(/\n/g, '\\n')}`);
    }
    lines.push('STATUS:CONFIRMED');
    lines.push('TRANSP:TRANSPARENT');
    lines.push('END:VEVENT');
  });

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

/**
 * Trigger browser file download
 */
export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Parse an uploaded .ics file and extract events into DayMarkerStore
 */
export function parseIcsContent(icsText: string, currentStore: DayMarkerStore): {
  updatedStore: DayMarkerStore;
  importedCount: number;
} {
  const updatedStore: DayMarkerStore = { ...currentStore };
  let importedCount = 0;

  // Simple regex parser for VEVENT blocks
  const eventBlocks = icsText.split(/BEGIN:VEVENT/i).slice(1);

  for (const block of eventBlocks) {
    const endMatch = block.split(/END:VEVENT/i)[0];
    if (!endMatch) continue;

    let dtStart = '';
    let summary = '';
    let description = '';

    // Match DTSTART
    const startMatch = endMatch.match(/DTSTART(?:;[^:]+)?:(\d{8})/i);
    if (startMatch && startMatch[1]) {
      dtStart = startMatch[1]; // YYYYMMDD
    }

    // Match SUMMARY
    const summaryMatch = endMatch.match(/SUMMARY:(.+?)(?:\r\n|\n)/i);
    if (summaryMatch && summaryMatch[1]) {
      summary = summaryMatch[1].trim();
    }

    // Match DESCRIPTION
    const descMatch = endMatch.match(/DESCRIPTION:(.+?)(?:\r\n|\n)/i);
    if (descMatch && descMatch[1]) {
      description = descMatch[1].replace(/\\n/g, '\n').trim();
    }

    if (dtStart && dtStart.length >= 8) {
      const year = dtStart.slice(0, 4);
      const month = dtStart.slice(4, 6);
      const day = dtStart.slice(6, 8);
      const dateString = `${year}-${month}-${day}`;

      // Extract emojis from summary
      const emojiRegex = /[\p{Extended_Pictographic}]/gu;
      const foundEmojis = summary.match(emojiRegex) || [];
      const cleanSummary = summary.replace(emojiRegex, '').trim();

      const combinedNotes = [cleanSummary, description].filter(Boolean).join(' - ');

      const existing = updatedStore[dateString] || { emojis: [] };
      const mergedEmojis = Array.from(new Set([...(existing.emojis || []), ...foundEmojis]));
      const mergedNotes = existing.notes 
        ? `${existing.notes}\n${combinedNotes}`.trim()
        : combinedNotes;

      updatedStore[dateString] = {
        emojis: mergedEmojis,
        notes: mergedNotes,
        updatedAt: new Date().toISOString(),
      };
      importedCount++;
    }
  }

  return { updatedStore, importedCount };
}
