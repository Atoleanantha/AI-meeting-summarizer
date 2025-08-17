import React, { useState } from 'react';
import { AIForm } from '@/components/dashboard/AIForm';
import { SummaryPreview } from '@/components/dashboard/SummaryPreview';
import { AppLayout } from '@/components/layout/AppLayout';

const Dashboard = () => {
  const [summaryData, setSummaryData] = useState<{
    _id: string;
    summary: string;
    transcript: string;
    prompt: string;
  } | null>(null);

  const handleSummaryGenerated = (
    _id: string,
    summary: string,
    transcript: string,
    prompt: string
  ) => {
    setSummaryData({ _id, summary, transcript, prompt });
  };
  const [refreshKey, setRefreshKey] = useState(0);
  const handleNoteSaved = () => { setSummaryData(null); setRefreshKey(prev => prev + 1);};

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            AI-Powered Note Summarizer
          </h1>
          <p className="text-muted-foreground text-lg">
            Transform your text into concise, AI-generated summaries
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
         
            <AIForm onSummaryGenerated={handleSummaryGenerated} />
          { summaryData && (
            <SummaryPreview
              _id={summaryData._id}
              summary={summaryData.summary}
              transcript={summaryData.transcript}
              prompt={summaryData.prompt}
              onNoteSaved={handleNoteSaved}
            />
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;