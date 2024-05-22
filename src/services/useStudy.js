import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getStudies } from "./elearingApi";
import { createStudies } from "./elearingApi";
import { updateStudy } from "./elearingApi";
import { deleteStudy } from "./elearingApi";

export function useStudy() {
  const { data, isLoading } = useQuery({
    queryKey: ["study"],
    queryFn: getStudies,
  });

  return { data, isLoading };
}

// //////////////////////////////////////////////////////////////////////

// Creating a Course

// /////////////////////////////////////////////////////////////////////

export function useCreateStudy() {
  const queryClient = useQueryClient();
  const { mutate: createStudy, onSuccess } = useMutation({
    mutationFn: (info) => createStudies(info),
    onSuccess: () => {
      toast.success("Course was successfully created");
      queryClient.invalidateQueries({
        queryKey: ["study"],
      });
    },
    onError: () => {
      toast.error("Error creating Course");
    },
  });
  return { createStudy, onSuccess };
}

// //////////////////////////////////////////////////////////////////////

// Updating a Course

// /////////////////////////////////////////////////////////////////////

export function useUpdateStudy() {
  const queryClient = useQueryClient();

  const { mutate: update } = useMutation({
    mutationFn: (info) => updateStudy(info),
    onSuccess: () => {
      toast.success("Course was successsully updated", {
        style: {
          color: "#152D30",
        },
        iconTheme: {
          primary: "#E45399",
        },
      });
      queryClient.invalidateQueries({
        queryKey: ["study"],
      });
    },
    onError: () => {
      toast.error("Error updating Course");
    },
  });
  return { update };
}

// //////////////////////////////////////////////////////////////////////

// Delete a Course

// /////////////////////////////////////////////////////////////////////

export function useDeleteStudy() {
  const queryClient = useQueryClient();

  const { mutate: deleteCourse, isLoading: isDeleting } = useMutation({
    mutationFn: (info) => deleteStudy(info),

    onSuccess: () => {
      toast.success("Course was successsully Deleted", {
        style: {
          color: "#152D30",
        },
        iconTheme: {
          primary: "#E45399",
        },
      });
      queryClient.invalidateQueries({
        queryKey: ["study"],
      });
    },
    onError: () => {
      toast.error("Error Deleting Course");
    },
  });
  return { deleteCourse, isDeleting };
}
