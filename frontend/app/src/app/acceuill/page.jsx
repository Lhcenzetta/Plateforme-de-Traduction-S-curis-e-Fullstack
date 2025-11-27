import 'bootstrap/dist/css/bootstrap.min.css';

export default function Acceuill() {
  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #eef2ff 0%, #ffffff 100%)",
        padding: "20px"
      }}
    >
      <div className="container text-center">
        <div className="mx-auto p-5 bg-white shadow rounded"
          style={{ maxWidth: "650px" }}
        >
          <h1 className="fw-bold mb-4 text-primary">
            Welcome to the Secure Translation Platform
          </h1>

          <p className="text-muted fs-5 mb-4">
            If you already have an account, click the <strong>Login</strong> button to start using the
            application.  
            <br />
            Otherwise, click <strong>Register</strong> to create an account and join us.
          </p>

          <div className="d-flex justify-content-center gap-3 mt-4">
            <a
              href="/login"
              className="btn btn-primary btn-lg px-4"
            >
              Login
            </a>

            <a
              href="/registre"
              className="btn btn-outline-primary btn-lg px-4"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
