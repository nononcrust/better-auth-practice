import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { authClient } from "./client";
import { SocialProvider } from "./config";

export const accountListQueryOptions = queryOptions({
  queryKey: ["auth", "accounts"],
  queryFn: () => authClient.listAccounts(),
});

export const sessionQueryOptions = queryOptions({
  queryKey: ["auth", "session"],
  queryFn: () => authClient.getSession(),
});

export const useSignInWithEmailMutation = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authClient.signIn.email({
        email,
        password,
      }),
  });
};

export const useSignUpWithEmailMutation = () => {
  return useMutation({
    mutationFn: ({
      email,
      password,
      name,
    }: {
      email: string;
      password: string;
      name: string;
    }) =>
      authClient.signUp.email({
        email,
        password,
        name,
      }),
  });
};

export const useSignOutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authClient.signOut(),
    onSuccess: async () => {
      await queryClient.invalidateQueries(sessionQueryOptions);
    },
  });
};

export const useDeleteUserMutation = () => {
  return useMutation({
    mutationFn: () => authClient.deleteUser(),
  });
};

export const useLinkSocialMutation = () => {
  return useMutation({
    mutationFn: ({ provider }: { provider: SocialProvider }) =>
      authClient.linkSocial({
        provider,
      }),
  });
};

export const useUnlinkSocialMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ providerId }: { providerId: SocialProvider }) =>
      authClient.unlinkAccount({
        providerId,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries(accountListQueryOptions);
    },
  });
};
