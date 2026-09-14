import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import {
  X,
  Download,
  Smartphone,
  Check,
  ExternalLink,
  Laptop,
  HelpCircle,
  Share2,
  Copy,
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PwaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CANONICAL_PREVIEW_URL =
  'https://ais-pre-v6ah3pcgfijdzsbt6mly7t-99312927511.asia-northeast1.run.app';

export const PwaModal: React.FC<PwaModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, install, isIOS, isAndroid } = usePWAInstall();
  const [appUrl, setAppUrl] = useState<string>('');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copiedUrl, setCopiedUrl] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Determine accessible external URL
    let defaultUrl = CANONICAL_PREVIEW_URL;
    if (typeof window !== 'undefined') {
      const origin = window.location.origin;
      // If current origin is an external https URL, use it
      if (origin.startsWith('https://') && !origin.includes('localhost')) {
        defaultUrl = origin;
      }
    }
    setAppUrl(defaultUrl);
  }, []);

  useEffect(() => {
    if (!appUrl) return;

    // Generate high-resolution QR code
    QRCode.toDataURL(appUrl, {
      width: 320,
      margin: 2,
      color: {
        dark: '#1e293b',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'H',
    })
      .then((url) => {
        setQrDataUrl(url);
      })
      .catch((err) => {
        console.error('Error generating QR code:', err);
      });
  }, [appUrl]);

  if (!isOpen) return null;

  // Download QR Code PNG image
  const handleDownloadQrImage = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = 'panda-monthly-calendar-qr.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy app URL
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(appUrl).then(() => {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border-2 border-pink-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-pink-100 via-sky-100 to-amber-100 px-5 py-4 border-b border-pink-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📱</span>
            <div>
              <h3 className="text-lg font-black text-slate-800">
                PWA 下載與手機 QR Code
              </h3>
              <p className="text-xs text-slate-600">
                安裝到 iPhone、Android 手機或電腦桌面 App
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

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5">
          {/* Desktop Direct Install Button (If supported by browser) */}
          {isInstallable && (
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-4 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <Laptop className="w-8 h-8 shrink-0 text-amber-200" />
                <div>
                  <h4 className="font-bold text-sm sm:text-base">
                    一鍵安裝到桌面應用程式
                  </h4>
                  <p className="text-xs text-pink-100">
                    免開瀏覽器，隨開即用，支援離線月曆
                  </p>
                </div>
              </div>
              <button
                onClick={install}
                className="px-4 py-2 bg-white text-rose-600 font-bold text-xs sm:text-sm rounded-xl shadow-xs hover:bg-pink-50 active:scale-95 transition-all shrink-0"
              >
                立即安裝
              </button>
            </div>
          )}

          {/* App Desktop Icon Showcase */}
          <div className="bg-gradient-to-br from-sky-50 to-pink-50 border border-sky-200 rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <img
                src="/pwa-192x192.png"
                alt="貓熊月曆 PWA 桌面圖示"
                className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl shadow-sm border border-sky-300 shrink-0 object-contain bg-amber-50"
                referrerPolicy="no-referrer"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 border border-sky-200">
                    PWA 桌面圖示
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">512×512 HD</span>
                </div>
                <h4 className="font-bold text-slate-800 text-sm sm:text-base mt-0.5 truncate">
                  花栗鼠與貓熊・桌曆桌面圖示
                </h4>
                <p className="text-xs text-slate-500">
                  安裝至手機與電腦主畫面的專屬應用程式圖案
                </p>
              </div>
            </div>
            <a
              href="/pwa-512x512.png"
              download="panda-calendar-pwa-icon.png"
              className="px-3 py-2 bg-white border border-sky-300 text-sky-700 hover:bg-sky-50 rounded-xl text-xs font-bold shadow-xs shrink-0 flex items-center gap-1.5 transition-all"
              title="下載高解析度 512x512 PWA 圖示檔案"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">下載圖示</span>
            </a>
          </div>

          {/* QR Code Section */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 flex flex-col items-center text-center">
            <div className="relative p-3 bg-white rounded-2xl shadow-sm border border-slate-200">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="貓熊月曆 PWA 下載 QR Code"
                  className="w-52 h-52 sm:w-60 sm:h-60 object-contain rounded-xl select-none"
                />
              ) : (
                <div className="w-52 h-52 flex items-center justify-center text-slate-400 text-xs">
                  正在生成 QR Code...
                </div>
              )}
              {/* Chipmunk & Panda sticker in center of QR */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-0.5 rounded-full shadow-md border-2 border-pink-300 pointer-events-none flex items-center gap-1">
                <span className="text-base" role="img" aria-label="花栗鼠">🐿️</span>
                <span className="text-base" role="img" aria-label="貓熊">🐼</span>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={handleDownloadQrImage}
                disabled={!qrDataUrl}
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs hover:from-sky-600 hover:to-blue-700 active:scale-95 transition-all"
                title="下載高解析度 QR Code 圖片傳送到手機"
              >
                <Download className="w-4 h-4" />
                <span>下載 QR Code 圖片</span>
              </button>
              <button
                onClick={handleCopyUrl}
                className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-300 text-slate-700 font-semibold text-xs sm:text-sm rounded-xl hover:bg-slate-100 transition-all"
              >
                {copiedUrl ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>已複製網址</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-500" />
                    <span>複製網址</span>
                  </>
                )}
              </button>
            </div>

            {/* URL selection and test verification (Fixing QR code link issues) */}
            <div className="mt-4 w-full text-left bg-white p-3 rounded-xl border border-slate-200">
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                已驗證可由外部手機開啟之有效網址：
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={appUrl}
                  onChange={(e) => setAppUrl(e.target.value)}
                  className="flex-1 text-xs p-2 border border-slate-300 rounded-lg font-mono text-slate-700"
                />
                <a
                  href={appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg"
                  title="在新分頁測試開啟"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                若手機掃描時網址打不開，可切換上方網址為外網分享連結。
              </p>
            </div>
          </div>

          {/* Installation Instructions for iPhone & Android */}
          <div className="space-y-3">
            <h4 className="font-black text-sm text-slate-800 flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-pink-600" />
              <span>手機安裝至桌面步驟教學</span>
            </h4>

            {/* iPhone iOS */}
            <div className="p-3.5 bg-sky-50/70 border border-sky-200 rounded-2xl text-xs space-y-1.5 text-slate-700">
              <div className="font-bold text-sky-900 flex items-center gap-1">
                <span>🍎 iPhone (iOS Safari) 安裝方式：</span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-slate-600 pl-1 leading-relaxed">
                <li>打開 iPhone 相機掃描上方 QR Code，並在 Safari 瀏覽器中開啟。</li>
                <li>點選 Safari 底部正中間的「分享」圖示（帶箭頭的方框 ⎋）。</li>
                <li>在選單中向下滑動，找到並點選「加入主畫面 ⊞」。</li>
                <li>點選右上角「新增」，貓熊童話圖示便會出現在手機桌面上！</li>
              </ol>
            </div>

            {/* Android */}
            <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-xs space-y-1.5 text-slate-700">
              <div className="font-bold text-emerald-900 flex items-center gap-1">
                <span>🤖 Android (Google Chrome) 安裝方式：</span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-slate-600 pl-1 leading-relaxed">
                <li>使用相機或 Chrome 掃描 QR Code 開啟網頁。</li>
                <li>點擊 Chrome 右上角的三個點選單（⋮）。</li>
                <li>點選「安裝應用程式」或「加到主畫面」。</li>
                <li>確認安裝後即可像原生 App 一樣在桌面全螢幕開啟。</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs sm:text-sm hover:bg-slate-900 active:scale-95 transition-all"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  );
};
