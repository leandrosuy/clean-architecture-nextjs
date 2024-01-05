import React from 'react';

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className="bg-slate-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Home</h1>
        <button
          onClick={onLogout}
          className="bg-slate-900 text-white px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
