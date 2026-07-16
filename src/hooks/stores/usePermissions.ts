import { useProfile } from "@/hooks/stores/useProfile";



export function usePermissions() {

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useProfile();


  const permissions = user?.permissions ?? [];


  const hasPermission = (permission:string) =>
    permissions.includes(permission);


  return {
    user,
    permissions,

    isLoading,
    isError,
    error,

    hasPermission,
  };
}