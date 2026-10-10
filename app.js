/* Xilofone Mágico — app de aprendizado musical para crianças
   Baseado no xilofone infantil de 8 teclas (vermelho -> azul-marinho). */

(() => {
  "use strict";

  // ---------------------------------------------------------------
  // 1) As 8 notas do xilofone (mesma ordem/cores do brinquedo real)
  // ---------------------------------------------------------------
  const NOTES = [
    { name: "Dó",  color: "var(--c0)", hex: "#e5342a", freq: 261.63 },
    { name: "Ré",  color: "var(--c1)", hex: "#f5871f", freq: 293.66 },
    { name: "Mi",  color: "var(--c2)", hex: "#f6d51f", freq: 329.63 },
    { name: "Fá",  color: "var(--c3)", hex: "#a9cf3a", freq: 349.23 },
    { name: "Sol", color: "var(--c4)", hex: "#3fa63f", freq: 392.00 },
    { name: "Lá",  color: "var(--c5)", hex: "#7fa8c9", freq: 440.00 },
    { name: "Si",  color: "var(--c6)", hex: "#26428a", freq: 493.88 },
    { name: "Dó",  color: "var(--c7)", hex: "#1b2a5c", freq: 523.25 }, // Dó agudo
  ];

  // -----------------------------------------------------------------
  // 2) Músicas. Índices vão de 0 (Dó grave) a 7 (Dó agudo).
  //    Duração em "batidas" (1 batida = 1 unidade de tempo).
  //    Estas são versões SIMPLIFICADAS/adaptadas para caber nas
  //    8 notas naturais do brinquedo (sem sustenidos/bemóis).
  // -----------------------------------------------------------------
  const SONGS = [
    {
      id: "estrelinha",
      title: "Brilha Brilha Estrelinha",
      emoji: "⭐",
      kind: "cantiga",
      lyrics: [
        "Brilha, brilha, estrelinha",
        "Como eu gosto de você",
        "Lá no céu tão pequenina",
        "Parece um diamante a arder",
      ],
      notes: [
        [0,1],[0,1],[4,1],[4,1],[5,1],[5,1],[4,2],
        [3,1],[3,1],[2,1],[2,1],[1,1],[1,1],[0,2],
        [4,1],[4,1],[3,1],[3,1],[2,1],[2,1],[1,2],
        [4,1],[4,1],[3,1],[3,1],[2,1],[2,1],[1,2],
        [0,1],[0,1],[4,1],[4,1],[5,1],[5,1],[4,2],
        [3,1],[3,1],[2,1],[2,1],[1,1],[1,1],[0,2],
      ],
    },
    {
      id: "gato",
      title: "Atirei o Pau no Gato",
      emoji: "🐱",
      kind: "cantiga",
      lyrics: [
        "Atirei o pau no gato-to-to",
        "Mas o gato-to-to não morreu-reu-reu",
        "Dona Chica-ca admirou-se-se",
        "Do berro, do berro que o gato deu: Miau!",
      ],
      notes: [
        [2,1],[2,1],[2,1],[0,1],[1,1],[2,1],[3,2],
        [2,1],[2,1],[2,1],[0,1],[1,1],[2,1],[1,2],
        [4,1],[4,1],[4,1],[3,1],[2,1],[1,1],[0,2],
      ],
    },
    {
      id: "balao",
      title: "Cai Cai Balão",
      emoji: "🎈",
      kind: "cantiga",
      lyrics: [
        "Cai, cai, balão",
        "Cai, cai, balão",
        "Na rua do meu amor",
      ],
      notes: [
        [7,1],[7,1],[6,1],[5,1],[4,2],
        [4,1],[3,1],[2,1],[1,1],[0,2],
        [7,1],[7,1],[6,1],[5,1],[4,2],
        [4,1],[3,1],[2,1],[1,1],[0,3],
      ],
    },
    {
      id: "escravos",
      title: "Escravos de Jó (sobe e desce)",
      emoji: "🔄",
      kind: "cantiga",
      lyrics: [
        "Vamos subir a escada da música...",
        "...e agora descer devagarinho!",
      ],
      notes: [
        [0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,2],
        [7,1],[6,1],[5,1],[4,1],[3,1],[2,1],[1,1],[0,2],
      ],
    },
    {
      id: "ciranda",
      title: "Ciranda Cirandinha",
      emoji: "💃",
      kind: "cantiga",
      lyrics: [
        "Ciranda, cirandinha",
        "Vamos todos cirandar",
        "Vamos dar a meia-volta",
        "Volta e meia vamos dar",
      ],
      notes: [
        [2,1],[2,1],[3,1],[3,1],[4,1],[4,1],[3,2],
        [2,1],[2,1],[1,1],[1,1],[0,1],[0,1],[1,2],
        [2,1],[3,1],[4,1],[3,1],[2,1],[1,1],[0,2],
        [2,1],[3,1],[4,1],[3,1],[2,1],[1,1],[0,3],
      ],
    },
    {
      id: "terezinha",
      title: "Terezinha de Jesus",
      emoji: "👒",
      kind: "cantiga",
      lyrics: [
        "Terezinha de Jesus",
        "De uma queda foi ao chão",
        "Acudiram três cavalheiros",
        "Todos três chapéu na mão",
      ],
      notes: [
        [0,1],[1,1],[2,1],[2,1],[1,1],[0,2],
        [2,1],[3,1],[4,1],[4,1],[3,1],[2,2],
        [4,1],[4,1],[3,1],[2,1],[1,1],[0,2],
        [0,1],[1,1],[2,1],[1,1],[0,3],
      ],
    },
    {
      id: "barata",
      title: "A Barata",
      emoji: "🪳",
      kind: "cantiga",
      lyrics: [
        "A barata diz que tem",
        "Sete saias de filó",
        "É mentira da barata",
        "Ela tem é uma só",
      ],
      notes: [
        [4,1],[4,1],[4,1],[3,1],[2,2],
        [2,1],[2,1],[2,1],[1,1],[0,2],
        [4,1],[4,1],[3,1],[2,2],
        [0,1],[0,1],[1,1],[2,1],[0,3],
      ],
    },
    {
      id: "boi",
      title: "Boi da Cara Preta",
      emoji: "🐂",
      kind: "cantiga",
      lyrics: [
        "Boi, boi, boi",
        "Boi da cara preta",
        "Pega essa criança",
        "Que tem medo de careta",
      ],
      notes: [
        [4,2],[4,2],[4,2],
        [3,1],[2,1],[1,1],[0,3],
        [2,1],[3,1],[4,1],[3,2],
        [2,1],[1,1],[0,3],
      ],
    },
    {
      id: "marcha",
      title: "Marcha Soldado",
      emoji: "🪖",
      kind: "cantiga",
      lyrics: [
        "Marcha, soldado",
        "Cabeça de papel",
        "Se não marchar direito",
        "Vai preso pro quartel",
      ],
      notes: [
        [0,1],[0,1],[2,1],[2,1],[4,2],
        [4,1],[3,1],[2,1],[1,1],[0,2],
        [2,1],[2,1],[1,1],[1,1],[0,2],
        [4,1],[3,1],[2,1],[1,1],[0,3],
      ],
    },
    {
      id: "cravo",
      title: "O Cravo e a Rosa",
      emoji: "🌹",
      kind: "cantiga",
      lyrics: [
        "O cravo brigou com a rosa",
        "Debaixo de uma sacada",
        "O cravo saiu ferido",
        "E a rosa despedaçada",
      ],
      notes: [
        [0,1],[1,1],[2,1],[3,1],[4,2],
        [4,1],[3,1],[2,1],[1,1],[0,2],
        [2,1],[2,1],[3,1],[3,1],[4,2],
        [3,1],[2,1],[1,1],[0,2],
      ],
    },
    {
      id: "pirulito",
      title: "Pirulito que Bate Bate",
      emoji: "🍭",
      kind: "cantiga",
      lyrics: [
        "Pirulito que bate, bate",
        "Pirulito que já bateu",
        "Quem gosta de mim é ela",
        "Quem gosta dela sou eu",
      ],
      notes: [
        [2,1],[2,1],[2,1],[2,1],[1,2],
        [2,1],[2,1],[2,1],[2,1],[0,2],
        [4,1],[3,1],[2,1],[1,1],[2,2],
        [1,1],[0,1],[1,1],[2,1],[0,2],
      ],
    },
    {
      id: "borboletinha",
      title: "Borboletinha",
      emoji: "🦋",
      kind: "cantiga",
      lyrics: [
        "Borboletinha tá na cozinha",
        "Fazendo chocolate pra madrinha",
        "Poti, poti, perna de pau",
        "Olha a menina fazendo cocau",
      ],
      notes: [
        [4,1],[4,1],[5,1],[5,1],[4,2],
        [3,1],[3,1],[2,1],[2,1],[1,2],
        [2,1],[2,1],[3,1],[3,1],[2,2],
        [1,1],[1,1],[0,1],[0,1],[0,2],
      ],
    },
    {
      id: "sapocururu",
      title: "Sapo Cururu",
      emoji: "🐸",
      kind: "cantiga",
      lyrics: [
        "Sapo cururu na beira do rio",
        "Quando o sapo canta, ó maninha",
        "Ele diz que tem",
        "Frio!",
      ],
      notes: [
        [0,1],[2,1],[4,1],[4,1],[2,1],[0,2],
        [0,1],[2,1],[4,1],[5,1],[4,2],
        [3,1],[2,1],[1,1],[0,2],
        [0,3],
      ],
    },
    {
      id: "palmas",
      title: "Palma, Palma, Palma",
      emoji: "👏",
      kind: "brincadeira",
      lyrics: [
        "Palma, palma, palma! 👏",
        "Pé, pé, pé! 🦶",
        "Roda, roda, roda... 🌀",
        "E... caiuuu! 🎉",
      ],
      notes: [
        [7,1,"clap"],[7,1,"clap"],[7,1,"clap"],
        [0,1,"stomp"],[0,1,"stomp"],[0,1,"stomp"],
        [1,0.5,"spin"],[3,0.5,"spin"],[5,0.5,"spin"],[7,0.5,"spin"],
        [0,3,"fall"],
        [7,1,"clap"],[7,1,"clap"],[7,1,"clap"],
        [0,1,"stomp"],[0,1,"stomp"],[0,1,"stomp"],
        [1,0.5,"spin"],[3,0.5,"spin"],[5,0.5,"spin"],[7,0.5,"spin"],
        [0,3,"fall"],
      ],
    },
    {
      id: "hosana",
      title: "Hosana",
      emoji: "🙌",
      kind: "gospel",
      lyrics: [
        "Hosana, Hosana, Hosana nas alturas!",
        "Hosana ao Senhor, o nosso Deus!",
      ],
      notes: [
        [0,1],[0,1],[2,1],[2,1],[4,1],[4,1],[5,1],[7,2],
        [7,1],[6,1],[5,1],[4,1],[3,1],[2,1],[1,1],[0,2],
        [0,1],[0,1],[2,1],[2,1],[4,1],[4,1],[5,1],[7,2],
        [7,1],[6,1],[5,1],[4,1],[3,1],[2,1],[1,1],[0,3],
      ],
    },
  ];

  // Textos/emojis para os passos especiais de "ação" (palma, pé, roda, caiu)
  const ACTION_EMOJI = { clap: "👏", stomp: "🦶", spin: "🌀", fall: "🎉" };
  const ACTION_CAPTION = {
    clap: "Palma, palma, palma! 👏",
    stomp: "Pé, pé, pé! 🦶",
    spin: "Roda, roda, roda... 🌀",
    fall: "E... caiuuu! 🎊",
  };

  // ---------------------------------------------------------------
  // 3) Áudio (sintetizado — sem arquivos externos)
  // ---------------------------------------------------------------
  let audioCtx = null;
  let masterGain = null;
  let muted = false;

  function ensureAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      masterGain = audioCtx.createGain();
      masterGain.gain.value = 0.9;
      masterGain.connect(audioCtx.destination);
    }
    if (audioCtx.state === "suspended") audioCtx.resume();
  }

  function playTone(freq, duration = 0.55) {
    if (muted) return;
    ensureAudio();
    const t0 = audioCtx.currentTime;

    // corpo do som (fundamental)
    const osc1 = audioCtx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(freq, t0);
    const g1 = audioCtx.createGain();
    g1.gain.setValueAtTime(0.0001, t0);
    g1.gain.exponentialRampToValueAtTime(0.85, t0 + 0.008);
    g1.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    osc1.connect(g1).connect(masterGain);
    osc1.start(t0);
    osc1.stop(t0 + duration + 0.05);

    // harmônico agudo (timbre de barra de metal)
    const osc2 = audioCtx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(freq * 3.93, t0);
    const g2 = audioCtx.createGain();
    g2.gain.setValueAtTime(0.0001, t0);
    g2.gain.exponentialRampToValueAtTime(0.22, t0 + 0.006);
    g2.gain.exponentialRampToValueAtTime(0.0001, t0 + duration * 0.4);
    osc2.connect(g2).connect(masterGain);
    osc2.start(t0);
    osc2.stop(t0 + duration * 0.4 + 0.05);

    // clique da baqueta (ruído curtinho)
    const bufSize = Math.floor(audioCtx.sampleRate * 0.02);
    const buffer = audioCtx.createBuffer(1, bufSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufSize);
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    const filt = audioCtx.createBiquadFilter();
    filt.type = "highpass";
    filt.frequency.value = 2500;
    const gN = audioCtx.createGain();
    gN.gain.setValueAtTime(0.12, t0);
    gN.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.03);
    noise.connect(filt).connect(gN).connect(masterGain);
    noise.start(t0);
  }

  function playCheer() {
    if (muted) return;
    ensureAudio();
    const notes = [0, 2, 4, 7];
    notes.forEach((n, i) => {
      setTimeout(() => playTone(NOTES[n].freq, 0.35), i * 110);
    });
  }

  // som de palma (ruído curto filtrado)
  function playClap() {
    if (muted) return;
    ensureAudio();
    const t0 = audioCtx.currentTime;
    const bufSize = Math.floor(audioCtx.sampleRate * 0.06);
    const buffer = audioCtx.createBuffer(1, bufSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufSize);
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    const bp = audioCtx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 2200;
    bp.Q.value = 0.8;
    const g = audioCtx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(0.5, t0 + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.08);
    noise.connect(bp).connect(g).connect(masterGain);
    noise.start(t0);
  }

  // som de batida de pé (thump grave)
  function playStomp() {
    if (muted) return;
    ensureAudio();
    const t0 = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(130, t0);
    osc.frequency.exponentialRampToValueAtTime(55, t0 + 0.15);
    const g = audioCtx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(0.8, t0 + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.2);
    osc.connect(g).connect(masterGain);
    osc.start(t0);
    osc.stop(t0 + 0.22);
  }

  function playAction(action) {
    if (action === "clap") playClap();
    else if (action === "stomp" || action === "fall") playStomp();
  }

  // ---------------------------------------------------------------
  // 4) DOM / UI
  // ---------------------------------------------------------------
  const xylophoneEl = document.getElementById("xylophone");
  const legendEl = document.getElementById("legend");
  const noteNameEl = document.getElementById("noteName");
  const noteDisplayEl = document.getElementById("noteDisplay");
  const lyricCaptionEl = document.getElementById("lyricCaption");
  const progressWrap = document.getElementById("progressWrap");
  const progressBar = document.getElementById("progressBar");
  const listenBtn = document.getElementById("listenBtn");
  const practiceBtn = document.getElementById("practiceBtn");
  const stopBtn = document.getElementById("stopBtn");
  const speedBtn = document.getElementById("speedBtn");
  const freeBtn = document.getElementById("freeBtn");
  const muteBtn = document.getElementById("muteBtn");
  const cantigasRow = document.getElementById("cantigasRow");
  const brincadeiraRow = document.getElementById("brincadeiraRow");
  const gospelRow = document.getElementById("gospelRow");
  const toastEl = document.getElementById("toast");
  const confettiLayer = document.getElementById("confettiLayer");

  const barEls = [];

  NOTES.forEach((note, i) => {
    const bar = document.createElement("button");
    bar.className = "bar";
    bar.style.setProperty("--bc", note.hex);
    bar.dataset.index = String(i);
    bar.setAttribute("aria-label", note.name);
    bar.innerHTML = `<span class="dots"><span></span><span></span></span><span class="label">${note.name}</span>`;
    bar.addEventListener("click", () => onBarTapped(i));
    xylophoneEl.appendChild(bar);
    barEls.push(bar);

    const chip = document.createElement("span");
    chip.className = "chip";
    const dot = document.createElement("span");
    dot.className = "dot";
    dot.style.background = note.hex;
    chip.appendChild(dot);
    chip.appendChild(document.createTextNode(note.name));
    legendEl.appendChild(chip);
  });

  function buildSongCard(song) {
    const card = document.createElement("button");
    card.className = "song-card" + (song.kind !== "cantiga" ? " " + song.kind : "");
    card.innerHTML = `<span class="emoji">${song.emoji}</span><span class="title">${song.title}</span>`;
    card.addEventListener("click", () => selectSong(song));
    card.dataset.id = song.id;
    return card;
  }
  const SONG_ROWS = { cantiga: cantigasRow, brincadeira: brincadeiraRow, gospel: gospelRow };
  SONGS.forEach((song) => {
    SONG_ROWS[song.kind].appendChild(buildSongCard(song));
  });

  // ---------------------------------------------------------------
  // 5) Estado
  // ---------------------------------------------------------------
  let currentSong = null;
  let mode = "free"; // 'free' | 'listen' | 'practice'
  let playToken = 0; // incrementado para cancelar reproduções em andamento
  let expectedIndex = null; // índice esperado no modo "Tocar"
  let expectedAction = null; // ação especial esperada (palma/pé/...) no modo "Tocar"
  let onCorrectTap = null;

  // Três velocidades para dar tempo de a criança aprender cada nota
  const SPEEDS = [
    { key: "normal", ms: 480, label: "🐇<span>Normal</span>" },
    { key: "slow", ms: 750, label: "🐢<span>Devagar</span>" },
    { key: "vslow", ms: 1100, label: "🐌<span>Muito lento</span>" },
  ];
  let speedIndex = 0;

  function beatMs() {
    return SPEEDS[speedIndex].ms;
  }

  function showNote(index) {
    const note = NOTES[index];
    noteNameEl.textContent = note.name;
    noteDisplayEl.style.background = "";
    noteNameEl.style.background = note.hex + "33";
    noteNameEl.style.color = note.hex;
    noteNameEl.classList.remove("pop");
    // reflow para reiniciar a animação
    void noteNameEl.offsetWidth;
    noteNameEl.classList.add("pop");
  }

  function showAction(action) {
    noteNameEl.textContent = ACTION_EMOJI[action];
    noteDisplayEl.style.background = "";
    noteNameEl.style.background = "#ffe9a8";
    noteNameEl.style.color = "#7a3ea1";
    noteNameEl.classList.remove("pop");
    void noteNameEl.offsetWidth;
    noteNameEl.classList.add("pop");
  }

  function flashBar(index, cls, ms) {
    const el = barEls[index];
    el.classList.add(cls);
    if (ms) setTimeout(() => el.classList.remove(cls), ms);
  }

  function clearBarStates() {
    barEls.forEach((el) => el.classList.remove("playing", "waiting", "correct"));
  }

  function setToast(msg, ms = 1600) {
    toastEl.textContent = msg;
    toastEl.hidden = false;
    clearTimeout(setToast._t);
    setToast._t = setTimeout(() => (toastEl.hidden = true), ms);
  }

  function launchConfetti(count = 60) {
    const colors = NOTES.map((n) => n.hex);
    for (let i = 0; i < count; i++) {
      const piece = document.createElement("div");
      piece.className = "confetti-piece";
      piece.style.left = Math.random() * 100 + "vw";
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      const duration = 1.6 + Math.random() * 1.2;
      piece.style.animationDuration = duration + "s";
      piece.style.animationDelay = Math.random() * 0.4 + "s";
      confettiLayer.appendChild(piece);
      setTimeout(() => piece.remove(), (duration + 0.5) * 1000);
    }
  }

  // ---------------------------------------------------------------
  // 6) Toque livre em qualquer tecla
  // ---------------------------------------------------------------
  function onBarTapped(index) {
    ensureAudio();
    const isExpectedAction = mode === "practice" && expectedIndex === index && expectedAction;
    playTone(NOTES[index].freq);
    if (isExpectedAction) {
      showAction(expectedAction);
      playAction(expectedAction);
    } else {
      showNote(index);
    }
    flashBar(index, "playing", 220);

    if (mode === "practice" && expectedIndex === index && onCorrectTap) {
      const cb = onCorrectTap;
      onCorrectTap = null;
      expectedIndex = null;
      expectedAction = null;
      flashBar(index, "correct", 400);
      cb();
    }
  }

  // ---------------------------------------------------------------
  // 7) Seleção de música
  // ---------------------------------------------------------------
  function selectSong(song) {
    stopAll();
    currentSong = song;
    document.querySelectorAll(".song-card").forEach((c) => {
      c.classList.toggle("selected", c.dataset.id === song.id);
    });
    listenBtn.disabled = false;
    practiceBtn.disabled = false;
    lyricCaptionEl.textContent = song.lyrics[0] || "";
    setToast(`${song.emoji} ${song.title}`, 1200);
  }

  // ---------------------------------------------------------------
  // 8) Modo "Ouvir" — toca a música sozinha, piscando as teclas
  // ---------------------------------------------------------------
  function totalBeats(song) {
    return song.notes.reduce((sum, [, d]) => sum + d, 0);
  }

  function phraseIndexForNote(song, noteIdx) {
    // distribui as frases do texto ao longo da música
    const n = song.lyrics.length;
    const total = song.notes.length;
    return Math.min(n - 1, Math.floor((noteIdx / total) * n));
  }

  function startListen() {
    if (!currentSong) return;
    ensureAudio();
    stopAll();
    mode = "listen";
    setActiveModeButtons();
    progressWrap.hidden = false;
    progressBar.style.width = "0%";
    const token = ++playToken;
    const song = currentSong;
    const total = totalBeats(song);
    let played = 0;
    let t = 0;

    song.notes.forEach(([idx, dur, action], i) => {
      setTimeout(() => {
        if (token !== playToken) return;
        playTone(NOTES[idx].freq, (dur * beatMs()) / 1000 + 0.15);
        flashBar(idx, "playing", dur * beatMs() * 0.9);
        if (action) {
          showAction(action);
          playAction(action);
          lyricCaptionEl.textContent = ACTION_CAPTION[action];
          if (action === "fall") launchConfetti(18);
        } else {
          showNote(idx);
          lyricCaptionEl.textContent = song.lyrics[phraseIndexForNote(song, i)];
        }
        played += dur;
        progressBar.style.width = Math.round((played / total) * 100) + "%";
      }, t);
      t += dur * beatMs();
    });

    setTimeout(() => {
      if (token !== playToken) return;
      finishPlayback(false);
    }, t + 200);
  }

  // ---------------------------------------------------------------
  // 9) Modo "Tocar" — a criança toca junto (chamada e resposta)
  // ---------------------------------------------------------------
  function startPractice() {
    if (!currentSong) return;
    ensureAudio();
    stopAll();
    mode = "practice";
    setActiveModeButtons();
    progressWrap.hidden = false;
    progressBar.style.width = "0%";
    const token = ++playToken;
    const song = currentSong;
    const total = totalBeats(song);
    let played = 0;
    let step = 0;

    lyricCaptionEl.textContent = "Toque na tecla que está piscando! 👆";

    function nextStep() {
      if (token !== playToken) return;
      if (step >= song.notes.length) {
        finishPlayback(true);
        return;
      }
      const [idx, dur, action] = song.notes[step];
      lyricCaptionEl.textContent = action ? ACTION_CAPTION[action] : song.lyrics[phraseIndexForNote(song, step)];
      clearBarStates();
      flashBar(idx, "waiting");
      expectedIndex = idx;
      expectedAction = action || null;
      onCorrectTap = () => {
        if (token !== playToken) return;
        played += dur;
        progressBar.style.width = Math.round((played / total) * 100) + "%";
        step += 1;
        setTimeout(nextStep, 260);
      };
    }
    nextStep();
  }

  function finishPlayback(fromPractice) {
    clearBarStates();
    mode = "free";
    setActiveModeButtons();
    expectedIndex = null;
    expectedAction = null;
    onCorrectTap = null;
    progressBar.style.width = "100%";
    lyricCaptionEl.textContent = fromPractice
      ? "Muito bem! Você tocou a música toda! 🎉"
      : "Agora é sua vez — aperte 'Tocar' para tentar! 👐";
    playCheer();
    launchConfetti();
    setTimeout(() => (progressWrap.hidden = true), 1200);
  }

  function stopAll() {
    playToken += 1;
    mode = "free";
    expectedIndex = null;
    expectedAction = null;
    onCorrectTap = null;
    clearBarStates();
    progressWrap.hidden = true;
    setActiveModeButtons();
  }

  function setActiveModeButtons() {
    listenBtn.classList.toggle("active-mode", mode === "listen");
    practiceBtn.classList.toggle("active-mode", mode === "practice");
    stopBtn.hidden = mode === "free";
  }

  // ---------------------------------------------------------------
  // 10) Botões de controle
  // ---------------------------------------------------------------
  listenBtn.addEventListener("click", startListen);
  practiceBtn.addEventListener("click", startPractice);
  stopBtn.addEventListener("click", () => {
    stopAll();
    lyricCaptionEl.textContent = currentSong ? currentSong.lyrics[0] : "Toca uma tecla colorida para começar!";
  });
  freeBtn.addEventListener("click", () => {
    stopAll();
    document.querySelectorAll(".song-card").forEach((c) => c.classList.remove("selected"));
    currentSong = null;
    listenBtn.disabled = true;
    practiceBtn.disabled = true;
    noteNameEl.textContent = "🎵";
    noteNameEl.style.background = "";
    lyricCaptionEl.textContent = "Modo livre: toque nas teclas coloridas!";
  });
  speedBtn.addEventListener("click", () => {
    speedIndex = (speedIndex + 1) % SPEEDS.length;
    speedBtn.innerHTML = SPEEDS[(speedIndex + 1) % SPEEDS.length].label;
    const current = SPEEDS[speedIndex];
    setToast(`Velocidade: ${current.key === "normal" ? "Normal 🐇" : current.key === "slow" ? "Devagar 🐢" : "Muito lento 🐌"}`, 1200);
  });
  muteBtn.addEventListener("click", () => {
    muted = !muted;
    muteBtn.textContent = muted ? "🔇" : "🔊";
  });

  // Primeiro toque desbloqueia o áudio em navegadores móveis
  document.body.addEventListener(
    "click",
    () => ensureAudio(),
    { once: true }
  );
})();
