import { useState, useEffect } from "react";
import SalaContext from "./SalaContext";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import { getPrediosAPI } from "../../serviços/PredioServiço";
import {
  getSalasAPI,
  getSalaPorCodigoAPI,
  deleteSalaPorCodigoAPI,
  cadastraSalasAPI,
} from "../../serviços/SalaServiço";

import {
  cadastraEquipamentosAPI,
  deleteEquipamentoPorCodigoAPI,
  getEquipamentoPorCodigoAPI,
  getEquipamentosDaSalaAPI,
} from "../../serviços/EquipamentoServiço";

import FormEquipamento from "./FormEquipamento";
import TabelaEquipamentos from "./TabelaEquipamentos";

function Predio() {
  const [alerta, setAlerta] = useState({ status: "", message: "" });
  const [listaObjetos, setListaObjetos] = useState([]);
  const [editar, setEditar] = useState(false);
  const [objeto, setObjeto] = useState({
    codigo: "",
    nome: "",
    descricao: "",
    sigla: "",
  });
  const [carregando, setCarrengando] = useState(true);
  const [listaPredios, setListaPredios] = useState([]);
  const [editarEquipamento, setEditarEquipamento] = useState(false);
  const [equipamento, setEquipamento] = useState({
    codigo: "",
    descricao: "",
    numero_serie: "",
    valor: "",
    sala: "",
  });

  const [listaEquipamentos, setListaEquipamentos] = useState([]);
  const [exibirEquipamentos, setExibirEquipamentos] = useState(false);

  const recuperaEquipamentos = async (codigosala) => {
    setObjeto(await getSalaPorCodigoAPI(codigosala));
    setListaEquipamentos(await getEquipamentosDaSalaAPI(codigosala));
    setExibirEquipamentos(true);
  };

  const recuperaEquipamento = async (codigo) => {
    setEquipamento(await getEquipamentoPorCodigoAPI(codigo));
  };

  const removerEquipamento = async (equipamento) => {
    if (window.confirm("Deseja remover este equipamento/")) {
      let retornoAPI = await deleteEquipamentoPorCodigoAPI(equipamento.codigo);
      setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
      setListaEquipamentos(await getEquipamentosDaSalaAPI(objeto.codigo));
    }
  };

  const acaoCadastrarEquipamento = async (e) => {
    e.preventDefault();
    const metodo = editarEquipamento ? "PUT" : "POST";
    try {
      let retornoAPI = await cadastraEquipamentosAPI(objeto, metodo);
      setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
      setObjeto(retornoAPI.objeto);
      if (!editarEquipamento) {
        setEditarEquipamento(true);
      }
    } catch (err) {
      console.log(err);
    }
    recuperaEquipamentos(objeto.codigo);
  };

  const handleChangeEquipamento = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEquipamento({ ...equipamento, [name]: value });
  };

  const recuperar = async (codigo) => {
    setObjeto(await getSalaPorCodigoAPI(codigo));
  };

  const acaoCadastrar = async (e) => {
    e.preventDefault();
    const metodo = editar ? "PUT" : "POST";
    try {
      let retornoAPI = await cadastraSalasAPI(objeto, metodo);
      setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
      setObjeto(retornoAPI.objeto);
      if (!editar) {
        setEditar(true);
      }
    } catch (err) {
      console.log(err);
    }
    recuperaSalas();
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setObjeto({ ...objeto, [name]: value });
  };

  const recuperaSalas = async () => {
    setCarrengando(true);
    setListaObjetos(await getSalasAPI());
    setCarrengando(false);
  };

  const recuperaPredios = async () => {
    setListaPredios(await getPrediosAPI());
  };

  const remover = async (objeto) => {
    if (window.confirm("Deseja remover este objeto?")) {
      let retornoAPI = await deleteSalaPorCodigoAPI(objeto.codigo);
      setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
    }
    recuperaSalas();
  };

  useEffect(() => {
    recuperaSalas();
    recuperaPredios();
  }, []);

  return (
    <SalaContext.Provider
      value={{
        alerta,
        setAlerta,
        listaObjetos,
        setListaObjetos,
        recuperaPredios,
        remover,
        objeto,
        setObjeto,
        editar,
        setEditar,
        recuperar,
        acaoCadastrar,
        handleChange,
        listaPredios,
        listaEquipamentos,
        equipamento,
        setEquipamento,
        handleChangeEquipamento,
        removerEquipamento,
        recuperaEquipamento,
        acaoCadastrarEquipamento,
        setEditarEquipamento,
        editarEquipamento,
        recuperaEquipamentos,
        setExibirEquipamentos,
      }}
    >
      {!carregando ? (
        !exibirEquipamentos ? (
          <Tabela />
        ) : (
          <TabelaEquipamentos />
        )
      ) : (
        <Carregando />
      )}
      <Form />
      <FormEquipamento />
    </SalaContext.Provider>
  );
}

export default Predio;
