import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getSites } from "./elearingApi";
import { getUserSites } from "./elearingApi";
import { createSites } from "./elearingApi";
import { updateSites } from "./elearingApi";
import { deleteSites } from "./elearingApi";

export function useSite() {
  const { data, isLoading } = useQuery({
    queryKey: ["userSites"],
    queryFn: getUserSites,
  });
  return { data, isLoading };
}

export function useAllSite() {
  const { data, isLoading } = useQuery({
    queryKey: ["allSites"],
    queryFn: getSites,
  });
  return { data, isLoading };
}

export function useCreateSite() {
  const queryClient = useQueryClient();
  const { mutate: createSite } = useMutation({
    mutationFn: (data) => createSites(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allSites"],
      });
      toast.success("Site was successfully created");
    },
  });
  return { createSite };
}

export function useUpdateSite() {
  const queryClient = useQueryClient();
  const { mutate: updateSite } = useMutation({
    mutationFn: (data) => updateSites(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allSites"],
      });
      toast.success("Site was successfully updated");
    },
    onError: () => {
      toast.error("Error updating site");
    },
  });
  return { updateSite };
}

export function useDeleteSite() {
  const queryClient = useQueryClient();
  const { mutate: deleteSite } = useMutation({
    mutationFn: (data) => deleteSites(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allSites"],
      });
      toast.success("Site was successfully removed");
    },
  });
  return { deleteSite };
}
