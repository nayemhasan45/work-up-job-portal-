import { useContext } from "react";
import { FirebaseAuthContext } from "../../contexts/firebaseAuthContext/AuthContext";
import { useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";

const SignUp = () => {
  const { createUser } = useContext(FirebaseAuthContext);
  const navigate = useNavigate();
  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    //creatin the user
    createUser(email, password)
      .then((res) => {
        console.log("user created successfully", res);
        e.target.reset();
        navigate("/signin");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <form onSubmit={handleSignUp}>
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                name="email"
                type="email"
                className="input"
                placeholder="Email"
              />
              <label className="label">Password</label>
              <input
                name="password"
                type="password"
                className="input"
                placeholder="Password"
              />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">Register</button>
            </fieldset>
          </form>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
