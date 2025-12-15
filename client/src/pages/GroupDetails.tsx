import { MOCK_GROUPS } from "@/lib/mockData";
import { useRoute } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, AlertTriangle } from "lucide-react";
import { Link } from "wouter";
import { useForm } from "react-hook-form";

export default function GroupDetails() {
  const [, params] = useRoute("/groups/:id");
  const { toast } = useToast();
  const group = MOCK_GROUPS.find(g => g.id === params?.id);

  const form = useForm({
    defaultValues: group?.rules || {}
  });

  if (!group) return <div>Group not found</div>;

  const onSubmit = (data: any) => {
    toast({
        title: "Configuration Saved",
        description: `Rules for ${group.title} have been updated.`,
        className: "border-primary text-primary"
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex items-center gap-4">
        <Link href="/groups">
            <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary">
                <ArrowLeft className="h-5 w-5" />
            </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-1">{group.title}</h1>
          <p className="text-muted-foreground font-mono text-sm">Configuration / {group.id}</p>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
            
            {/* General Settings */}
            <Card className="bg-card/50 backdrop-blur border-border md:col-span-2">
                <CardHeader>
                    <CardTitle className="font-mono text-lg flex items-center gap-2">
                        <span className="text-primary">01.</span> GENERAL SETTINGS
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Group Subject / Topic</Label>
                        <Input 
                            defaultValue={group.subject} 
                            className="bg-background/50 font-mono text-sm"
                        />
                        <p className="text-xs text-muted-foreground">Used by the bot to explain what content is "on-topic".</p>
                    </div>
                </CardContent>
            </Card>

            {/* Video Rules */}
            <Card className="bg-card/50 backdrop-blur border-border">
                <CardHeader>
                    <CardTitle className="font-mono text-lg flex items-center gap-2">
                        <span className="text-primary">02.</span> VIDEO REQUIREMENTS
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <Label>Required Videos</Label>
                            <span className="font-mono text-primary font-bold">{form.watch("requiredVideos")} videos</span>
                        </div>
                        <Slider 
                            defaultValue={[group.rules.requiredVideos]} 
                            max={10} 
                            min={1} 
                            step={1}
                            onValueChange={(val) => form.setValue("requiredVideos", val[0])}
                            className="py-2"
                        />
                        <p className="text-xs text-muted-foreground">Number of unique video uploads required to pass.</p>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-background/30">
                        <div className="space-y-0.5">
                            <Label>Manual Approval</Label>
                            <p className="text-xs text-muted-foreground">Require admin review before unmuting</p>
                        </div>
                        <Switch 
                            defaultChecked={group.rules.requireManualApproval}
                            onCheckedChange={(val) => form.setValue("requireManualApproval", val)}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Link Rules */}
            <Card className="bg-card/50 backdrop-blur border-border">
                <CardHeader>
                    <CardTitle className="font-mono text-lg flex items-center gap-2">
                        <span className="text-primary">03.</span> CLOUD LINKS
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-background/30">
                        <div className="space-y-0.5">
                            <Label>Allow Cloud Links</Label>
                            <p className="text-xs text-muted-foreground">Accept Google Drive, Mega, Dropbox folders</p>
                        </div>
                        <Switch 
                            defaultChecked={group.rules.allowLinks}
                            onCheckedChange={(val) => form.setValue("allowLinks", val)}
                        />
                    </div>

                    <div className="space-y-2 opacity-80">
                        <Label>Allowed Hosts</Label>
                        <div className="flex gap-2">
                            {['google', 'dropbox', 'mega'].map(host => (
                                <div key={host} className={`px-3 py-1 rounded-md text-xs font-mono border ${
                                    group.rules.allowedHosts.includes(host) 
                                    ? 'bg-primary/20 border-primary text-primary' 
                                    : 'bg-secondary border-border text-muted-foreground'
                                }`}>
                                    {host.toUpperCase()}
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Timing & Limits */}
            <Card className="bg-card/50 backdrop-blur border-border md:col-span-2">
                <CardHeader>
                    <CardTitle className="font-mono text-lg flex items-center gap-2">
                        <span className="text-primary">04.</span> LIMITS & MESSAGES
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <Label>Time Limit (Minutes)</Label>
                                <span className="font-mono text-primary font-bold">{(form.watch("timeoutMs") || 300000) / 60000}m</span>
                            </div>
                            <Slider 
                                defaultValue={[group.rules.timeoutMs]} 
                                max={900000} 
                                min={60000} 
                                step={60000}
                                onValueChange={(val) => form.setValue("timeoutMs", val[0])}
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <Label>Max Attempts</Label>
                                <span className="font-mono text-primary font-bold">{form.watch("maxAttempts")} tries</span>
                            </div>
                            <Slider 
                                defaultValue={[group.rules.maxAttempts]} 
                                max={10} 
                                min={1} 
                                step={1}
                                onValueChange={(val) => form.setValue("maxAttempts", val[0])}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Welcome Message Template</Label>
                        <Textarea 
                            className="font-mono text-xs h-32 bg-background/50"
                            defaultValue={group.rules.welcomeMessage}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="flex justify-end pt-6">
            <Button type="submit" size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono shadow-[0_0_20px_-5px_rgba(6,182,212,0.4)]">
                <Save className="mr-2 h-4 w-4" />
                SAVE CONFIGURATION
            </Button>
        </div>
      </form>
    </div>
  );
}
