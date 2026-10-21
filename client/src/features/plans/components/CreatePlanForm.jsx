import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { apiFetch } from "../../../utils/api";
import { MapPin, Calendar, Clock, ArrowRight, Link as LinkIcon, Users } from "lucide-react";

const vibes = [
  {
    value: "sport",
    label: "Sport",
    emoji: "🏀",
    accent: "#FF5E3A",
    defaultPhoto: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=340&fit=crop&q=80",
    presets: [
      { label: "Hoops", url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=340&fit=crop&q=80" },
      { label: "Track", url: "https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=600&h=340&fit=crop&q=80" },
      { label: "Tennis", url: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&h=340&fit=crop&q=80" },
    ],
  },
  {
    value: "social",
    label: "Social",
    emoji: "☕",
    accent: "#6366F1",
    defaultPhoto: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=340&fit=crop&q=80",
    presets: [
      { label: "Coffee", url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=340&fit=crop&q=80" },
      { label: "Hangout", url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=340&fit=crop&q=80" },
      { label: "Dinner", url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=340&fit=crop&q=80" },
    ],
  },
  {
    value: "life",
    label: "Life",
    emoji: "🌿",
    accent: "#10B981",
    defaultPhoto: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=340&fit=crop&q=80",
    presets: [
      { label: "Hike", url: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=340&fit=crop&q=80" },
      { label: "Scenic", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=340&fit=crop&q=80" },
      { label: "Forest", url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=340&fit=crop&q=80" },
    ],
  },
];

const allPresets = vibes.flatMap((v) => v.presets);

export default function CreatePlanForm() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    capacity: 4,
    category: "sport",
    time: "",
    date: "",
    description: "",
    coverImage: "",
  });

  const [showCustomUrl, setShowCustomUrl] = useState(false);
  const navigate = useNavigate();
  const titleInputRef = useRef(null);
  const queryClient = useQueryClient();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  const createPlanMutation = useMutation({
    mutationFn: async (newPlanData) => {
      const response = await apiFetch("/api/plans", {
        method: "POST",
        body: JSON.stringify(newPlanData),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      queryClient.invalidateQueries({ queryKey: ["userPlans"] });
      navigate("/explore");
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    createPlanMutation.mutate(formData);
  }

  const selectedVibe = vibes.find((v) => v.value === formData.category) || vibes[0];
  const activeCover = formData.coverImage.trim() || selectedVibe.defaultPhoto;

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  return (
    <motion.div
      className="container mx-auto max-w-5xl py-6 sm:py-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h1
          className="text-2xl sm:text-3xl font-black tracking-tight text-ink"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Start a Plan
        </h1>
        <p className="text-xs sm:text-sm text-muted">
          Fill in the details and launch an activity for people nearby.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="space-y-4 lg:col-span-7 bg-surface p-6 rounded-2xl border border-line shadow-sm">
          <div>
            <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted">
              Category
            </label>
            <div className="grid grid-cols-3 gap-2">
              {vibes.map((vibe) => {
                const isSelected = formData.category === vibe.value;
                return (
                  <button
                    key={vibe.value}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        category: vibe.value,
                        coverImage: prev.coverImage ? prev.coverImage : vibe.defaultPhoto,
                      }));
                    }}
                    className={`flex items-center justify-center gap-1.5 rounded-xl py-2 px-3 text-xs font-bold transition-all ${
                      isSelected
                        ? "text-white shadow-sm scale-[1.02]"
                        : "border border-line bg-surface-warm/50 text-ink hover:bg-surface-warm"
                    }`}
                    style={isSelected ? { background: vibe.accent } : {}}
                  >
                    <span>{vibe.emoji}</span>
                    <span>{vibe.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label htmlFor="title" className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted">
              Plan Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g. 3v3 Sunset Pickup Basketball"
              className="w-full rounded-xl border border-line bg-surface-warm/30 px-3.5 py-2.5 text-sm font-semibold text-ink outline-none transition-all focus:border-ink focus:bg-surface"
              ref={titleInputRef}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-muted">
                Cover Photo
              </label>
              <button
                type="button"
                onClick={() => setShowCustomUrl((prev) => !prev)}
                className="text-[11px] font-semibold text-muted hover:text-ink flex items-center gap-1"
              >
                <LinkIcon className="h-3 w-3" />
                {showCustomUrl ? "Hide URL" : "Custom URL"}
              </button>
            </div>

            <div className="grid grid-cols-6 gap-2">
              {allPresets.map((preset) => {
                const isSelected = activeCover === preset.url;
                return (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, coverImage: preset.url }))}
                    className={`group relative h-12 overflow-hidden rounded-lg border-2 transition-all ${
                      isSelected ? "scale-105" : "opacity-70 hover:opacity-100"
                    }`}
                    style={{ borderColor: isSelected ? selectedVibe.accent : "transparent" }}
                    title={preset.label}
                  >
                    <img src={preset.url} alt={preset.label} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-end justify-center p-0.5">
                      <span className="text-[9px] font-black text-white truncate">{preset.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {showCustomUrl && (
              <input
                type="url"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
                placeholder="Paste custom image URL (https://...)"
                className="mt-2 w-full rounded-xl border border-line bg-surface-warm/30 px-3 py-2 text-xs outline-none transition-all focus:border-ink"
              />
            )}
          </div>

          <div>
            <label htmlFor="location" className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted">
              Location
            </label>
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="e.g. Mission Bay Courts, North Side"
                className="w-full rounded-xl border border-line bg-surface-warm/30 py-2.5 pl-9 pr-3.5 text-sm text-ink outline-none transition-all focus:border-ink focus:bg-surface"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="date" className="mb-1.5 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-muted">
                <Calendar className="h-3 w-3" /> Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-line bg-surface-warm/30 p-2.5 text-xs sm:text-sm text-ink outline-none transition-all focus:border-ink"
              />
            </div>

            <div>
              <label htmlFor="time" className="mb-1.5 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-muted">
                <Clock className="h-3 w-3" /> Time
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-line bg-surface-warm/30 p-2.5 text-xs sm:text-sm text-ink outline-none transition-all focus:border-ink"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
            <div className="sm:col-span-8">
              <label htmlFor="description" className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted">
                Notes / Gear
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Bring a water bottle & light jersey"
                className="w-full rounded-xl border border-line bg-surface-warm/30 px-3.5 py-2.5 text-xs sm:text-sm text-ink outline-none transition-all focus:border-ink"
              />
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="capacity" className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted">
                Capacity
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-line bg-surface-warm/30 p-1">
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, capacity: Math.max(2, Number(prev.capacity) - 1) }))}
                  className="h-8 w-8 rounded-lg bg-surface flex items-center justify-center font-bold text-ink shadow-sm"
                >
                  −
                </button>
                <span className="flex-1 text-center font-black text-sm text-ink">{formData.capacity}</span>
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, capacity: Number(prev.capacity) + 1 }))}
                  className="h-8 w-8 rounded-lg bg-surface flex items-center justify-center font-bold text-ink shadow-sm"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          <div className="overflow-hidden rounded-2xl border border-line/60 bg-surface shadow-md">
            <div className="relative h-44 w-full overflow-hidden bg-surface-warm">
              <img
                src={activeCover}
                alt="Plan Preview"
                className="h-full w-full object-cover transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.src = selectedVibe.defaultPhoto;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute top-3 left-3">
                <span
                  className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md"
                  style={{ background: `${selectedVibe.accent}cc` }}
                >
                  {selectedVibe.label}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-md">
                  {formData.capacity} spots left
                </span>
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-lg font-bold tracking-tight text-ink" style={{ fontFamily: "var(--font-display)" }}>
                {formData.title || "Your awesome plan"}
              </h3>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                {(formData.date || formData.time) && (
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formData.date} {formData.time ? `· ${formData.time}` : ""}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {formData.location || "Location not set"}
                </span>
              </div>

              {formData.description && (
                <p className="mt-2 text-xs text-muted line-clamp-1 italic">
                  "{formData.description}"
                </p>
              )}

              <div className="mt-4 border-t border-line/50 pt-3 flex items-center justify-between text-xs text-muted">
                <span className="flex items-center gap-1 font-semibold text-ink">
                  <Users className="h-3.5 w-3.5 text-muted" />
                  1 of {formData.capacity} joined
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: selectedVibe.accent }}>
                  Preview
                </span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={createPlanMutation.isPending}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:brightness-110 active:scale-[0.99] disabled:opacity-50"
            style={{ background: selectedVibe.accent }}
          >
            <span>{createPlanMutation.isPending ? "Publishing..." : "Publish Plan"}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </motion.div>
  );
}
