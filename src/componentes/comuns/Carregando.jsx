export default function Carregando() {
  return (
    <>
      <div className="d-flex align-items-center m-5">
        <strong>Loading...</strong>
        <div
          className="spinner-border ms-auto"
          role="status"
          aria-hidden="true"
        ></div>
      </div>
    </>
  );
}
