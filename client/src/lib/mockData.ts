import { LucideIcon, ShieldAlert, ShieldCheck, ShieldBan, Clock, Activity, Users, FileText, Settings, LogOut, LayoutDashboard } from "lucide-react";

export interface Group {
  id: string;
  title: string;
  subject: string;
  memberCount: number;
  lastActive: string;
  rules: {
    requiredVideos: number;
    allowLinks: boolean;
    allowedHosts: string[];
    maxAttempts: number;
    timeoutMs: number;
    requireManualApproval: boolean;
    welcomeMessage: string;
  };
}

export interface LogEntry {
  id: string;
  groupId: string;
  groupName: string;
  userId: string;
  username: string;
  status: 'verified' | 'banned' | 'needs_review' | 'failed';
  method: 'video' | 'link' | null;
  timestamp: string;
  details?: string;
}

export const MOCK_GROUPS: Group[] = [
  {
    id: "g1",
    title: "Crypto Traders Elite",
    subject: "Cryptocurrency trading, technical analysis, market news",
    memberCount: 4521,
    lastActive: "2 mins ago",
    rules: {
      requiredVideos: 5,
      allowLinks: true,
      allowedHosts: ["google", "dropbox", "mega"],
      maxAttempts: 3,
      timeoutMs: 300000,
      requireManualApproval: false,
      welcomeMessage: "Welcome to Crypto Traders Elite! To join the discussion, please verify you are human by uploading 5 videos related to crypto trading OR a unique cloud folder link.",
    }
  },
  {
    id: "g2",
    title: "Vintage Watch Collectors",
    subject: "Vintage timepieces, restoration, history",
    memberCount: 1205,
    lastActive: "1 hour ago",
    rules: {
      requiredVideos: 3,
      allowLinks: false,
      allowedHosts: [],
      maxAttempts: 3,
      timeoutMs: 600000,
      requireManualApproval: true,
      welcomeMessage: "Welcome collector. Verification required. Please upload 3 videos of your collection to proceed.",
    }
  },
  {
    id: "g3",
    title: "Global News Discussion",
    subject: "Politics, world events, economics",
    memberCount: 8900,
    lastActive: "Just now",
    rules: {
      requiredVideos: 5,
      allowLinks: true,
      allowedHosts: ["google"],
      maxAttempts: 2,
      timeoutMs: 300000,
      requireManualApproval: false,
      welcomeMessage: "Read the pinned post. Verification required: 5 on-topic videos or a Google Drive link.",
    }
  }
];

export const MOCK_LOGS: LogEntry[] = [
  { id: "l1", groupId: "g1", groupName: "Crypto Traders Elite", userId: "u123", username: "@cryptoking", status: "verified", method: "video", timestamp: "2024-05-15T10:30:00Z", details: "Uploaded 5 videos" },
  { id: "l2", groupId: "g1", groupName: "Crypto Traders Elite", userId: "u124", username: "@scammer99", status: "banned", method: null, timestamp: "2024-05-15T10:32:00Z", details: "Forwarded message detected" },
  { id: "l3", groupId: "g2", groupName: "Vintage Watch Collectors", userId: "u555", username: "@rolexfan", status: "needs_review", method: "link", timestamp: "2024-05-15T11:00:00Z", details: "Manual approval required" },
  { id: "l4", groupId: "g3", groupName: "Global News Discussion", userId: "u999", username: "@bot_account", status: "failed", method: null, timestamp: "2024-05-15T11:15:00Z", details: "Timeout (5 mins)" },
  { id: "l5", groupId: "g1", groupName: "Crypto Traders Elite", userId: "u777", username: "@newbie", status: "verified", method: "link", timestamp: "2024-05-15T11:20:00Z", details: "Valid Mega link" },
  { id: "l6", groupId: "g3", groupName: "Global News Discussion", userId: "u888", username: "@spammer", status: "banned", method: null, timestamp: "2024-05-15T11:25:00Z", details: "Max attempts reached" },
];

export const MOCK_STATS = {
  totalVerifications: 12450,
  activeSessions: 42,
  bannedUsers: 340,
  avgTime: "2m 15s"
};
