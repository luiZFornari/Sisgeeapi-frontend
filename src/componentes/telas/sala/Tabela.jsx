import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import SalaContext from "./SalaContext";

function Tabela() {
  const {
    setObjeto,
    alerta,
    setAlerta,
    listaObjetos,
    remover,
    setEditar,
    recuperar,
    recuperaEquipamentos,
    setExibirEquipamentos,
  } = useContext(SalaContext);

  (function () {
    "use strict";

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add("was-validated");
        },
        false
      );
    });
  })();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Salas</h1>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#modalEdicao"
        title="Novo"
        onClick={() => {
          setObjeto({
            codigo: 0,
            numero: "",
            descricao: "",
            capacidade: "",
            predio: "",
          });
          setEditar(false);
          setAlerta({ status: "", message: "" });
        }}
      >
        Novo <i className="bi bi-file-earmark-plus"></i>
      </button>
      <Alerta alerta={alerta} />
      {listaObjetos.length === 0 && <h1>Nenhuma sala encontrada</h1>}
      {listaObjetos.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col" style={{ textAlign: "center" }}>
                Ações
              </th>
              <th scope="col">Código</th>
              <th scope="col">Numero</th>
              <th scope="col">Descrição</th>
              <th scope="col">Capacidade</th>
              <th scope="col">Predio</th>
            </tr>
          </thead>
          <tbody>
            {listaObjetos.map((objeto) => (
              <tr key={objeto.codigo}>
                <td align="center">
                  <button
                    className="btn btn-danger"
                    title="Remover"
                    onClick={() => {
                      remover(objeto);
                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </button>

                  <button
                    className="btn btn-info"
                    title="Edicao"
                    data-bs-toggle="modal"
                    data-bs-target="#modalEdicao"
                    onClick={() => {
                      recuperar(objeto.codigo);
                      setEditar(true);
                      setAlerta({ status: "", message: "" });
                    }}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    className="btn btn-success"
                    title="Equipamentos"
                    onClick={() => {
                      recuperaEquipamentos(objeto.codigo);
                      setAlerta({ status: "", message: "" });
                      setExibirEquipamentos(true);
                    }}
                  >
                    <i className="bi bi-pc-display"></i>
                  </button>
                </td>
                <td scope="row">{objeto.codigo}</td>
                <td>{objeto.numero}</td>
                <td>{objeto.descricao}</td>
                <td>{objeto.capacidade}</td>
                <td>{objeto.nomepredio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Tabela;
