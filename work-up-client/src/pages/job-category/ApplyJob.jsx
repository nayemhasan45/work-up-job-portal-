import React, { useContext } from "react";
import { useParams } from "react-router";
import { FirebaseAuthContext } from "../../contexts/firebaseAuthContext/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

const ApplyJob = () => {
  const { id: jobId } = useParams();
  const { initialUser } = useContext(FirebaseAuthContext);
  console.log(initialUser);
  const handleJobApply = (e) => {
    e.preventDefault();
    const form = e.target;
    const linkedin = form.linkedin.value;
    const github = form.github.value;
    console.log(linkedin, github);
    const aplication = {
      jobId,
      applicant: initialUser.email,
      linkedin,
      github,
    };
    axios
      .post("http://localhost:3000/applicant", aplication)
      .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="w-10/12 mx-auto flex items-center justify-center h-[80vh]">
      <form onSubmit={handleJobApply}>
        <fieldset className="fieldset">
          <label className="label">LinkedIn</label>
          <input
            name="linkedin"
            type="url"
            className="input"
            placeholder="linkedin"
          />
          <label className="label">Github</label>
          <input
            name="github"
            type="url"
            className="input"
            placeholder="github"
          />
          <button className="btn btn-neutral mt-4">Apply Now</button>
        </fieldset>
      </form>
    </div>
  );
};

export default ApplyJob;
