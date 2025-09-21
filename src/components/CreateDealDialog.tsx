import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createDeal, getPipelineStages, getCompanies } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Tables } from "@/types/supabase";
import { useToast } from "@/hooks/use-toast";

const dealSchema = z.object({
  title: z.string().min(1, "Title is required"),
  value: z.number().positive("Value must be positive"),
  stage_id: z.string().min(1, "Stage is required"),
  company_id: z.string().optional(),
  description: z.string().optional(),
});

interface CreateDealDialogProps {
  children: React.ReactNode;
  onDealCreated: () => void;
}

export const CreateDealDialog = ({ children, onDealCreated }: CreateDealDialogProps) => {
  const [open, setOpen] = useState(false);
  const [stages, setStages] = useState<Tables<'pipeline_stages'>[]>([]);
  const [companies, setCompanies] = useState<Tables<'companies'>[]>([]);
  const { toast } = useToast();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(dealSchema),
    defaultValues: {
      title: "",
      value: 0,
      stage_id: "",
      company_id: "",
      description: "",
    },
  });

  useEffect(() => {
    if (open) {
      const fetchData = async () => {
        try {
          const [stagesData, companiesData] = await Promise.all([
            getPipelineStages(),
            getCompanies(),
          ]);
          setStages(stagesData);
          setCompanies(companiesData);
        } catch (error) {
          console.error("Error fetching data for deal form:", error);
        }
      };
      fetchData();
    }
  }, [open]);

  const onSubmit = async (values: z.infer<typeof dealSchema>) => {
    try {
      await createDeal(values);
      toast({
        title: "Deal Created",
        description: "The new deal has been added to your pipeline.",
      });
      onDealCreated();
      reset();
      setOpen(false);
    } catch (error) {
      console.error("Error creating deal:", error);
      toast({
        title: "Error",
        description: "Failed to create the deal. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Deal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => <Input id="title" {...field} />}
            />
            {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
          </div>
          <div>
            <Label htmlFor="value">Value ($)</Label>
            <Controller
              name="value"
              control={control}
              render={({ field }) => (
                <Input
                  id="value"
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              )}
            />
            {errors.value && <p className="text-sm text-destructive">{errors.value.message}</p>}
          </div>
          <div>
            <Label htmlFor="stage_id">Pipeline Stage</Label>
            <Controller
              name="stage_id"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {stages.map((stage) => (
                      <SelectItem key={stage.id} value={stage.id}>
                        {stage.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.stage_id && <p className="text-sm text-destructive">{errors.stage_id.message}</p>}
          </div>
          <div>
            <Label htmlFor="company_id">Company</Label>
            <Controller
              name="company_id"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => <Textarea id="description" {...field} />}
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Deal"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
