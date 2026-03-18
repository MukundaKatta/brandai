"use client";

import { useState } from "react";
import {
  Palette, LayoutDashboard, Megaphone, Calendar, Search, GitBranch, ShieldCheck,
  FileText, Sparkles, Plus, Settings, TrendingUp, Eye, Copy, ChevronRight,
  CheckCircle, AlertTriangle, Clock, Star, Edit3, Target, BarChart3
} from "lucide-react";
import toast from "react-hot-toast";

type TabType = "dashboard" | "brand-voice" | "content" | "campaigns" | "calendar" | "seo" | "ab-test" | "compliance";

const contentTypes = [
  { id: "blog", name: "Blog Post", icon: FileText, samples: 45 },
  { id: "social", name: "Social Media", icon: Megaphone, samples: 120 },
  { id: "email", name: "Email Campaign", icon: FileText, samples: 32 },
  { id: "ad", name: "Ad Copy", icon: Target, samples: 67 },
  { id: "landing", name: "Landing Page", icon: LayoutDashboard, samples: 18 },
  { id: "press", name: "Press Release", icon: FileText, samples: 8 },
];

interface ContentItem {
  id: string;
  title: string;
  type: string;
  status: "draft" | "review" | "approved" | "published";
  date: string;
  performance?: { views: number; clicks: number; conversions: number };
}

const sampleContent: ContentItem[] = [
  { id: "1", title: "10 Ways AI is Transforming Marketing", type: "blog", status: "published", date: "2026-03-17", performance: { views: 4500, clicks: 320, conversions: 45 } },
  { id: "2", title: "Spring Product Launch - Social Campaign", type: "social", status: "approved", date: "2026-03-18" },
  { id: "3", title: "Customer Success Story: TechCorp", type: "blog", status: "review", date: "2026-03-19" },
  { id: "4", title: "March Newsletter - AI Features", type: "email", status: "draft", date: "2026-03-20" },
  { id: "5", title: "PPC Campaign - Enterprise Search", type: "ad", status: "published", date: "2026-03-15", performance: { views: 12000, clicks: 890, conversions: 67 } },
  { id: "6", title: "Product Update Landing Page", type: "landing", status: "review", date: "2026-03-16" },
];

