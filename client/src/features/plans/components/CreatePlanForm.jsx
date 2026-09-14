import { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const vibes = [
  { value: "sport",  label: "Sport",  color: "var(--color-coral)",  bg: "var(--color-coral-light)", desc: "Get moving" },
  { value: "social", label: "Social", color: "var(--color-gold)",   bg: "var(--color-gold-light)",  desc: "Hang out" },
  { value: "life",   label: "Life",   color: "var(--color-green)",  bg: "var(--color-green-light)", desc: "Touch grass" },
];

export default function CreatePlanForm() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    capacity: 2,
    category: "social",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  const queryClient = useQueryClient();

  const createPlanMutation = useMutation({
    mutationFn: async (newPlanData) => {
      const response = await fetch("http://localhost:3000/api/plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPlanData),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      navigate("/explore");
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    createPlanMutation.mutate(formData);
  }

  const selectedVibe = vibes.find((v) => v.value === formData.category);

  return (
    <div className="container mx-auto max-w-xl py-8 sm:py-14">
      <div className="mb-10 text-center">
        <h2
          className="text-3xl font-extrabold tracking-tight sm:text-4xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Start something
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-muted">
          Got an idea? Throw it out there. The right people will show up.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <label
            htmlFor="title"
            className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted"
          >
            What's the plan?
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border-0 border-b-2 bg-transparent pb-3 text-2xl font-bold tracking-tight outline-none placeholder:text-muted/40 focus:border-green"
            style={{
              fontFamily: "var(--font-display)",
              borderColor: "var(--color-line)",
              transition: "border-color 0.2s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--color-green)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--color-line)")}
            placeholder="Evening badminton"
          />
        </div>

        <div className="mb-8">
          <label
            htmlFor="location"
            className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted"
          >
            Where's it going down?
          </label>
          <div className="relative">
            <svg
              className="pointer-events-none absolute left-0 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full border-0 border-b-2 bg-transparent pb-3 pl-7 text-lg outline-none placeholder:text-muted/40 focus:border-green"
              style={{
                borderColor: "var(--color-line)",
                transition: "border-color 0.2s ease",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--color-green)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--color-line)")}
              placeholder="Riverside Courts, Downtown Cafe…"
            />
          </div>
        </div>

        <div className="mb-8">
          <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-muted">
            What's the vibe?
          </label>
          <div className="grid grid-cols-3 gap-3">
            {vibes.map((vibe) => {
              const isSelected = formData.category === vibe.value;
              return (
                <button
                  key={vibe.value}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, category: vibe.value }))
                  }
                  className="relative flex flex-col items-center gap-2 rounded-xl px-4 py-5 text-center transition-all duration-200"
                  style={{
                    background: isSelected ? vibe.bg : "var(--color-surface)",
                    border: isSelected
                      ? `2px solid ${vibe.color}`
                      : "2px solid var(--color-line)",
                    transform: isSelected ? "scale(1.03)" : "scale(1)",
                  }}
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ background: vibe.color }}
                  >
                    {vibe.label.charAt(0)}
                  </div>
                  <span
                    className="text-sm font-bold"
                    style={{ color: isSelected ? vibe.color : "var(--color-ink)" }}
                  >
                    {vibe.label}
                  </span>
                  <span className="text-[11px] text-muted">{vibe.desc}</span>
                </button>
              );
            })}
          </div>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="sr-only"
            tabIndex={-1}
          >
            <option value="sport">Sport</option>
            <option value="social">Social</option>
            <option value="life">Life</option>
          </select>
        </div>

        <div className="mb-10">
          <label
            htmlFor="capacity"
            className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted"
          >
            How many people?
          </label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  capacity: Math.max(2, Number(prev.capacity) - 1),
                }))
              }
              className="flex h-12 w-12 items-center justify-center rounded-xl border-2 text-lg font-bold transition-colors hover:bg-surface-warm"
              style={{ borderColor: "var(--color-line)" }}
            >
              −
            </button>
            <input
              type="number"
              id="capacity"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              required
              min="2"
              className="w-20 border-0 bg-transparent text-center text-4xl font-extrabold outline-none"
              style={{ fontFamily: "var(--font-display)" }}
            />
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  capacity: Number(prev.capacity) + 1,
                }))
              }
              className="flex h-12 w-12 items-center justify-center rounded-xl border-2 text-lg font-bold transition-colors hover:bg-surface-warm"
              style={{ borderColor: "var(--color-line)" }}
            >
              +
            </button>
            <span className="text-sm text-muted">people</span>
          </div>
        </div>

        <div
          className="overflow-hidden rounded-2xl"
          style={{
            background: selectedVibe ? selectedVibe.color : "var(--color-green)",
          }}
        >
          <div className="px-7 py-6 text-white">
            <p className="text-xs font-bold uppercase tracking-widest text-white/60">
              Your plan preview
            </p>
            <h3
              className="mt-2 text-2xl font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {formData.title || "Your awesome plan"}
            </h3>
            <p className="mt-1 text-sm text-white/65">
              {formData.location || "Somewhere great"} · {formData.capacity} spots
            </p>
          </div>
          <button
            type="submit"
            className="w-full py-4 text-sm font-bold uppercase tracking-wider text-white transition-opacity hover:opacity-90"
            style={{ background: "rgba(0,0,0,0.15)" }}
          >
            Put it out there →
          </button>
        </div>
      </form>
    </div>
  );
}
