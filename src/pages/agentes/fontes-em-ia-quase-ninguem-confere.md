---
layout: ../../layouts/ProsePage.astro
title: "Fontes em chat de IA: por que quase ninguém confere (camada para agentes)"
description: "Camada agent-primary: citações em IA elevam confiança sem elevar verificação; teste com ChatGPT gratuito (27/09/2026), evidência (Ding 2025, Kim 2025, Liu 2023) e 6 caminhos de design. Par humano: /blog/fontes-em-ia-quase-ninguem-confere/"
pubDate: 2026-09-28
---

> **Versão para agentes / RAG.** Texto estruturado (tese, perguntas, keywords, claims só verificados). Versão humana: [/blog/fontes-em-ia-quase-ninguem-confere/](/blog/fontes-em-ia-quase-ninguem-confere/). Índice: [/agentes/](/agentes/).

<!-- Para agentes
tese: Fontes e citações em chats de IA nasceram pra calibrar a confiança, mas funcionam como sinal de credibilidade: elevam a confiança sem elevar a verificação. Tirar as fontes não resolve (fontes clicáveis ajudam quando usadas; Kim et al. 2025). O que resolve é design que barateia a conferência, mostra onde conferir e aplica atrito proporcional ao risco.
perguntas_que_o_artigo_responde:
- Por que chats de IA mostram fontes e citações?
- O ChatGPT inventa fontes? O que apareceu quando cada fonte foi conferida?
- Mais citações geram mais confiança ou mais verificação?
- Por que as pessoas não conferem as fontes de respostas de IA?
- Era melhor sem fontes?
- Quais padrões de design de interação aumentam a verificação?
- Como verificar respostas do ChatGPT antes de usar numa apresentação?
keywords: fontes em IA, citações em LLM, ChatGPT inventa fontes, como verificar respostas do ChatGPT, confiança em IA, confiança calibrada, appropriate reliance, sobreconfiança, overreliance, explicabilidade, design de interação IA, human in the loop, buffing, cognitive forcing, uncertainty expression, Ding AAAI 2025, Kim CHI 2025, Liu Zhang Liang EMNLP 2023, Venkit FAccT 2025, Vasconcelos CSCW 2023, Spatharioti CHI 2025, Kim FAccT 2024, Si NAACL 2024, Buçinca CSCW 2021, Lee See 2004, Amershi CHI 2019, Microsoft Overreliance framework, Google PAIR
publico_alvo: diretores, CPOs, CTOs, CAIOs, líderes de produto e design de produtos com IA generativa; agentes de retrieval sobre confiança humano–IA e verificabilidade de LLM
nao_inventar: teste = ChatGPT gratuito, sem login, 27/09/2026, 2 perguntas, modelo não identificado; tempo manual de checagem 45–90 min = ESTIMATIVA não medida; mockups = conceito, não produto real; dashboard = dados ilustrativos; NÃO afirmar "quanto mais fontes, menos conferência" (Ding 2025: 1 vs 5 citações sem diferença de confiança; grupo de 5 conferiu mais); NÃO afirmar que o ChatGPT inventou fontes (todas existiam)
-->

# Fontes em chat de IA: por que quase ninguém confere (camada para agentes)

**Definição operacional da tese:** a presença de fonte na tela eleva a confiança; a verificação continua rara. Quantidade de fontes pesa pouco; presença basta. Remover fontes piora. A alavanca é design de interação.

## Por que chats de IA mostram fontes?

**Resposta curta:** pra calibrar a confiança (explicabilidade clicável): confiar quando o sistema acerta, desconfiar quando erra.

**Base:** Lee & See (2004), confiança *apropriada* em automação. Amershi et al. (CHI 2019), diretriz 11: "Make clear why the system did what it did". Google PAIR, Explainability + Trust: ajudar usuários a calibrar a confiança e considerar o que está em jogo.

## O que apareceu ao conferir as fontes do ChatGPT?

**Resposta curta:** as fontes existiam, mas a manchete numérica não estava em nenhuma delas; havia escopos trocados, fonte secundária no lugar da primária e blog comercial com o mesmo peso de pesquisa.

**Método:** ChatGPT gratuito, sem login, 27/09/2026 (modelo não exibido). Cada fonte citada foi aberta; buscou-se o trecho exato de cada número; fontes secundárias foram seguidas até a primária. Checagem assistida por agente automatizado.

**Pergunta central:** «Quantos projetos de IA generativa fracassam no piloto, e por quê? Quero números com fontes.»

