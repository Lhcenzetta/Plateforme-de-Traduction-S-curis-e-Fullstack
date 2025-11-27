import 'bootstrap/dist/css/bootstrap.min.css';
export default function Home() {
  return (
 <div className="container py-5">
  <div className="row justify-content-center text-center">
    <div className="col-lg-8">

      <h1 className="fw-bold mb-4">
        Bienvenue sur la Plateforme de Traduction Sécurisée
      </h1>

      <p className="text-muted mb-4">
        Application développée dans le cadre du projet Simplon.  
        Cette plateforme fullstack permet de traduire des contenus sensibles  
        en toute sécurité grâce à une architecture moderne : FastAPI, Next.js, JWT,  
        et Hugging Face Inference API.
      </p>

      <h2 className="text-primary fw-semibold mb-4">
         Projet : Plateforme de Traduction Sécurisée Fullstack
      </h2>

      <img
        src="/images/image_project.png"
        alt="Illustration du projet"
        className="img-fluid rounded shadow mb-4"
        style={{ maxWidth: "550px" }}
      />

      <div className="mt-4">
        <a href="/acceuill" className="btn btn-primary btn-lg px-4">
          Accéder à l'application
        </a>
      </div>

    </div>
  </div>
</div>

  );
}
