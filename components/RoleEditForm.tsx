"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function RoleEditForm({ role }) {
  const [name, setName] = useState(role.name);
  const [description, setDescription] = useState(role.description);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`/api/roles/${role.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description }),
    });

    if (response.ok) {
      router.refresh();
    } else {
      console.error('Failed to update role');
    }
  };

  const handleDelete = async () => {
    const response = await fetch(`/api/roles/${role.id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      router.push('/roles');
    } else {
      console.error('Failed to delete role');
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Edit Role</h2>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <Label htmlFor="name">Role Name</Label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Button type="submit" className="mr-2">Update Role</Button>
        <Button type="button" variant="destructive" onClick={handleDelete}>Delete Role</Button>
      </form>
    </div>
  );
}