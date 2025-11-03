import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";

const JobDetails = () => {
  const { id } = useParams();
  // console.log(id);
  const { data, isPending, error } = useQuery({
    queryKey: ["jobDetails", id],
    queryFn: () =>
      fetch(`http://localhost:3000/jobs/${id}`).then((res) => res.json()),
  });
  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  console.log(data);
  const { company, description, company_logo ,_id} = data;
  return (
    <div className="h-[70vh] flex items-center justify-center bg-base-300">
      <div className="card w-96 bg-base-100 card-xl shadow-sm ">
        <div className="card-body">
          <h2 className="card-title">
            {" "}
            <img className="w-10 h-10" src={company_logo} alt="" />
            {company}
          </h2>
          <p>{description}</p>
          <div className="justify-end card-actions">
            <Link to={`/applyJob/${_id}`}><button className="btn btn-primary">Apply Now</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
