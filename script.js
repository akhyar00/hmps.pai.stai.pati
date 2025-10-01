document.addEventListener('DOMContentLoaded', function() {
    const baganContainer = document.getElementById('bagan-pengurus');
    const sliderContainer = document.getElementById('slider-proker');
    const artikelContainer = document.getElementById('konten-artikel');
    // Fungsi untuk membuat kartu anggota
    function createMemberCard(member) {
        return `<div class="card"><img src="images/foto_pengurus/${member.foto}" alt="Foto ${member.nama}" onerror="this.src='images/foto_pengurus/default.png';"><div class="nama">${member.nama}</div><div class="jabatan">${member.jabatan}</div></div>`;
    }
    // Fungsi untuk membuat bagian departemen
    function createDepartmentSection(title, departmentData) {
        let membersHtml = '';
        if (departmentData.koordinator) { membersHtml += createMemberCard(departmentData.koordinator); }
        departmentData.anggota.forEach(member => { membersHtml += createMemberCard(member); });
        return `<div class="department"><div class="department-title">${title}</div><div class="members">${membersHtml}</div></div>`;
    }
    // 1. Membangun Bagan Struktur Organisasi
    let bphHtml = '<div class="department"><div class="department-title">Badan Pengurus Harian (BPH)</div><div class="members">';
    dataPengurus.bph.forEach(member => { bphHtml += createMemberCard(member); });
    bphHtml += '</div></div>';
    baganContainer.innerHTML += bphHtml;
    baganContainer.innerHTML += createDepartmentSection('Departemen Pendidikan', dataPengurus.pendidikan);
    baganContainer.innerHTML += createDepartmentSection('Departemen Informasi & Komunikasi', dataPengurus.infokom);
    baganContainer.innerHTML += createDepartmentSection('Departemen Keagamaan & Sosial', dataPengurus.keagamaan);
    baganContainer.innerHTML += createDepartmentSection('Departemen Kewirausahaan', dataPengurus.kewirausahaan);
    // 2. Membangun Slider Program Kerja
    let prokerIndex = 0;
    function showProker() {
        sliderContainer.innerHTML = '';
        const proker = dataProker[prokerIndex];
        const slideElement = document.createElement('div');
        slideElement.classList.add('slide-item');
        slideElement.innerHTML = `<img src="images/slide_proker/${proker.gambar}" alt="${proker.judul}"><div class="caption"><h3>${proker.judul}</h3><p>${proker.deskripsi}</p></div>`;
        sliderContainer.appendChild(slideElement);
        prokerIndex = (prokerIndex + 1) % dataProker.length;
    }
    showProker();
    setInterval(showProker, 5000);
    // 3. Membangun Galeri Artikel
    let artikelHtml = '';
    dataArtikel.forEach(artikel => {
        artikelHtml += `<a href="${artikel.link}" class="article-card"><img src="images/galeri_kegiatan/${artikel.gambar}" alt="${artikel.judul}"><div class="info"><h4>${artikel.judul}</h4><span>${artikel.tanggal}</span></div></a>`;
    });
    artikelContainer.innerHTML = artikelHtml;
});
