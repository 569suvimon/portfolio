"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore, } from "@/stores/auth.store";
import { useLoadingStore } from "@/stores/loading.store";
import { LoadingKeys } from "@/utils/loadingKeys";
import { ModalService } from "@/services/modal.service";
import { AuthService } from "@/services/auth.service";
import { LoginFormData } from "@/types";


export const useAuth = () => {

  const auth = useAuthStore();
  const loading = useLoadingStore();

  const queryClient = useQueryClient();


  const login = async(data: LoginFormData)=>{

    loading.start(LoadingKeys.LOGIN);

    try {

      const tokens = await AuthService.login(data);


      auth.setTokens({
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
      });


      // ให้ React Query โหลด profile ใหม่
      await queryClient.invalidateQueries({
        queryKey:["profile"]
      });


    } catch(err){

      ModalService.error(
        "Username หรือ Password ไม่ถูกต้อง"
      );

      auth.logout();

      throw err;

    } finally {

      loading.finish(
        LoadingKeys.LOGIN
      );
    }
  };


  const logout = async()=>{

    auth.logout();


    queryClient.removeQueries({
      queryKey:["profile"]
    });

  };


  return {
    login,
    logout,

    isLoginLoading:
      loading.isLoading(
        LoadingKeys.LOGIN
      ),
  };
};