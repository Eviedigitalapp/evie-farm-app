// Offline data synchronization utilities

export interface OfflineAction {
  id: string;
  type: 'create' | 'update' | 'delete';
  entity: 'crop' | 'livestock' | 'transaction' | 'task' | 'worker';
  data: any;
  timestamp: number;
  synced: boolean;
}

const OFFLINE_QUEUE_KEY = 'evie_offline_queue';
const SYNC_STATUS_KEY = 'evie_sync_status';

// Add action to offline queue
export function queueOfflineAction(action: Omit<OfflineAction, 'id' | 'timestamp' | 'synced'>): void {
  const queue = getOfflineQueue();

  const newAction: OfflineAction = {
    ...action,
    id: `offline_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
    synced: false
  };

  queue.push(newAction);
  localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));

  console.log('Queued offline action:', newAction);
}

// Get offline queue
export function getOfflineQueue(): OfflineAction[] {
  const queueJson = localStorage.getItem(OFFLINE_QUEUE_KEY);
  if (!queueJson) return [];

  try {
    return JSON.parse(queueJson);
  } catch {
    return [];
  }
}

// Clear synced actions from queue
export function clearSyncedActions(): void {
  const queue = getOfflineQueue();
  const pendingQueue = queue.filter(action => !action.synced);
  localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(pendingQueue));
}

// Mark action as synced
export function markActionSynced(actionId: string): void {
  const queue = getOfflineQueue();
  const updatedQueue = queue.map(action =>
    action.id === actionId ? { ...action, synced: true } : action
  );
  localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(updatedQueue));
}

// Get pending actions count
export function getPendingActionsCount(): number {
  const queue = getOfflineQueue();
  return queue.filter(action => !action.synced).length;
}

// Sync all pending actions
export async function syncOfflineData(): Promise<{ success: boolean; synced: number; failed: number }> {
  const queue = getOfflineQueue();
  const pendingActions = queue.filter(action => !action.synced);

  if (pendingActions.length === 0) {
    return { success: true, synced: 0, failed: 0 };
  }

  let synced = 0;
  let failed = 0;

  for (const action of pendingActions) {
    try {
      // Here you would implement actual API calls to sync each action
      // For now, we'll mark them as synced after a delay
      await simulateSyncAction(action);
      markActionSynced(action.id);
      synced++;
    } catch (error) {
      console.error('Failed to sync action:', action, error);
      failed++;
    }
  }

  // Clean up synced actions
  clearSyncedActions();

  // Update sync status
  updateSyncStatus(synced, failed);

  return { success: failed === 0, synced, failed };
}

// Simulate syncing an action (replace with real API calls)
async function simulateSyncAction(action: OfflineAction): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Synced action:', action);
      resolve();
    }, 100);
  });
}

// Update sync status
function updateSyncStatus(synced: number, failed: number): void {
  const status = {
    lastSync: Date.now(),
    synced,
    failed,
    pending: getPendingActionsCount()
  };
  localStorage.setItem(SYNC_STATUS_KEY, JSON.stringify(status));
}

// Get sync status
export function getSyncStatus(): { lastSync: number; synced: number; failed: number; pending: number } | null {
  const statusJson = localStorage.getItem(SYNC_STATUS_KEY);
  if (!statusJson) return null;

  try {
    return JSON.parse(statusJson);
  } catch {
    return null;
  }
}

// Check if online
export function isOnline(): boolean {
  return navigator.onLine;
}

// Register online/offline listeners
export function registerConnectivityListeners(
  onOnline: () => void,
  onOffline: () => void
): () => void {
  window.addEventListener('online', onOnline);
  window.addEventListener('offline', onOffline);

  // Return cleanup function
  return () => {
    window.removeEventListener('online', onOnline);
    window.removeEventListener('offline', onOffline);
  };
}

// Auto-sync when coming online
export function enableAutoSync(): () => void {
  const handleOnline = async () => {
    console.log('Connection restored, syncing offline data...');
    const result = await syncOfflineData();
    console.log('Sync result:', result);

    // Notify user
    if (result.synced > 0) {
      showSyncNotification(`Synced ${result.synced} offline changes`);
    }
  };

  return registerConnectivityListeners(handleOnline, () => {
    console.log('Connection lost, queueing changes offline');
  });
}

// Show sync notification
function showSyncNotification(message: string): void {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('Evie Farm', {
      body: message,
      icon: '/icon-192.png'
    });
  }
}

// Export data for backup (offline fallback)
export function exportAllData(): string {
  const data = {
    crops: JSON.parse(localStorage.getItem('crops') || '[]'),
    livestock: JSON.parse(localStorage.getItem('livestock') || '[]'),
    transactions: JSON.parse(localStorage.getItem('transactions') || '[]'),
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
    workers: JSON.parse(localStorage.getItem('workers') || '[]'),
    offlineQueue: getOfflineQueue(),
    exportDate: new Date().toISOString()
  };

  return JSON.stringify(data, null, 2);
}

// Import data from backup
export function importAllData(jsonData: string): boolean {
  try {
    const data = JSON.parse(jsonData);

    if (data.crops) localStorage.setItem('crops', JSON.stringify(data.crops));
    if (data.livestock) localStorage.setItem('livestock', JSON.stringify(data.livestock));
    if (data.transactions) localStorage.setItem('transactions', JSON.stringify(data.transactions));
    if (data.tasks) localStorage.setItem('tasks', JSON.stringify(data.tasks));
    if (data.workers) localStorage.setItem('workers', JSON.stringify(data.workers));

    return true;
  } catch (error) {
    console.error('Import failed:', error);
    return false;
  }
}
