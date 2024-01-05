import Header from '@/components/Header';
import withAuth from '@/components/withAuth';
import { logoutAuthService } from '@/domain/services/userService';
import React from 'react';

const Home: React.FC = () => {
    const authService = logoutAuthService();
    return (
        <div>
      <Header onLogout={authService.logout} />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      </div>
    </div>
    );
};

export default withAuth(Home);
