import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";

export interface DadosRelatorio {
  nome_instituicao: string;
  cep: string;
  endereco: string;
  cidade: string;
  estado: string;
  responsavel: string;
  data: string;
  tecnico: string;
  aplicador: string;
}

function formatarData(data: string) {
  if (!data) return "";

  const [ano, mes, dia] = data.split("-");

  return `${dia}/${mes}/${ano}`;
}

export async function gerarWord(dados: DadosRelatorio) {
  const response = await fetch(`/modelo/modelo.docx?v=${Date.now()}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Não foi possível carregar o modelo Word.");
  }

  const content = await response.arrayBuffer();

  const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  doc.render({
    nome_instituicao: dados.nome_instituicao,
    cep: dados.cep,
    endereco: dados.endereco,
    cidade: dados.cidade,
    estado: dados.estado,
    responsavel: dados.responsavel,
    data: formatarData(dados.data),
    tecnico: dados.tecnico,
    aplicador: dados.aplicador,
  });

  const blob = doc.getZip().generate({
    type: "blob",
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });

  saveAs(
    blob,
    `Relatório - ${dados.nome_instituicao} - ${formatarData(dados.data)}.docx`
  );
}