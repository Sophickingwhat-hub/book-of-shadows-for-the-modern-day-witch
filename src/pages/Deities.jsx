import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Sparkles, Trash2, Edit } from 'lucide-react';

export default function Deities() {
  const [open, setOpen] = useState(false);
  const [editingDeity, setEditingDeity] = useState(null);
  const queryClient = useQueryClient();

  const { data: deities = [], isLoading } = useQuery({
    queryKey: ['deities'],
    queryFn: () => base44.entities.Deity.list('-created_date')
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Deity.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['deities']);
      setOpen(false);
      setEditingDeity(null);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Deity.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['deities']);
      setOpen(false);
      setEditingDeity(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Deity.delete(id),
    onSuccess: () => queryClient.invalidateQueries(['deities'])
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      meaning: formData.get('meaning'),
      sweet_advice: formData.get('sweet_advice'),
      sassy_advice: formData.get('sassy_advice'),
      pantheon: formData.get('pantheon'),
      offerings: formData.get('offerings')
    };

    if (editingDeity) {
      updateMutation.mutate({ id: editingDeity.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <div className="min-h-screen parchment-bg aged-paper py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl book-title text-amber-950">⭐ Deities</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-rose-700 hover:bg-rose-800 text-amber-50">
                <Plus className="w-4 h-4 mr-2" />
                Add Deity
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto parchment-bg">
              <DialogHeader>
                <DialogTitle className="handwritten text-2xl text-amber-950">
                  {editingDeity ? 'Edit Deity' : 'New Deity'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input name="name" placeholder="Deity name" defaultValue={editingDeity?.name} required className="handwritten" />
                <Textarea name="meaning" placeholder="Domain and symbolism" defaultValue={editingDeity?.meaning} rows={3} required className="handwritten" />
                <Textarea name="sweet_advice" placeholder="Sweet Auntie's gentle guidance" defaultValue={editingDeity?.sweet_advice} rows={3} required className="handwritten" />
                <Textarea name="sassy_advice" placeholder="Sassy Auntie's bold take" defaultValue={editingDeity?.sassy_advice} rows={3} required className="handwritten" />
                <Input name="pantheon" placeholder="Cultural origin/pantheon" defaultValue={editingDeity?.pantheon} className="handwritten" />
                <Textarea name="offerings" placeholder="Traditional offerings" defaultValue={editingDeity?.offerings} rows={2} className="handwritten" />
                <Button type="submit" className="w-full bg-rose-700 hover:bg-rose-800">
                  {editingDeity ? 'Update' : 'Add'} Deity
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <p className="handwritten text-amber-900 text-center">Loading deities...</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {deities.map((deity) => (
              <Card key={deity.id} className="border-2 border-amber-800 bg-amber-50/80">
                <CardHeader className="bg-rose-900/10">
                  <CardTitle className="handwritten text-2xl text-amber-950 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-6 h-6 text-rose-600" />
                      {deity.name}
                    </span>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" onClick={() => { setEditingDeity(deity); setOpen(true); }}>
                        <Edit className="w-4 h-4 text-amber-700" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => deleteMutation.mutate(deity.id)}>
                        <Trash2 className="w-4 h-4 text-red-700" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="handwritten text-amber-900 space-y-3 pt-4">
                  <p><strong>Domain:</strong> {deity.meaning}</p>
                  {deity.pantheon && <p><strong>Pantheon:</strong> {deity.pantheon}</p>}
                  <div className="p-3 bg-pink-50 rounded border border-pink-200">
                    <p className="text-sm"><strong>💕 Sweet Auntie:</strong> {deity.sweet_advice}</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded border border-orange-200">
                    <p className="text-sm"><strong>🔥 Sassy Auntie:</strong> {deity.sassy_advice}</p>
                  </div>
                  {deity.offerings && <p className="text-sm"><strong>Offerings:</strong> {deity.offerings}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}