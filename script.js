/* ============================================
   PROJETO SALVA NASCENTES - AGRINHO 2026
   SCRIPT DE FUNCIONALIDADES INTERATIVAS
   ============================================ */

// Aguarda o carregamento completo do DOM para executar os scripts
document.addEventListener('DOMContentLoaded', function() {
    
    /* ============================================
       1. FUNCIONALIDADES DE ACESSIBILIDADE
       ============================================ */
    
    // Elementos do menu de acessibilidade
    const botaoAcessibilidade = document.getElementById('btnAcessibilidade');
    const menuAcessibilidade = document.getElementById('menuAcessibilidade');
    const aumentarFonte = document.getElementById('aumentarFonte');
    const diminuirFonte = document.getElementById('diminuirFonte');
    const altoContraste = document.getElementById('altoContraste');
    
    // Controle do tamanho da fonte
    let tamanhoFonteAtual = 'normal';
    
    // Abrir/fechar menu de acessibilidade ao clicar no botão
    if (botaoAcessibilidade) {
        botaoAcessibilidade.addEventListener('click', function(event) {
            event.stopPropagation();
            menuAcessibilidade.classList.toggle('aberto');
        });
    }
    
    // Função para aumentar a fonte
    if (aumentarFonte) {
        aumentarFonte.addEventListener('click', function() {
            // Remove todas as classes de fonte existentes
            document.body.classList.remove('fonte-pequena', 'fonte-normal', 'fonte-grande', 'fonte-muito-grande');
            
            if (tamanhoFonteAtual === 'normal') {
                document.body.classList.add('fonte-grande');
                tamanhoFonteAtual = 'grande';
            } else if (tamanhoFonteAtual === 'grande') {
                document.body.classList.add('fonte-muito-grande');
                tamanhoFonteAtual = 'muito-grande';
            } else if (tamanhoFonteAtual === 'pequena') {
                document.body.classList.add('fonte-normal');
                tamanhoFonteAtual = 'normal';
            } else if (tamanhoFonteAtual === 'muito-grande') {
                // Já está no máximo, mantém
                document.body.classList.add('fonte-muito-grande');
            } else {
                document.body.classList.add('fonte-grande');
                tamanhoFonteAtual = 'grande';
            }
        });
    }
    
    // Função para diminuir a fonte
    if (diminuirFonte) {
        diminuirFonte.addEventListener('click', function() {
            document.body.classList.remove('fonte-pequena', 'fonte-normal', 'fonte-grande', 'fonte-muito-grande');
            
            if (tamanhoFonteAtual === 'normal') {
                document.body.classList.add('fonte-pequena');
                tamanhoFonteAtual = 'pequena';
            } else if (tamanhoFonteAtual === 'grande') {
                document.body.classList.add('fonte-normal');
                tamanhoFonteAtual = 'normal';
            } else if (tamanhoFonteAtual === 'muito-grande') {
                document.body.classList.add('fonte-grande');
                tamanhoFonteAtual = 'grande';
            } else if (tamanhoFonteAtual === 'pequena') {
                document.body.classList.add('fonte-pequena');
            } else {
                document.body.classList.add('fonte-pequena');
                tamanhoFonteAtual = 'pequena';
            }
        });
    }
    
    // Função para ativar/desativar alto contraste
    if (altoContraste) {
        altoContraste.addEventListener('click', function() {
            document.body.classList.toggle('alto-contraste');
            
            // Muda o texto do botão para indicar o estado atual
            if (document.body.classList.contains('alto-contraste')) {
                altoContraste.innerHTML = '🌞 Desativar contraste';
            } else {
                altoContraste.innerHTML = '🎨 Alto contraste';
            }
        });
    }
    
    // Fechar menu ao clicar fora (melhora a experiência do usuário)
    document.addEventListener('click', function(event) {
        if (botaoAcessibilidade && menuAcessibilidade) {
            if (!botaoAcessibilidade.contains(event.target) && !menuAcessibilidade.contains(event.target)) {
                menuAcessibilidade.classList.remove('aberto');
            }
        }
    });
    
    /* ============================================
       2. FUNCIONALIDADE PRINCIPAL: QUIZ INTERATIVO
          (Simulador de qualidade da água)
       ============================================ */
    
    const btnVerificar = document.getElementById('btnVerificar');
    const resultadoDiv = document.getElementById('resultadoQuiz');
    
    // Função que verifica a qualidade da água baseada nas respostas
    function verificarQualidadeAgua() {
        // Obter as respostas selecionadas
        const pergunta1 = document.querySelector('input[name="pergunta1"]:checked');
        const pergunta2 = document.querySelector('input[name="pergunta2"]:checked');
        const pergunta3 = document.querySelector('input[name="pergunta3"]:checked');
        const pergunta4 = document.querySelector('input[name="pergunta4"]:checked');
        
        // Verificar se todas as perguntas foram respondidas
        if (!pergunta1 || !pergunta2 || !pergunta3 || !pergunta4) {
            resultadoDiv.innerHTML = '❌ Por favor, responda todas as 4 perguntas antes de verificar a qualidade da água.';
            resultadoDiv.classList.add('mostrar', 'regular');
            resultadoDiv.classList.remove('ruim', 'bom');
            return;
        }
        
        // Somar os valores das respostas (cada resposta vale 0, 2 ou 4 pontos)
        let pontuacao = 0;
        pontuacao += parseInt(pergunta1.value);
        pontuacao += parseInt(pergunta2.value);
        pontuacao += parseInt(pergunta3.value);
        pontuacao += parseInt(pergunta4.value);
        
        // Classificar a qualidade da água baseado na pontuação (máximo 16 pontos)
        let classificacao = '';
        let mensagem = '';
        let classeCSS = '';
        
        if (pontuacao <= 4) {
            classificacao = '⚠️ CRÍTICO';
            mensagem = 'A qualidade da água na sua região está muito ruim! É hora de agir: evite jogar lixo nos rios, economize água e cobre saneamento básico. Comece pequenas mudanças hoje mesmo!';
            classeCSS = 'ruim';
        } else if (pontuacao <= 8) {
            classificacao = '🟠 REGULAR';
            mensagem = 'A qualidade da água precisa melhorar. Você já faz algumas coisas certas, mas ainda há muito a fazer. Participe de ações de limpeza e incentive a reciclagem na sua comunidade.';
            classeCSS = 'regular';
        } else if (pontuacao <= 12) {
            classificacao = '🟢 BOA';
            mensagem = 'Parabéns! A qualidade da água na sua região é boa. Continue cuidando dos rios e nascentes, ensine outras pessoas e mantenha as práticas sustentáveis.';
            classeCSS = 'bom';
        } else {
            classificacao = '💙 EXCELENTE';
            mensagem = 'Excelente! Você e sua região estão de parabéns pela qualidade da água. Continue sendo um guardião das nascentes e incentive mais pessoas a participarem dessa missão!';
            classeCSS = 'bom';
        }
        
        // Exibir o resultado completo com dicas personalizadas
        resultadoDiv.innerHTML = `
            <h3>${classificacao}</h3>
            <p><strong>⭐ Sua pontuação:</strong> ${pontuacao} de 16 pontos</p>
            <p>📝 ${mensagem}</p>
            <hr>
            <p><strong>💧 Dica especial do Salva Nascentes:</strong> Nunca jogue lixo em rios ou nascentes. Separe o lixo reciclável, economize água e compartilhe esse conhecimento com sua família e amigos!</p>
            <p><strong>🌾 Lembrete Agrinho:</strong> "Agro forte, futuro sustentável" começa com água limpa!</p>
        `;
        
        // Aplicar as classes CSS para estilizar o resultado
        resultadoDiv.classList.add('mostrar', classeCSS);
        resultadoDiv.classList.remove('ruim', 'regular', 'bom');
        resultadoDiv.classList.add(classeCSS);
        
        // Rolar a página suavemente até o resultado
        resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    // Adicionar evento de clique ao botão
