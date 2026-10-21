import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { apiFetch } from "../utils/api";
import ChatRoom from "./ChatRoom";
import { ChevronLeft, MapPin, Calendar, Clock, Check, Users, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { usePlanActions } from "../features/plans/hooks/usePlanActions";

const catConfig = {
  sport: {
    color: "#FF5E3A",
    label: "Sport",
    fallbackPhoto: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=340&fit=crop&q=80",
  },
  social: {
    color: "#6366F1",
    label: "Social",
    fallbackPhoto: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=340&fit=crop&q=80",
  },
  life: {
    color: "#10B981",
    label: "Life",
    fallbackPhoto: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=340&fit=crop&q=80",
  },
};

export default function PlanDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const { joinPlan, leavePlan, isJoining, isLeaving } = usePlanActions(id);

  const {
    data: plan,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["plan", id],
    queryFn: async () => {
      const response = await apiFetch(`/api/plans/${id}`);
      if (!response.ok) throw new Error("Failed to fetch plan");
      return response.json();
    },
  });

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center py-28">
        <div
          className="mb-5 h-10 w-10 animate-spin rounded-full border-[3px]"
          style={{
            borderColor: "var(--color-line)",
            borderTopColor: "var(--color-green)",
          }}
        />
        <p
          className="text-lg font-bold"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Loading the details…
        </p>
      </div>
    );

  if (isError || !plan)
    return (
      <div className="mx-auto max-w-md py-24 text-center">
        <div
          className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold text-white"
          style={{ background: "var(--color-coral)" }}
        >
          ?
        </div>
        <h2
          className="text-2xl font-bold"
          style={{ fontFamily: "var(--font-display)" }}
        >
          This plan doesn't exist
        </h2>
        <p className="mt-2 text-muted">
          It might have been removed, or the link is broken.
        </p>
        <Link to="/explore" className="btn-primary mt-6 inline-flex">
          Back to explore
        </Link>
      </div>
    );

  const cfg = catConfig[plan.category] || catConfig.life;
  const confirmed = plan.confirmedPlayers || 1;
  const spotsLeft = Math.max(0, plan.capacity - confirmed);
  const fillPercent = Math.min(100, Math.round((confirmed / plan.capacity) * 100));
  const isAuthor = user?.id === plan.authorId;
  const hasJoined = plan.participants?.some(
    (participant) => participant.userId === user?.id,
  ) || isAuthor;

  const imageUrl = (plan.coverImage && plan.coverImage.trim()) || cfg.fallbackPhoto;

  return (
    <motion.div
      className="container mx-auto max-w-6xl py-8 sm:py-12"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        to="/explore"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition-colors hover:text-ink"
      >
        <ChevronLeft className="h-4 w-4" />
        All plans
      </Link>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-7">
          <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-md">
            <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-surface-warm">
              <img
                src={imageUrl}
                alt={plan.title}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = cfg.fallbackPhoto;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute top-4 left-4">
                <span
                  className="rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md backdrop-blur-md"
                  style={{ background: `${cfg.color}e6` }}
                >
                  {cfg.label}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                  {fillPercent}% full
                </span>
              </div>
              <div className="absolute bottom-5 left-6 right-6 text-white">
                <h1
                  className="text-2xl sm:text-4xl font-extrabold leading-tight tracking-tight drop-shadow-sm"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {plan.title}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-white/90">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 shrink-0 text-white/70" />
                    {plan.location}
                  </span>
                  {plan.date && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 shrink-0 text-white/70" />
                      {plan.date}
                    </span>
                  )}
                  {plan.time && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 shrink-0 text-white/70" />
                      {plan.time}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-3 gap-4 rounded-xl bg-surface-warm/60 border border-line p-4 text-center mb-6">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted">Joined</p>
                  <p className="mt-1 text-2xl font-extrabold text-ink" style={{ fontFamily: "var(--font-display)" }}>
                    {confirmed}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted">Capacity</p>
                  <p className="mt-1 text-2xl font-extrabold text-ink" style={{ fontFamily: "var(--font-display)" }}>
                    {plan.capacity}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted">Spots Left</p>
                  <p
                    className="mt-1 text-2xl font-extrabold"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: spotsLeft === 0 ? "var(--color-coral)" : cfg.color,
                    }}
                  >
                    {spotsLeft}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <div className="mb-2 flex items-center justify-between text-xs font-semibold">
                  <span className="text-muted">
                    {spotsLeft === 0 ? "Fully booked" : "Room available to join"}
                  </span>
                  <span style={{ color: cfg.color }}>{fillPercent}% capacity</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-line">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${fillPercent}%`,
                      background: spotsLeft === 0 ? "var(--color-coral)" : cfg.color,
                    }}
                  />
                </div>
              </div>

              {!isAuthor && (
                <div className="flex gap-3 mb-6">
                  <button
                    onClick={joinPlan}
                    disabled={spotsLeft === 0 || hasJoined || isJoining}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:brightness-105 disabled:opacity-50"
                    style={{
                      background: hasJoined
                        ? "var(--color-green)"
                        : spotsLeft === 0
                          ? "var(--color-muted)"
                          : cfg.color,
                    }}
                  >
                    {hasJoined ? (
                      <>
                        <Check className="h-4 w-4" />
                        You're In
                      </>
                    ) : spotsLeft === 0 ? (
                      "Plan is Full"
                    ) : isJoining ? (
                      "Joining..."
                    ) : (
                      "Join This Plan"
                    )}
                  </button>

                  {hasJoined && (
                    <button
                      onClick={leavePlan}
                      disabled={isLeaving}
                      className="rounded-xl border border-line px-5 py-3 text-sm font-bold text-muted hover:bg-surface-warm hover:text-ink transition-colors disabled:opacity-50"
                    >
                      {isLeaving ? "..." : "Leave"}
                    </button>
                  )}
                </div>
              )}

              {plan.description && (
                <div className="mb-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-2">
                    About this plan
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-secondary whitespace-pre-line bg-surface-warm/30 rounded-xl p-4 border border-line/60">
                    {plan.description}
                  </p>
                </div>
              )}

              {plan.author && (
                <div className="flex items-center gap-3 pt-4 border-t border-line/60">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white shadow-sm"
                    style={{ background: cfg.color }}
                  >
                    {plan.author.name?.charAt(0).toUpperCase() || "H"}
                  </div>
                  <div>
                    <p className="text-xs text-muted">Hosted by</p>
                    <p className="text-sm font-bold text-ink">{plan.author.name}</p>
                  </div>
                </div>
              )}

              {plan.participants && plan.participants.length > 0 && (
                <div className="mt-6 pt-4 border-t border-line/60">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-4 w-4 text-muted" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
                      Participants ({plan.participants.length})
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {plan.participants.map((part) => (
                      <div
                        key={part.id}
                        className="flex items-center gap-2 rounded-full border border-line bg-surface-warm/50 px-3 py-1 text-xs font-semibold text-ink"
                      >
                        <span
                          className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
                          style={{ background: cfg.color }}
                        >
                          {part.user?.name?.charAt(0).toUpperCase() || "U"}
                        </span>
                        <span>{part.user?.name || "Participant"}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <ChatRoom planId={plan.id} initialMessage={plan.messages || []} />
        </div>
      </div>
    </motion.div>
  );
}
