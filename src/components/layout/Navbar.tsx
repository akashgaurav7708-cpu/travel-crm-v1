'use client';

import React from 'react';
import { Bell, Search, User } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-8">
      <div className="flex w-96 items-center rounded-lg bg-slate-100 px-3 py-2 text-slate-500 transition-shadow focus-within:ring-2 focus-within:ring-blue-500">
        <Search className="h-4 w-4" />
        <input
          type="text"
          placeholder="Search leads, bookings, or customers..."
          className="ml-2 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
      </div>
      <div className="flex items-center space-x-4">
        <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
        </button>
        <div className="h-8 w-px bg-slate-200 mx-2"></div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-slate-700">English</span>
          <User className="h-5 w-5 text-slate-400" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
