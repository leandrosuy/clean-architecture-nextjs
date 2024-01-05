import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = (WrappedComponent: React.FC) => {
  return () => {
    const router = useRouter();

    useEffect(() => {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        router.push('/signin');
      }
    }, []);

    return <WrappedComponent />;
  };
};

export default withAuth;
