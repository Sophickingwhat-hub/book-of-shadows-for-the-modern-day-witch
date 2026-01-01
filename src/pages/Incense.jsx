import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Flame, Trash2, Edit } from 'lucide-react';

export default function Incense() {
  const [open, setOpen] = useState(false);
  const [editingIncense, setEditingIncense] = useState(null);
  const queryClient = useQueryClient();

  const { data: incenses = [], isLoading } = useQuery({
    queryKey: ['incense'],
    queryFn: () => base44.entities.Incense.list('-created_date')
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Incense.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['incense']);
      setOpen(false);
      setEditingIncense(null);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Incense.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['incense']);
      setOpen(false);
      setEditingIncense(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Incense.delete(id),
    onSuccess: () => queryClient.invalidateQueries(['incense'])
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      meaning: formData.get('meaning'),
      sweet_advice: formData.get('sweet_advice'),
      sassy_advice: formData.get('sassy_advice'),
      best_for: formData.get('best_for')
    };

    if (editingIncense) {
      updateMutation.mutate({ id: editingIncense.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <div className="min-h-screen parchment-bg aged-paper py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl book-title text-amber-950">🔥 Incense</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-slate-700 hover:bg-slate-800 text-amber-50">
                <Plus className="w-4 h-4 mr-2" />
                Add Incense
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto parchment-bg">
              <DialogHeader>
                <DialogTitle className="handwritten text-2xl text-amber-950">
                  {editingIncense ? 'Edit Incense' : 'New Incense'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input name="name" placeholder="Incense name" defaultValue={editingIncense?.name} required className="handwritten" />
                <Textarea name="meaning" placeholder="Magical properties and purposes" defaultValue={editingIncense?.meaning} rows={3} required className="handwritten" />
                <Textarea name="sweet_advice" placeholder="Sweet Auntie's gentle guidance" defaultValue={editingIncense?.sweet_advice} rows={3} required className="handwritten" />
                <Textarea name="sassy_advice" placeholder="Sassy Auntie's bold take" defaultValue={editingIncense?.sassy_advice} rows={3} required className="handwritten" />
                <Textarea name="best_for" placeholder="When to use this scent" defaultValue={editingIncense?.best_for} rows={2} className="handwritten" />
                <Button type="submit" className="w-full bg-slate-700 hover:bg-slate-800">
                  {editingIncense ? 'Update' : 'Add'} Incense
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <p className="handwritten text-amber-900 text-center">Loading incense...</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {incenses.map((incense) => (
              <Card key={incense.id} className="border-2 border-amber-800 bg-amber-50/80">
                <CardHeader className="bg-slate-900/10">
                  <CardTitle className="handwritten text-2xl text-amber-950 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Flame className="w-6 h-6 text-orange-600" />
                      {incense.name}
                    </span>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" onClick={() => { setEditingIncense(incense); setOpen(true); }}>
                        <Edit className="w-4 h-4 text-amber-700" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => deleteMutation.mutate(incense.id)}>
                        <Trash2 className="w-4 h-4 text-red-700" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="handwritten text-amber-900 space-y-3 pt-4">
                  <p><strong>Meaning:</strong> {incense.meaning}</p>
                  <div className="p-3 bg-pink-50 rounded border border-pink-200">
                    <p className="text-sm"><strong>💕 Sweet Auntie:</strong> {incense.sweet_advice}</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded border border-orange-200">
                    <p className="text-sm"><strong>🔥 Sassy Auntie:</strong> {incense.sassy_advice}</p>
                  </div>
                  {incense.best_for && <p className="text-sm"><strong>Best for:</strong> {incense.best_for}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}