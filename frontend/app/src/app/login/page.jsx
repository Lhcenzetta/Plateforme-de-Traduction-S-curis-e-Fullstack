'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react"
import { useRouter } from 'next/navigation'
import Link from 'next/link';
export default function Home()
{
    const router = useRouter()
    const [username , setUsername] = useState("")
    const [password , setPassword] = useState("")
    const [error , setError] = useState()
    const SubmitForm = async (e) => {
        e.preventDefault()
        setError("") 

        const response = await fetch('http://127.0.0.1:8000/ha/login',
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password})
        });

        const data = await response.json()
        if (data.access_token){
            localStorage.setItem('token', data.access_token)
            router.push('/translat')
        }
        else {
            setError("Incorrect username or password");
        }
    }
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
      style={{ width: "100%", maxWidth: "600px" }}
    >
      <h1 className="text-center mb-4 fw-bold text-primary">
        Welcome — Please Login
      </h1>

      <form onSubmit={SubmitForm}>
        <div className="mb-4">
          <label className="form-label fw-semibold">Username</label>
          <input
            type="text" className="form-control form-control-lg" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username"
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">Password</label>
          <input
            type="password" className="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100 btn-lg mb-3"
        >
          Login
        </button>
        {error && <p className="alert alert-danger mt-3 text-center fw-semibold">{error}</p>}
        <p className="text-center">
          Don't have an account?{" "}
          <Link href="/registre" className="fw-semibold">
            Register here
          </Link>
        </p>
      </form>
    </div>
  </div>
);

}