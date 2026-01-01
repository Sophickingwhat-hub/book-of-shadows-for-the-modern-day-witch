import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, BookOpen, Trash2, Edit } from 'lucide-react';
import { format } from 'date-fns';

export default function JournalEntries() {
  const [open, setOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const queryClient = useQueryClient();

  const { data: entries = [], isLoading } = useQuery({
    queryKey: ['journal-entries'],
    queryFn: () => base44.entities.JournalEntry.list('-created_date')
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.JournalEntry.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['journal-entries']);
      setOpen(false);
      setEditingEntry(null);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.JournalEntry.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['journal-entries']);
      setOpen(false);
      setEditingEntry(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.JournalEntry.delete(id),
    onSuccess: () => queryClient.invalidateQueries(['journal-entries'])
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      title: formData.get('title'),
      entry_type: formData.get('entry_type'),
      content: formData.get('content'),
      moon_phase: formData.get('moon_phase'),
      tags: formData.get('tags') ? formData.get('tags').split(',').map(t => t.trim()) : []
    };

    if (editingEntry) {
      updateMutation.mutate({ id: editingEntry.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <div className="min-h-screen parchment-bg aged-paper py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl book-title text-amber-950">📔 Journal</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-amber-800 hover:bg-amber-900 text-amber-50">
                <Plus className="w-4 h-4 mr-2" />
                New Entry
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto parchment-bg">
              <DialogHeader>
                <DialogTitle className="handwritten text-2xl text-amber-950">
                  {editingEntry ? 'Edit Entry' : 'New Journal Entry'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input name="title" placeholder="Entry title" defaultValue={editingEntry?.title} required className="handwritten" />
                <Select name="entry_type" defaultValue={editingEntry?.entry_type || 'ritual'}>
                  <SelectTrigger className="handwritten">
                    <SelectValue placeholder="Entry Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ritual">Ritual</SelectItem>
                    <SelectItem value="dream">Dream</SelectItem>
                    <SelectItem value="meditation">Meditation</SelectItem>
                    <SelectItem value="tarot_reading">Tarot Reading</SelectItem>
                    <SelectItem value="observation">Observation</SelectItem>
                    <SelectItem value="manifestation">Manifestation</SelectItem>
                    <SelectItem value="gratitude">Gratitude</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea name="content" placeholder="Write your entry..." defaultValue={editingEntry?.content} required rows={10} className="handwritten" />
                <Input name="moon_phase" placeholder="Moon phase (optional)" defaultValue={editingEntry?.moon_phase} className="handwritten" />
                <Input name="tags" placeholder="Tags (comma separated)" defaultValue={editingEntry?.tags?.join(', ')} className="handwritten" />
                <Button type="submit" className="w-full bg-amber-800 hover:bg-amber-900">
                  {editingEntry ? 'Update' : 'Create'} Entry
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <p className="handwritten text-amber-900 text-center">Loading entries...</p>
        ) : (
          <div className="space-y-6">
            {entries.map((entry) => (
              <Card key={entry.id} className="border-2 border-amber-800 bg-amber-50/80">
                <CardHeader>
                  <CardTitle className="handwritten text-2xl text-amber-950 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-6 h-6 text-amber-700" />
                      {entry.title}
                    </span>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" onClick={() => { setEditingEntry(entry); setOpen(true); }}>
                        <Edit className="w-4 h-4 text-amber-700" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => deleteMutation.mutate(entry.id)}>
                        <Trash2 className="w-4 h-4 text-red-700" />
                      </Button>
                    </div>
                  </CardTitle>
                  <p className="handwritten text-sm text-amber-700">
                    {entry.entry_type} • {format(new Date(entry.created_date), 'MMM d, yyyy')}
                  </p>
                </CardHeader>
                <CardContent className="handwritten text-amber-900 space-y-2">
                  <p className="whitespace-pre-wrap">{entry.content}</p>
                  {entry.moon_phase && <p className="text-sm italic">🌙 {entry.moon_phase}</p>}
                  {entry.tags?.length > 0 && (
                    <div className="flex gap-2 flex-wrap mt-2">
                      {entry.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-amber-200 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}