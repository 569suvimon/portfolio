import { useQuery } from "@tanstack/react-query";
import { AuthService } from "@/services";


export function useProfile() {

  return useQuery({
    queryKey: ["profile"],
    queryFn: AuthService.profile,
  });

}