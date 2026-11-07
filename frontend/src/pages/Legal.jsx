import PageMeta from '../components/PageMeta';

function Legal({ titre }) {
  return (
    <main className="container py-5">
      <PageMeta
        titre={titre}
        description={`${titre} du site Trouve ton artisan ! Page en construction.`}
      />

      <h1>{titre}</h1>
      <p>Page en construction</p>
    </main>
  );
}

export default Legal;