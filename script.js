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

    // --- FUNGSI BARU UNTUK MEMBUAT BAGIAN DEPARTEMEN SECARA HIERARKI ---
    function createDepartmentSection(title, departmentData) {
        // Mulai dengan judul departemen
        let sectionHtml = `
            <div class="department">
                <div class="department-title">${title}</div>
        `;

        // Tambahkan Koordinator di level atas
        if (departmentData.koordinator) {
            sectionHtml += `
                <div class="department-coordinator">
                    ${createMemberCard(departmentData.koordinator)}
                </div>
            `;
        }

        // Tambahkan Anggota di bawahnya
        sectionHtml += '<div class="department-members">';
        departmentData.anggota.forEach(member => {
            sectionHtml += createMemberCard(member);
        });
        sectionHtml += '</div></div>'; // Tutup .department-members dan .department
        
        return sectionHtml;
    }
    
    // --- Logika untuk membangun bagan utama (tidak berubah) ---

    // 1. Ambil data BPH
    const ketuaUmum = dataPengurus.bph[0];
    const jajaranBPH = dataPengurus.bph.slice(1);

    // 2. Buat HTML untuk level atas BPH (Ketua Umum)
    let baganHtml = `
        <div class="org-chart-top">
            <div class="level-1">
                ${createMemberCard(ketuaUmum)}
            </div>
    `;

    // 3. Buat HTML untuk level kedua BPH (Sekretaris & Bendahara)
    baganHtml += '<div class="level-2">';
    jajaranBPH.forEach(member => {
        baganHtml += createMemberCard(member);
    });
    baganHtml += '</div></div>';

    // 4. Tambahkan garis pemisah
    baganHtml += '<div class="divider">DEPARTEMEN</div>';

    // 5. Tampilkan BPH ke dalam container
    baganContainer.innerHTML = baganHtml;

    // 6. Buat dan tampilkan setiap departemen menggunakan fungsi baru
    baganContainer.innerHTML += createDepartmentSection('Departemen Pendidikan', dataPengurus.pendidikan);
    baganContainer.innerHTML += createDepartmentSection('Departemen Informasi & Komunikasi', dataPengurus.infokom);
    baganContainer.innerHTML += createDepartmentSection('Departemen Keagamaan & Sosial', dataPengurus.keagamaan);
    baganContainer.innerHTML += createDepartmentSection('Departemen Kewirausahaan', dataPengurus.kewirausahaan);

});
