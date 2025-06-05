import React from 'react';

export default function ExportBackup() {
  const exportRevenueCost = () => {
    window.open('/api/export/revenue-cost', '_blank');
  };
  const backupAll = () => {
    window.open('/api/backup', '_blank');
  };
  return (
    <div>
      <button onClick={exportRevenueCost}>Xuất doanh thu/chi phí Excel</button>
      <button onClick={backupAll}>Backup toàn bộ dữ liệu</button>
    </div>
  );
}