'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Camera, Upload, X, CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useStore } from '@/store/useStore';
import { apiClient } from '@/lib/api';
import toast from 'react-hot-toast';

export default function OnboardingPage() {
  const router = useRouter();
  const { modelImages, addModelImage, removeModelImage } = useStore();
  const [uploading, setUploading] = useState(false);
  const [validating, setValidating] = useState<string | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    setUploading(true);
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const base64 = event.target?.result as string;
        const imageData = base64.split(',')[1];

        setValidating(file.name);
        const validation = await apiClient.validateImage(imageData);

        if (validation.valid) {
          addModelImage(base64);
          toast.success('Image validated and added!');
        } else {
          toast.error(validation.reason || 'Image not suitable for styling');
        }
      } catch (error: any) {
        toast.error(error.message || 'Failed to validate image');
      } finally {
        setUploading(false);
        setValidating(null);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleContinue = () => {
    if (modelImages.length === 0) {
      toast.error('Please upload at least one model photo');
      return;
    }
    router.push('/chat');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
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
            <Link href="/chat" className="text-gray-700 hover:text-purple-600 font-medium">
              Skip to Chat
            </Link>
          </div>
        </div>
      </nav>

      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Upload Your Model Photos
            </h1>
            <p className="text-xl text-gray-600">
              Upload photos of yourself to get personalized styling recommendations
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Photo Guidelines</CardTitle>
              <CardDescription>
                For best results, upload clear, well-lit photos where you can see your clothing clearly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Full-body or upper-body photos work best
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Good lighting and clear visibility
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Single person per photo
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {modelImages.map((image, index) => (
              <Card key={index} className="relative group">
                <div className="aspect-square relative overflow-hidden rounded-lg">
                  <img
                    src={image}
                    alt={`Model ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removeModelImage(index)}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            ))}

            {modelImages.length < 5 && (
              <Card className="border-2 border-dashed border-gray-300 hover:border-purple-500 transition-colors">
                <label className="cursor-pointer">
                  <div className="aspect-square flex flex-col items-center justify-center p-8 text-center">
                    {uploading ? (
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                    ) : (
                      <>
                        <Upload className="w-12 h-12 text-gray-400 mb-4" />
                        <p className="text-sm font-medium text-gray-600 mb-2">
                          Click to upload
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG up to 5MB
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              </Card>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => router.push('/')}
            >
              Back
            </Button>
            <Button
              onClick={handleContinue}
              disabled={modelImages.length === 0}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
            >
              Continue to Chat
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
