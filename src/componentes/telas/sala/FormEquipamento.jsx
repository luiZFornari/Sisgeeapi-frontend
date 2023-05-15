import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import SalaContext from "./SalaContext";
import CampoEntrada from "../../comuns/CampoEntrada";
import Dialogo from "../../comuns/Dialogo";

function FormEquipamento() {
  const {
    equipamento,
    handleChangeEquipamento,
    acaoCadastrarEquipamento,
    alerta,
  } = useContext(SalaContext);

  return (
    <Dialogo
      id="modalEdicaoEquipamento"
      titulo="Equipamento"
      acaoCadastrar={acaoCadastrarEquipamento}
      idform="formulario"
    >
      <Alerta alerta={alerta} />
      <CampoEntrada
        id="txtCodigo"
        label="Codigo"
        tipo="number"
        name="Codigo"
        value={equipamento.codigo}
        onchange={handleChangeEquipamento}
        requerido={false}
        readonly={true}
      />
      <CampoEntrada
        id="txtDescricao"
        label="Descrição"
        tipo="text"
        name="descricao"
        value={equipamento.descricao}
        onchange={handleChangeEquipamento}
        requerido={true}
        readonly={false}
        maxlength={40}
        msgvalido="Descrição OK"
        msginvalido="Informe a descrição"
      />
      <CampoEntrada
        id="txtNumeroSerie"
        label="Numero De Serie"
        tipo="text"
        name="numero_serie"
        value={equipamento.numero_serie}
        onchange={handleChangeEquipamento}
        requerido={true}
        readonly={false}
        msgvalido="Numero de serie OK"
        msginvalido="Informe O numero se serie"
      />
      <CampoEntrada
        id="txtValor"
        label="Valor"
        tipo="number"
        name="valor"
        value={equipamento.valor}
        onchange={handleChangeEquipamento}
        requerido={true}
        readonly={false}
        msgvalido="Valor OK"
        msginvalido="Informe O valor"
      />
    </Dialogo>
  );
}

export default FormEquipamento;
