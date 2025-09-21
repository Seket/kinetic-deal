import { Deal } from "@/types/pipeline";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar, DollarSign, TrendingUp, User, Building2 } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface DealCardProps {
  deal: Deal;
}

export const DealCard = ({ deal }: DealCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: deal.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive text-destructive-foreground";
      case "medium":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing hover:shadow-elegant transition-smooth mb-3 bg-card/80 backdrop-blur-sm border-border/50"
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-sm leading-tight text-card-foreground">
            {deal.title}
          </h3>
          <Badge
            variant="secondary"
            className={`text-xs px-2 py-1 ${getPriorityColor(deal.priority)}`}
          >
            {deal.priority}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-3">
        {/* Company and Contact */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Building2 className="h-3 w-3" />
            <span className="font-medium">{deal.company}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <User className="h-3 w-3" />
            <span>{deal.contact}</span>
          </div>
        </div>

        {/* Deal Value */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-lg font-bold text-primary">
            <DollarSign className="h-4 w-4" />
            {formatCurrency(deal.value)}
          </div>
          <div className="flex items-center gap-1 text-xs text-success">
            <TrendingUp className="h-3 w-3" />
            {deal.probability}%
          </div>
        </div>

        {/* Expected Close Date */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>Close: {formatDate(deal.expectedCloseDate)}</span>
        </div>

        {/* Tags */}
        {deal.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {deal.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs px-2 py-0">
                {tag}
              </Badge>
            ))}
            {deal.tags.length > 2 && (
              <Badge variant="outline" className="text-xs px-2 py-0">
                +{deal.tags.length - 2}
              </Badge>
            )}
          </div>
        )}

        {/* Assigned To */}
        <div className="flex items-center gap-2 pt-2 border-t border-border/50">
          <Avatar className="h-6 w-6">
            <AvatarFallback className="text-xs bg-primary text-primary-foreground">
              {deal.assignedTo.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">{deal.assignedTo}</span>
        </div>
      </CardContent>
    </Card>
  );
};