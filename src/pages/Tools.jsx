import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Wand, Trash2, Edit } from 'lucide-react';

export default function Tools() {
  const [open, setOpen] = useState(false);
  const [editingTool, setEditingTool] = useState(null);
  const queryClient = useQueryClient();

  const { data: tools = [], isLoading } = useQuery({
    queryKey: ['tools'],
    queryFn: () => base44.entities.Tool.list('-created_date')
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Tool.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['tools']);
      setOpen(false);
      setEditingTool(null);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Tool.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['tools']);
      setOpen(false);
      setEditingTool(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Tool.delete(id),
    onSuccess: () => queryClient.invalidateQueries(['tools'])
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      meaning: formData.get('meaning'),
      sweet_advice: formData.get('sweet_advice'),
      sassy_advice: formData.get('sassy_advice'),
      uses: formData.get('uses')
    };

    if (editingTool) {
      updateMutation.mutate({ id: editingTool.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <div className="min-h-screen parchment-bg aged-paper py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl book-title text-amber-950">🔮 Magical Tools</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-700 hover:bg-purple-800 text-amber-50">
                <Plus className="w-4 h-4 mr-2" />
                Add Tool
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto parchment-bg">
              <DialogHeader>
                <DialogTitle className="handwritten text-2xl text-amber-950">
                  {editingTool ? 'Edit Tool' : 'New Tool'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input name="name" placeholder="Tool name" defaultValue={editingTool?.name} required className="handwritten" />
                <Textarea name="meaning" placeholder="Purpose and symbolism" defaultValue={editingTool?.meaning} rows={3} required className="handwritten" />
                <Textarea name="sweet_advice" placeholder="Sweet Auntie's gentle guidance" defaultValue={editingTool?.sweet_advice} rows={3} required className="handwritten" />
                <Textarea name="sassy_advice" placeholder="Sassy Auntie's bold take" defaultValue={editingTool?.sassy_advice} rows={3} required className="handwritten" />
                <Textarea name="uses" placeholder="How to use in practice" defaultValue={editingTool?.uses} rows={3} className="handwritten" />
                <Button type="submit" className="w-full bg-purple-700 hover:bg-purple-800">
                  {editingTool ? 'Update' : 'Add'} Tool
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <p className="handwritten text-amber-900 text-center">Loading tools...</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {tools.map((tool) => (
              <Card key={tool.id} className="border-2 border-amber-800 bg-amber-50/80">
                <CardHeader className="bg-purple-900/10">
                  <CardTitle className="handwritten text-2xl text-amber-950 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Wand className="w-6 h-6 text-purple-700" />
                      {tool.name}
                    </span>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" onClick={() => { setEditingTool(tool); setOpen(true); }}>
                        <Edit className="w-4 h-4 text-amber-700" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => deleteMutation.mutate(tool.id)}>
                        <Trash2 className="w-4 h-4 text-red-700" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="handwritten text-amber-900 space-y-3 pt-4">
                  <p><strong>Meaning:</strong> {tool.meaning}</p>
                  <div className="p-3 bg-pink-50 rounded border border-pink-200">
                    <p className="text-sm"><strong>💕 Sweet Auntie:</strong> {tool.sweet_advice}</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded border border-orange-200">
                    <p className="text-sm"><strong>🔥 Sassy Auntie:</strong> {tool.sassy_advice}</p>
                  </div>
                  {tool.uses && <p className="text-sm"><strong>Uses:</strong> {tool.uses}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}