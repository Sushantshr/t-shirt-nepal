"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function OrderEditForm({ order }) {
  const [category, setCategory] = useState(order.category);
  const [size, setSize] = useState(order.size);
  const [quantity, setQuantity] = useState(order.quantity.toString());
  const [totalAmount, setTotalAmount] = useState(order.totalAmount.toString());
  const [paidAmount, setPaidAmount] = useState(order.paidAmount.toString());
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`/api/orders/${order.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category,
        size,
        quantity: parseInt(quantity),
        totalAmount: parseFloat(totalAmount),
        paidAmount: parseFloat(paidAmount),
      }),
    });

    if (response.ok) {
      router.refresh();
    } else {
      console.error('Failed to update order');
    }
  };

  const handleDelete = async () => {
    const response = await fetch(`/api/orders/${order.id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      router.push('/orders');
    } else {
      console.error('Failed to delete order');
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Edit Order</h2>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory} required>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="t-shirt">T-Shirt</SelectItem>
              <SelectItem value="polo">Polo</SelectItem>
              <SelectItem value="hoodie">Hoodie</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <Label htmlFor="size">Size</Label>
          <Select value={size} onValueChange={setSize} required>
            <SelectTrigger>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="S">Small</SelectItem>
              <SelectItem value="M">Medium</SelectItem>
              <SelectItem value="L">Large</SelectItem>
              <SelectItem value="XL">Extra Large</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            min="1"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="totalAmount">Total Amount</Label>
          <Input
            type="number"
            id="totalAmount"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            required
            min="0"
            step="0.01"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="paidAmount">Paid Amount</Label>
          <Input
            type="number"
            id="paidAmount"
            value={paidAmount}
            onChange={(e) => setPaidAmount(e.target.value)}
            required
            min="0"
            step="0.01"
          />
        </div>
        <Button type="submit" className="mr-2">Update Order</Button>
        <Button type="button" variant="destructive" onClick={handleDelete}>Delete Order</Button>
      </form>
    </div>
  );
}