import axios from "axios";
import React from "react";
import Swal from "sweetalert2";

const AddJob = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const jobTitle = form.jobTitle.value;
    const jobCategory = form.jobCategory.value;
    const salaryRange = form.salaryRange.value;
    const jobDescription = form.jobDescription.value;
    const postingDate = form.postingDate.value;
    const applicationDeadline = form.applicationDeadline.value;
    const jobApplicants = form.jobApplicants.value;

    const jobData = {
      jobTitle,
      jobCategory,
      salaryRange,
      jobDescription,
      postingDate,
      applicationDeadline,
      jobApplicants,
    };

    // console.log(jobData);

    // add job to the database
    axios
      .post("https://work-up-server.vercel.app/jobs", jobData)
      .then((res) => {
        console.log(res);
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
    <div className="max-w-4xl mx-auto p-8 bg-base-200">
      <h1 className="text-3xl font-bold mb-8">Add a New Job</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="jobTitle"
              className="block text-sm font-medium text-gray-700"
            >
              Job Title
            </label>
            <input
              type="text"
              name="jobTitle"
              id="jobTitle"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="jobCategory"
              className="block text-sm font-medium text-gray-700"
            >
              Job Category
            </label>
            <input
              type="text"
              name="jobCategory"
              id="jobCategory"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="salaryRange"
              className="block text-sm font-medium text-gray-700"
            >
              Salary Range
            </label>
            <input
              type="text"
              name="salaryRange"
              id="salaryRange"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="jobApplicants"
              className="block text-sm font-medium text-gray-700"
            >
              Job Applicants (Number)
            </label>
            <input
              type="number"
              name="jobApplicants"
              id="jobApplicants"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="postingDate"
              className="block text-sm font-medium text-gray-700"
            >
              Posting Date
            </label>
            <input
              type="date"
              name="postingDate"
              id="postingDate"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="applicationDeadline"
              className="block text-sm font-medium text-gray-700"
            >
              Application Deadline
            </label>
            <input
              type="date"
              name="applicationDeadline"
              id="applicationDeadline"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="jobDescription"
            className="block text-sm font-medium text-gray-700"
          >
            Job Description
          </label>
          <textarea
            name="jobDescription"
            id="jobDescription"
            rows="4"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
