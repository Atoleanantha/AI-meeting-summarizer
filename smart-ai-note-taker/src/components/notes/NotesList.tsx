import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { FileText, Edit, Trash2, Share, Calendar } from "lucide-react";
import { notesAPI } from '@/lib/api';
import { toast } from "@/hooks/use-toast";
import { log } from 'console';

interface Note {
  _id: string;
  title: string;
  aiSummary: string;
  transcript: string;
  prompt: string;
  createdAt: string;
  updatedAt: string;
}

interface NotesListProps {
  refreshTrigger?: number;
}

export const NotesList: React.FC<NotesListProps> = ({ refreshTrigger }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      setIsLoading(true);
      const response = await notesAPI.getAll();
      setNotes(response.data);
    } catch (error) {
      console.error('Fetch notes error:', error);
      // For demo purposes, show some sample notes
     
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [refreshTrigger]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }

    try {
      await notesAPI.delete(id);
      setNotes(notes.filter(note => note._id !== id));
      
      toast({
        title: "Success",
        description: "Note deleted successfully!",
      });
    } catch (error) {
      console.error('Delete note error:', error);
    }
  };

  const handleShare = async (note: Note) => {
    const emails = window.prompt('Enter email addresses (comma-separated):');
    if (!emails) return;

    const emailList = emails.split(',').map(email => email.trim()).filter(Boolean);
    
    try {
      await notesAPI.share(note._id, emailList);
      
      toast({
        title: "Success",
        description: `Note shared with ${emailList.length} recipient(s)!`,
      });
    } catch (error) {
      console.error('Share note error:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <Card className="shadow-card">
        <CardContent className="flex items-center justify-center p-8">
          <LoadingSpinner size="lg" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          My Notes
        </h2>
        <Badge variant="secondary" className="px-3 py-1">
          {notes.length} {notes.length === 1 ? 'Note' : 'Notes'}
        </Badge>
      </div>

      {notes.length === 0 ? (
        <Card className="shadow-card">
          <CardContent className="text-center p-8">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No notes yet</h3>
            <p className="text-muted-foreground">
              Create your first AI-generated summary to get started!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <Card key={note._id} className="shadow-card hover:shadow-elegant transition-spring">
              <CardHeader className="pb-3">
                <CardTitle className="line-clamp-2 text-lg">{note.title}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {formatDate(note.createdAt)}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {note.aiSummary || 'No summary available.'}
                </p>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare(note)}
                    className="flex-1 transition-smooth hover:shadow-glow"
                  >
                    <Share className="h-3 w-3 mr-1" />
                    Share
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(note._id)}
                    className="transition-smooth hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};