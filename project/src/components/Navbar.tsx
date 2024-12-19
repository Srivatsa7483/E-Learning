import React from 'react';
import { BookOpen, Calendar, Home, User } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6" />
          <span className="text-xl font-bold">EduLearn</span>
        </div>
        <div className="flex space-x-6">
          <NavItem icon={<Home className="h-5 w-5" />} text="Home" />
          <NavItem icon={<Calendar className="h-5 w-5" />} text="Schedule" />
          <NavItem icon={<User className="h-5 w-5" />} text="Profile" />
        </div>
      </div>
    </nav>
  );
}

function NavItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <button className="flex items-center space-x-1 hover:text-indigo-200 transition-colors">
      {icon}
      <span>{text}</span>
    </button>
  );
}