document.addEventListener('DOMContentLoaded', function() {
    
    // Hanya mengambil elemen yang ada di HTML
    const baganContainer = document.getElementById('bagan-pengurus');

    // Fungsi untuk membuat kartu anggota
    function createMemberCard(member) {
        // Kita gunakan 'default.png' sebagai gambar placeholder
        const photoUrl = 'images/foto_pengurus/default.png';
        return `
            <div class="card">
                <img src="${photoUrl}" alt="Foto ${member.nama}">
                <div class="nama">${member.nama}</div>
                <div class="jabatan">${member.jabatan}</div>
            </div>
        `;
    }

    // Fungsi untuk membuat bagian departemen
    function createDepartmentSection(title, departmentData) {
        let membersHtml = '';
        if (departmentData.koordinator) {
            membersHtml += createMemberCard(departmentData.koordinator);
        }
        departmentData.anggota.forEach(member => {
            membersHtml += createMemberCard(member);
        });
        return `
            <div class="department">
                <div class="department-title">${title}</div>
                <div class="members">${membersHtml}</div>
            </div>
        `;
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

    // Bagian kode untuk Slider dan Artikel sudah dihapus dari versi ini
    // karena tidak ditampilkan di HTML.

});
