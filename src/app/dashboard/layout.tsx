
'use client';
import Link from 'next/link';
import { ArrowLeft, Book, Bot, FileQuestion, Home, ListTodo, Settings, GraduationCap, LogOut, ChevronDown, Lightbulb, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { ProtectRoute, useAuth } from '@/hooks/use-auth';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { subjects } from '@/lib/data';
import { useMemo, useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Target, Clock, Star, Users, Calendar } from 'lucide-react';
import { useProgress } from '@/hooks/use-progress';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { generateLessonId } from '@/lib/utils';
import { cn } from '@/lib/utils';


const UserProfileCard = () => {
    const { user, logout } = useAuth();
    const { completedLessons, isLoaded, streak } = useProgress();
    const socialScience = subjects.find(s => s.slug === 'social-science');

    const { totalLessons, progressPercentage } = useMemo(() => {
        if (!socialScience || !isLoaded) return { totalLessons: 0, progressPercentage: 0 };
        const topics = socialScience.textbookContent
          .split('\n\n')
          .map(p => p.trim())
          .filter(p => p)
          .map(p => {
            const lines = p.split('\n');
            const title = lines[0].trim();
            const [category, ...titleParts] = title.split(' - ');
            const cleanTitle = titleParts.join(' - ');
            if (!category || !cleanTitle) return null;
            return { 
                id: generateLessonId(socialScience.slug, category, cleanTitle),
                content: lines.slice(1).join('\n').trim() 
            };
          })
          .filter((topic): topic is { id: string, content: string } => topic !== null && !!topic.content);

        const total = topics.length;
        
        const completedCount = topics.filter(topic => completedLessons[topic.id]).length;
        const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0;
        
        return { totalLessons: total, progressPercentage: percentage };

    }, [socialScience, completedLessons, isLoaded]);

    if (!isLoaded || !user) {
        return <div className="p-4 bg-card text-card-foreground rounded-lg w-80">Loading...</div>;
    }

    return (
        <div className="p-4 bg-card text-card-foreground rounded-lg w-80">
            <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                    <AvatarImage src={user.photoURL ?? "https://placehold.co/100x100.png"} />
                    <AvatarFallback>{user.displayName?.charAt(0) ?? 'D'}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-bold text-lg">{user.displayName ?? 'Demo Student'}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div className="flex items-center gap-2">
                    <Book className="w-4 h-4 text-muted-foreground" />
                    <span>Class 10</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{streak} day streak</span>
                </div>
            </div>
            <div>
                <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-medium">Overall Progress</p>
                    <p className="text-sm font-bold">{progressPercentage}%</p>
                </div>
                <Progress value={progressPercentage} />
            </div>
            <Separator className="my-4" />
            <div>
                <p className="font-semibold mb-2">Subject Progress</p>
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="w-32 text-sm">Social Science</span>
                        <Progress value={progressPercentage} className="flex-1" />
                        <span className="text-sm font-bold">{progressPercentage}%</span>
                    </div>
                </div>
            </div>
            <Separator className="my-4" />
            <Button onClick={logout} variant="destructive" className="w-full">
                <LogOut className="mr-2" /> Logout
            </Button>
        </div>
    );
}

const navItems = [
    { name: 'Subjects', href: '/dashboard', icon: Home },
    { name: 'AI Tutor', href: '/dashboard/ai-tutor', icon: Bot },
    { name: 'Quizzes', href: '/dashboard/quizzes', icon: FileQuestion },
    { name: 'Textbooks', href: '/dashboard/textbooks', icon: Book },
    { name: 'Homework', href: '/dashboard/homework', icon: ListTodo },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

function LoadingOverlay() {
    return (
        <div className="loading-overlay">
            <div className="loading-spinner">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
        </div>
    );
}

function DashboardLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => {
      if (url !== pathname) {
        setIsLoading(true);
      }
    };
    const handleComplete = (url: string) => {
      if (url === pathname) {
         // Delay hiding the loader slightly to avoid flashing
         setTimeout(() => setIsLoading(false), 200);
      }
    };

    // This is a workaround for the app router since router.events is not available.
    // We check the pathname change.
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500); // Adjust timeout as needed

    return () => clearTimeout(timer);
  }, [pathname]);

  const handleTabChange = (value: string) => {
    if (!pathname.startsWith('/dashboard/quizzes/lesson')) {
        router.push(value);
    }
  };
  
  const getActiveTab = () => {
    if (pathname.startsWith('/dashboard/quizzes/lesson')) {
      return '/dashboard/quizzes';
    }
    const navItem = navItems.find(item => pathname === item.href);
    return navItem ? navItem.href : '/dashboard';
  }

  return (
    <div className="flex flex-col min-h-screen">
       {isLoading && <LoadingOverlay />}
       <header className="flex items-center justify-between p-4 border-b">
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
                <Button asChild variant="ghost">
                    <Link href="/select-class">
                        <ArrowLeft />
                        Back to Classes
                    </Link>
                </Button>
                <Badge variant="outline">2024-25 Syllabus</Badge>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={user?.photoURL ?? "https://placehold.co/100x100.png"} />
                                <AvatarFallback>{user?.displayName?.charAt(0) ?? 'D'}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{user?.displayName ?? 'Demo Student'}</span>
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                       <UserProfileCard />
                    </PopoverContent>
                </Popover>
            </div>
        </header>

        <div className="flex justify-center p-4 border-b">
            <Tabs value={getActiveTab()} onValueChange={handleTabChange}>
                <TabsList className="h-auto p-1 bg-muted/50 rounded-lg">
                    {navItems.map((item) => (
                        <TabsTrigger key={item.href} value={item.href} asChild className="px-4 py-2 text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-md">
                             <Link href={item.href}>
                                <item.icon className="mr-2" />
                                {item.name}
                            </Link>
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
        </div>
       
        <main className={cn("flex-1 p-4 sm:p-6 md:p-8 transition-opacity duration-300", isLoading ? 'opacity-0' : 'opacity-100')}>
             {children}
        </main>
    </div>
  );
}


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectRoute>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </ProtectRoute>
  );
}
