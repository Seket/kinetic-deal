import { PipelineBoard } from "@/components/PipelineBoard";
import { getPipelineStages, getDeals, moveDeal } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Search, Calendar, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { PipelineStage } from "@/types/pipeline";
import { Tables } from "@/types/supabase";

const Pipeline = () => {
  const [stages, setStages] = useState<PipelineStage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [ownerFilter, setOwnerFilter] = useState("all");

  const handleDealMove = async (dealId: string, newStageId: string) => {
    try {
      await moveDeal(dealId, newStageId);
      // Refresh data after moving a deal
      fetchData();
    } catch (error) {
      console.error("Error moving deal:", error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [stagesData, dealsData] = await Promise.all([
        getPipelineStages(),
        getDeals({ search, owner: ownerFilter }),
      ]);

      const stagesWithDeals: PipelineStage[] = stagesData.map((stage) => ({
        ...stage,
        deals: dealsData.filter((deal) => deal.stage_id === stage.id) as Tables<'deals'>[],
      }));

      setStages(stagesWithDeals);
    } catch (error) {
      console.error("Error fetching pipeline data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchData();
    }, 500); // Debounce search input

    return () => clearTimeout(debounceTimer);
  }, [search, ownerFilter]);

  const totalValue = stages.reduce((total, stage) =>
    total + stage.deals.reduce((stageTotal, deal) => stageTotal + (deal.value || 0), 0), 0
  );

  const totalDeals = stages.reduce((total, stage) => total + stage.deals.length, 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sales Pipeline</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track your deals through the sales process
          </p>
        </div>
        <Button className="gradient-primary text-white font-medium">
          <Calendar className="h-4 w-4 mr-2" />
          Pipeline Review
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-primary text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Total Pipeline Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalValue)}</div>
            <p className="text-xs opacity-75 mt-1">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Deals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalDeals}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all stages</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Deal Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(totalDeals > 0 ? totalValue / totalDeals : 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Per deal</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Expected Close</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">15</div>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search deals, companies, contacts..."
                className="pl-10 bg-background/50"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={ownerFilter} onValueChange={setOwnerFilter}>
                <SelectTrigger className="w-32">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Deals</SelectItem>
                  <SelectItem value="my">My Deals</SelectItem>
                  <SelectItem value="team">Team Deals</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="all-owners">
                <SelectTrigger className="w-40">
                  <Users className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-owners">All Owners</SelectItem>
                  <SelectItem value="sarah">Sarah Johnson</SelectItem>
                  <SelectItem value="mike">Mike Wilson</SelectItem>
                  <SelectItem value="david">David Chen</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4">
            <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
              High Priority <span className="ml-1">×</span>
            </Badge>
            <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
              Enterprise <span className="ml-1">×</span>
            </Badge>
            <Button variant="ghost" size="sm" className="h-6 text-xs">
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Pipeline Board */}
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <p>Loading pipeline...</p>
        </div>
      ) : (
        <PipelineBoard stages={stages} onDealMove={handleDealMove} />
      )}
    </div>
  );
};

export default Pipeline;