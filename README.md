# Xilofone Mágico 🎶

Aplicativo web para ensinar uma criança (a partir de ~5 anos) a tocar músicas no
xilofone infantil de 8 teclas coloridas (vermelho → laranja → amarelo →
verde-limão → verde → azul-claro → azul-escuro → azul-marinho).

Feito como um site estático simples (HTML + CSS + JavaScript puro), sem
build, sem dependências, sem downloads de áudio — os sons do xilofone são
sintetizados no navegador (Web Audio API).

## Como usar

Basta abrir `index.html` no navegador, ou publicar a pasta em qualquer
hospedagem estática (GitHub Pages, Netlify, Vercel, etc.):

```bash
python3 -m http.server 8080
# depois abra http://localhost:8080
```

Funciona bem em celular/tablet (touch) e computador (mouse), inclusive
offline depois de carregado uma vez (não usa arquivos de áudio externos).

## Como o app ensina

- **Teclas coloridas iguais ao brinquedo real**, cada uma já mostra o nome
  da nota (Dó, Ré, Mi, Fá, Sol, Lá, Si, Dó agudo) — e também existe uma
  legenda fixa com as 8 notas e suas cores, para a criança sempre poder
  consultar "qual tecla é qual nota".
- **Toque livre**: a qualquer momento a criança pode tocar em qualquer
  tecla; ela soa e o nome da nota aparece em destaque, gigante e colorido.
- **Modo "Ouvir"** ▶️: toca a música inteira sozinha, piscando cada tecla no
  tempo certo e mostrando a nota e a frase da letra correspondente — para a
  criança ouvir e cantar junto.
- **Modo "Tocar"** 👐: modo de prática em "chamada e resposta" — o app
  acende (pulsando) a próxima tecla que ela precisa apertar e espera,
  sem pressa; quando ela acerta, a tecla soa, fica verde de "sucesso" e o
  app segue para a próxima nota. Ao terminar a música: confete e um
  "muito bem!" 🎉
- **Velocidade** 🐇🐢🐌: botão com 3 níveis (Normal → Devagar → **Muito
  Lento**), para dar bastante tempo entre uma nota e outra enquanto a
  criança ainda está aprendendo onde fica cada tecla.
- **Livre** 🎹: sai do modo música e volta ao xilofone livre.
- Botão de **som** 🔊/🔇 grande no topo.

Todos os botões são grandes, com ícones e poucas palavras, pensados para
uma criança de 5 anos usar sozinha.

## Repertório incluído (15 músicas)

**Cantigas de roda / infantis** (todas adaptadas para caber só nas 8 notas
naturais do xilofone, sem sustenidos/bemóis):

- Brilha Brilha Estrelinha
- Atirei o Pau no Gato
- Cai Cai Balão
- Escravos de Jó (usada como "escala musical" de subir e descer — ótima
  para fixar a ordem das notas)
- Ciranda Cirandinha
- Terezinha de Jesus
- A Barata
- Boi da Cara Preta
- Marcha Soldado
- O Cravo e a Rosa
- Pirulito que Bate Bate
- Borboletinha
- Sapo Cururu

**Brincadeira** (música de movimento/percussão corporal):

- **Palma, Palma, Palma** 👏🦶 — a criança bate palma 3x, bate o pé 3x, roda
  e "cai"; cada passo ainda toca uma tecla real do xilofone (para seguir
  reforçando as notas), mas também mostra um emoji gigante (👏/🦶/🌀/🎉) e
  toca um som de palma/batida de pé de verdade, sincronizado com a letra.

**Louvor / gospel:**

- **Hosana** — arranjo simples e melódico (nota sobe até o "nas alturas!" e
  desce de volta), pensado para ser fácil de cantar e tocar.

> Observação: como o xilofone físico só tem 8 notas naturais (dó ré mi fá
> sol lá si dó), as músicas foram simplificadas/adaptadas para essa escala
> — não são transcrições nota-por-nota de gravações originais, e sim
> arranjos pedagógicos pensados para esse instrumento e essa faixa etária.

## Estrutura do projeto

```
index.html   → estrutura da página
style.css    → visual (cores iguais às do brinquedo, botões grandes)
app.js       → lógica: notas, músicas, síntese de áudio, modos de jogo
```

## Ideias para evoluir

- Adicionar mais músicas (basta incluir um novo objeto em `SONGS` no
  `app.js`, com a sequência de notas de 0 a 7 e a duração em batidas).
- Guardar estrelinhas/progresso da criança (ex.: `localStorage`).
- Gravação: deixar a criança tocar livremente e o app "repetir" o que ela
  tocou.
