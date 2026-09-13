import React, { useRef, useState } from 'react';
import {
  X,
  Download,
  Upload,
  Calendar as CalendarIcon,
  CheckCircle2,
  AlertCircle,
  FileText,
  Smartphone,
} from 'lucide-react';
import { DayMarkerStore } from '../types';
import {
  generateIcsContent,
  downloadFile,
  parseIcsContent,
} from '../utils/calendarExport';

interface SyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  markerStore: DayMarkerStore;
  onImportSuccess: (newStore: DayMarkerStore) => void;
}

export const SyncModal: React.FC<SyncModalProps> = ({
  isOpen,
  onClose,
  markerStore,
  onImportSuccess,
}) => {
  const [importMessage, setImportMessage] = useState<string | null>(null);
  const [importStatus, setImportStatus] = useState<'success' | 'error' | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const jsonInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const totalMarkedDays = (Object.values(markerStore) as Array<{ emojis?: string[]; notes?: string }>).filter(
    (d) => (d.emojis && d.emojis.length > 0) || (d.notes && d.notes.trim().length > 0)
  ).length;

  // Export .ics format
  const handleExportIcs = () => {
    const icsContent = generateIcsContent(markerStore);
    downloadFile(
      icsContent,
      'panda-calendar-schedules.ics',
      'text/calendar;charset=utf-8'
    );
    setImportStatus('success');
    setImportMessage('已成功下載 iCalendar (.ics) 檔案！可在 iPhone、Android 或 Google 日曆中直接開啟同步。');
  };

  // Export JSON backup
  const handleExportJson = () => {
    const jsonString = JSON.stringify(markerStore, null, 2);
    downloadFile(
      jsonString,
      'panda-calendar-backup.json',
      'application/json;charset=utf-8'
    );
    setImportStatus('success');
    setImportMessage('已匯出完整標記備份檔 (.json)。');
  };

  // Import .ics file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const { updatedStore, importedCount } = parseIcsContent(text, markerStore);
        onImportSuccess(updatedStore);
        setImportStatus('success');
        setImportMessage(`成功匯入 ${importedCount} 筆手機行事曆行程與提醒！`);
      } catch (err) {
        setImportStatus('error');
        setImportMessage('行事曆檔案格式不符合標準 .ics 規範。');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Import JSON backup
  const handleJsonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text) as DayMarkerStore;
        onImportSuccess(parsed);
        setImportStatus('success');
        setImportMessage('已成功還原個人標記備份！');
      } catch (err) {
        setImportStatus('error');
        setImportMessage('備份 JSON 檔案解析失敗。');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border-2 border-pink-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-100 via-pink-100 to-amber-100 px-5 py-4 border-b border-pink-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📤</span>
            <div>
              <h3 className="text-lg font-black text-slate-800">
                手機行事曆匯出與匯入
              </h3>
              <p className="text-xs text-slate-600">
                支援 iPhone (Apple日曆/提醒事項) & Android (Google日曆)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-500 hover:text-slate-800 hover:bg-white/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Notification feedback */}
          {importMessage && (
            <div
              className={`p-3 rounded-2xl flex items-start gap-2.5 text-xs sm:text-sm ${
                importStatus === 'success'
                  ? 'bg-emerald-50 border border-emerald-300 text-emerald-800'
                  : 'bg-rose-50 border border-rose-300 text-rose-800'
              }`}
            >
              {importStatus === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
              )}
              <div className="flex-1 font-medium">{importMessage}</div>
            </div>
          )}

          {/* Current Status banner */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CalendarIcon className="w-5 h-5 text-sky-600" />
              <div className="text-xs text-slate-700">
                <span className="font-bold text-slate-900">月曆標記現況：</span>
                共記錄有 <span className="text-pink-600 font-bold">{totalMarkedDays}</span> 天的個人行程或 emoji
              </div>
            </div>
          </div>

          {/* Export Section */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black text-slate-800 flex items-center gap-1.5">
              <Download className="w-4 h-4 text-sky-600" />
              <span>匯出行程與提醒至手機</span>
            </h4>

            {/* .ics export button */}
            <div className="p-3.5 bg-sky-50/70 border border-sky-200 rounded-2xl flex items-center justify-between gap-3">
              <div>
                <div className="font-bold text-xs sm:text-sm text-sky-950 flex items-center gap-1">
                  <span>匯出通用日曆檔 (.ics)</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  在 iPhone 點開即可直接「加入行事曆」；Android 亦可直接匯入 Google 日曆。
                </p>
              </div>
              <button
                onClick={handleExportIcs}
                className="shrink-0 flex items-center gap-1 px-3.5 py-2 rounded-xl bg-sky-600 text-white font-bold text-xs hover:bg-sky-700 active:scale-95 transition-all shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>下載 .ics</span>
              </button>
            </div>

            {/* JSON backup button */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-3">
              <div>
                <div className="font-bold text-xs sm:text-sm text-slate-800">
                  完整標記備份 (.json)
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  完整備份所有的 emoji 特殊記號、備忘筆記與日期。
                </p>
              </div>
              <button
                onClick={handleExportJson}
                className="shrink-0 flex items-center gap-1 px-3.5 py-2 rounded-xl bg-slate-700 text-white font-bold text-xs hover:bg-slate-800 active:scale-95 transition-all"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>下載備份</span>
              </button>
            </div>
          </div>

          {/* Import Section */}
          <div className="space-y-2.5 pt-2 border-t border-slate-200">
            <h4 className="text-xs font-black text-slate-800 flex items-center gap-1.5">
              <Upload className="w-4 h-4 text-emerald-600" />
              <span>匯入手機或外部檔案</span>
            </h4>

            {/* Hidden file inputs */}
            <input
              type="file"
              ref={fileInputRef}
              accept=".ics,text/calendar"
              onChange={handleFileChange}
              className="hidden"
            />
            <input
              type="file"
              ref={jsonInputRef}
              accept=".json,application/json"
              onChange={handleJsonChange}
              className="hidden"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Import .ics */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-emerald-100 transition-colors cursor-pointer"
              >
                <Smartphone className="w-6 h-6 text-emerald-600 mb-1" />
                <span className="text-xs font-bold text-emerald-950">
                  匯入手機行事曆 (.ics)
                </span>
                <span className="text-[10px] text-emerald-700 mt-0.5">
                  同步 Google / Apple 日曆事件
                </span>
              </button>

              {/* Restore JSON */}
              <button
                onClick={() => jsonInputRef.current?.click()}
                className="p-3 bg-amber-50/70 border border-amber-200 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-amber-100 transition-colors cursor-pointer"
              >
                <Upload className="w-6 h-6 text-amber-600 mb-1" />
                <span className="text-xs font-bold text-amber-950">
                  還原標記備份 (.json)
                </span>
                <span className="text-[10px] text-amber-700 mt-0.5">
                  載入先前儲存的所有標記
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs sm:text-sm hover:bg-slate-900 active:scale-95 transition-all"
          >
            完成
          </button>
        </div>
      </div>
    </div>
  );
};
