'use client';

import { useState } from 'react';
import { Trash2, ExternalLink, Plus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useStore } from '@/store/useStore';
import { apiClient } from '@/lib/api';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function GalleryPage() {
  const { moodboards, removeMoodboard, selectedProducts, clearSelectedProducts } = useStore();
  const [creating, setCreating] = useState(false);

  const handleCreateMoodboard = async () => {
    if (selectedProducts.length === 0) {
      toast.error('Please select products first');
      return;
    }

    setCreating(true);
    try {
      const moodboard = await apiClient.generateMoodboard(selectedProducts);
      toast.success(`Moodboard "${moodboard.title}" created!`);
      clearSelectedProducts();
    } catch (error: any) {
      toast.error(error.message || 'Failed to create moodboard');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Juno
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/chat" className="text-gray-700 hover:text-purple-600 font-medium">
                Chat
              </Link>
              <Link href="/onboarding" className="text-gray-700 hover:text-purple-600 font-medium">
                Upload Photos
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                My Moodboards
              </h1>
              <p className="text-xl text-gray-600">Your curated fashion collections</p>
            </div>
          <div className="flex gap-2">
            <Link href="/chat">
              <Button variant="outline">Back to Chat</Button>
            </Link>
            {selectedProducts.length > 0 && (
              <Button
                onClick={handleCreateMoodboard}
                disabled={creating}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Moodboard ({selectedProducts.length})
              </Button>
            )}
          </div>
        </div>

        {moodboards.length === 0 ? (
          <Card className="text-center p-12">
            <CardContent>
              <p className="text-gray-500 mb-4">No moodboards yet</p>
              <Link href="/chat">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  Start Chatting
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {moodboards.map((moodboard) => (
              <Card key={moodboard.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{moodboard.title}</CardTitle>
                      <CardDescription>{moodboard.description}</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeMoodboard(moodboard.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {moodboard.products.slice(0, 4).map((product) => (
                      <div key={product.id} className="aspect-square relative rounded-lg overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  {moodboard.products.length > 4 && (
                    <p className="text-sm text-gray-500 mb-4">
                      +{moodboard.products.length - 4} more items
                    </p>
                  )}
                  <div className="flex gap-2">
                    {moodboard.products.slice(0, 2).map((product) => (
                      <a
                        key={product.id}
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-xs text-center px-3 py-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors"
                      >
                        View Product
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

