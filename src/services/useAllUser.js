import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getUsers } from "./elearingApi";
import { deleteUsers } from "./elearingApi";
import { createUsers } from "./elearingApi";
import { updateUsers } from "./elearingApi";

export function useAllUser() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getUsers,
  });
  if (error) [console.log("eror loading ")];
  return { data, isLoading, error };
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  const { mutate: createUser } = useMutation({
    mutationFn: (data) => createUsers(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allUsers"],
      });

      toast.success("Learner was successfully created");
    },
    onError: () => {
      toast.error("Could not create Learner");
    },
  });
  return { createUser };
}

export function useUpdateLearner() {
  const queryClient = useQueryClient();
  const { mutate: updateLearner } = useMutation({
    mutationFn: (data) => updateUsers(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allUsers"],
      });

      toast.success("Learner was successfully edited");
    },
    onError: () => {
      toast.error("Could not edit Learner");
    },
  });
  return { updateLearner };
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  const { mutate: deleteUser } = useMutation({
    mutationFn: (data) => deleteUsers(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryFn: ["allUsers"],
      });
      toast.success("Learner was successfully deleted");
    },
    onError: () => {
      toast.error("Could not Delete Learner");
    },
  });
  return { deleteUser };
}
