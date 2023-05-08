import { useState, useEffect } from "react";
import Form from "./Form";
import SalaContext from "./SalaContext";
import Tabela from "./Tabela";
import Carregando from "../../comuns/Carregando";

function Sala() {
  const [alerta, setAlerta] = useState({ status: "", message: "" });
  const [listaObjetos, setListaObjetos] = useState([]);
  const [editar, setEditar] = useState(false);
  const [objeto, setObjeto] = useState({
    codigo: "",
    numero: "",
    descricao: "",
    capacidade: "",
    predio: "",
  });
  const [carregando, setCarregando] = useState(true);
  const [listaPredios, setListaPredios] = useState([]);

  const recuperaSalas = async () => {
    setCarregando(true);
    await fetch(`${process.env.REACT_APP_ENDERECO_API}/salas`)
      .then((response) => response.json())
      .then((data) => setListaObjetos(data))
      .catch((err) => setAlerta({ status: "error", message: err }));
    setCarregando(false);
  };

  const recuperaPredios = async () => {
    await fetch(`${process.env.REACT_APP_ENDERECO_API}/predios`)
      .then((response) => response.json())
      .then((data) => setListaPredios(data))
      .catch((err) => console.log("Erro: " + err));
  };

  const remover = async (objeto) => {
    if (window.confirm("Deseja remover este objeto?")) {
      try {
        await fetch(
          `${process.env.REACT_APP_ENDERECO_API}/salas/${objeto.codigo}`,
          { method: "DELETE" }
        )
          .then((response) => response.json())
          .then((json) =>
            setAlerta({ status: json.status, message: json.message })
          );
        recuperaSalas();
      } catch (err) {
        setAlerta({ status: "error", message: err });
      }
    }
    recuperaSalas();
  };

  const recuperar = async (codigo) => {
    await fetch(`${process.env.REACT_APP_ENDERECO_API}/salas/${codigo}`)
      .then((response) => response.json())
      .then((data) => setObjeto(data))
      .catch((err) => console.log(err));
  };

  const acaoCadastrar = async (e) => {
    e.preventDefault();
    const metodo = editar ? "PUT" : "POST";
    try {
      await fetch(`${process.env.REACT_APP_ENDERECO_API}/salas`, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objeto),
      })
        .then((response) => response.json())
        .then((json) => {
          setAlerta({ status: json.status, message: json.message });
          setObjeto(json.objeto);
          if (!editar) {
            setEditar(true);
          }
        });
    } catch (err) {
      console.error(err.message);
    }
    recuperaSalas();
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setObjeto({ ...objeto, [name]: value });
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
        recuperaSalas,
        remover,
        objeto,
        setObjeto,
        editar,
        setEditar,
        recuperar,
        acaoCadastrar,
        handleChange,
        listaPredios,
      }}
    >
      {!carregando ? <Tabela /> : <Carregando />}
      <Form />
    </SalaContext.Provider>
  );
}

export default Sala;
