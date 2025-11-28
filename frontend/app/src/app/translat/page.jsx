'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation'

export default function TranslationPage() {

    const router = useRouter()
    const istoken = localStorage.getItem('token');
    if(!istoken){
      router.push("/login")
    }
    const [text ,setText] = useState("")
    const [service ,setService]  = useState("")
    const [traductiontext, setTraductiontext] = useState()
    const [loading, setLoading] = useState(false);
    const HandleTranslate = async (e) => {
        e.preventDefault()
        setLoading(true);
         const access_token = localStorage.getItem('token');
         console.log(access_token)
         const response = await fetch(`http://127.0.0.1:8000/ha/translate?Text=${encodeURIComponent(text)}&service=${service}`, 
            {
            method: 'POST',
            headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "accept": "application/json"
            },
    });
    const data = await response.json();
    setTraductiontext(data)
    setLoading(false);
    }
    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push('/login')    
        };
  return (
    <div className="min-vh-100 bg-light d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="mx-auto bg-white shadow-lg rounded p-4 p-md-5" style={{ maxWidth: "700px" }}>
          <h1 className="text-center text-primary fw-bold mb-4">
            Translation Panel
          </h1>
          <div className="mb-3">
            <label className="form-label fw-semibold">Enter Text</label>
            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value)
              }}
              className="form-control form-control-lg"
              rows="6"
              placeholder="Write the text you want to translate..."
            ></textarea>
          </div>    
           <div className="mb-3">
                <label className="form-label fw-semibold">Translation Direction</label>

                <select
                    className="form-select form-select-lg"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                >
                    <option value="" disabled>Select translation direction</option>

                    <option value="fr-en">French → English</option>
                    <option value="en-fr">English → French</option>
                </select>

                <p>Selected service: {service}</p>
                </div>

          <div className="d-grid mt-4">
            <button onClick={HandleTranslate} className="btn btn-primary btn-lg">
            {loading ? "Translating..." : "Translate"}
            </button>
          </div>
          {loading && <p className="text-center text-secondary mt-3">Loading...</p>}
          <div className="mt-4 p-3 border rounded bg-light">
            <h5 className="fw-bold">Translated Text:</h5>
            <p className="text-muted">{traductiontext}</p>
          </div>
        <button 
                onClick={handleLogout} 
                className="btn btn-outline-danger btn-sm text-align-centre"
                >
                Logout
            </button>
        </div>
      </div>
    </div>
  );
}
