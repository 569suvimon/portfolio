import { useQuery } from "@tanstack/react-query";
import { AuthService } from "@/services/auth.service";


export function useProfile() {

  return useQuery({
    queryKey: ["profile"],
    queryFn: AuthService.profile,
  });

}