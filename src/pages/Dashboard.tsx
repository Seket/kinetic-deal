import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target, 
  Calendar, 
  Phone, 
  Mail, 
  Clock,
  Award,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const recentActivities = [
    {
      id: 1,
      type: "deal",
      title: "Deal moved to Negotiation",
      description: "Security Audit Service - FinanceFirst",
      time: "2 hours ago",
      icon: Target,
      color: "text-primary"
    },
    {
      id: 2,
      type: "call",
      title: "Call scheduled",
      description: "Follow-up with TechCorp Inc.",
      time: "4 hours ago",
      icon: Phone,
      color: "text-success"
    },
    {
      id: 3,
      type: "email",
      title: "Proposal sent",
      description: "CRM Implementation - MidSize Corp",
      time: "1 day ago",
      icon: Mail,
      color: "text-warning"
    }
  ];

  const topDeals = [
    {
      id: 1,
      title: "Cloud Infrastructure",
      company: "Global Solutions",
      value: 120000,
      stage: "Demo",
      probability: 70,
      daysInStage: 5
    },
    {
      id: 2,
      title: "Enterprise Software License",
      company: "TechCorp Inc.",
      value: 75000,
      stage: "Prospecting",
      probability: 25,
      daysInStage: 12
    },
    {
      id: 3,
      title: "CRM Implementation",
      company: "MidSize Corp",
      value: 45000,
      stage: "Proposal",
      probability: 80,
      daysInStage: 3
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, Sarah!</h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your sales pipeline today
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Today</div>
          <div className="text-lg font-semibold">{new Date().toLocaleDateString('en-US', { 
            weekday: 'long',
            month: 'long', 
            day: 'numeric'
          })}</div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-primary text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231</div>
            <div className="flex items-center gap-1 text-xs opacity-80 mt-1">
              <ArrowUpRight className="h-3 w-3" />
              <span>+20.1% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Deals</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">23</div>
            <div className="flex items-center gap-1 text-xs text-success mt-1">
              <ArrowUpRight className="h-3 w-3" />
              <span>+15% this week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Win Rate</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">68%</div>
            <div className="flex items-center gap-1 text-xs text-destructive mt-1">
              <ArrowDownRight className="h-3 w-3" />
              <span>-2% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">New Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">12</div>
            <div className="flex items-center gap-1 text-xs text-success mt-1">
              <ArrowUpRight className="h-3 w-3" />
              <span>+8 this week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-smooth">
                <div className={`p-2 rounded-lg bg-background ${activity.color}`}>
                  <activity.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground">{activity.title}</p>
                  <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4">
              View All Activities
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full gradient-primary text-white justify-start">
              <Target className="h-4 w-4 mr-2" />
              Create New Deal
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              Add Lead
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Meeting
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Phone className="h-4 w-4 mr-2" />
              Log Call
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Top Deals & Pipeline Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Deals This Month</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topDeals.map((deal) => (
              <div key={deal.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex-1">
                  <p className="font-medium text-sm">{deal.title}</p>
                  <p className="text-xs text-muted-foreground">{deal.company}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {deal.stage}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {deal.daysInStage} days
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">{formatCurrency(deal.value)}</p>
                  <p className="text-xs text-success">{deal.probability}%</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Revenue Goal</span>
                <span className="font-medium">$45,231 / $60,000</span>
              </div>
              <Progress value={75} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">75% of monthly target</p>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Deals Closed</span>
                <span className="font-medium">8 / 12</span>
              </div>
              <Progress value={67} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">67% of monthly target</p>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Activities</span>
                <span className="font-medium">156 / 200</span>
              </div>
              <Progress value={78} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">78% of monthly target</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;