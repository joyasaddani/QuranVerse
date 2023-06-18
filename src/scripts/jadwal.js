const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const tanggal = getCurrentDate();

const tampilKota = document.querySelector(".judul-kota");
tampilKota.textContent = localStorage.judulkota;

const getJadwalSholat = async () => {
  try {
    const response = await fetch(
      `https://api.banghasan.com/sholat/format/json/jadwal/kota/${parseInt(
        localStorage.idkota
      )}/tanggal/${tanggal}`
    );
    const data = await response.json();
    const jadwal = data.jadwal.data;
    document.querySelector(".imsak").textContent = jadwal.imsak;
    document.querySelector(".subuh").textContent = jadwal.subuh;
    document.querySelector(".terbit").textContent = jadwal.terbit;
    document.querySelector(".dzuhur").textContent = jadwal.dzuhur;
    document.querySelector(".ashar").textContent = jadwal.ashar;
    document.querySelector(".maghrib").textContent = jadwal.maghrib;
    document.querySelector(".isya").textContent = jadwal.isya;
    document.querySelector(".tanggal").textContent = jadwal.tanggal;
  } catch (error) {
    console.error(error);
  }
};

const inputSearch = document.querySelector(".input-search");
const cardList = document.querySelector(".card-list");

inputSearch.addEventListener("keyup", async function () {
  const valueSearch = inputSearch.value.length;
  if (valueSearch > 0) {
    cardList.classList.remove("hidden-list");
    try {
      const response = await fetch(
        "https://api.banghasan.com/sholat/format/json/kota"
      );
      const data = await response.json();
      const kota = data.kota;
      let daftarKota = "";
      kota.forEach((k) => {
        if (k.nama.toLowerCase().includes(inputSearch.value.toLowerCase())) {
          daftarKota += `<a href="#" data-idkota="${k.id}" id="nama-kota" class="list-group-item list-group-item-action">${k.nama}</a>`;
        }
      });
      const namaKota = document.querySelector(".card-list");
      namaKota.innerHTML = daftarKota;

      const isiKota = document.querySelectorAll("#nama-kota");
      isiKota.forEach((kota) => {
        kota.addEventListener("click", function () {
          const idkota = this.dataset.idkota;
          const judulKota = this.textContent;
          window.localStorage.setItem("idkota", idkota);
          window.localStorage.setItem("judulkota", judulKota);
          namaKota.classList.add("hidden-list");
          inputSearch.value = "";
          location.reload();
        });
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    cardList.classList.add("hidden-list");
  }
});

getJadwalSholat();
