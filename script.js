document.addEventListener('DOMContentLoaded', function() {
    
    // Pastikan elemen kontainer ada
    const baganContainer = document.getElementById('bagan-pengurus');
    if (!baganContainer) {
        console.error('Elemen #bagan-pengurus tidak ditemukan!');
        return; // Hentikan script jika kontainer tidak ada
    }

    // Fungsi untuk membuat kartu anggota (tanpa foto)
    function createMemberCard(member) {
        return `
            <div class="card">
                <div class="nama">${member.nama}</div>
                <div class="jabatan">${member.jabatan}</div>
            </div>
        `;
    }

    // Fungsi untuk membuat bagian departemen
    function createDepartmentSection(title, departmentData) {
        let sectionHtml = `<div class="department"><div class="department-title">${title}</div>`;
        if (departmentData.koordinator) {
            sectionHtml += `<div class="department-coordinator">${createMemberCard(departmentData.koordinator)}</div>`;
        }
        sectionHtml += '<div class="department-members">';
        departmentData.anggota.forEach(member => {
            sectionHtml += createMemberCard(member);
        });
        sectionHtml += '</div></div>';
        return sectionHtml;
    }
    
    // === MEMBANGUN STRUKTUR HTML ===
    const bphWrapper = document.createElement('div');
    bphWrapper.classList.add('org-chart'); // Class untuk animasi

    const ketuaUmum = dataPengurus.bph[0];
    const jajaranBPH = dataPengurus.bph.slice(1);
    
    let bphHtml = `<div class="level-1">${createMemberCard(ketuaUmum)}</div>`;
    bphHtml += '<div class="level-2">';
    jajaranBPH.forEach(member => { bphHtml += createMemberCard(member); });
    bphHtml += '</div>';
    
    bphWrapper.innerHTML = bphHtml;
    baganContainer.appendChild(bphWrapper);
    
    const divider = document.createElement('div');
    divider.className = 'divider';
    divider.textContent = 'DEPARTEMEN';
    baganContainer.appendChild(divider);

    const departmentsData = [
        { title: 'Departemen Pendidikan', data: dataPengurus.pendidikan },
        { title: 'Departemen Informasi & Komunikasi', data: dataPengurus.infokom },
        { title: 'Departemen Keagamaan & Sosial', data: dataPengurus.keagamaan },
        { title: 'Departemen Kewirausahaan', data: dataPengurus.kewirausahaan }
    ];

    departmentsData.forEach(dept => {
        baganContainer.innerHTML += createDepartmentSection(dept.title, dept.data);
    });

    // === MENGAKTIFKAN ANIMASI SAAT GULIR ===
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    const elementsToAnimate = document.querySelectorAll('.org-chart, .department');
    elementsToAnimate.forEach(el => observer.observe(el));
});
