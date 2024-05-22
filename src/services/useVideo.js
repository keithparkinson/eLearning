import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getVideos } from "./elearingApi";
import { uploadVideos } from "./elearingApi";
import { updateVideos } from "./elearingApi";

export function useListVideo() {
  const { data, isLoading } = useQuery({
    queryKey: ["videos"],
    queryFn: getVideos,
  });
  return { data, isLoading };
}

export function useUploadVideo() {
  const queryClient = useQueryClient();
  const { mutate: uploadVideo } = useMutation({
    mutationFn: (video) => uploadVideos(video),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["videos"],
      });
    },
  });
  return { uploadVideo };
}

export function useUpdateVideo() {
  const queryClient = useQueryClient();
  const { mutate: updateVideo } = useMutation({
    mutationFn: (video) => updateVideos(video),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["videos"],
      });
    },
  });
  return { updateVideo };
}
