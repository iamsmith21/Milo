import { useState } from "react";
import { usePlans } from "../../../context/PlansContext";

export default function CreatePlanForm() {
  const { handleAddPlan } = usePlans();
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    capacity: 2,
    category: "social",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    handleAddPlan(formData);
    e.preventDefault();
  }

  console.log("Submitting this data", formData);

  return (
    <form onSubmit={handleSubmit} className="">
      <h3>Create a new plan</h3>

      <div>
        <label htmlFor="title">Plan Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="field w-full"
          placeholder="Evening Badminton"
        />

        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          className="field w-full"
          placeholder="Downtown"
        />

        <label htmlFor="capacity">Capacity</label>
        <input
          type="number"
          id="capacity"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          required
          className="field w-full"
          placeholder="2"
        />

        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="sport">sport</option>
          <option value="social">social</option>
          <option value="life">life</option>
        </select>
      </div>

      <button type="submit">Create Plan</button>
    </form>
  );
}
