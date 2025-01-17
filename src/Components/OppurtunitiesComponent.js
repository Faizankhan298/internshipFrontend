import React, { useEffect, useState } from "react";
import oppurtunitiesData from "../opportunities.json";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./OppurtunitiesComponent.module.css";

export default function OppurtunitiesComponent() {
  const [appliedOppurtunities, setAppliedOppurtunities] = useState([]);
  useEffect(() => {
    fetchAppliedOppurtunities();
  }, []);
  const fetchAppliedOppurtunities = async () => {
    try {
      const response = await axios.get(
        "https://internshipbackend-pgyg.onrender.com/auth/applied-oppurtunities"
      );
      setAppliedOppurtunities(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.header}>Internship Oppurtunities</h1>
        <div className={styles.grid}>
          {Object.values(oppurtunitiesData.internships_meta).map(
            (oppurtunity) => (
              <OppurtunityCard
                key={oppurtunity.id}
                oppurtunity={oppurtunity}
                appliedOppurtunities={appliedOppurtunities}
              />
            )
          )}
        </div>
      </div>
    </>
  );
}

const OppurtunityCard = ({ oppurtunity, appliedOppurtunities }) => {
  const navigate = useNavigate();
  const {
    id,
    profile_name,
    company_name,
    stipend,
    start_date,
    locations,
    duration,
  } = oppurtunity;
  const isApplied =
    Array.isArray(appliedOppurtunities) &&
    appliedOppurtunities.some((item) => item.id === id);

  const applyForOppurtunity = (oppurtunity) => {
    try {
      axios
        .post("https://internshipbackend-pgyg.onrender.com/auth/apply", {
          oppurtunity,
        })
        .then((res) => {
          console.log(res);
        });
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.card}>
      <h1>{profile_name}</h1>
      <p>
        <strong>Company: </strong> {company_name}
      </p>
      <p>
        <strong>Stipend: </strong> {stipend.salary}
      </p>
      <p>
        <strong>Location: </strong>{" "}
        {locations.map((location) => location.string).join(", ")}
      </p>
      <p>
        <strong>Duration: </strong> {duration}
      </p>
      <p>
        <strong>Start Date: </strong> {start_date}
      </p>
      {isApplied ? (
        <button disabled>Applied</button>
      ) : (
        <button onClick={() => applyForOppurtunity(oppurtunity)}>
          Apply Now
        </button>
      )}
    </div>
  );
};
