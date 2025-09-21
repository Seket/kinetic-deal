import { CreateDealDialog } from "@/components/CreateDealDialog";
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
  ArrowDownRight,
  Activity
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { getDeals, getActivities, getLeads } from "@/lib/supabase";
import { Tables } from "@/integrations/supabase/types";
import { formatDistanceToNow } from 'date-fns';

const Dashboard = () => {
  const [deals, setDeals] = useState<Tables<'deals'>[]>([]);
  const [activities, setActivities] = useState<Tables<'activities'>[]>([]);
  const [leads, setLeads] = useState<Tables<'leads'>[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [dealsData, activitiesData, leadsData] = await Promise.all([
        getDeals(),
        getActivities(),
        getLeads(),
      ]);
      setDeals(dealsData as Tables<'deals'>[]);
      setActivities(activitiesData as Tables<'activities'>[]);
      setLeads(leadsData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const topDeals = deals
    .sort((a, b) => (b.value || 0) - (a.value || 0))
    .slice(0, 3);

  const recentActivities = activities.slice(0, 3);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call': return Phone;
      case 'email': return Mail;
      case 'meeting': return Users;
      case 'task': return Clock;
      default: return Activity;
    }
  }

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
            <div className="text-2xl font-bold">{formatCurrency(deals.reduce((acc, deal) => acc + (deal.value || 0), 0))}</div>
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
            <div className="text-2xl font-bold text-foreground">{deals.length}</div>
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
            <div className="text-2xl font-bold text-foreground">
              {deals.length > 0 ? `${Math.round(deals.filter(d => d.is_won).length / deals.length * 100)}%` : 'N/A'}
            </div>
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
            <div className="text-2xl font-bold text-foreground">{leads.length}</div>
            <div className="flex items-center gap-1 text-xs text-success mt-1">
              <ArrowUpRight className="h-3 w-3" />
              <span>+8 this week</span>
            </div>
          </CardContent>
        </Card>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <p>Loading dashboard...</p>
        </div>
      ) : (
        <>
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
                {recentActivities.map((activity) => {
                  const Icon = getActivityIcon(activity.type);
                  return (
                    <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-smooth">
                      <div className={`p-2 rounded-lg bg-background`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-foreground">{activity.title}</p>
                        <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}</p>
                      </div>
                    </div>
                  );
                })}
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
                <CreateDealDialog onDealCreated={fetchData}>
                  <Button className="w-full gradient-primary text-white justify-start">
                    <Target className="h-4 w-4 mr-2" />
                    Create New Deal
                  </Button>
                </CreateDealDialog>
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
                      <p className="text-xs text-muted-foreground">{(deal as any).company?.name || 'N/A'}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {(deal as any).stage?.name || 'N/A'}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm">{formatCurrency(deal.value || 0)}</p>
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
        </>
      )}
    </div>
  );
};

export default Dashboard;