import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Leaf, Trash2, Edit } from 'lucide-react';

export default function Herbs() {
  const [open, setOpen] = useState(false);
  const [editingHerb, setEditingHerb] = useState(null);
  const queryClient = useQueryClient();

  const { data: herbs = [], isLoading } = useQuery({
    queryKey: ['herbs'],
    queryFn: () => base44.entities.Herb.list('-created_date')
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Herb.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['herbs']);
      setOpen(false);
      setEditingHerb(null);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Herb.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['herbs']);
      setOpen(false);
      setEditingHerb(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Herb.delete(id),
    onSuccess: () => queryClient.invalidateQueries(['herbs'])
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      botanical_name: formData.get('botanical_name'),
      magical_properties: formData.get('magical_properties').split('\n').filter(i => i.trim()),
      element: formData.get('element'),
      planet: formData.get('planet'),
      uses: formData.get('uses'),
      cautions: formData.get('cautions')
    };

    if (editingHerb) {
      updateMutation.mutate({ id: editingHerb.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <div className="min-h-screen parchment-bg aged-paper py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl book-title text-amber-950">🌿 Herbs</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-700 hover:bg-green-800 text-amber-50">
                <Plus className="w-4 h-4 mr-2" />
                Add Herb
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto parchment-bg">
              <DialogHeader>
                <DialogTitle className="handwritten text-2xl text-amber-950">
                  {editingHerb ? 'Edit Herb' : 'New Herb'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input name="name" placeholder="Herb name" defaultValue={editingHerb?.name} required className="handwritten" />
                <Input name="botanical_name" placeholder="Botanical name" defaultValue={editingHerb?.botanical_name} className="handwritten" />
                <Textarea name="magical_properties" placeholder="Magical properties (one per line)" defaultValue={editingHerb?.magical_properties?.join('\n')} rows={4} className="handwritten" />
                <Select name="element" defaultValue={editingHerb?.element || 'earth'}>
                  <SelectTrigger className="handwritten">
                    <SelectValue placeholder="Element" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fire">Fire</SelectItem>
                    <SelectItem value="water">Water</SelectItem>
                    <SelectItem value="earth">Earth</SelectItem>
                    <SelectItem value="air">Air</SelectItem>
                    <SelectItem value="spirit">Spirit</SelectItem>
                  </SelectContent>
                </Select>
                <Input name="planet" placeholder="Associated planet" defaultValue={editingHerb?.planet} className="handwritten" />
                <Textarea name="uses" placeholder="Uses in spellwork" defaultValue={editingHerb?.uses} rows={3} className="handwritten" />
                <Textarea name="cautions" placeholder="Safety cautions" defaultValue={editingHerb?.cautions} rows={2} className="handwritten" />
                <Button type="submit" className="w-full bg-green-700 hover:bg-green-800">
                  {editingHerb ? 'Update' : 'Add'} Herb
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <p className="handwritten text-amber-900 text-center">Loading herbs...</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {herbs.map((herb) => (
              <Card key={herb.id} className="border-2 border-amber-800 bg-amber-50/80">
                <CardHeader className="bg-green-900/10">
                  <CardTitle className="handwritten text-2xl text-amber-950 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Leaf className="w-6 h-6 text-green-700" />
                      {herb.name}
                    </span>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" onClick={() => { setEditingHerb(herb); setOpen(true); }}>
                        <Edit className="w-4 h-4 text-amber-700" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => deleteMutation.mutate(herb.id)}>
                        <Trash2 className="w-4 h-4 text-red-700" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="handwritten text-amber-900 space-y-2 pt-4">
                  {herb.botanical_name && <p className="italic text-sm">{herb.botanical_name}</p>}
                  <p><strong>Element:</strong> {herb.element}</p>
                  {herb.planet && <p><strong>Planet:</strong> {herb.planet}</p>}
                  {herb.magical_properties?.length > 0 && (
                    <div>
                      <strong>Properties:</strong>
                      <ul className="list-disc list-inside ml-2">
                        {herb.magical_properties.map((prop, i) => <li key={i}>{prop}</li>)}
                      </ul>
                    </div>
                  )}
                  {herb.uses && <p className="text-sm mt-2">{herb.uses}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}