import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const userLogin = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        role: "ADMIN",
      }),
    });

    const res2 = await res.json();
    if (res2.message == "login successful") {
      M.toast({ html: res2.message, classes: "green" });
      router.push({ pathname: "/", query: { LoggedIn: "True" } });
    } else {
      M.toast({ html: res2.errors[0].message, classes: "red" });
    }
  };
  return (
    <Layout>
      <div className="container card authcard center-align">
        <h3>LOGIN</h3>
        <form onSubmit={(e) => userLogin(e)}>
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
            login
            <i className="material-icons right">forward</i>
          </button>
          <Link href="/signup">
            <a>
              <h5>Dont have a account ?</h5>
            </a>
          </Link>
        </form>
      </div>
    </Layout>
  );
};

export default Login;