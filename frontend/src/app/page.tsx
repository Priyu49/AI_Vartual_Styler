import Link from "next/link";
import { Sparkles, Camera, MessageSquare, Palette, ArrowRight, Zap, Heart, TrendingUp, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Navigation Bar */}
        <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Juno
                </span>
              </Link>
              <div className="flex items-center gap-6">
                <Link
                  href="/chat"
                  className="text-gray-700 hover:text-purple-600 font-medium transition-colors relative group"
                >
                  Chat
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all"></span>
                </Link>
                <Link
                  href="/gallery"
                  className="text-gray-700 hover:text-purple-600 font-medium transition-colors relative group"
                >
                  Gallery
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all"></span>
                </Link>
                <Link
                  href="/onboarding"
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section - Split Layout */}
        <div className="pt-32 pb-20 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Content */}
              <div className="space-y-8">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-purple-200/50 text-purple-700 shadow-sm">
                  <Zap className="w-4 h-4 fill-purple-600" />
                  <span className="text-sm font-semibold">AI-Powered Fashion Styling</span>
                </div>

                {/* Main Title */}
                <h1 className="text-7xl md:text-8xl lg:text-9xl font-black leading-[0.9]">
                  <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                    Juno
                  </span>
                </h1>

                {/* Description */}
                <p className="text-2xl md:text-3xl text-gray-700 leading-relaxed font-light max-w-xl">
                  Your personal AI fashion stylist. Get personalized clothing recommendations powered by advanced AI and computer vision.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link
                    href="/onboarding"
                    className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/chat"
                    className="px-8 py-4 bg-white text-purple-600 rounded-2xl font-bold text-lg border-2 border-purple-600 hover:bg-purple-50 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Try Chat
                  </Link>
                </div>

                {/* Stats */}
                <div className="flex gap-8 pt-8">
                  <div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      10K+
                    </div>
                    <div className="text-sm text-gray-600 font-medium">Happy Users</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      50K+
                    </div>
                    <div className="text-sm text-gray-600 font-medium">Styles Created</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      98%
                    </div>
                    <div className="text-sm text-gray-600 font-medium">Satisfaction</div>
                  </div>
                </div>
              </div>

              {/* Right Side - Visual Element */}
              <div className="relative lg:block hidden">
                <div className="relative">
                  {/* Main Camera Icon with Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur-3xl opacity-40 animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 p-12 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform">
                    <Camera className="w-24 h-24 text-white" />
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-purple-100 animate-float">
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-pink-100 animate-float animation-delay-2000">
                    <TrendingUp className="w-6 h-6 text-pink-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section - Grid Layout */}
        <div className="py-20 px-6 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Powerful Features
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to discover and create your perfect style
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Image Analysis */}
              <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-100 hover:border-purple-300 hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-100 to-transparent rounded-bl-full opacity-50"></div>
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform">
                    <Camera className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">Image Analysis</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Upload photos and receive personalized styling recommendations based on your unique style.
                  </p>
                  <div className="flex items-center text-purple-600 font-semibold group-hover:gap-2 transition-all">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* AI Chat */}
              <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-pink-100 hover:border-pink-300 hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-pink-100 to-transparent rounded-bl-full opacity-50"></div>
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform">
                    <MessageSquare className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">AI Chat</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Have conversations with your AI stylist. Get advice, ask questions, and discover new styles.
                  </p>
                  <div className="flex items-center text-pink-600 font-semibold group-hover:gap-2 transition-all">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Moodboards */}
              <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-indigo-100 hover:border-indigo-300 hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-100 to-transparent rounded-bl-full opacity-50"></div>
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform">
                    <Palette className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">Moodboards</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Create beautiful moodboards with your favorite products and styling combinations.
                  </p>
                  <div className="flex items-center text-indigo-600 font-semibold group-hover:gap-2 transition-all">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl p-12 md:p-16 shadow-2xl text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Ready to transform your style?
                </h2>
                <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
                  Join thousands of users who are discovering their perfect style with AI-powered recommendations
                </p>
                <Link
                  href="/onboarding"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-white text-purple-600 rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-xl"
                >
                  Start Your Journey
                  <Heart className="w-6 h-6 fill-pink-500 text-pink-500" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white/50 backdrop-blur-sm py-8 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Juno
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                © 2024 Juno. AI-Powered Fashion Styling.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
