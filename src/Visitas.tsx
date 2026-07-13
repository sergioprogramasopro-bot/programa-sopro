import { useEffect, useState } from "react";
import "./App.css";
import { supabase } from "./services/supabase";
import { gerarWord } from "./services/gerarWord";

export default function Visitas() {
  const [instituicoes, setInstituicoes] = useState<any[]>([]);

  const [instituicaoId, setInstituicaoId] = useState("");
  const [data, setData] = useState("");
  const [tecnico, setTecnico] = useState("");
  const [aplicador, setAplicador] = useState("");

  useEffect(() => {
    carregarInstituicoes();
  }, []);

  async function carregarInstituicoes() {
    const { data } = await supabase
      .from("instituicoes")
      .select("*")
      .order("nome");

    setInstituicoes(data || []);
  }

  async function gerarRelatorio() {
    alert("ENTROU EM gerarRelatorio");

    if (!instituicaoId) {
      alert("Selecione uma instituição.");
      return;
    }

    const instituicao = instituicoes.find(
      (i) => i.id === Number(instituicaoId)
    );

    if (!instituicao) {
      alert("Instituição não encontrada.");
      return;
    }

    await gerarWord({
      nome_instituicao: instituicao.nome || "",
      cep: instituicao.cep || "",
      endereco: instituicao.endereco || "",
      cidade: instituicao.cidade || "",
      estado: instituicao.estado || "",
      responsavel: instituicao.responsavel || "",
      data,
      tecnico,
      aplicador,
    });
  }

  async function salvar() {
    if (!instituicaoId) {
      alert("Selecione uma instituição.");
      return;
    }

    const { error } = await supabase.from("visitas").insert([
      {
        instituicao_id: Number(instituicaoId),
        data,
        tecnico_avaliado: tecnico,
        aplicador,
      },
    ]);

    if (error) {
      console.log(error);
      alert("Erro ao salvar.");
      return;
    }

    alert("Visita cadastrada com sucesso!");

    setInstituicaoId("");
    setData("");
    setTecnico("");
    setAplicador("");
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
        Nova Visita
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
        Relatório de Visita Técnica
      </p>

      <label>Instituição</label>
      <br />

      <select
        value={instituicaoId}
        onChange={(e) => setInstituicaoId(e.target.value)}
        style={{
          width: "100%",
          padding: 10,
          marginBottom: 20,
        }}
      >
        <option value="">Selecione...</option>

        {instituicoes.map((inst) => (
          <option key={inst.id} value={inst.id}>
            {inst.nome}
          </option>
        ))}
      </select>

      <label>Data</label>
      <br />

      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
        style={{
          width: "100%",
          padding: 10,
          marginBottom: 20,
        }}
      />

      <label>Técnico Avaliado</label>
      <br />

      <input
        value={tecnico}
        onChange={(e) => setTecnico(e.target.value)}
        style={{
          width: "100%",
          padding: 10,
          marginBottom: 20,
        }}
      />

      <label>Aplicador</label>
      <br />

      <input
        value={aplicador}
        onChange={(e) => setAplicador(e.target.value)}
        style={{
          width: "100%",
          padding: 10,
          marginBottom: 35,
        }}
      />

      <div className="botoes">
        <button className="salvar" onClick={salvar}>
          💾 Salvar Visita
        </button>

        <button className="gerar" onClick={gerarRelatorio}>
          📄 Gerar Relatório
        </button>
      </div>
    </div>
  );
}