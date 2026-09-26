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
    card.className = "song-card" + (song.kind === "gospel" ? " gospel" : "");
    card.innerHTML = `<span class="emoji">${song.emoji}</span><span class="title">${song.title}</span>`;
    card.addEventListener("click", () => selectSong(song));
    card.dataset.id = song.id;
    return card;
  }
  SONGS.forEach((song) => {
    const row = song.kind === "gospel" ? gospelRow : cantigasRow;
    row.appendChild(buildSongCard(song));
  });

  // ---------------------------------------------------------------
  // 5) Estado
  // ---------------------------------------------------------------
  let currentSong = null;
  let mode = "free"; // 'free' | 'listen' | 'practice'
  let slow = false;
  let playToken = 0; // incrementado para cancelar reproduções em andamento
  let expectedIndex = null; // índice esperado no modo "Tocar"
  let onCorrectTap = null;

  function beatMs() {
    return slow ? 750 : 480;
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

  function launchConfetti() {
    const colors = NOTES.map((n) => n.hex);
    for (let i = 0; i < 60; i++) {
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
    playTone(NOTES[index].freq);
    showNote(index);
    flashBar(index, "playing", 220);

    if (mode === "practice" && expectedIndex === index && onCorrectTap) {
      const cb = onCorrectTap;
      onCorrectTap = null;
      expectedIndex = null;
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

    song.notes.forEach(([idx, dur], i) => {
      setTimeout(() => {
        if (token !== playToken) return;
        playTone(NOTES[idx].freq, (dur * beatMs()) / 1000 + 0.15);
        showNote(idx);
        flashBar(idx, "playing", dur * beatMs() * 0.9);
        lyricCaptionEl.textContent = song.lyrics[phraseIndexForNote(song, i)];
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
      const [idx, dur] = song.notes[step];
      lyricCaptionEl.textContent = song.lyrics[phraseIndexForNote(song, step)];
      clearBarStates();
      flashBar(idx, "waiting");
      expectedIndex = idx;
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
    slow = !slow;
    speedBtn.innerHTML = slow ? "🐇<span>Normal</span>" : "🐢<span>Devagar</span>";
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
