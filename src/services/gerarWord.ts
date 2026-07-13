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

export async function gerarWord(dados: DadosRelatorio) {
  const response = await fetch(`/modelo/modelo.docx?v=${Date.now()}`, {
  cache: "no-store",
});

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
    data: dados.data,
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
    `Relatório - ${dados.nome_instituicao} - ${dados.data}.docx`
  );
}