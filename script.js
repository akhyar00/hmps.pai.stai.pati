document.addEventListener('DOMContentLoaded', function() {
    
    const baganContainer = document.getElementById('bagan-pengurus');

    // Fungsi untuk membuat kartu anggota (tidak berubah)
    function createMemberCard(member) {
        const photoUrl = 'images/foto_pengurus/default.png';
        return `
            <div class="card">
                <img src="${photoUrl}" alt="Foto ${member.nama}">
                <div class="nama">${member.nama}</div>
                <div class="jabatan">${member.jabatan}</div>
            </div>
        `;
    }

    // Fungsi untuk membuat bagian departemen (tidak berubah)
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
    
    // --- LOGIKA BARU UNTUK MEMBANGUN BAGAN SECARA HIERARKI ---

    // 1. Ambil data BPH
    const ketuaUmum = dataPengurus.bph[0]; // Asumsi Ketua Umum selalu di posisi pertama
    const jajaranBPH = dataPengurus.bph.slice(1); // Ambil sisanya (Sekretaris & Bendahara)

    // 2. Buat HTML untuk level atas (Ketua Umum)
    let baganHtml = `
        <div class="org-chart-top">
            <div class="level-1">
                ${createMemberCard(ketuaUmum)}
            </div>
    `;

    // 3. Buat HTML untuk level kedua (Sekretaris & Bendahara)
    baganHtml += '<div class="level-2">';
    jajaranBPH.forEach(member => {
        baganHtml += createMemberCard(member);
    });
    baganHtml += '</div></div>';

    // 4. Tambahkan garis pemisah sebelum departemen
    baganHtml += '<div class="divider">DEPARTEMEN</div>';

    // 5. Tampilkan semua ke dalam container
    baganContainer.innerHTML = baganHtml;

    // 6. Buat HTML untuk departemen-departemen (seperti sebelumnya)
    baganContainer.innerHTML += createDepartmentSection('Departemen Pendidikan', dataPengurus.pendidikan);
    baganContainer.innerHTML += createDepartmentSection('Departemen Informasi & Komunikasi', dataPengurus.infokom);
    baganContainer.innerHTML += createDepartmentSection('Departemen Keagamaan & Sosial', dataPengurus.keagamaan);
    baganContainer.innerHTML += createDepartmentSection('Departemen Kewirausahaan', dataPengurus.kewirausahaan);

});
