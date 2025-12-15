import { MOCK_GROUPS } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Users, ChevronRight } from "lucide-react";
import { Link } from "wouter";

export default function Groups() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-1">Managed Groups</h1>
          <p className="text-muted-foreground font-mono text-sm">Select a group to configure rules</p>
        </div>
        <Button className="font-mono bg-primary text-primary-foreground hover:bg-primary/90">
            + ADD GROUP
        </Button>
      </div>

      <div className="grid gap-6">
        {MOCK_GROUPS.map((group) => (
            <Card key={group.id} className="group bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6 flex items-center justify-between">
                    <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center border border-border group-hover:border-primary/50 transition-colors">
                            <Users className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="font-bold text-lg">{group.title}</h3>
                            <p className="text-sm text-muted-foreground font-mono line-clamp-1 max-w-md">{group.subject}</p>
                            <div className="flex items-center gap-4 mt-2">
                                <span className="text-xs font-mono text-muted-foreground bg-secondary/50 px-2 py-1 rounded">
                                    ID: {group.id}
                                </span>
                                <span className="text-xs font-mono text-primary flex items-center gap-1">
                                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                    Active {group.lastActive}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    {group.memberCount.toLocaleString()} members
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <Link href={`/groups/${group.id}`}>
                        <Button variant="outline" className="font-mono gap-2 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
                            <Settings className="h-4 w-4" />
                            CONFIGURE
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
