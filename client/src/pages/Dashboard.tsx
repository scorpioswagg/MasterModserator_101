import { MOCK_STATS, MOCK_LOGS } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ShieldCheck, ShieldBan, Clock, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-1">Command Center</h1>
          <p className="text-muted-foreground font-mono text-sm">System Status: ONLINE // Monitoring active</p>
        </div>
        <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs font-mono text-green-500">LIVE FEED</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card/50 backdrop-blur border-l-4 border-l-primary shadow-sm hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-mono text-muted-foreground">Total Verifications</CardTitle>
            <ShieldCheck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{MOCK_STATS.totalVerifications.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">+12% from last week</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur border-l-4 border-l-yellow-500 shadow-sm hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-mono text-muted-foreground">Active Sessions</CardTitle>
            <Activity className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{MOCK_STATS.activeSessions}</div>
            <p className="text-xs text-muted-foreground mt-1">Currently processing</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur border-l-4 border-l-destructive shadow-sm hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-mono text-muted-foreground">Banned Users</CardTitle>
            <ShieldBan className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{MOCK_STATS.bannedUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">+4% from last week</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur border-l-4 border-l-purple-500 shadow-sm hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-mono text-muted-foreground">Avg. Verify Time</CardTitle>
            <Clock className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{MOCK_STATS.avgTime}</div>
            <p className="text-xs text-muted-foreground mt-1">Efficiency rating: High</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-card/50 border-border">
          <CardHeader>
            <CardTitle className="font-mono text-lg">Live Verification Stream</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {MOCK_LOGS.slice(0, 5).map((log) => (
                <div key={log.id} className="flex items-center justify-between p-3 rounded-lg border border-border bg-background/40 hover:bg-background/60 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`h-2 w-2 rounded-full ${
                        log.status === 'verified' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' :
                        log.status === 'banned' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]' :
                        'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]'
                    }`} />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none font-mono">{log.username}</p>
                      <p className="text-xs text-muted-foreground">{log.groupName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs px-2 py-1 rounded font-mono uppercase ${
                        log.status === 'verified' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                        log.status === 'banned' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                        'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                    }`}>
                        {log.status}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">
                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border">
                <Link href="/logs">
                    <a className="text-xs font-mono text-primary flex items-center hover:underline">
                        VIEW FULL LOGS <ArrowUpRight className="ml-1 h-3 w-3" />
                    </a>
                </Link>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions / System Health */}
        <Card className="col-span-3 bg-card/50 border-border">
          <CardHeader>
            <CardTitle className="font-mono text-lg">System Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                    <span>CPU LOAD</span>
                    <span>24%</span>
                </div>
                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[24%] rounded-full"></div>
                </div>
            </div>
            
            <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                    <span>MEMORY</span>
                    <span>68%</span>
                </div>
                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 w-[68%] rounded-full"></div>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                    <span>API LATENCY</span>
                    <span className="text-green-500">45ms</span>
                </div>
                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[15%] rounded-full"></div>
                </div>
            </div>

            <div className="pt-6 mt-6 border-t border-border">
                <div className="rounded-md bg-primary/10 border border-primary/20 p-4">
                    <h4 className="text-sm font-medium text-primary mb-2 font-mono flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4" />
                        ALL SYSTEMS NOMINAL
                    </h4>
                    <p className="text-xs text-muted-foreground">
                        Bot instance running on region US-EAST-1. Database connection stable.
                    </p>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
