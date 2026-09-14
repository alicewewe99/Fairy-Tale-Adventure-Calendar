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
  Monitor,
  Sparkles,
  Info,
  CheckCircle2,
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
  const [activeTab, setActiveTab] = useState<'icon' | 'desktop' | 'mobile'>('icon');
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
        className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border-2 border-sky-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-sky-100 via-pink-100 to-amber-100 px-5 py-4 border-b border-sky-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/pwa-192x192.png"
              alt="月曆桌面圖示"
              className="w-10 h-10 rounded-xl shadow-xs border border-sky-300 bg-amber-50"
              referrerPolicy="no-referrer"
            />
            <div>
              <h3 className="text-lg font-black text-slate-800 flex items-center gap-1.5">
                <span>桌面圖示與應用程式安裝</span>
              </h3>
              <p className="text-xs text-slate-600">
                下載 Windows / Mac 桌面圖示，或安裝手機與電腦桌面 App
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

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 bg-slate-50/80 px-4 pt-2 gap-2 text-xs sm:text-sm font-bold">
          <button
            onClick={() => setActiveTab('icon')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-all ${
              activeTab === 'icon'
                ? 'border-sky-600 text-sky-700 bg-white rounded-t-xl shadow-xs'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Download className="w-4 h-4 text-sky-600" />
            <span>桌面圖示下載 (.ico / .png)</span>
          </button>
          <button
            onClick={() => setActiveTab('desktop')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-all ${
              activeTab === 'desktop'
                ? 'border-sky-600 text-sky-700 bg-white rounded-t-xl shadow-xs'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Laptop className="w-4 h-4 text-pink-600" />
            <span>電腦建立桌面 App</span>
          </button>
          <button
            onClick={() => setActiveTab('mobile')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-all ${
              activeTab === 'mobile'
                ? 'border-sky-600 text-sky-700 bg-white rounded-t-xl shadow-xs'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Smartphone className="w-4 h-4 text-emerald-600" />
            <span>手機 QR Code 安裝</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5">
          {/* TAB 1: DESKTOP ICON DOWNLOADS */}
          {activeTab === 'icon' && (
            <div className="space-y-4">
              {/* Banner Showcase */}
              <div className="bg-gradient-to-r from-sky-50 via-pink-50 to-amber-50 border-2 border-sky-200 rounded-3xl p-4 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left shadow-xs">
                <div className="relative shrink-0">
                  <img
                    src="/pwa-512x512.png"
                    alt="桌面圖示預覽"
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl shadow-md border-2 border-sky-300 bg-amber-50 object-contain"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute -bottom-2 -right-1 bg-sky-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                    HD 原圖
                  </span>
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-black text-slate-800">
                    超萌貓熊捧月曆・桌面圖示 (Desktop Icon)
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    已依據您上傳的新圖片精準製作完成！包含 Windows 專用多解析度 <code className="bg-sky-100 text-sky-800 px-1 py-0.2 rounded font-bold">.ico</code> 檔案、高畫質 <code className="bg-pink-100 text-pink-800 px-1 py-0.2 rounded font-bold">.png</code> 與向量 <code className="bg-amber-100 text-amber-800 px-1 py-0.2 rounded font-bold">.svg</code>，可自由套用至桌面捷徑、資料夾或電腦/手機程式圖示。
                  </p>
                </div>
              </div>

              {/* Download Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1. Windows .ICO */}
                <div className="p-3.5 bg-white border border-sky-200 rounded-2xl shadow-xs hover:border-sky-300 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                        Windows 桌面專用
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono font-bold">.ICO</span>
                    </div>
                    <h5 className="font-bold text-slate-800 text-sm">Windows 捷徑圖示 (.ico)</h5>
                    <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                      內嵌 16/32/48/64/128/256 六種 Windows 系統尺寸，縮放不失真。
                    </p>
                  </div>
                  <a
                    href="/desktop-icon.ico"
                    download="panda-calendar-desktop.ico"
                    className="mt-3 w-full py-2 px-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>下載 Windows .ico 檔</span>
                  </a>
                </div>

                {/* 2. HD PNG 512x512 */}
                <div className="p-3.5 bg-white border border-pink-200 rounded-2xl shadow-xs hover:border-pink-300 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                        Mac / 高清首選
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono font-bold">512×512 PNG</span>
                    </div>
                    <h5 className="font-bold text-slate-800 text-sm">超高解析度 PNG 圖示</h5>
                    <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                      適合 Mac 桌面、自訂應用程式圖示、Dock 列或行動裝置。
                    </p>
                  </div>
                  <a
                    href="/pwa-512x512.png"
                    download="panda-calendar-512x512.png"
                    className="mt-3 w-full py-2 px-3 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>下載 512×512 PNG</span>
                  </a>
                </div>

                {/* 3. Medium PNG 256x256 */}
                <div className="p-3.5 bg-white border border-amber-200 rounded-2xl shadow-xs hover:border-amber-300 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                        標準桌面大小
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono font-bold">256×256 PNG</span>
                    </div>
                    <h5 className="font-bold text-slate-800 text-sm">標準桌面圖示 (256px)</h5>
                    <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                      標準桌面捷徑比例，輕量即套用。
                    </p>
                  </div>
                  <a
                    href="/desktop-icon-256.png"
                    download="panda-calendar-256x256.png"
                    className="mt-3 w-full py-2 px-3 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>下載 256×256 PNG</span>
                  </a>
                </div>

                {/* 4. Vector SVG */}
                <div className="p-3.5 bg-white border border-emerald-200 rounded-2xl shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        向量原始檔
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono font-bold">.SVG</span>
                    </div>
                    <h5 className="font-bold text-slate-800 text-sm">向量原稿 (可無限放大)</h5>
                    <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                      清晰俐落的 SVG 向量格式，印刷或任何大尺寸縮放均保證清晰。
                    </p>
                  </div>
                  <a
                    href="/icon.svg"
                    download="panda-calendar-icon.svg"
                    className="mt-3 w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>下載向量 SVG 檔</span>
                  </a>
                </div>
              </div>

              {/* How to set icon tutorial */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-3">
                <div className="font-bold text-slate-800 flex items-center gap-1.5 text-sm">
                  <HelpCircle className="w-4 h-4 text-sky-600" />
                  <span>如何將下載的圖示套用到電腦桌面捷徑？</span>
                </div>

                <div className="space-y-2">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="font-bold text-blue-700 block mb-1">🪟 Windows 電腦更換桌面捷徑圖示：</span>
                    <ol className="list-decimal list-inside space-y-0.5 text-slate-600 leading-relaxed">
                      <li>在桌面的任何網頁捷徑上按<b>滑鼠右鍵</b>，點選<b>「內容」</b>。</li>
                      <li>在彈出的視窗中切換到<b>「網頁文件」</b>或<b>「捷徑」</b>標籤頁。</li>
                      <li>點選下方的<b>「變更圖示 (Change Icon)...」</b>按鈕。</li>
                      <li>點選<b>「瀏覽」</b>，選取您剛下載的 <b>panda-calendar-desktop.ico</b> 檔案並按確定即可！</li>
                    </ol>
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="font-bold text-purple-700 block mb-1">🍎 Mac 電腦更換資料夾或 App 圖示：</span>
                    <ol className="list-decimal list-inside space-y-0.5 text-slate-600 leading-relaxed">
                      <li>下載 <b>512×512 PNG</b> 圖示，在 Preview 中開啟並按 <b>Cmd+C</b> 複製圖片。</li>
                      <li>在桌面要更換圖示的檔案或捷徑上按右鍵選<b>「取得資訊 (Get Info)」</b>。</li>
                      <li>點選左上角的小圖示，按下 <b>Cmd+V</b> 貼上即可替換！</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DESKTOP APP (PWA DIRECT INSTALL) */}
          {activeTab === 'desktop' && (
            <div className="space-y-4">
              {/* Direct Install Feature */}
              {isInstallable ? (
                <div className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 rounded-2xl p-4 text-white flex items-center justify-between shadow-md">
                  <div className="flex items-center gap-3">
                    <Laptop className="w-8 h-8 shrink-0 text-amber-300" />
                    <div>
                      <h4 className="font-bold text-sm sm:text-base">
                        您的瀏覽器支援一鍵安裝桌面 App！
                      </h4>
                      <p className="text-xs text-sky-100">
                        點擊後系統會自動在桌面建立此日曆圖示的獨立視窗應用程式
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={install}
                    className="px-4 py-2 bg-white text-blue-700 font-bold text-xs sm:text-sm rounded-xl shadow-xs hover:bg-sky-50 active:scale-95 transition-all shrink-0"
                  >
                    立即安裝至桌面
                  </button>
                </div>
              ) : isInstalled ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-800 flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <div>
                    <h5 className="font-bold text-sm">此應用程式已安裝至您的桌面！</h5>
                    <p className="text-xs text-emerald-700">您可以直接從桌面或應用程式清單啟動它。</p>
                  </div>
                </div>
              ) : (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-amber-900 text-xs flex items-center gap-2">
                  <Info className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>若目前在沙盒預覽環境中，建議透過 Chrome / Edge 瀏覽器開啟正式網址進行桌面捷徑安裝。</span>
                </div>
              )}

              {/* Chrome / Edge Desktop Shortcut Instructions */}
              <div className="p-4 bg-white border border-slate-200 rounded-2xl text-xs space-y-3 text-slate-700 shadow-xs">
                <div className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                  <Monitor className="w-4 h-4 text-blue-600" />
                  <span>在 Google Chrome / Microsoft Edge 電腦版建立桌面圖示：</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-sky-50/60 p-3 rounded-xl border border-sky-200 space-y-1">
                    <span className="font-bold text-sky-900 block">方法 A：網址列一鍵安裝（最推薦）</span>
                    <p className="text-slate-600 leading-relaxed">
                      在電腦瀏覽器網址列右側，會出現一個小小的<b>「安裝應用程式」圖示（⊕ 或電腦圖樣）</b>，點擊後按下「安裝」，桌面就會自動生成<b>花栗鼠與貓熊圖示</b>！
                    </p>
                  </div>
                  <div className="bg-pink-50/60 p-3 rounded-xl border border-pink-200 space-y-1">
                    <span className="font-bold text-pink-900 block">方法 B：從右上角選單建立捷徑</span>
                    <p className="text-slate-600 leading-relaxed">
                      點選瀏覽器右上角<b>「三個點（⋮）」➔「儲存並分享」➔「建立捷徑...」</b>，勾選<b>「以視窗方式開啟」</b>並點確定，即可獨立視窗像原生軟體一樣運作！
                    </p>
                  </div>
                </div>
              </div>

              {/* URL Access Box */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700">獨立分頁完整網址（便於在電腦新視窗開啟）：</span>
                  <button
                    onClick={handleCopyUrl}
                    className="text-sky-600 hover:text-sky-700 font-bold text-[11px] flex items-center gap-1"
                  >
                    {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedUrl ? '已複製' : '複製網址'}</span>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={appUrl}
                    className="flex-1 text-xs p-2 bg-white border border-slate-300 rounded-lg font-mono text-slate-700 select-all"
                  />
                  <a
                    href={appUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 bg-sky-600 text-white font-bold rounded-lg hover:bg-sky-700 flex items-center gap-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>新分頁開啟</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MOBILE PWA QR CODE */}
          {activeTab === 'mobile' && (
            <div className="space-y-4">
              {/* QR Code Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 flex flex-col items-center text-center">
                <div className="relative p-3 bg-white rounded-2xl shadow-sm border border-slate-200">
                  {qrDataUrl ? (
                    <img
                      src={qrDataUrl}
                      alt="貓熊月曆 PWA 下載 QR Code"
                      className="w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-xl select-none"
                    />
                  ) : (
                    <div className="w-48 h-48 flex items-center justify-center text-slate-400 text-xs">
                      正在生成 QR Code...
                    </div>
                  )}
                  {/* Mascot sticker in center */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-0.5 rounded-full shadow-md border-2 border-sky-300 pointer-events-none flex items-center gap-1">
                    <span className="text-base" role="img" aria-label="花栗鼠">🐿️</span>
                    <span className="text-base" role="img" aria-label="貓熊">🐼</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={handleDownloadQrImage}
                    disabled={!qrDataUrl}
                    className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs hover:from-sky-600 hover:to-blue-700 active:scale-95 transition-all"
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
              </div>

              {/* Mobile steps */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-sky-50/70 border border-sky-200 rounded-2xl text-xs space-y-1.5 text-slate-700">
                  <div className="font-bold text-sky-900 flex items-center gap-1">
                    <span>🍎 iPhone (iOS Safari)：</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-slate-600 pl-1 leading-relaxed">
                    <li>相機掃描 QR Code 並於 Safari 開啟。</li>
                    <li>點選底部<b>「分享 (⎋)」</b>圖示。</li>
                    <li>滑動點選<b>「加入主畫面 ⊞」</b>。</li>
                    <li>右上角按「新增」，手機桌面即有專屬圖示！</li>
                  </ol>
                </div>

                <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-xs space-y-1.5 text-slate-700">
                  <div className="font-bold text-emerald-900 flex items-center gap-1">
                    <span>🤖 Android (Google Chrome)：</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-slate-600 pl-1 leading-relaxed">
                    <li>使用相機或 Chrome 開啟 QR Code 網址。</li>
                    <li>點選右上角<b>選單 (⋮)</b>。</li>
                    <li>點選<b>「安裝應用程式」</b>或<b>「加到主畫面」</b>。</li>
                    <li>確認後即可像一般 App 在桌面啟動！</li>
                  </ol>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex items-center justify-between">
          <div className="text-[11px] text-slate-500 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>支援離線使用、2026-2033 農曆節氣與台灣國定假日</span>
          </div>
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
