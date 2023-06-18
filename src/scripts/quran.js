const createItemSurat = async () => {
  try {
    const response = await fetch("https://equran.id/api/v2/surat");
    const data = await response.json();
    let cardSurat = "";
    data.data.forEach((surat) => {
      cardSurat += `
        <div class="col-lg-4 col-md-5 col-sm-12">
          <div id="card-list" class="card mt-4">
            <div class="card-body shadow" onclick="location.href='detail.html?nomorsurat=${surat.nomor}'">
              <h5 class="card-title">${surat.nomor}. ${surat.namaLatin}</h5>
              <h3 class="card-subtitle mb-2 text-muted text-end">${surat.nama}</h3>
              <p class="card-text text-end">${surat.arti}</p>
            </div>
          </div>
        </div>
      `;
    });
    const listSurat = document.querySelector(".card-surat");
    listSurat.innerHTML = cardSurat;
    console.log(listSurat);
  } catch (error) {
    console.log(error);
  }
};

const searchSurah = async () => {
  const searchInput = document.getElementById("searchInput");
  const keyword = searchInput.value.toLowerCase();

  try {
    const response = await fetch("https://equran.id/api/v2/surat");
    const data = await response.json();
    let cardSurat = "";

    data.data.forEach((surat) => {
      const namaLatinLower = surat.namaLatin.toLowerCase();
      const namaLower = surat.nama.toLowerCase();
      const artiLower = surat.arti.toLowerCase();

      if (
        namaLatinLower.includes(keyword) ||
        namaLower.includes(keyword) ||
        artiLower.includes(keyword)
      ) {
        cardSurat += `
          <div class="col-lg-3 col-md-5 col-sm-12">
            <div id="card-list" class="card mt-4">
              <div class="card-body shadow" onclick="location.href='detail.html?nomorsurat=${surat.nomor}'">
                <h5 class="card-title">${surat.nomor}. ${surat.namaLatin}</h5>
                <h3 class="card-subtitle mb-2 text-muted text-end">${surat.nama}</h3>
                <p class="card-text text-end">${surat.arti}</p>
              </div>
            </div>
          </div>
        `;
      }
    });

    const listSurat = document.querySelector(".card-surat");
    listSurat.innerHTML = cardSurat;

    // Memilih otomatis jika hanya ada satu hasil pencarian
    if (data.data.length === 1 && keyword === "") {
      const surahNumber = data.data[0].nomor;
      location.href = `detail.html?nomorsurat=${surahNumber}`;
    }
  } catch (error) {
    console.log(error);
  }
};

createItemSurat();
