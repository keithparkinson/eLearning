import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useContext } from "react";
import { toast } from "react-hot-toast";
// import { NewModuleContext } from "../components/NewModuleContext";
import { getModules } from "../services/elearingApi";
import { updateModules } from "../services/elearingApi";
import { deleteModules } from "../services/elearingApi";
import { createModules } from "../services/elearingApi";

export function useModule() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["modules"],
    queryFn: getModules,
  });
  if (error) {
    return "An error occored";
  }

  return { data, isLoading, error };
}

export function useCreateModule() {
  const queryClient = useQueryClient();

  const { mutate: createModule } = useMutation({
    mutationFn: (data) => createModules(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["modules"],
      });
      toast.success("Module was successfully created");
    },
    onError: () => {
      toast.error("Error creating module");
    },
  });
  return { createModule };
}

export function useUpdateModule() {
  // const { setEditModule } = useContext(NewModuleContext);
  const queryClient = useQueryClient();

  const { mutate: updateModule, isSuccess } = useMutation({
    mutationFn: (data) => updateModules(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["modules"],
      });

      toast.success("Updated");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
  return { updateModule, isSuccess };
}

export function useDeleteModule() {
  const queryClient = useQueryClient();
  const { mutate: deleteModule } = useMutation({
    mutationFn: (data) => deleteModules(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["modules"],
      });
      toast.success("Module was Deleted");
    },
    onError: () => {
      toast.error("Could not delete Module");
    },
  });
  return { deleteModule };
}
