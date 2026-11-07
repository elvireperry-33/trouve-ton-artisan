function Footer() {
  return (
    <footer className="border-top mt-5 py-4">
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-md-6">
            <h2 className="h5">Trouve ton artisan !</h2>

            <address className="mb-0">
              101 cours Charlemagne<br />
              CS 20033<br />
              69269 Lyon Cedex 02<br />
              France<br />
              <a href="tel:+33426734000">
                +33 (0)4 26 73 40 00
              </a>
            </address>
          </div>

          <nav
            className="col-12 col-md-6"
            aria-label="Informations légales"
          >
            <ul className="list-unstyled">
              <li><a href="/mentions-legales">Mentions légales</a></li>
              <li><a href="/donnees-personnelles">Données personnelles</a></li>
              <li><a href="/accessibilite">Accessibilité</a></li>
              <li><a href="/cookies">Cookies</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;