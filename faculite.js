const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyvlFmH7SntqOlkQUZ6zle7wbxQ3vdv9tBT--6XZr_0_LgmW9CKajZNQJqTR2gu145iNg/exec';

async function loadFacultyData() {
    try {
        const response = await fetch(WEB_APP_URL);
        const data = await response.json();
        const tbody = document.getElementById('faculty-body');
        const currentDate = new Date();

        tbody.innerHTML = ''; // Clear loading text

        data.forEach(faculty => {
            // Experience Calculation from "First Join"
            let expText = "N/A";
            if (faculty.firstJoin) {
                const joinDate = new Date(faculty.firstJoin);
                let years = currentDate.getFullYear() - joinDate.getFullYear();
                let months = currentDate.getMonth() - joinDate.getMonth();
                if (months < 0) { years--; months += 12; }
                expText = `${years}y ${months}m`;
            }

            const row = `
                <tr class="border-b hover:bg-blue-50 transition-colors">
                    <td class="py-5 px-3 font-bold text-blue-800">${faculty.id}</td>
                    <td class="py-5 px-6 flex items-center gap-3">
                        <img src="${faculty.photo || 'https://via.placeholder.com/50'}" class="w-70 h-70 rounded-full border-2 border-pink-500 object-cover">
                    </td>
					<td class="py-5 px-3 font-bold  text-2xl text-pink-500 text-center">${faculty.name}</td>
                    <td class="py-5 px-3 text-center">${faculty.dob || 'null'}</td>
					<td class="py-5 px-3 text-center">${faculty.contact || 'null'}</td>
                    <td class="py-5 px-3 font-medium">${faculty.firstJoin || 'null'}</td>
                    <td class="py-5 px-3 font-medium text-green-700">${faculty.currentJoin || 'null'}</td>
                    <td class="py-5 px-3 text-blue-600 font-bold"><i class="far fa-clock mr-1"></i> ${expText}</td>
                    <td class="py-5 px-3"><span class="bg-green-100 text-green-800 py-1 px-3 rounded-full text-xs font-bold">${faculty.designation}</span></td>
                    <td class="py-5 px-3 font-medium text-gray-800">${faculty.qualification}</td>
                    <td class="py-5 px-3"><span class="bg-pink-100 text-pink-600 px-2 py-1 rounded">${faculty.specialization}</span></td>
					<td class="py-5 px-3 font-medium">${faculty.pre_institution || 'null'}</td>
                </tr>`;
            tbody.innerHTML += row;
        });
    } catch (error) {
        console.error("Error loading sheet data:", error);
    }
}

window.onload = loadFacultyData;