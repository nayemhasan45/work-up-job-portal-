import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { FirebaseAuthContext } from "../../contexts/firebaseAuthContext/AuthContext";

const SignIn = () => {
  const {signinUser}=useContext(FirebaseAuthContext);
  const navigate = useNavigate();
    const handleSignIn = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        //login user 
        signinUser(email,password)
        .then(res=>{
          console.log("user loged in successfully ",res);
          navigate("/");
        })
        .catch(err=>console.log(err))
    }
  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <form onSubmit={handleSignIn}>
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input name="email" type="email" className="input" placeholder="Email" />
              <label className="label">Password</label>
              <input name="password" type="password" className="input" placeholder="Password" />
              <div>
                <a className="link link-hover">Forgot password?</a>

              </div>
              <button className="btn btn-neutral mt-4">Login</button>
              <div>
                <p>Don't have account yet..!...<Link className="text-blue-500 font-bold" to={"/signup"}>register</Link></p>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
