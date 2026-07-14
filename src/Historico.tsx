import { useEffect, useState } from "react";
import { supabase } from "./services/supabase";


import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";


interface Visita {
  id: number;
  data: string;
  tecnico_avaliado: string;
  aplicador: string;
  instituicao_id: number;

  instituicoes: {
  nome: string;
  cep: string;
  endereco: string;
  cidade: string;
  estado: string;
  responsavel: string;
};
}

export default function Historico() {
  const [visitas, setVisitas] = useState<Visita[]>([]);
  const [editando, setEditando] = useState<Visita | null>(null);

  const [novaData, setNovaData] = useState("");
  const [novoTecnico, setNovoTecnico] = useState("");
  const [novoAplicador, setNovoAplicador] = useState("");

  useEffect(() => {
    carregarVisitas();
  }, []);

  async function carregarVisitas() {
    const { data, error } = await supabase
      .from("visitas")
      .select(`
        id,
        data,
        tecnico_avaliado,
        aplicador,
        instituicao_id,
        instituicoes(
          nome,
          cep,
          endereco,
          cidade,
          estado,
          responsavel
        )
      `)
      .order("data", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }
    console.log("VISITAS:", data);

    setVisitas(data as unknown as Visita[]);
  }

  function formatarData(data: string) {
    if (!data) return "";

    const [ano, mes, dia] = data.split("-");

    return `${dia}/${mes}/${ano}`;
  }

  async function excluirVisita(id: number) {
    const confirmar = window.confirm(
      "Deseja realmente excluir esta visita?"
    );

    if (!confirmar) return;

    const { error } = await supabase
      .from("visitas")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Erro ao excluir.");
      console.error(error);
      return;
    }

    carregarVisitas();
  }

  
  

  function abrirEdicao(visita: Visita) {
    setEditando(visita);

    setNovaData(visita.data);
    setNovoTecnico(visita.tecnico_avaliado);
    setNovoAplicador(visita.aplicador);
  }

  return (
    <div className="container">

      <h2
        style={{
          textAlign: "center",
          color: "#0d47a1",
          marginBottom: 25,
        }}
      >
        Histórico de Visitas
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <thead>
          <tr
            style={{
              background: "#1565c0",
              color: "#fff",
            }}
          >
            <th style={{ padding: 12 }}>Data</th>
            <th>Instituição</th>
            <th>Cidade</th>
            <th>Técnico</th>
            <th>Aplicador</th>
            <th style={{ width: 180 }}>Ações</th>
          </tr>
        </thead>

        <tbody>

          {visitas.map((visita) => (

  <tr key={visita.id}>

    <td
      style={{
        padding: 10,
        borderBottom: "1px solid #ddd",
      }}
    >
      {formatarData(visita.data)}
    </td>

    <td
      style={{
        padding: 10,
        borderBottom: "1px solid #ddd",
      }}
    >
      {JSON.stringify(visita.instituicoes)}
    </td>

    <td
  style={{
    padding: 10,
    borderBottom: "1px solid #ddd",
  }}
>
      {JSON.stringify(visita.instituicoes)}
    </td>

    <td
      style={{
        padding: 10,
        borderBottom: "1px solid #ddd",
      }}
    >
      {visita.tecnico_avaliado}
    </td>

    <td
      style={{
        padding: 10,
        borderBottom: "1px solid #ddd",
      }}
    >
      {visita.aplicador}
    </td>

    <td
      style={{
        padding: 10,
        borderBottom: "1px solid #ddd",
        textAlign: "center",
      }}
 >

  <button
    onClick={() => abrirEdicao(visita)}
    style={{
      margin: 4,
      background: "#ff9800",
      color: "#fff",
      border: "none",
      borderRadius: 6,
      padding: "8px",
      cursor: "pointer",
    }}
  >
    <EditIcon fontSize="small" />
  </button>

  <button
    onClick={() => excluirVisita(visita.id)}
    style={{
      margin: 4,
      background: "#d32f2f",
      color: "#fff",
      border: "none",
      borderRadius: 6,
      padding: "8px",
      cursor: "pointer",
    }}
  >
    <DeleteIcon fontSize="small" />
  </button>

</td>

</tr>

))}

{visitas.length === 0 && (
  <tr>
    <td
      colSpan={6}
      style={{
        textAlign: "center",
        padding: 30,
      }}
    >
      Nenhuma visita cadastrada.
    </td>
  </tr>
)}

</tbody>

</table>

{editando && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,.45)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 999,
    }}
  >
        
          <div
            style={{
              background: "#fff",
              borderRadius: 10,
              width: 420,
              padding: 25,
            }}
          >
            <h3
              style={{
                marginTop: 0,
                color: "#1565c0",
              }}
            >
              Editar Visita
            </h3>

            <label>Data</label>

            <input
              type="date"
              value={novaData}
              onChange={(e) => setNovaData(e.target.value)}
              style={{
                width: "100%",
                padding: 10,
                marginTop: 5,
                marginBottom: 20,
              }}
            />

            <label>Técnico</label>

            <input
              value={novoTecnico}
              onChange={(e) => setNovoTecnico(e.target.value)}
              style={{
                width: "100%",
                padding: 10,
                marginTop: 5,
                marginBottom: 20,
              }}
            />

            <label>Aplicador</label>

            <input
              value={novoAplicador}
              onChange={(e) => setNovoAplicador(e.target.value)}
              style={{
                width: "100%",
                padding: 10,
                marginTop: 5,
                marginBottom: 25,
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 10,
              }}
            >
              <button
                onClick={() => setEditando(null)}
                style={{
                  padding: "10px 18px",
                  border: "1px solid #ccc",
                  background: "#fff",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                Cancelar
              </button>

              <button
                onClick={async () => {
                  const { error } = await supabase
                    .from("visitas")
                    .update({
                      data: novaData,
                      tecnico_avaliado: novoTecnico,
                      aplicador: novoAplicador,
                    })
                    .eq("id", editando.id);

                  if (error) {
                    alert("Erro ao atualizar.");
                    console.error(error);
                    return;
                  }

                  setEditando(null);
                  carregarVisitas();
                }}
                style={{
                  padding: "10px 18px",
                  background: "#1565c0",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}