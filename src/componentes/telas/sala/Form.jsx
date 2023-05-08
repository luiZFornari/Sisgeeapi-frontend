import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import SalaContext from "./SalaContext";
import CampoEntrada from "../../comuns/CampoEntrada";
import Dialogo from "../../comuns/Dialogo";
import CampoSelect from "../../comuns/CampoSelect";

function Form() {
  const { objeto, handleChange, acaoCadastrar, alerta, listaPredios } =
    useContext(SalaContext);

  return (
    <Dialogo
      id="modalEdicao"
      titulo="Sala"
      acaoCadastrar={acaoCadastrar}
      idform="formulario"
    >
      <Alerta alerta={alerta} />
      <CampoEntrada
        id="txtCodigo"
        label="Codigo"
        tipo="number"
        name="Codigo"
        value={objeto.codigo}
        onchange={handleChange}
        requerido={false}
        readonly={true}
      />
      <CampoEntrada
        id="txtNumero"
        label="Numero"
        tipo="number"
        name="numero"
        value={objeto.numero}
        onchange={handleChange}
        requerido={true}
        readonly={false}
        maxlength={10}
        msgvalido="Numero OK"
        msginvalido="Informe o Numero"
      />
      <CampoEntrada
        id="txtDescricao"
        label="Descrição"
        tipo="text"
        name="descricao"
        value={objeto.descricao}
        onchange={handleChange}
        requerido={true}
        readonly={false}
        maxlength={40}
        msgvalido="Descrição OK"
        msginvalido="Informe a descrição"
      />
      <CampoEntrada
        id="txtCapacidade"
        label="Capacidade"
        tipo="number"
        name="capacidade"
        value={objeto.capacidade}
        onchange={handleChange}
        requerido={true}
        readonly={false}
        maxlength={10}
        msgvalido="Capacidade OK"
        msginvalido="Informe a Capacidade"
      />
      <CampoSelect
        value={objeto.predio}
        id="txtPredio"
        name="predio"
        label="Prédio"
        onchange={handleChange}
        msgvalido="OK certo"
        msginvalido="Informe o prédio"
        requerido={true}
      >
        {listaPredios.map((pre) => (
          <option key={pre.codigo} value={pre.codigo}>
            {pre.nome}
          </option>
        ))}
      </CampoSelect>
    </Dialogo>
  );
}

export default Form;
