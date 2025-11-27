'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [full_name, setFull_name] = useState("");
  const [logsuccessn, setLogsuccess] = useState(false);

  const Register = async (e) => {
    e.preventDefault();
    await fetch("http://127.0.0.1:8000/ha/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, full_name, password }),
    });

    setLogsuccess(true);
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(135deg, #eef2ff 0%, #ffffff 100%)",
        padding: "20px",
      }}
    >
      <div
        className="p-5 bg-white shadow-lg rounded-4"
        style={{ width: "100%", maxWidth: "480px" }}
      >
        <h2 className="text-center mb-4 fw-bold text-primary">Create an Account</h2>

        {/* Success Message */}
        {logsuccessn && (
          <div className="alert alert-success text-center">
            Registration successful!  
            <br />
            <Link href="/login" className="fw-semibold">
              Click here to login.
            </Link>
          </div>
        )}

        <form onSubmit={Register}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input id="username" type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control form-control-lg"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input id="email" type="email" placeholder="Enter your email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control form-control-lg"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input id="full_name" type="text" placeholder="Enter your full name" value={full_name} onChange={(e) => setFull_name(e.target.value)}
              className="form-control form-control-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}
className="form-control form-control-lg"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 btn-lg">
            Register
          </button>

          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link href="/login" className="fw-semibold">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Page;
