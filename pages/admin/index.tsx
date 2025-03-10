import { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';

const Admin: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/workflows');
  }, [router]);

  return null; // No need to render anything as we're redirecting
};

export default Admin;
