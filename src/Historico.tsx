import { useEffect, useState } from "react";
import { supabase } from "./services/supabase";

interface Visita {
  id: number;
  data: string;
  tecnico_avaliado: string;
  aplicador: string;
  instituicoes: {
    nome: string;
    cidade: string;
  };
}

export default function Historico() {
  const [visitas, setVisitas] = useState<Visita[]>([]);

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
        instituicoes (
          nome,
          cidade
        )
      `)
      .order("data", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setVisitas(data as Visita[]);
  }

  return (
    <div className="container">
      <h2
        style={{
          textAlign: "center",
          color: "#0d47a1",
          marginBottom: 30,
        }}
      >
        Histórico de Visitas
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
        }}
      >
        <thead>
          <tr
            style={{
              background: "#0d47a1",
              color: "#fff",
            }}
          >
            <th style={{ padding: 12 }}>Data</th>
            <th>Instituição</th>
            <th>Cidade</th>
            <th>Técnico</th>
            <th>Aplicador</th>
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
                {visita.data}
              </td>

              <td style={{ borderBottom: "1px solid #ddd" }}>
                {visita.instituicoes?.nome}
              </td>

              <td style={{ borderBottom: "1px solid #ddd" }}>
                {visita.instituicoes?.cidade}
              </td>

              <td style={{ borderBottom: "1px solid #ddd" }}>
                {visita.tecnico_avaliado}
              </td>

              <td style={{ borderBottom: "1px solid #ddd" }}>
                {visita.aplicador}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}