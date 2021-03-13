import Link from "next/link";
import { withRouter } from "next/router";
import { useRouter } from "next/router";
import React, { Component } from "react";
export const getServerSideProps = async (...x) => {
  const res = await fetch("http://localhost:5000/user");
  const json = await res.json();
  console.log(json);
  return { props: { x } };
};

export class NavBar extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper #1565c0 blue darken-3">
          <Link href="/">
            <a className="brand-logo left">Budget Shopify</a>
          </Link>
          {this.props.router.query.LoggedIn ? (
            <>
              <ul id="nav-mobile" className="right">
                <li className={"/account"}>
                  <Link href="/account">
                    <a>Account</a>
                  </Link>
                </li>
                <li>
                  <button
                    className="btn red"
                    onClick={() => {
                      router.push("/login");
                    }}
                  >
                    logout
                  </button>
                </li>
              </ul>
            </>
          ) : (
            <>
              <ul id="nav-mobile" className="right">
                <li className={"/login"}>
                  <Link href="/login">
                    <a>login</a>
                  </Link>
                </li>
                <li className={"/signup"}>
                  <Link href="/signup">
                    <a>signup</a>
                  </Link>
                </li>
              </ul>
            </>
          )}
        </div>
      </nav>
    );
  }
}

export default withRouter(NavBar);
