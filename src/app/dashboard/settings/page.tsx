
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brush, Save, Book, CheckCircle, Calendar } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { useAuth } from '@/hooks/use-auth';
import { useProgress } from '@/hooks/use-progress';
import { subjects } from '@/lib/data';
import { useMemo } from 'react';
import { Progress } from '@/components/ui/progress';
import { generateLessonId } from '@/lib/utils';

export default function SettingsPage() {
    const { theme, setTheme } = useTheme();
    const { user } = useAuth();
    const { completedLessons, isLoaded, streak } = useProgress();

    const socialScience = subjects.find(s => s.slug === 'social-science');

    const { totalLessons, completedCount, progressPercentage } = useMemo(() => {
        if (!socialScience || !isLoaded) return { totalLessons: 0, completedCount: 0, progressPercentage: 0 };

        const topics = socialScience.textbookContent
            .split('\n\n')
            .map(p => p.trim())
            .filter(p => p)
            .map(p => {
                const lines = p.split('\n');
                const fullTitle = lines[0].trim();
                const [category, ...titleParts] = fullTitle.split(' - ');
                const cleanTitle = titleParts.join(' - ').trim();
                if (!category || !cleanTitle) return null;
                const id = generateLessonId(socialScience.slug, category, cleanTitle);
                return { id };
            })
            .filter((topic): topic is { id: string } => topic !== null);

        const total = topics.length;
        const completed = topics.filter(topic => completedLessons[topic.id]).length;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

        return { totalLessons: total, completedCount: completed, progressPercentage: percentage };

    }, [socialScience, completedLessons, isLoaded]);


  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </header>
      
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your personal information is managed by your identity provider.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" defaultValue={user?.displayName ?? 'Demo Student'} readOnly />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={user?.email ?? 'student@demo.com'} readOnly />
            </div>
          </CardContent>
           <CardFooter className="border-t pt-6">
             <Button disabled>
                <Save className="mr-2" />
                Save Profile
             </Button>
          </CardFooter>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Your Progress</CardTitle>
                <CardDescription>An overview of your learning journey so far.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Social Science</h4>
                        <span className="text-muted-foreground font-bold">{progressPercentage}% Complete</span>
                    </div>
                    <Progress value={progressPercentage} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div className="flex items-center gap-3 p-3 bg-secondary rounded-md">
                        <Book className="w-6 h-6 text-muted-foreground" />
                        <div>
                            <p className="font-bold text-xl">{totalLessons}</p>
                            <p className="text-sm text-muted-foreground">Total Lessons</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-3 p-3 bg-secondary rounded-md">
                        <CheckCircle className="w-6 h-6 text-muted-foreground" />
                        <div>
                            <p className="font-bold text-xl">{completedCount}</p>
                            <p className="text-sm text-muted-foreground">Completed</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-secondary rounded-md">
                        <Calendar className="w-6 h-6 text-muted-foreground" />
                        <div>
                            <p className="font-bold text-xl">{streak}</p>
                            <p className="text-sm text-muted-foreground">Day Streak</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Customize your learning environment.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
                <Label htmlFor="theme">Theme</Label>
                 <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger className="w-full md:w-1/2" id="theme">
                        <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="light">Light</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <div className="grid gap-2">
                <Label htmlFor="classLevel">Class Level</Label>
                 <Select defaultValue="10">
                    <SelectTrigger className="w-full md:w-1/2" id="classLevel">
                        <SelectValue placeholder="Select class level" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10">Class 10</SelectItem>
                        <SelectItem value="9" disabled>Class 9 (Coming Soon)</SelectItem>
                        <SelectItem value="11" disabled>Class 11 (Coming Soon)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6">
             <Button>
                <Save className="mr-2" />
                Save Preferences
             </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
