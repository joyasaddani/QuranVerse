const getURL = (e) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(e);
};

const nomorSurat = getURL("nomorsurat");

const getDetail = async () => {
  try {
    const response = await fetch(
      `https://equran.id/api/v2/surat/${nomorSurat}`
    );
    const data = await response.json();

    // Judul surat
    const judulSurat = document.querySelector(".judul-surat");
    const cardJudulSurat = `
        <strong class="text-white">${data.data.namaLatin} - ${data.data.nama}</strong>
        <p class="text-white">Jumlah Ayat: ${data.data.jumlahAyat} (${data.data.arti}) </p>
        <button class="btn btn-warning audio-button-play">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-music-note-beamed" viewBox="0 0 16 16">
            <path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2zm9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z"/>
            <path fill-rule="evenodd" d="M14 11V2h1v9h-1zM6 3v10H5V3h1z"/>
            <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4V2.905z"/>
          </svg>
          Dengarkan
        </button>
        <button class="btn btn-danger audio-button-pause button-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stop-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3z"/>
          </svg>
          Stop
        </button>
        <audio id="audio-tag" src="${data.data.audioFull["05"]}"></audio>
      `;
    judulSurat.innerHTML = cardJudulSurat;

    // Isi surat
    const surat = data.data.ayat;
    let isiSurat = "";
    surat.forEach((s) => {
      isiSurat += `
          <div class="card mt-4">
            <div class="card-body shadow">
              <p>${s.nomorAyat}.</p>
              <h3 class="text-end">${s.teksArab}</h3>
              <p>${s.teksLatin}</p>
              <p>Artinya: "${s.teksIndonesia}"</p>
            </div>
          </div>
        `;
    });

    const cardIsiSurat = document.querySelector(".card-isi-surat");
    cardIsiSurat.innerHTML = isiSurat;

    // Button audio play and stop
    const buttonPlay = document.querySelector(".audio-button-play");
    const buttonPause = document.querySelector(".audio-button-pause");
    const audioSurat = document.querySelector("#audio-tag");

    // Play
    buttonPlay.addEventListener("click", function () {
      buttonPlay.classList.add("button-hidden");
      buttonPause.classList.remove("button-hidden");
      audioSurat.play();
    });

    // Pause
    buttonPause.addEventListener("click", function () {
      buttonPause.classList.add("button-hidden");
      buttonPlay.classList.remove("button-hidden");
      audioSurat.pause();
    });
  } catch (error) {
    console.error(error);
  }
};

getDetail();
