import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { uplaodImages } from "./elearingApi";
import { getImages } from "./elearingApi";

export function useImages() {
  const { data, isloading } = useQuery({
    queryFn: getImages,
    queryKey: ["images"],
  });
  return { data, isloading };
}

export function useUploadImage() {
  const queryClient = useQueryClient();
  const { mutate: uploadImage } = useMutation({
    mutationFn: (image) => uplaodImages(image),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["images"],
      });
    },
    onError: () => {
      toast.error("Error uploading images");
    },
  });
  return { uploadImage };
}
