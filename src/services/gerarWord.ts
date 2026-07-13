export async function gerarWord(dados: DadosRelatorio) {
  alert("1");

  const response = await fetch(`/modelo/modelo.docx?v=${Date.now()}`, {
    cache: "no-store",
  });

  alert("2");

  const content = await response.arrayBuffer();

  alert("3");

  const zip = new PizZip(content);

  alert("4");

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  alert("5");

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

  alert("6");

  const blob = doc.getZip().generate({
    type: "blob",
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });

  alert("7");

  saveAs(
    blob,
    `Relatório - ${dados.nome_instituicao} - ${dados.data}.docx`
  );

  alert("8");
}