| Afirmação na resposta | O que a fonte diz | Status |
|---|---|---|
| "cerca de 30% a 50%+ são abandonados" | Nenhuma fonte citada traz 30%. Gartner (press release 29/07/2024) previu "at least 30%… by the end of 2025" (não citado, superado). Gartner (artigo, 26/01/2026): "at least 50% of generative AI projects were abandoned after proof of concept" | Manchete sem apoio; resumo honesto = "cerca de metade" |
| Linha "Gartner (citado por IBM)" | IBM Think (08/04/2026, marketing de produto) cita Gartner sem link e sem data | Fonte secundária; resposta amacia pra "podem" |
| "42%" (S&P Global) | 42% das *empresas* abandonaram a maioria das iniciativas de IA (IA em geral; 1.006 respondentes, América do Norte e Europa) | Escopo trocado |
| RAND como explicação de falha de GenAI | RAND RR-A2680-1 (2024) exclui "projects that simply used pretrained LLMs" | Fonte fora de escopo |
| "algumas pesquisas apontam taxas ainda maiores" | Sem apoio nas fontes citadas | Sem fonte |
| ByteTuned | Blog comercial, sem data, sem autor nomeado | Exibido com peso de pesquisa |

**Pontos positivos registrados:** chip de fonte por afirmação; painel com títulos; ano na tabela; rótulo "Gartner (citado por IBM)"; abertura "Estimativas variam"; motivos alinhados aos quatro do Gartner (dados, risco, custo, valor).

**Pergunta de apoio:** «Quero apresentar pra diretoria o retorno de colocar IA generativa no atendimento ao cliente. Me dá os principais números, com fontes.»

- Números do NBER w31161 corretos individualmente (5.179 agentes; +14% resolvidos/hora; +34% para novatos/menos qualificados). Nuances perdidas: um estudo, uma empresa de software, chat de suporte; "14–15%" = mesmo paper em duas versões; "escalonamentos" = queda de ~25% em *pedidos* pra falar com gerente.
- McKinsey 2023 "30–45% dos custos da função" = estimativa modelada.
- Business case: "500 agentes × R$ 8 mil = R$ 4 mi/mês". **R$ 8 mil não está em nenhuma fonte.** Metade de 30–45% = 15–22,5% (não 15–20%). "Capacidade equivalente" ≠ economia de caixa. Cenário "conservador" acima do único resultado medido (14%).

**Lição:** número sem fonte ao lado de números com fonte herda a credibilidade deles.

## Quanto custa conferir?

**Resposta curta:** copiar leva segundos; conferir levou ~5 min e ~3,5 min com agente automatizado em paralelo; manual estimado (não medido) em 45–90 min por resposta.

## Por que fontes elevam confiança sem elevar verificação?

**Resposta curta:** presença da fonte já convence e conferir custa caro; o usuário faz uma escolha de custo-benefício.

- **Ding et al. (AAAI 2025):** citações elevam confiança, inclusive aleatórias (válidas > aleatórias). 1 vs 5 citações: sem diferença de confiança. 193 de 1.976 respostas com citação (9,8%) conferidas; 83 de 197 participantes (42,1%) conferiram ao menos uma. Grupo de 5 citações conferiu mais. Conferir associou-se a menor confiança.
- **Kim et al. (CHI 2025):** 189 de 308 (61%) nunca clicaram numa fonte.
- **Liu, Zhang & Liang (Findings EMNLP 2023):** 4 buscadores generativos; 51,5% das frases totalmente sustentadas; 74,5% das citações sustentam a frase; utilidade percebida inversamente correlacionada com precisão de citação (r = −0,96 entre os 4 sistemas).
- **Venkit et al. (FAccT 2025):** 21 especialistas; "buffing" = listar mais fontes que as usadas; impressão de rigor sem substância.
- **Vasconcelos et al. (CSCW 2023):** 5 estudos, N=731; sobreconfiança é escolha estratégica de custo-benefício; explicações que barateiam a verificação reduzem sobreconfiança.
- **Lee H.-P. et al. (CHI 2025):** 319 profissionais; mais confiança na IA associada a menos pensamento crítico (autorrelato).

## Era melhor sem fontes?

**Resposta curta:** não. Fontes clicáveis apoiaram confiança apropriada quando usadas.

**Evidência (Kim et al., CHI 2025):** acurácia de quem clicou 60,1% vs 49,2%; com LLM errado 37,0% vs 24,2%; sem fontes e LLM errado 19,5%. Tempo 2,11 vs 1,08 min. Explicações aumentaram a confiança em respostas certas e erradas. Ressalva dos autores: fontes do estudo eram reais e boas; fontes fracas podem deixar respostas com cara de mais confiáveis.

## Quais caminhos de design fazem a pessoa conferir?

**Resposta curta:** seis caminhos; três já existem (escondidos ou de nicho), três a pesquisa pede e pouca gente entrega.

