import { Link } from "react-router";
import { motion } from "framer-motion";
import { useAuth } from "../../../context/AuthContext";
import { MapPin, Calendar, Trash2 } from "lucide-react";
import { usePlanActions } from "../hooks/usePlanActions";

const catConfig = {
  sport: {
    label: "Sport",
    accent: "#FF5E3A",
    images: [
      "https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=600&h=340&fit=crop&q=80",
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=340&fit=crop&q=80",
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&h=340&fit=crop&q=80",
    ],
  },
  social: {
    label: "Social",
    accent: "#6366F1",
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=340&fit=crop&q=80",
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=340&fit=crop&q=80",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=340&fit=crop&q=80",
    ],
  },
  life: {
    label: "Life",
    accent: "#10B981",
    images: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=340&fit=crop&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=340&fit=crop&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=340&fit=crop&q=80",
    ],
  },
};

function getCover(plan, cfg) {
  if (plan.coverImage && plan.coverImage.trim()) return plan.coverImage;
  const idNum = Number(plan.id) || 0;
  return cfg.images[idNum % cfg.images.length];
}

export default function PlanCard({ plan }) {
  const { user } = useAuth();
  const { joinPlan, leavePlan, deletePlan } = usePlanActions(plan.id);
  const confirmedPlayers = plan.confirmedPlayers || 1;
  const spotLeft = Math.max(0, plan.capacity - confirmedPlayers);
  const fillPercent = Math.min(100, Math.round((confirmedPlayers / plan.capacity) * 100));
  const cfg = catConfig[plan.category] || catConfig.life;
  const cover = getCover(plan, cfg);

  const isAuthor = user?.id === plan.authorId;
  const hasJoined = plan.participants?.some((p) => p.userId === user?.id) || isAuthor;

  return (
    <motion.article
      className="group overflow-hidden rounded-2xl border border-line/50 bg-surface shadow-sm"
      whileHover={{ y: -4, boxShadow: "0 20px 50px rgba(0,0,0,0.12)" }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link to={`/plan/${plan.id}`} className="relative block h-48 overflow-hidden">
        <img
          src={cover}
          alt={plan.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = cfg.images[0];
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

        <div className="absolute top-3 left-3">
          <span
            className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md"
            style={{ background: `${cfg.accent}cc` }}
          >
            {cfg.label}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-md">
            {spotLeft === 0 ? "Full" : `${spotLeft} spot${spotLeft !== 1 ? "s" : ""} left`}
          </span>
        </div>

        {isAuthor && (
          <button
            onClick={(e) => {
              e.preventDefault();
              deletePlan();
            }}
            aria-label="Delete plan"
            className="absolute bottom-3 right-3 z-10 rounded-lg bg-black/30 p-2 text-white/80 backdrop-blur-md transition-colors hover:bg-red-500/80 hover:text-white"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}

        {hasJoined && (
          <div className="absolute bottom-3 left-3">
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/90 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-md">
              ✓ Going
            </span>
          </div>
        )}
      </Link>

      <Link to={`/plan/${plan.id}`} className="block p-5">
        <h2
          className="text-lg font-bold tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {plan.title}
        </h2>

        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-muted">
          {(plan.date || plan.time) && (
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {plan.date} {plan.time ? `· ${plan.time}` : ""}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {plan.location}
          </span>
        </div>

        <div className="mt-4">
          <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: "var(--color-line)" }}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${fillPercent}%`,
                background: spotLeft === 0 ? "var(--color-danger)" : cfg.accent,
                transition: "width 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />
          </div>
          <p className="mt-1.5 text-xs text-muted">
            {confirmedPlayers} of {plan.capacity} joined
          </p>
        </div>
      </Link>

      <div className="flex items-center justify-between border-t border-line/40 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          {plan.participants && plan.participants.length > 0 ? (
            <>
              <div className="flex -space-x-2">
                {plan.participants.slice(0, 4).map((part, idx) => (
                  <div
                    key={part.id || idx}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white ring-2 ring-surface"
                    style={{ background: cfg.accent, zIndex: 10 - idx }}
                    title={part.user?.name || "Participant"}
                  >
                    {part.user?.name ? part.user.name.charAt(0).toUpperCase() : "P"}
                  </div>
                ))}
              </div>
              <span className="text-xs font-medium text-muted">
                {plan.participants.length} going
              </span>
            </>
          ) : (
            <span className="text-xs italic text-muted">Be the first!</span>
          )}
        </div>

        {!isAuthor && (
          <div className="flex items-center gap-2">
            {hasJoined && (
              <button
                onClick={leavePlan}
                className="text-xs font-semibold text-muted transition-colors hover:text-red-500"
              >
                Leave
              </button>
            )}
            <button
              onClick={joinPlan}
              disabled={spotLeft === 0 || hasJoined}
              className="rounded-full px-4 py-2 text-xs font-bold text-white transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
              style={{ background: hasJoined ? "#10B981" : cfg.accent }}
            >
              {hasJoined ? "Joined" : spotLeft === 0 ? "Full" : "I'm In"}
            </button>
          </div>
        )}
      </div>
    </motion.article>
  );
}
