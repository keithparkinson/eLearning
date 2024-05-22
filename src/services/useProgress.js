import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
// import { toast } from "react-hot-toast";
import { createProgress } from "./elearingApi";
import { getProgress } from "./elearingApi";
import { updateProgress } from "./elearingApi";

export function useGetProgress() {
  const { data, isLoading } = useQuery({
    queryFn: getProgress,
    queryKey: ["progress"],
  });
  return { data, isLoading };
}

export function useCreateProgress() {
  const queryClient = useQueryClient();
  const { mutate: createProg } = useMutation({
    mutationFn: (data) => createProgress(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["progress"],
      });
    },
  });
  return { createProg };
}

export function useUpdateProgress() {
  const queryClient = useQueryClient();
  const { mutate: updateProg } = useMutation({
    mutationFn: (data) => updateProgress(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["progress"],
      }),
        toast.success("Course successfully mark as complete");
    },
    onError: () => {
      toast.error("There was an error updating course progress");
    },
  });
  return { updateProg };
}