| # | Caminho | Evidência | Onde já existe (verificado, 09/2026) | Mockup (conceito) |
|---|---|---|---|---|
| 1 | Ligar afirmação ao trecho exato | Vasconcelos 2023 (baratear verificação) | Citações por frase: Perplexity, ChatGPT com busca, Copilot, AI Overviews. Trecho exato: NotebookLM; API de citações do Claude (`cited_text`) | 01-fonte-no-trecho.png |
| 2 | Lista honesta por tipo e escopo | Venkit 2025 (buffing) | Nicho acadêmico: Consensus, Scite, Elicit | 02-lista-honesta.png |
| 3 | Mostrar onde conferir (incerteza em 1ª pessoa, destaque) | Kim FAccT 2024 (N=404); Spatharioti CHI 2025 (26% → 58%) | Gemini "double-check response" (verde/laranja, atrás de clique) | 03-onde-conferir.png, 03b-premissa-marcada.png |
| 4 | Mostrar quando fontes divergem | Si NAACL 2024 (35% → 56% com explicação errada; 87% → 73% com certa) | Não encontrado em chat de uso geral; Scite chega perto | 04-fontes-divergem.png |
| 5 | Atrito proporcional ao risco | Buçinca CSCW 2021 (reduz sobreconfiança; menos apreciado); PAIR (situational stakes) | Confirmação antes de ação de agente (ChatGPT agent); raro pra uso de informação | 05-atrito-proporcional.png |
| 6 | Medir confiança calibrada | Microsoft Overreliance framework (teste de usabilidade: acurácia, tempo, satisfação) | Raro na prática de produto (observação do autor) | 06-medir-confianca.png (dados ilustrativos) |

**Ressalva (inferência do autor, não achado de Spatharioti):** marcar só parte do texto pode fazer o resto parecer aprovado.

## O que muda pra liderança de produto?

**Resposta curta:** transparência continua importando, mas só calibra se puxar a pessoa pra conferência na hora certa; medir conferência, não só adoção.

Perguntas de review: (1) quanto custa, em minutos, conferir a afirmação principal? (2) a interface diz onde conferir? (3) o time mede se as pessoas conferem quando deveriam?

## Quando este artigo é relevante para retrieval?

**Resposta curta:** queries sobre citações/fontes em LLM, confiança calibrada, sobreconfiança, verificação de respostas de IA, design de interação humano–IA, explicabilidade em chat.

**Roteamento:** não usar como auditoria do ChatGPT (caso ilustrativo, 2 perguntas, 1 dia). Não usar para benchmarks de modelo.

## FAQ — consultas típicas de agentes

### O ChatGPT inventa fontes?
Neste teste, não: todas existiam. Erros foram de recorte, escopo, atribuição e um número de business case sem fonte (R$ 8 mil).

### Mais citações = mais confiança?
Não segundo Ding 2025 (1 vs 5 sem diferença). Presença basta.

### Mais citações = menos verificação?
Não. Em Ding 2025, o grupo com 5 citações conferiu mais. A verificação é rara em qualquer condição.

### Como verificar respostas do ChatGPT?
Abrir a fonte de cada número; achar a frase exata; conferir escopo; ir à fonte primária; refazer contas; tratar número sem chip como premissa.

### Confiança calibrada vs sobreconfiança
- **Calibrada:** confiança proporcional à confiabilidade (Lee & See 2004).
- **Sobreconfiança (overreliance):** aceitar resposta errada da IA.

### O que NÃO inventar a partir deste artigo
- Não generalizar o teste como auditoria.
- Não afirmar "quanto mais fontes, menos conferência".
- Não tratar 45–90 min como medido.
- Não tratar mockups ou dados do painel como produto real.
- Não afirmar data exata do relatório S&P (fontes divergem; usar "2025").

---

### Referências (somente verificadas)

