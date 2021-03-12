import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const userSignup = async (e) => {
    e.preventDefault();
    const res = await fetch(`https://localhost:3000/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const res2 = await res.json();
    if (res2.error) {
      M.toast({ html: res2.error, classes: "red" });
    } else {
      M.toast({ html: res2.message, classes: "green" });
      router.push("/login");
    }
  };
  return (
    <Layout>
      <div className="signin">
        <div className="container card authcard center-align">
          <h3>SIGNUP</h3>
          <form onSubmit={(e) => userSignup(e)}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="btn waves-effect waves-light #1565c0 blue darken-3"
              type="submit"
            >
              signup
              <i className="material-icons right">forward</i>
            </button>
            <Link href="/login">
              <a>
                <h5>Already have a account ?</h5>
              </a>
            </Link>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;