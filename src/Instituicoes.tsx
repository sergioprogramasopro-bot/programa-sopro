import { useEffect, useState } from "react";
import "./App.css";
import { supabase } from "./services/supabase";

export default function Instituicoes() {
  const [idEdicao, setIdEdicao] = useState<number | null>(null);

  const [nome, setNome] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [responsavel, setResponsavel] = useState("");

  const [instituicoes, setInstituicoes] = useState<any[]>([]);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const { data } = await supabase
      .from("instituicoes")
      .select("*")
      .order("nome");

    setInstituicoes(data || []);
  }

  function limpar() {
    setIdEdicao(null);
    setNome("");
    setCep("");
    setEndereco("");
    setCidade("");
    setEstado("");
    setResponsavel("");
  }

  async function salvar() {
    if (!nome.trim()) {
      alert("Informe o nome da instituição.");
      return;
    }

    if (idEdicao === null) {
      const { error } = await supabase.from("instituicoes").insert([
        {
          nome,
          cep,
          endereco,
          cidade,
          estado,
          responsavel,
        },
      ]);

      if (error) {
        alert(error.message);
        return;
      }
    } else {
      const { error } = await supabase
        .from("instituicoes")
        .update({
          nome,
          cep,
          endereco,
          cidade,
          estado,
          responsavel,
        })
        .eq("id", idEdicao);

      if (error) {
        alert(error.message);
        return;
      }
    }

    limpar();
    carregar();
  }

  function editar(inst: any) {
    setIdEdicao(inst.id);
    setNome(inst.nome || "");
    setCep(inst.cep || "");
    setEndereco(inst.endereco || "");
    setCidade(inst.cidade || "");
    setEstado(inst.estado || "");
    setResponsavel(inst.responsavel || "");
  }

  async function excluir(id: number) {
    if (!window.confirm("Deseja excluir esta instituição?")) return;

    const { error } = await supabase
      .from("instituicoes")
      .delete()
      .eq("id", id);

    if (error) {
      console.log(error);
      alert(error.message);
      return;
    }

    carregar();
  }

  return (
    <div className="container">
      <h2
        style={{
          textAlign: "center",
          color: "#0d47a1",
          fontWeight: 700,
          fontSize: "32px",
          marginBottom: "5px",
        }}
      >
        Cadastro de Instituições
      </h2>

      <p
        style={{
          textAlign: "center",
          color: "#666",
          fontSize: "18px",
          marginTop: 0,
          marginBottom: "35px",
        }}
      >
        Gerencie as instituições participantes
      </p>

      <input
        placeholder="Nome da Instituição"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 15 }}
      />

      <input
        placeholder="CEP"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 15 }}
      />

      <input
        placeholder="Endereço"
        value={endereco}
        onChange={(e) => setEndereco(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 15 }}
      />

      <input
        placeholder="Cidade"
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 15 }}
      />

      <input
        placeholder="Estado"
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 15 }}
      />

      <input
        placeholder="Responsável pela Instituição"
        value={responsavel}
        onChange={(e) => setResponsavel(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 25 }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 15,
          marginBottom: 30,
        }}
      >
        <button className="salvar" onClick={salvar}>
          {idEdicao === null ? "💾 Salvar" : "💾 Atualizar"}
        </button>

        {idEdicao !== null && (
          <button className="gerar" onClick={limpar}>
            Cancelar
          </button>
        )}
      </div>

      <hr />

      <h3
        style={{
          textAlign: "center",
          color: "#0d47a1",
          marginTop: 30,
        }}
      >
        Instituições Cadastradas
      </h3>

      {instituicoes.map((inst) => (
        <div
          key={inst.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: 12,
            padding: 15,
            marginBottom: 15,
            background: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,.05)",
          }}
        >
          <h4 style={{ margin: 0 }}>{inst.nome}</h4>

          <p style={{ margin: "8px 0" }}>
            📍 {inst.endereco}
          </p>

          <p style={{ margin: "8px 0" }}>
            {inst.cidade} - {inst.estado}
          </p>

          <p style={{ margin: "8px 0" }}>
            👤 {inst.responsavel}
          </p>

          <div
            style={{
              display: "flex",
              gap: 10,
              marginTop: 15,
            }}
          >
            <button onClick={() => editar(inst)}>
              ✏️ Editar
            </button>

            <button onClick={() => excluir(inst.id)}>
              🗑 Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}