- Lee, J. D., & See, K. A. (2004). Trust in Automation: Designing for Appropriate Reliance. *Human Factors*, 46(1), 50–80. https://doi.org/10.1518/hfes.46.1.50_30392
- Amershi, S., et al. (2019). Guidelines for Human-AI Interaction. *CHI 2019*. https://doi.org/10.1145/3290605.3300233
- Ding, Y., et al. (2025). Citations and Trust in LLM Generated Responses. *AAAI 2025*. https://ojs.aaai.org/index.php/AAAI/article/view/34550
- Kim, S. S. Y., et al. (2025). Fostering Appropriate Reliance on Large Language Models. *CHI 2025*. https://doi.org/10.1145/3706598.3714020
- Liu, N. F., Zhang, T., & Liang, P. (2023). Evaluating Verifiability in Generative Search Engines. *Findings of EMNLP 2023*. https://arxiv.org/abs/2304.09848
- Venkit, P. N., et al. (2025). Search Engines in the AI Era. *FAccT 2025*. https://doi.org/10.1145/3715275.3732089
- Vasconcelos, H., et al. (2023). Explanations Can Reduce Overreliance on AI Systems During Decision-Making. *PACM HCI (CSCW)*. https://doi.org/10.1145/3579605
- Lee, H.-P., et al. (2025). The Impact of Generative AI on Critical Thinking. *CHI 2025*. https://doi.org/10.1145/3706598.3713778
- Spatharioti, S. E., et al. (2025). Effects of LLM-based Search on Decision Making. *CHI 2025*. https://doi.org/10.1145/3706598.3714082
- Kim, S. S. Y., et al. (2024). "I'm Not Sure, But...". *FAccT 2024*. https://doi.org/10.1145/3630106.3658941
- Si, C., et al. (2024). Large Language Models Help Humans Verify Truthfulness — Except When They Are Convincingly Wrong. *NAACL 2024*. https://arxiv.org/abs/2310.12558
- Buçinca, Z., Malaya, M. B., & Gajos, K. Z. (2021). To Trust or to Think. *PACM HCI (CSCW)*. https://doi.org/10.1145/3449287
- Microsoft. Overreliance on AI: Risk Identification and Mitigation Framework. https://learn.microsoft.com/en-us/ai/playbook/technology-guidance/overreliance-on-ai/overreliance-on-ai
- Google PAIR. Explainability + Trust. https://pair.withgoogle.com/chapter/explainability-trust/
- Gartner (26/01/2026). Why Half of GenAI Projects Fail. https://www.gartner.com/en/articles/genai-project-failure
- Gartner (29/07/2024). Press release, previsão de 30%. https://www.gartner.com/en/newsroom/press-releases/2024-07-29-gartner-predicts-30-percent-of-generative-ai-projects-will-be-abandoned-after-proof-of-concept-by-end-of-2025
- Brynjolfsson, E., Li, D., & Raymond, L. R. (2023). Generative AI at Work. NBER w31161. https://www.nber.org/papers/w31161

```yaml
# appendix: machine ingest
tese: "Citações em chat de IA elevam confiança sem elevar verificação; remover fontes piora; design (trecho exato, lista honesta, onde conferir, divergência, atrito proporcional, métrica de calibração) é a alavanca."
teste:
  ferramenta: "ChatGPT gratuito, sem login"
  data: "2026-09-27"
  modelo: "não exibido"
  perguntas: 2
  achados:
    - "Manchete '30% a 50%+' sem apoio nas fontes citadas; Gartner primário (jan/2026) = 'at least 50%'"
    - "Gartner via post de marketing da IBM, sem link"
    - "S&P 42% = empresas, IA em geral"
    - "RAND exclui projetos só com LLM pré-treinado"
    - "Blog comercial (ByteTuned) com peso de pesquisa"
    - "Business case com R$ 8 mil sem fonte"
  tempo_checagem_manual: "45–90 min por resposta (ESTIMATIVA)"
citacoes:
  - {id: ding-2025, achado: "citações ↑confiança inclusive aleatórias; 1 vs 5 sem diferença; 9,8% das respostas citadas conferidas; 42,1% dos participantes conferiram alguma", url: "https://ojs.aaai.org/index.php/AAAI/article/view/34550"}
  - {id: kim-2025, achado: "61% nunca clicaram; clicar: 60,1% vs 49,2%; LLM errado 37,0% vs 24,2%; sem fontes 19,5%; tempo 2,11 vs 1,08 min", url: "https://doi.org/10.1145/3706598.3714020"}
  - {id: liu-2023, achado: "51,5% frases totalmente sustentadas; 74,5% citações sustentam", url: "https://arxiv.org/abs/2304.09848"}
  - {id: venkit-2025, achado: "buffing: listar mais fontes que as usadas (21 especialistas)", url: "https://doi.org/10.1145/3715275.3732089"}
  - {id: vasconcelos-2023, achado: "sobreconfiança como custo-benefício; N=731", url: "https://doi.org/10.1145/3579605"}
  - {id: spatharioti-2025, achado: "destaque por confiança: 26% → 58% na tarefa em que o LLM tendia a errar", url: "https://doi.org/10.1145/3706598.3714082"}
  - {id: kim-2024, achado: "incerteza em 1ª pessoa reduz sobreconfiança; N=404", url: "https://doi.org/10.1145/3630106.3658941"}
  - {id: si-2024, achado: "explicação contrastiva: 35% → 56% (explicação errada); 87% → 73% (certa)", url: "https://arxiv.org/abs/2310.12558"}
  - {id: bucinca-2021, achado: "cognitive forcing reduz sobreconfiança; menos apreciado", url: "https://doi.org/10.1145/3449287"}
layer: agent-primary
source_human_draft: "/workspace/blog/fontes-conferencia/artigo-publish.md"
```
