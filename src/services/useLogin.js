import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./Authapi";
import { getCurrentUser } from "./Authapi";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: (data) => loginUser(data),
    onSuccess: (data) => {
      console.log(data);
      queryClient.setQueryData(["user", data]);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/home", { replace: true });
    },
    onError: (err) => {
      console.log("Error", err);
    },
  });

  return { login, isLoading };
}

export function useUser() {
  const { isLoading, data, isSuccess } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return { isLoading, data, isSuccess };
}

export function useUpdateUser() {
  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn: "",
    onSuccess: () => {},
  });
  return { updateUser, isLoading };
}
