
'use client';

import { useUser } from '@/firebase'; // Correctly import from the central barrel file
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const WithAuthComponent = (props: P) => {
    const { user, isUserLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
      // If loading is finished and there is still no user, then redirect.
      if (!isUserLoading && !user) {
        router.replace('/#contact'); // Redirect to a login/contact form if not logged in
      }
    }, [user, isUserLoading, router]);

    // While loading, show a spinner. This prevents a flash of the protected content.
    if (isUserLoading || !user) {
      return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      );
    }

    // If loading is finished and there is a user, render the component.
    return <WrappedComponent {...props} />;
  };

  WithAuthComponent.displayName = `WithAuth(${(WrappedComponent.displayName || WrappedComponent.name || 'Component')})`;

  return WithAuthComponent;
};

export default withAuth;
