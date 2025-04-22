import { fetchLogin } from "@/apis/auth";
import { MUTATIONKEYS } from "@/queries-mutations/keys";
import { LoginProps } from "@/types/auth.types";
import { useMutation, useQuery } from "@tanstack/react-query";
export const useLogin = () => {
  return useMutation({
    mutationFn: async (loginProps: LoginProps) => {
      // remember to add the type here instead of an object
      const data = await fetchLogin<"replace with right type">(loginProps);
      return data;
    },
    mutationKey: [MUTATIONKEYS.login],
  });
};
