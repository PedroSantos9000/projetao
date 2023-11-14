// Função para carregar dados de um arquivo CSV
function carregarCSV(arquivo, callback) {
    fetch(arquivo)
        .then(response => response.text())
        .then(data => {
            const linhas = data.split('\n');
            const cabecalho = linhas[0].split(',');
            const dados = [];

            for (let i = 1; i < linhas.length; i++) {
                const linha = linhas[i].split(',');
                const entrada = {
                    label: linha[0],
                    data: linha.slice(1).map(Number)
                };
                dados.push(entrada);
            }

            callback(cabecalho, dados);
        });
}

// Função para criar um gráfico com os dados fornecidos
function criarGrafico(id, cabecalho, dados, tipo) {
    const ctx = document.getElementById(id).getContext('2d');
    new Chart(ctx, {
        type: tipo,
        data: {
            labels: cabecalho.slice(1),
            datasets: dados.map((ator, index) => ({
                label: ator.label,
                data: ator.data,
                borderColor: `rgba(${index * 20}, 0, ${255 - index * 20}, 1)`,
                borderWidth: 2,
                fill: false,
            })),
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}

// Carregar dados dos arquivos CSV e criar os gráficos
carregarCSV('idade_atrizes_oscar.csv', (cabecalhoAtrizes, dadosAtrizes) => {
    criarGrafico('graficoAtrizes', cabecalhoAtrizes, dadosAtrizes, 'bar');
});

carregarCSV('idade_atores_oscar.csv', (cabecalhoAtores, dadosAtores) => {
    criarGrafico('graficoAtores', cabecalhoAtores, dadosAtores, 'bar');
});

carregarCSV('idade_atrizes_oscar.csv', (cabecalhoAtrizes, dadosAtrizes) => {
    carregarCSV('idade_atores_oscar.csv', (cabecalhoAtores, dadosAtores) => {
        criarGrafico('graficoAtoresAtrizes', cabecalhoAtores, [...dadosAtores, ...dadosAtrizes], 'bar');
    });
});
