import { useState } from "react";
import { useNavigate } from "react-router-dom";
import  useField from "../hooks/useField"

const AddJobPage = () => {
  const title = useField("text");
  const [type, setType] = useState("Full-Time");
  const description = useField("");
  const companyName = useField("text");
  const contactEmail = useField("text");
  const contactPhone = useField("text");

  const navigate = useNavigate();
  
  const addJob = async (newJob) => {
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJob),
      });
      if (!res.ok) {
        throw new Error("Failed to add job");
      }
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  };

  const submitForm = (e) => {
    e.preventDefault();

    const newJob = {
      title: title.value,
      type: type,
      description: description.value,
      company: {
        name: companyName.value,
        contactEmail: contactEmail.value,
        contactPhone: contactPhone.value,
      },
    };

    addJob(newJob);
    return navigate("/");
  };

  return (
    <div className="create">
      <h2>Add a New Job</h2>
      <form onSubmit={submitForm}>
        <label>Job title:</label>
        <input required {...title}/>
        <label>Job type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Job Description:</label>
        <textarea
          required
          {...description}
        ></textarea>
        <label>Company Name:</label>
        <input
          required
          {...companyName}
        />
        <label>Contact Email:</label>
        <input
          required
          {...contactEmail}
        />
        <label>Contact Phone:</label>
        <input
          required
          {...contactPhone}
        />
        <button>Add Job</button>
      </form>
    </div>
  );
};

export default AddJobPage;
