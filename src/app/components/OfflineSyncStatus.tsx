import { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw, Download, Upload, Check, AlertCircle } from 'lucide-react';
import {
  isOnline,
  getPendingActionsCount,
  getSyncStatus,
  syncOfflineData,
  exportAllData,
  importAllData,
  enableAutoSync
} from '../../utils/offlineSync';

export function OfflineSyncStatus() {
  const [online, setOnline] = useState(isOnline());
  const [pendingCount, setPendingCount] = useState(0);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<string | null>(null);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  useEffect(() => {
    // Update pending count
    updatePendingCount();

    // Enable auto-sync
    const cleanup = enableAutoSync();

    // Listen for connectivity changes
    const handleOnline = () => {
      setOnline(true);
      updatePendingCount();
    };

    const handleOffline = () => {
      setOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Update sync status
    const status = getSyncStatus();
    if (status && status.lastSync) {
      setLastSync(new Date(status.lastSync));
    }

    return () => {
      cleanup();
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const updatePendingCount = () => {
    const count = getPendingActionsCount();
    setPendingCount(count);
  };

  const handleSync = async () => {
    if (!online) {
      setSyncResult('Cannot sync while offline');
      return;
    }

    setSyncing(true);
    setSyncResult(null);

    try {
      const result = await syncOfflineData();

      if (result.success) {
        setSyncResult(`Successfully synced ${result.synced} changes`);
        setLastSync(new Date());
      } else {
        setSyncResult(`Synced ${result.synced}, ${result.failed} failed`);
      }

      updatePendingCount();
    } catch (error) {
      setSyncResult('Sync failed');
    } finally {
      setSyncing(false);
      setTimeout(() => setSyncResult(null), 3000);
    }
  };

  const handleExport = () => {
    const data = exportAllData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `evie-farm-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const jsonData = event.target?.result as string;
        const success = importAllData(jsonData);

        if (success) {
          alert('Data imported successfully! Refresh the page to see changes.');
        } else {
          alert('Import failed. Please check the file format.');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Offline Sync</h3>

      {/* Connection Status */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg ${online ? 'bg-green-100' : 'bg-red-100'}`}>
          {online ? (
            <Wifi className="w-5 h-5 text-green-600" />
          ) : (
            <WifiOff className="w-5 h-5 text-red-600" />
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">
            {online ? 'Connected' : 'Offline'}
          </p>
          <p className="text-xs text-gray-600">
            {online ? 'All features available' : 'Changes will sync when online'}
          </p>
        </div>
      </div>

      {/* Pending Changes */}
      {pendingCount > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-800">
                {pendingCount} pending {pendingCount === 1 ? 'change' : 'changes'}
              </p>
              <p className="text-xs text-yellow-700">
                Will sync automatically when connection is restored
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Last Sync */}
      {lastSync && (
        <div className="text-xs text-gray-600 mb-4">
          Last synced: {lastSync.toLocaleString()}
        </div>
      )}

      {/* Sync Result */}
      {syncResult && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-blue-600" />
            <p className="text-sm text-blue-800">{syncResult}</p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="space-y-2">
        <button
          onClick={handleSync}
          disabled={!online || syncing || pendingCount === 0}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
          <span>{syncing ? 'Syncing...' : 'Sync Now'}</span>
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleExport}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm">Export Data</span>
          </button>

          <button
            onClick={handleImport}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            <Upload className="w-4 h-4" />
            <span className="text-sm">Import Data</span>
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-800">
          Your data is automatically saved locally and synced when you're online.
          Export creates a backup file you can save or share.
        </p>
      </div>
    </div>
  );
}
