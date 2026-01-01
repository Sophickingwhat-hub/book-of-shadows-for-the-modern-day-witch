import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Sparkles, Trash2, Edit } from 'lucide-react';

export default function Spells() {
  const [open, setOpen] = useState(false);
  const [editingSpell, setEditingSpell] = useState(null);
  const queryClient = useQueryClient();

  const { data: spells = [], isLoading } = useQuery({
    queryKey: ['spells'],
    queryFn: () => base44.entities.Spell.list('-created_date')
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Spell.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['spells']);
      setOpen(false);
      setEditingSpell(null);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Spell.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['spells']);
      setOpen(false);
      setEditingSpell(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Spell.delete(id),
    onSuccess: () => queryClient.invalidateQueries(['spells'])
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      category: formData.get('category'),
      intent: formData.get('intent'),
      ingredients: formData.get('ingredients').split('\n').filter(i => i.trim()),
      moon_phase: formData.get('moon_phase'),
      instructions: formData.get('instructions'),
      notes: formData.get('notes')
    };

    if (editingSpell) {
      updateMutation.mutate({ id: editingSpell.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-serif text-amber-100">✨ Spells</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Spell
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingSpell ? 'Edit Spell' : 'New Spell'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input name="name" placeholder="Spell name" defaultValue={editingSpell?.name} required />
                <Select name="category" defaultValue={editingSpell?.category || 'protection'}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="protection">Protection</SelectItem>
                    <SelectItem value="love">Love</SelectItem>
                    <SelectItem value="prosperity">Prosperity</SelectItem>
                    <SelectItem value="healing">Healing</SelectItem>
                    <SelectItem value="divination">Divination</SelectItem>
                    <SelectItem value="cleansing">Cleansing</SelectItem>
                    <SelectItem value="banishing">Banishing</SelectItem>
                    <SelectItem value="manifestation">Manifestation</SelectItem>
                  </SelectContent>
                </Select>
                <Input name="intent" placeholder="Intent" defaultValue={editingSpell?.intent} required />
                <Textarea name="ingredients" placeholder="Ingredients (one per line)" defaultValue={editingSpell?.ingredients?.join('\n')} />
                <Select name="moon_phase" defaultValue={editingSpell?.moon_phase || 'any'}>
                  <SelectTrigger>
                    <SelectValue placeholder="Moon Phase" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="new_moon">New Moon</SelectItem>
                    <SelectItem value="waxing_crescent">Waxing Crescent</SelectItem>
                    <SelectItem value="first_quarter">First Quarter</SelectItem>
                    <SelectItem value="waxing_gibbous">Waxing Gibbous</SelectItem>
                    <SelectItem value="full_moon">Full Moon</SelectItem>
                    <SelectItem value="waning_gibbous">Waning Gibbous</SelectItem>
                    <SelectItem value="last_quarter">Last Quarter</SelectItem>
                    <SelectItem value="waning_crescent">Waning Crescent</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea name="instructions" placeholder="Instructions" defaultValue={editingSpell?.instructions} required rows={6} />
                <Textarea name="notes" placeholder="Personal notes" defaultValue={editingSpell?.notes} rows={3} />
                <Button type="submit" className="w-full">
                  {editingSpell ? 'Update' : 'Create'} Spell
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <p className="text-purple-200 text-center">Loading spells...</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {spells.map((spell) => (
              <Card key={spell.id} className="bg-slate-800/60 border-purple-700">
                <CardHeader>
                  <CardTitle className="text-amber-100 flex items-center justify-between">
                    <span>{spell.name}</span>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" onClick={() => { setEditingSpell(spell); setOpen(true); }}>
                        <Edit className="w-4 h-4 text-purple-300" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => deleteMutation.mutate(spell.id)}>
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-purple-200 space-y-2">
                  <p><strong>Category:</strong> {spell.category}</p>
                  <p><strong>Intent:</strong> {spell.intent}</p>
                  <p><strong>Moon Phase:</strong> {spell.moon_phase}</p>
                  {spell.ingredients?.length > 0 && (
                    <div>
                      <strong>Ingredients:</strong>
                      <ul className="list-disc list-inside ml-2">
                        {spell.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                      </ul>
                    </div>
                  )}
                  <p className="text-sm">{spell.instructions?.substring(0, 150)}...</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}