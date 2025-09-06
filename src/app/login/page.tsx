
"use client";

import { useRouter } from 'next/navigation';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { GraduationCap } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // Successful sign-in is handled by the AuthProvider's onAuthStateChanged
    } catch (error) {
      console.error("Error signing in with Google: ", error);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Could not sign in with Google. Please try again.",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-black via-blue-900/50 to-black">
      <div className="relative z-10 flex h-full w-full items-center justify-center bg-black/30">
        <div className="text-center text-white p-8 bg-black/30 backdrop-blur-sm rounded-xl">
          <GraduationCap className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">
            Your research and thinking partner...
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Unlock new insights and accelerate your learning with the power of AI.
          </p>
          <Button
            onClick={handleGoogleSignIn}
            size="lg"
            className="bg-white text-black hover:bg-white/90 rounded-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <svg
                className="mr-2 -ml-1 w-4 h-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 381.5 512 244 512 109.8 512 0 402.2 0 261.8 0 120.3 109.8 8 244 8c70.4 0 129.5 28.1 173.4 72.4l-66.2 64.1c-26.6-25.2-62.3-38.6-107.2-38.6-83.6 0-151.7 67.2-151.7 150.1s68.1 150.1 151.7 150.1c97.1 0 134-62.2 140.2-94.6H244v-73.4h239.9c2.4 12.7 3.9 26.1 3.9 40.8z"
                ></path>
              </svg>
            )}
            Try InsightsLM with Google
          </Button>
        </div>
      </div>
    </div>
  );
}
