
'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Book, Bot, FileQuestion, GraduationCap, LogOut } from 'lucide-react';
import { ProtectRoute, useAuth } from '@/hooks/use-auth';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const features = [
  { name: 'AI Study Assistant', description: 'Interactive AI tutor trained on official Samacheer Kalvi textbooks for all 5 SSLC subjects', icon: Bot, href: '/dashboard/ai-tutor' },
  { name: 'SSLC Practice Quizzes', description: 'AI-generated practice questions based on your Class 10 syllabus and past exam patterns', icon: FileQuestion, href: '/dashboard/quizzes' },
  { name: 'Official Textbooks', description: 'Access official TN Board textbooks (2024-25) with interactive PDF viewer and search', icon: Book, href: '/dashboard/textbooks' },
];

function SelectClassContent() {
  const { logout, user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen w-full bg-background text-foreground">
      <header className="flex items-center justify-between p-4 sm:p-6 border-b border-border/20 backdrop-blur-sm bg-background/50 sticky top-0 z-10">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-md">
                 <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <div>
                <h1 className="text-lg font-bold font-headline">InsightsLM</h1>
                <p className="text-xs text-muted-foreground">Class 10 SSLC • Tamil Nadu State Board</p>
            </div>
        </div>
        <div className="flex items-center gap-4">
             <Button onClick={logout} variant="outline" size="sm">
                <LogOut className="mr-2" />
                Logout
            </Button>
            <Avatar>
                <AvatarImage src={user?.photoURL ?? 'https://placehold.co/100x100.png'} />
                <AvatarFallback>{user?.displayName?.charAt(0) ?? 'D'}</AvatarFallback>
            </Avatar>
             <Badge variant="outline">2024-25 Syllabus</Badge>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center p-4 sm:p-6 lg:p-8">
        <section className="w-full max-w-5xl mx-auto py-12 md:py-16 text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-headline mb-4 leading-tight">Master Class 10 SSLC with AI</h2>
             <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Interactive AI-powered learning platform for Tamil Nadu State Board Class 10 SSLC. Get personalized study assistance with official textbooks, generate practice quizzes, and ace your board exams.
            </p>
            <div className="flex justify-center gap-2">
                <Badge variant="secondary">Official TN Textbooks</Badge>
                <Badge variant="secondary">SSLC Exam Ready</Badge>
                <Badge variant="secondary">AI-Powered</Badge>
            </div>
        </section>

         <section className="w-full max-w-6xl mx-auto py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature) => (
                    <Card key={feature.name} className="bg-card/50 hover:bg-card/80 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                 <div className="p-3 rounded-md bg-primary/20 text-primary w-fit">
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <CardTitle className="font-headline text-lg">{feature.name}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground text-sm">{feature.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>

         <section className="w-full max-w-4xl mx-auto py-12 text-center">
             <h3 className="text-3xl font-bold font-headline mb-2">Welcome to Class 10</h3>
             <p className="text-muted-foreground mb-8">Access your Samacheer Kalvi Class 10 curriculum with AI-powered learning</p>
             <Link href="/dashboard" passHref>
                <Card className="max-w-xs mx-auto bg-card/50 hover:bg-card/80 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                    <CardContent className="p-6">
                        <div className="p-4 rounded-md bg-primary/20 text-primary w-fit inline-block mb-4">
                            <GraduationCap className="w-8 h-8" />
                        </div>
                        <h4 className="text-xl font-bold">Class 10</h4>
                    </CardContent>
                </Card>
             </Link>
        </section>
      </main>
    </div>
  );
}

export default function SelectClassPage() {
    return (
        <ProtectRoute>
            <SelectClassContent />
        </ProtectRoute>
    )
}