const calendarEvents = [
  { date: "2026-03-17", items: [{ title: "Blog: AI Marketing", type: "blog", status: "published" }] },
  { date: "2026-03-18", items: [{ title: "Social Campaign Launch", type: "social", status: "approved" }] },
  { date: "2026-03-19", items: [{ title: "Customer Story Draft", type: "blog", status: "review" }] },
  { date: "2026-03-20", items: [{ title: "Newsletter Send", type: "email", status: "draft" }, { title: "Webinar Promo", type: "social", status: "draft" }] },
  { date: "2026-03-21", items: [] },
  { date: "2026-03-22", items: [{ title: "Product Launch Prep", type: "landing", status: "draft" }] },
  { date: "2026-03-23", items: [{ title: "Product Launch Day", type: "ad", status: "draft" }] },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [brandVoice, setBrandVoice] = useState({
    tone: "Professional yet approachable",
    personality: "Innovative, trustworthy, human-centered",
    vocabulary: "Technical but accessible, avoid jargon",
    doList: ["Use active voice", "Include data/stats", "Tell stories", "Be specific"],
    dontList: ["Use buzzwords", "Make unverified claims", "Be overly salesy", "Use passive voice"],
  });
  const [generatingContent, setGeneratingContent] = useState(false);
  const [contentPrompt, setContentPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [selectedContentType, setSelectedContentType] = useState("blog");

  const generateContent = async () => {
    if (!contentPrompt.trim()) return;
    setGeneratingContent(true);
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: contentPrompt, type: selectedContentType, brandVoice }),
      });
      const data = await res.json();
      setGeneratedContent(data.content);
    } catch {
      setGeneratedContent(`# ${contentPrompt}\n\nIn today's rapidly evolving digital landscape, businesses are discovering unprecedented opportunities through AI-powered solutions. Our latest research reveals that companies adopting AI marketing tools see an average 40% improvement in content engagement.\n\n## Key Takeaways\n\n1. **Personalization at Scale** - AI enables brands to create tailored content for millions of users simultaneously\n2. **Data-Driven Insights** - Real-time analytics inform content strategy decisions\n3. **Efficiency Gains** - Teams report 60% reduction in content production time\n\n## What This Means For You\n\nAs we continue to innovate, our platform puts the power of AI directly in your marketing team's hands. No technical expertise required - just great ideas and BrandAI will help you bring them to life.\n\n*Ready to transform your content strategy? Start your free trial today.*`);
    } finally {
      setGeneratingContent(false);
    }
  };

  const tabs = [
    { id: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
    { id: "brand-voice" as const, label: "Brand Voice", icon: Palette },
    { id: "content" as const, label: "Content Studio", icon: FileText },
    { id: "campaigns" as const, label: "Campaigns", icon: Megaphone },
    { id: "calendar" as const, label: "Calendar", icon: Calendar },
    { id: "seo" as const, label: "SEO Tools", icon: Search },
    { id: "ab-test" as const, label: "A/B Testing", icon: GitBranch },
    { id: "compliance" as const, label: "Compliance", icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
        <div className="flex items-center gap-2 p-4 border-b border-gray-200">
          <Palette className="w-7 h-7 text-primary-600" />
          <span className="text-lg font-bold text-gray-900">BrandAI</span>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id ? "bg-primary-50 text-primary-700" : "text-gray-600 hover:bg-gray-50"}`}>
              <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? "text-primary-600" : "text-gray-400"}`} />
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-6">
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Marketing Dashboard</h1>
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "Content Pieces", value: "282", trend: "+18 this week", icon: FileText, color: "text-blue-500 bg-blue-50" },
                { label: "Total Views", value: "45.2K", trend: "+12.5%", icon: Eye, color: "text-green-500 bg-green-50" },
                { label: "Campaigns Active", value: "8", trend: "3 launching soon", icon: Megaphone, color: "text-purple-500 bg-purple-50" },
                { label: "Brand Score", value: "94%", trend: "+2% from last month", icon: Star, color: "text-yellow-500 bg-yellow-50" },
              ].map((stat) => (
                <div key={stat.label} className="card">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-xs text-green-600 mt-1">{stat.trend}</p>
                </div>
              ))}
            </div>
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Content</h2>
              <div className="space-y-3">
                {sampleContent.slice(0, 5).map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.title}</p>
                        <p className="text-xs text-gray-500 capitalize">{item.type} - {item.date}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${item.status === "published" ? "bg-green-100 text-green-700" : item.status === "approved" ? "bg-blue-100 text-blue-700" : item.status === "review" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-600"}`}>{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "brand-voice" && (
          <div className="max-w-4xl space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Brand Voice Setup</h1>
            <p className="text-gray-500">Define your brand&apos;s personality and writing guidelines for AI-generated content</p>
            <div className="grid grid-cols-2 gap-6">
              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-3">Tone of Voice</h3>
                <input value={brandVoice.tone} onChange={(e) => setBrandVoice({ ...brandVoice, tone: e.target.value })} className="input" />
              </div>
              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-3">Brand Personality</h3>
                <input value={brandVoice.personality} onChange={(e) => setBrandVoice({ ...brandVoice, personality: e.target.value })} className="input" />
              </div>
              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-3">Vocabulary Guidelines</h3>
                <textarea value={brandVoice.vocabulary} onChange={(e) => setBrandVoice({ ...brandVoice, vocabulary: e.target.value })} className="input min-h-[80px]" />
              </div>
              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-3">Writing Style</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-green-600 mb-2">DO</p>
                    {brandVoice.doList.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 mb-1"><CheckCircle className="w-3 h-3 text-green-500" /><span className="text-sm text-gray-700">{item}</span></div>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-red-600 mb-2">DON&apos;T</p>
                    {brandVoice.dontList.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 mb-1"><AlertTriangle className="w-3 h-3 text-red-500" /><span className="text-sm text-gray-700">{item}</span></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <button className="btn-primary">Save Brand Voice</button>
          </div>
        )}

        {activeTab === "content" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Content Studio</h1>
            </div>
            <div className="grid grid-cols-6 gap-3">
              {contentTypes.map((type) => (
                <button key={type.id} onClick={() => setSelectedContentType(type.id)}
                  className={`p-4 rounded-xl border-2 text-center transition-colors ${selectedContentType === type.id ? "border-primary-500 bg-primary-50" : "border-gray-200 hover:border-gray-300"}`}>
                  <type.icon className="w-6 h-6 mx-auto text-primary-600 mb-2" />
                  <p className="text-xs font-medium text-gray-900">{type.name}</p>
                  <p className="text-[10px] text-gray-400">{type.samples} pieces</p>
                </button>
              ))}
            </div>
            <div className="flex gap-4">
              <div className="flex-1 card">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><Sparkles className="w-4 h-4 text-primary-600" /> AI Content Generator</h3>
                <textarea value={contentPrompt} onChange={(e) => setContentPrompt(e.target.value)}
                  className="input min-h-[100px] mb-3" placeholder="Describe what content you want to create..." />
                <button onClick={generateContent} disabled={generatingContent} className="btn-primary w-full">
                  {generatingContent ? "Generating..." : "Generate Content"}
                </button>
                {generatedContent && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-500">Generated Content</span>
                      <button onClick={() => { navigator.clipboard.writeText(generatedContent); toast.success("Copied!"); }} className="text-xs text-primary-600 flex items-center gap-1"><Copy className="w-3 h-3" /> Copy</button>
                    </div>
                    <div className="text-sm text-gray-800 whitespace-pre-wrap">{generatedContent}</div>
                  </div>
                )}
              </div>
              <div className="w-72 space-y-4">
                <div className="card">
                  <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
                  {["Write a blog post about...", "Create social media campaign for...", "Draft email newsletter about...", "Generate ad copy for...", "Write press release about..."].map((action) => (
                    <button key={action} onClick={() => setContentPrompt(action)} className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-50 text-gray-700 transition-colors">{action}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "campaigns" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Campaign Builder</h1>
              <button className="btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> New Campaign</button>
            </div>
            {[
              { name: "Spring Product Launch", status: "active", channels: ["Social", "Email", "Blog", "Ads"], startDate: "Mar 15", endDate: "Apr 15", budget: "$12,000", performance: "152% of target" },
              { name: "Enterprise Webinar Series", status: "planning", channels: ["Email", "LinkedIn", "Landing Page"], startDate: "Apr 1", endDate: "Apr 30", budget: "$5,000", performance: "N/A" },
              { name: "Q1 Brand Awareness", status: "completed", channels: ["Social", "Ads", "PR"], startDate: "Jan 1", endDate: "Mar 15", budget: "$20,000", performance: "128% of target" },
            ].map((campaign, i) => (
              <div key={i} className="card">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{campaign.name}</h3>
                    <p className="text-sm text-gray-500">{campaign.startDate} - {campaign.endDate}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${campaign.status === "active" ? "bg-green-100 text-green-700" : campaign.status === "completed" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"}`}>{campaign.status}</span>
                    <span className="text-sm font-medium text-gray-900">{campaign.budget}</span>
                  </div>
                </div>
                <div className="flex gap-2 mb-3">
                  {campaign.channels.map((ch) => (<span key={ch} className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">{ch}</span>))}
                </div>
                <p className="text-sm text-gray-600">Performance: <strong>{campaign.performance}</strong></p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "calendar" && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Content Calendar</h1>
            <div className="grid grid-cols-7 gap-3">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div key={day} className="text-center text-xs font-semibold text-gray-500 uppercase py-2">{day}</div>
              ))}
              {calendarEvents.map((day, i) => (
                <div key={i} className="card p-3 min-h-[120px]">
                  <p className="text-xs font-medium text-gray-500 mb-2">{day.date.split("-")[2]}</p>
                  {day.items.map((item, j) => (
                    <div key={j} className={`text-[10px] px-2 py-1 rounded mb-1 ${item.status === "published" ? "bg-green-100 text-green-700" : item.status === "approved" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}`}>
                      {item.title}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "seo" && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">SEO Tools</h1>
            <div className="grid grid-cols-2 gap-6">
              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><Search className="w-4 h-4" /> Keyword Research</h3>
                <input className="input mb-3" placeholder="Enter a keyword..." />
                <div className="space-y-2">
                  {[
                    { keyword: "AI marketing tools", volume: "12,400", difficulty: "Medium", cpc: "$4.50" },
                    { keyword: "marketing automation", volume: "8,900", difficulty: "High", cpc: "$6.20" },
                    { keyword: "content marketing AI", volume: "5,600", difficulty: "Low", cpc: "$3.80" },
                    { keyword: "brand voice AI", volume: "2,100", difficulty: "Low", cpc: "$2.90" },
                  ].map((kw) => (
                    <div key={kw.keyword} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-800">{kw.keyword}</span>
                      <div className="flex gap-3 text-xs text-gray-500">
                        <span>{kw.volume}/mo</span>
                        <span className={kw.difficulty === "Low" ? "text-green-600" : kw.difficulty === "Medium" ? "text-yellow-600" : "text-red-600"}>{kw.difficulty}</span>
                        <span>{kw.cpc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Content Optimization</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg"><p className="text-sm font-medium text-green-800">SEO Score: 85/100</p></div>
                  {["Add meta description (150-160 chars)", "Include target keyword in H1", "Add alt text to images", "Improve internal linking", "Add schema markup"].map((tip) => (
                    <div key={tip} className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gray-300" /><span className="text-sm text-gray-700">{tip}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "ab-test" && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">A/B Testing</h1>
            {[
              { name: "Email Subject Line Test", variantA: "Unlock AI-Powered Marketing Today", variantB: "Transform Your Content Strategy with AI", status: "running", aRate: "24.5%", bRate: "31.2%", winner: "B", confidence: "95%" },
              { name: "CTA Button Copy", variantA: "Get Started Free", variantB: "Start Your AI Journey", status: "completed", aRate: "4.8%", bRate: "3.2%", winner: "A", confidence: "99%" },
            ].map((test, i) => (
              <div key={i} className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">{test.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${test.status === "running" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>{test.status}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg border-2 ${test.winner === "A" ? "border-green-500 bg-green-50" : "border-gray-200"}`}>
                    <p className="text-xs font-medium text-gray-500 mb-1">Variant A</p>
                    <p className="text-sm text-gray-900 mb-2">&quot;{test.variantA}&quot;</p>
                    <p className="text-lg font-bold text-gray-900">{test.aRate}</p>
                  </div>
                  <div className={`p-4 rounded-lg border-2 ${test.winner === "B" ? "border-green-500 bg-green-50" : "border-gray-200"}`}>
                    <p className="text-xs font-medium text-gray-500 mb-1">Variant B</p>
                    <p className="text-sm text-gray-900 mb-2">&quot;{test.variantB}&quot;</p>
                    <p className="text-lg font-bold text-gray-900">{test.bRate}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-3">Winner: Variant {test.winner} ({test.confidence} confidence)</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "compliance" && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Brand Compliance</h1>
            <div className="card bg-green-50 border-green-200">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-lg font-bold text-green-900">Brand Compliance Score: 94%</p>
                  <p className="text-sm text-green-700">All published content meets brand guidelines</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-3">Recent Compliance Checks</h3>
                {[
                  { content: "Blog: AI Marketing Trends", status: "passed", issues: 0 },
                  { content: "Social: Product Update", status: "warning", issues: 2 },
                  { content: "Email: March Newsletter", status: "passed", issues: 0 },
                  { content: "Ad: Enterprise Search", status: "failed", issues: 4 },
                ].map((check, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                    <span className="text-sm text-gray-700">{check.content}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${check.status === "passed" ? "bg-green-100 text-green-700" : check.status === "warning" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                      {check.status} {check.issues > 0 && `(${check.issues} issues)`}
                    </span>
                  </div>
                ))}
              </div>
              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-3">Compliance Rules</h3>
                {["Brand voice consistency", "Logo usage guidelines", "Color palette adherence", "Approved terminology", "Legal disclaimer presence", "Accessibility standards"].map((rule) => (
                  <div key={rule} className="flex items-center gap-2 py-2 border-b border-gray-100 last:border-0">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
