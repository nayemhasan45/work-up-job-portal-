import React, { useContext } from "react";
import { FirebaseAuthContext } from "../../contexts/firebaseAuthContext/AuthContext";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/LoadingSpinner";
import ApplicationsRow from "./ApplicationsRow";

const Applications = () => {
  const { initialUser } = useContext(FirebaseAuthContext);

  const { data, isLoading } = useQuery({
    queryKey: ["applications", initialUser?.email],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/applicant?email=${initialUser?.email}`,{
        method:"GET",
        credentials:"include",
      });
      const data = await res.json();
      return data;
    },
    enabled: !!initialUser?.email, // This ensures the query only runs when the email is available
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
console.log(data)
  return (
    <div className="w-10/12 mx-auto">
      <h1>application so far : {data?.length}</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  #
                </label>
              </th>
              <th>Email</th>
              <th>github</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
           {
            data?.map((row,index)=><ApplicationsRow key={row._id} index={index} row={row}></ApplicationsRow>)
           }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Applications;
