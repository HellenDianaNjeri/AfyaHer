// src/pages/LandingPage.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white flex flex-col items-center justify-center p-8">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-pink-700 mb-4">Welcome to AfyaHer</h1>
        <p className="text-lg text-gray-700 max-w-xl mx-auto">
          AfyaHer is a women's health platform designed to empower, support, and educate women across Africa and beyond.
          From symptom tracking to mental health support and community forums, we prioritize holistic care for every woman.
        </p>
      </header>

      <section className="grid md:grid-cols-3 gap-8 text-center mb-12">
        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-pink-600 mb-2">🌸 Personalized Symptom Tracker</h2>
          <p className="text-gray-600">Track symptoms like period pain, endometriosis, and hormonal changes with AI-assisted insights.</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-pink-600 mb-2">🧠 Mental Health & Journaling</h2>
          <p className="text-gray-600">Log your mood, express emotions, and get guided support through personalized journal prompts.</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-pink-600 mb-2">🤝 Safe Community Space</h2>
          <p className="text-gray-600">Connect with other women, share your story, and ask questions in a moderated, kind space.</p>
        </div>
      </section>

      <Link to="/auth">
        <Button className="text-white bg-pink-600 hover:bg-pink-700 rounded-xl px-6 py-3 text-lg">
          Get Started
        </Button>
      </Link>

      <footer className="mt-10 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} AfyaHer. Built with ❤️ for Women’s Health.
      </footer>
    </div>
  );
};

export default LandingPage;
