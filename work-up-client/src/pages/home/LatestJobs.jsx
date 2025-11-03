import { useQuery } from "@tanstack/react-query";
import React from "react";
import CategoryJobs from "../../components/CategoryJobs";
import LoadingSpinner from "../../components/LoadingSpinner";

const LatestJobs = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["homePageJobs"],
    queryFn: () =>
      fetch("http://localhost:3000/jobs").then((res) => res.json()),
  });
  if (isPending) return <LoadingSpinner></LoadingSpinner>;

  if (error) return "An error has occurred: " + error.message;
//   console.log(data);
  return (
    <div className="">
      <div className="max-w-10/12 mx-auto">
        <h1>this is latest jobs and total jobs is {data.length}</h1>
        <h1>Latest Featured Jobs</h1>
        <p>To choose your trending job dream & to make future bright.</p>
        <div className="grid grid-cols-3 gap-5">
            {
                data.map(card => <CategoryJobs key={card._id} card={card}></CategoryJobs>)
            }
        </div>
      </div>
    </div>
  );
};

export default LatestJobs;
