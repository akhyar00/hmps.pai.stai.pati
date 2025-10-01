document.addEventListener('DOMContentLoaded', function() {
    
    const baganContainer = document.getElementById('bagan-pengurus');

    // Fungsi createMemberCard (tidak berubah)
    function createMemberCard(member) {
        return `
            <div class="card">
                <div class="nama">${member.nama}</div>
                <div class="jabatan">${member.jabatan}</div>
            </div>
        `;
    }

    // Fungsi createDepartmentSection (tidak berubah)
    function createDepartmentSection(title, departmentData) {
        // Kita tambahkan class 'department' di sini agar bisa dianimasikan
        let sectionHtml = `<div class="department"><div class="department-title">${title}</div>`;
        if (departmentData.koordinator) {
            sectionHtml += `<div class="department-coordinator">${createMemberCard(departmentData.koordinator)}</div>`;
        }
        sectionHtml += '<div class="department-members">';
        departmentData.anggota.forEach(member => { sectionHtml += createMemberCard(member); });
        sectionHtml += '</div></div>';
        return sectionHtml;
    }
    
    // Logika untuk membangun bagan utama (tidak berubah)
    const ketuaUmum = dataPengurus.bph[0];
    const jajaranBPH = dataPengurus.bph.slice(1);
    // Kita tambahkan class 'org-chart-top' di sini agar bisa dianimasikan
    let baganHtml = `<div class="org-chart-top"><div class="level-1">${createMemberCard(ketuaUmum)}</div>`;
    baganHtml += '<div class="level-2">';
    jajaranBPH.forEach(member => { baganHtml += createMemberCard(member); });
    baganHtml += '</div></div>';
    baganHtml += '<div class="divider">DEPARTEMEN</div>';
    baganContainer.innerHTML = baganHtml;

    // Membuat setiap departemen (tidak berubah)
    baganContainer.innerHTML += createDepartmentSection('Departemen Pendidikan', dataPengurus.pendidikan);
    baganContainer.innerHTML += createDepartmentSection('Departemen Informasi & Komunikasi', dataPengurus.infokom);
    baganContainer.innerHTML += createDepartmentSection('Departemen Keagamaan & Sosial', dataPengurus.keagamaan);
    baganContainer.innerHTML += createDepartmentSection('Departemen Kewirausahaan', dataPengurus.kewirausahaan);

    // --- FUNGSI BARU UNTUK MEMICU ANIMASI SAAT GULIR ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // Muncul saat 10% elemen terlihat
    });

    // Ambil semua elemen yang ingin dianimasikan dan amati
    const elementsToAnimate = document.querySelectorAll('.org-chart-top, .department');
    elementsToAnimate.forEach(el => observer.observe(el));

});
