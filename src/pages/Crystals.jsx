import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Gem, Trash2, Edit } from 'lucide-react';

export default function Crystals() {
  const [open, setOpen] = useState(false);
  const [editingCrystal, setEditingCrystal] = useState(null);
  const queryClient = useQueryClient();

  const { data: crystals = [], isLoading } = useQuery({
    queryKey: ['crystals'],
    queryFn: () => base44.entities.Crystal.list('-created_date')
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Crystal.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['crystals']);
      setOpen(false);
      setEditingCrystal(null);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Crystal.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['crystals']);
      setOpen(false);
      setEditingCrystal(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Crystal.delete(id),
    onSuccess: () => queryClient.invalidateQueries(['crystals'])
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      color: formData.get('color'),
      chakra: formData.get('chakra'),
      properties: formData.get('properties').split('\n').filter(i => i.trim()),
      uses: formData.get('uses'),
      cleansing: formData.get('cleansing')
    };

    if (editingCrystal) {
      updateMutation.mutate({ id: editingCrystal.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <div className="min-h-screen parchment-bg aged-paper py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl book-title text-amber-950">💎 Crystals</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-cyan-700 hover:bg-cyan-800 text-amber-50">
                <Plus className="w-4 h-4 mr-2" />
                Add Crystal
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto parchment-bg">
              <DialogHeader>
                <DialogTitle className="handwritten text-2xl text-amber-950">
                  {editingCrystal ? 'Edit Crystal' : 'New Crystal'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input name="name" placeholder="Crystal name" defaultValue={editingCrystal?.name} required className="handwritten" />
                <Input name="color" placeholder="Color" defaultValue={editingCrystal?.color} className="handwritten" />
                <Select name="chakra" defaultValue={editingCrystal?.chakra || 'heart'}>
                  <SelectTrigger className="handwritten">
                    <SelectValue placeholder="Chakra" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="root">Root</SelectItem>
                    <SelectItem value="sacral">Sacral</SelectItem>
                    <SelectItem value="solar_plexus">Solar Plexus</SelectItem>
                    <SelectItem value="heart">Heart</SelectItem>
                    <SelectItem value="throat">Throat</SelectItem>
                    <SelectItem value="third_eye">Third Eye</SelectItem>
                    <SelectItem value="crown">Crown</SelectItem>
                    <SelectItem value="all">All</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea name="properties" placeholder="Properties (one per line)" defaultValue={editingCrystal?.properties?.join('\n')} rows={4} className="handwritten" required />
                <Textarea name="uses" placeholder="How to use" defaultValue={editingCrystal?.uses} rows={3} className="handwritten" />
                <Textarea name="cleansing" placeholder="Cleansing methods" defaultValue={editingCrystal?.cleansing} rows={2} className="handwritten" />
                <Button type="submit" className="w-full bg-cyan-700 hover:bg-cyan-800">
                  {editingCrystal ? 'Update' : 'Add'} Crystal
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <p className="handwritten text-amber-900 text-center">Loading crystals...</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {crystals.map((crystal) => (
              <Card key={crystal.id} className="border-2 border-amber-800 bg-amber-50/80">
                <CardHeader className="bg-cyan-900/10">
                  <CardTitle className="handwritten text-2xl text-amber-950 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Gem className="w-6 h-6 text-cyan-700" />
                      {crystal.name}
                    </span>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" onClick={() => { setEditingCrystal(crystal); setOpen(true); }}>
                        <Edit className="w-4 h-4 text-amber-700" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => deleteMutation.mutate(crystal.id)}>
                        <Trash2 className="w-4 h-4 text-red-700" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="handwritten text-amber-900 space-y-2 pt-4">
                  {crystal.color && <p><strong>Color:</strong> {crystal.color}</p>}
                  <p><strong>Chakra:</strong> {crystal.chakra}</p>
                  {crystal.properties?.length > 0 && (
                    <div>
                      <strong>Properties:</strong>
                      <ul className="list-disc list-inside ml-2">
                        {crystal.properties.map((prop, i) => <li key={i}>{prop}</li>)}
                      </ul>
                    </div>
                  )}
                  {crystal.uses && <p className="text-sm mt-2">{crystal.uses}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}