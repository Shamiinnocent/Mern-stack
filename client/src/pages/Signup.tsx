import { useState } from "react";
import { useSignup } from "../HOOKS/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {signup ,error ,isloading} = useSignup();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(email, password);
    await signup(email,password)
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign up</h3>
      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
      />
      <br />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
      />
      <button  style={{ backgroundColor: '#1aac83', borderRadius: '10px',borderColor: 'white',color:'white' }} disabled={isloading}>Sign Up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
