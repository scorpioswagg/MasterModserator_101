import { MOCK_LOGS } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Logs() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-1">System Logs</h1>
          <p className="text-muted-foreground font-mono text-sm">Audit trail of all verification attempts</p>
        </div>
        <Button variant="outline" className="font-mono gap-2 border-primary/50 text-primary hover:bg-primary/10">
            <Download className="h-4 w-4" />
            EXPORT CSV
        </Button>
      </div>

      <Card className="bg-card/50 backdrop-blur border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="relative w-96">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                    placeholder="Search user, ID, or group..." 
                    className="pl-9 font-mono text-sm bg-background/50 border-input"
                />
            </div>
            <Button variant="ghost" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
            </Button>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                        <TableHead className="font-mono text-xs uppercase text-muted-foreground">Time</TableHead>
                        <TableHead className="font-mono text-xs uppercase text-muted-foreground">User</TableHead>
                        <TableHead className="font-mono text-xs uppercase text-muted-foreground">Group</TableHead>
                        <TableHead className="font-mono text-xs uppercase text-muted-foreground">Method</TableHead>
                        <TableHead className="font-mono text-xs uppercase text-muted-foreground">Status</TableHead>
                        <TableHead className="font-mono text-xs uppercase text-muted-foreground text-right">Details</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {MOCK_LOGS.map((log) => (
                        <TableRow key={log.id} className="border-border hover:bg-primary/5 transition-colors">
                            <TableCell className="font-mono text-xs text-muted-foreground">
                                {new Date(log.timestamp).toLocaleString()}
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-col">
                                    <span className="font-mono font-medium">{log.username}</span>
                                    <span className="text-xs text-muted-foreground">{log.userId}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-sm">{log.groupName}</TableCell>
                            <TableCell className="font-mono text-xs uppercase">{log.method || '-'}</TableCell>
                            <TableCell>
                                <span className={`text-xs px-2 py-1 rounded font-mono uppercase ${
                                    log.status === 'verified' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                                    log.status === 'banned' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                                    log.status === 'failed' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' :
                                    'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                                }`}>
                                    {log.status}
                                </span>
                            </TableCell>
                            <TableCell className="text-right text-xs text-muted-foreground font-mono">
                                {log.details}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
