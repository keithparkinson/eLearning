import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContents } from "./elearingApi";
import { getContents } from "./elearingApi";

export function useGetContent() {
  const { data, isLoading } = useQuery({
    queryFn: getContents,
    queryKey: ["contents"],
  });
  return { data, isLoading };
}

export function useContent() {
  const queryClient = useQueryClient();
  const { mutate: createContent } = useMutation({
    mutationFn: (content) => createContents(content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contents"],
      });
    },
  });
  return { createContent };
}
