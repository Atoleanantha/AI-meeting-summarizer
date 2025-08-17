import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Sparkles, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { notesAPI } from '@/lib/api';

interface AIFormProps {
  onSummaryGenerated: (
    _id: string,
    summary: string,
    transcript: string,
    prompt: string
  ) => void;
}

export const AIForm: React.FC<AIFormProps> = ({ onSummaryGenerated }) => {
  const [transcript, setTranscript] = useState('');
  const [prompt, setPrompt] = useState('Summarize the following text in a clear and concise manner:');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!transcript.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to summarize.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response: any=await notesAPI.create({textInput: transcript, prompt});

     
      if (response.status !== 200) {
        throw new Error('Failed to generate summary');
      }
      const mockSummary = `This is a sample AI-generated summary of your text. In a real implementation, this would be replaced with an actual AI service response that processes your transcript: "${transcript.substring(0, 100)}..."`;
      
      console.log('AI Summary Response:', response);
      
      // onSummaryGenerated(response._id,summary , response.transcript, prompt);
      onSummaryGenerated(
        response.data._id,
        response.data.aiSummary,
        response.data.transcript,
        response.data.prompt
      );
      
      toast({
        title: "Success",
        description: "AI summary generated successfully!",
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate summary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-card hover:shadow-elegant transition-spring">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Text Summarizer
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="transcript" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Transcript Text
            </Label>
            <Textarea
              id="transcript"
              placeholder="Paste your text or transcript here..."
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              className="min-h-[150px] transition-smooth focus:shadow-glow resize-none"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="prompt">AI Prompt (Optional)</Label>
            <Textarea
              id="prompt"
              placeholder="Enter custom instructions for the AI..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[80px] transition-smooth focus:shadow-glow resize-none"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-primary hover:bg-gradient-glow transition-spring shadow-elegant"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" />
                <span className="ml-2">Generating Summary...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate AI Summary
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};