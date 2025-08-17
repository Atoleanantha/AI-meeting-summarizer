import React, { useState } from 'react';
import { NotesList } from '@/components/notes/NotesList';
import { AppLayout } from '@/components/layout/AppLayout';

const Notes = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        <NotesList refreshTrigger={refreshKey} />
      </div>
    </AppLayout>
  );
};

export default Notes;