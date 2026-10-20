import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../../../utils/api";

export function usePlanActions(planId) {
  const queryClient = useQueryClient();

  const invalidatePlans = () => {
    queryClient.invalidateQueries({ queryKey: ["plans"] });
    queryClient.invalidateQueries({ queryKey: ["userPlans"] });
    queryClient.invalidateQueries({ queryKey: ["joinedPlans"] });
  };

  const joinMutation = useMutation({
    mutationFn: async () =>
      apiFetch(`/api/plans/${planId}/join`, { method: "POST" }),
    onSuccess: invalidatePlans,
  });

  const leaveMutation = useMutation({
    mutationFn: async () =>
      apiFetch(`/api/plans/${planId}/leave`, { method: "DELETE" }),
    onSuccess: invalidatePlans,
  });

  const deleteMutation = useMutation({
    mutationFn: async () =>
      apiFetch(`/api/plans/${planId}`, { method: "DELETE" }),
    onSuccess: invalidatePlans,
  });

  return {
    joinPlan: () => joinMutation.mutate(),
    leavePlan: () => leaveMutation.mutate(),
    deletePlan: () => deleteMutation.mutate(),
    isJoining: joinMutation.isPending,
    isLeaving: leaveMutation.isPending,
  };
}
