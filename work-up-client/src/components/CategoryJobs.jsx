import { Link } from "react-router";

const CategoryJobs = ({card}) => {
  const {category,_id,company,company_logo,applicationDeadline}=card;
  return (
    <div className="card w-96 bg-base-100 card-sm shadow-sm">
      <div className="card-body">
        <h2 className="card-title"><img className="w-10 h-10" src={company_logo} alt="" /> {company}</h2>
        
        <h2 >Category : {category}</h2>
        <h2>applicationDeadline : {applicationDeadline}</h2>
        <div className="justify-end card-actions">
          <Link to={`/jobs/${_id}`}><button className="btn btn-primary">explore more</button></Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryJobs;
