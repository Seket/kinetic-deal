import { useState } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { PipelineStage, Deal } from "@/types/pipeline";
import { DealCard } from "@/components/DealCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PipelineBoardProps {
  stages: PipelineStage[];
  onDealMove?: (dealId: string, newStage: string) => void;
}

export const PipelineBoard = ({ stages: initialStages, onDealMove }: PipelineBoardProps) => {
  const [stages, setStages] = useState(initialStages);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const dealId = active.id as string;
    const newStageId = over.id as string;

    // Find the deal and its current stage
    let currentStage: PipelineStage | undefined;
    let deal: Deal | undefined;

    for (const stage of stages) {
      const foundDeal = stage.deals.find(d => d.id === dealId);
      if (foundDeal) {
        currentStage = stage;
        deal = foundDeal;
        break;
      }
    }

    if (!deal || !currentStage || currentStage.id === newStageId) return;

    // Update the stages
    const updatedStages = stages.map(stage => {
      if (stage.id === currentStage!.id) {
        // Remove deal from current stage
        return {
          ...stage,
          deals: stage.deals.filter(d => d.id !== dealId)
        };
      } else if (stage.id === newStageId) {
        // Add deal to new stage
        return {
          ...stage,
          deals: [...stage.deals, { ...deal!, stage: newStageId }]
        };
      }
      return stage;
    });

    setStages(updatedStages);
    onDealMove?.(dealId, newStageId);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const calculateStageValue = (deals: Deal[]) => {
    return deals.reduce((total, deal) => total + deal.value, 0);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 overflow-x-auto pb-6">
        {stages.map((stage) => (
          <div key={stage.id} className="flex-shrink-0 w-80">
            <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: stage.color }}
                    />
                    <CardTitle className="text-lg font-semibold">
                      {stage.name}
                    </CardTitle>
                  </div>
                  <Badge variant="secondary" className="bg-muted text-muted-foreground">
                    {stage.deals.length}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {formatCurrency(calculateStageValue(stage.deals))}
                  </span>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent>
                <SortableContext
                  items={stage.deals.map(deal => deal.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-3 min-h-[400px]">
                    {stage.deals.map((deal) => (
                      <DealCard key={deal.id} deal={deal} />
                    ))}
                  </div>
                </SortableContext>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </DndContext>
  );
};