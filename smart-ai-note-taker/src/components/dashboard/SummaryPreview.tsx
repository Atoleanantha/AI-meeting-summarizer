import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Save, Share, Edit3, Eye } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { notesAPI } from '@/lib/api';

interface SummaryPreviewProps {
  _id: string;
  summary: string;
  transcript: string;
  prompt: string;
  onNoteSaved: () => void;
}

export const SummaryPreview: React.FC<SummaryPreviewProps> = ({
  _id,
  summary,
  transcript,
  prompt,
  onNoteSaved
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSummary, setEditedSummary] = useState(summary);
  const [noteTitle, setNoteTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showShareForm, setShowShareForm] = useState(false);
  const [shareEmails, setShareEmails] = useState('');

  const handleSaveNote = async () => {
    if (!noteTitle.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title for your note.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await notesAPI.update(
        _id, {
        title: noteTitle,
        aiSummary: editedSummary,
        transcript,
        prompt,
      });

      toast({
        title: "Success",
        description: "Note updated saved successfully!",
      });

      onNoteSaved();
      setNoteTitle('');

    } catch (error) {
      console.error('Save note error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    if (!shareEmails.trim()) {
      toast({
        title: "Error",
        description: "Please enter at least one email address.",
        variant: "destructive",
      });
      return;
    }

    const emails = shareEmails.split(',').map(email => email.trim()).filter(Boolean);

    try {
      
      await notesAPI.share(_id, emails);
      toast({
        title: "Success",
        description: `Summary shared with ${emails.length} recipient(s)!`,
      });

      setShowShareForm(false);
      setShareEmails('');

    } catch (error) {
      console.error('Share error:', error);
    }
  };


  console.log('SummaryPreview rendered with:', {
    _id,
    summary,
    transcript,
    prompt
  });
  
  return (
    <Card className="shadow-card hover:shadow-elegant transition-spring">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            AI Summary Preview
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="transition-smooth"
          >
            <Edit3 className="h-4 w-4 mr-2" />
            {isEditing ? 'Preview' : 'Edit'}
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="note-title">Note Title</Label>
          <Input
            id="note-title"
            placeholder="Enter a title for your note..."
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            className="transition-smooth focus:shadow-glow"
          />
        </div>

        <div className="space-y-2">
          <Label>Summary</Label>
          {isEditing ? (
            <Textarea
              value={editedSummary}
              onChange={(e) => setEditedSummary(e.target.value)}
              className="min-h-[120px] transition-smooth focus:shadow-glow resize-none"
              placeholder="Edit your summary..."
            />
          ) : (
            <div className="p-4 bg-muted rounded-lg border min-h-[120px]">
              <p className="text-foreground whitespace-pre-wrap">{editedSummary}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleSaveNote}
            className="flex-1 bg-gradient-primary hover:bg-gradient-glow transition-spring shadow-elegant"
            disabled={isLoading}
          >
            {isLoading ? (
              <LoadingSpinner size="sm" />
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Note
              </>
            )}
          </Button>

          <Button
            onClick={() => setShowShareForm(!showShareForm)}
            variant="outline"
            className="flex-1 transition-smooth hover:shadow-glow"
          >
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>

        {showShareForm && (
          <div className="space-y-3 p-4 border rounded-lg bg-muted/50">
            <Label htmlFor="share-emails">Share with (comma-separated emails)</Label>
            <Input
              id="share-emails"
              placeholder="email1@example.com, email2@example.com"
              value={shareEmails}
              onChange={(e) => setShareEmails(e.target.value)}
              className="transition-smooth focus:shadow-glow"
            />
            <div className="flex gap-2">
              <Button
                onClick={handleShare}
                size="sm"
                className="bg-gradient-primary hover:bg-gradient-glow transition-smooth"
              >
                Send
              </Button>
              <Button
                onClick={() => setShowShareForm(false)}
                variant="outline"
                size="sm"
                className="transition-smooth"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};