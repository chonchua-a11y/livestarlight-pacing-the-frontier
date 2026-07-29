import React from 'react';
import { X, HardDrive, ExternalLink, Copy, Check, RefreshCw, Folder, ShieldCheck } from 'lucide-react';
import { DriveFolderInfo } from '../types';

interface FolderSettingsModalProps {
  folderInfo: DriveFolderInfo;
  onUpdateFolderInfo: (info: DriveFolderInfo) => void;
  onClose: () => void;
}

export const FolderSettingsModal: React.FC<FolderSettingsModalProps> = ({
  folderInfo,
  onUpdateFolderInfo,
  onClose,
}) => {
  const [urlInput, setUrlInput] = React.useState(folderInfo.url);
  const [nameInput, setNameInput] = React.useState(folderInfo.name);
  const [copied, setCopied] = React.useState(false);
  const [savedToast, setSavedToast] = React.useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(folderInfo.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Extract folder ID from URL if valid
    let extractedId = folderInfo.id;
    const match = urlInput.match(/folders\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      extractedId = match[1];
    }

    onUpdateFolderInfo({
      ...folderInfo,
      url: urlInput,
      name: nameInput,
      id: extractedId,
      lastSync: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });

    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <Folder className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Google Drive Folder Config</h3>
              <p className="text-xs text-slate-400">Target Folder Sync & Metadata</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSave} className="p-6 space-y-5">
          {/* Active Folder Info Box */}
          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-indigo-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Verified Folder ID
              </span>
              <span className="font-mono text-slate-300">{folderInfo.id}</span>
            </div>
            <div className="flex items-center justify-between text-slate-400 pt-1 border-t border-slate-700/50">
              <span>Status:</span>
              <span className="text-emerald-400 font-medium">Public Shared Access</span>
            </div>
          </div>

          {/* Folder Name Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              Folder Package Name
            </label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Folder URL Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-slate-300">
                Google Drive Folder URL
              </label>
              <button
                type="button"
                onClick={handleCopyLink}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy URL'}</span>
              </button>
            </div>
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {savedToast && (
            <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-semibold text-center border border-emerald-500/30">
              ✓ Folder Configuration Updated!
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <a
              href={folderInfo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Visit Drive
            </a>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-md shadow-indigo-600/30 transition-colors"
            >
              Save Folder Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
