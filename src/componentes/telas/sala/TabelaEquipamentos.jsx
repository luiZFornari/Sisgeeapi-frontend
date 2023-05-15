import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import SalaContext from "./SalaContext";

function TabelaEquipamentos() {
  const {
    alerta,
    setAlerta,
    listaEquipamentos,
    removerEquipamento,
    objeto,
    setEditarEquipamento,
    setEquipamento,
    recuperaEquipamento,
    setExibirEquipamentos,
  } = useContext(SalaContext);

  return (
    <div style={{ padding: "20px" }}>
      <button
        className="btn btn-secondary"
        onClick={() => {
          setExibirEquipamentos(false);
          setAlerta({ status: "", message: "" });
        }}
      >
        Voltar <i className="bi bi-backspace"></i>
      </button>
      <h1>Equipamentos da Sala : {objeto.numero}</h1>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#modalEdicaoEquipamento"
        title="Novo"
        onClick={() => {
          setEditarEquipamento(false);
          setEquipamento({
            codigo: 0,
            descricao: "",
            numero_serie: "",
            valor: "",
            sala: objeto.codigo,
          });
          setAlerta({ status: "", message: "" });
        }}
      >
        Novo <i className="bi bi-file-earmark-plus"></i>
      </button>
      <Alerta alerta={alerta} />
      {listaEquipamentos.length === 0 && <h1>Nenhum Equipamento encontrada</h1>}
      {listaEquipamentos.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col" style={{ textAlign: "center" }}>
                Ações
              </th>
              <th scope="col">Código</th>
              <th scope="col">Descrição</th>
              <th scope="col">Numero Serie</th>
              <th scope="col">Valor</th>
            </tr>
          </thead>
          <tbody>
            {listaEquipamentos.map((equipamento) => (
              <tr key={equipamento.codigo}>
                <td align="center">
                  <button
                    className="btn btn-danger"
                    title="Remover"
                    onClick={() => {
                      removerEquipamento(equipamento);
                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </button>

                  <button
                    className="btn btn-info"
                    title="Edicao"
                    data-bs-toggle="modal"
                    data-bs-target="#modalEdicaoEquipamentos"
                    onClick={() => {
                      recuperaEquipamento(equipamento.codigo);
                      setEditarEquipamento(true);
                      setAlerta({ status: "", message: "" });
                    }}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                </td>
                <td scopre="row">{equipamento.codigo}</td>
                <td>{equipamento.numero}</td>
                <td>{equipamento.descricao}</td>
                <td>{equipamento.capacidade}</td>
                <td>{equipamento.nomepredio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TabelaEquipamentos;
