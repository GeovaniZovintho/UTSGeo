document.addEventListener("DOMContentLoaded", () => {
    showPage("login"); 
    loadTasks();
});

function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => page.style.display = "none");
    document.getElementById(pageId + "Page").style.display = "block";
}


async function register() {
    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;

    if (!username || !password) {
        alert("Username dan password wajib diisi!");
        return;
    }

    console.log("🔍 Mencoba register dengan:", username, password);

    try {
        const response = await fetch("http://localhost:3000/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        console.log("📩 Response dari server:", data);

        if (response.ok) {
            alert("✅ Registrasi berhasil! Silakan login.");
            showPage("login"); 
        } else {
            alert("⚠️ " + (data.message || "Registrasi gagal."));
        }
    } catch (error) {
        console.error("❌ Error saat register:", error);
        alert("Terjadi kesalahan saat register.");
    }
}

function login() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    })
    .then(res => res.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem("token", data.token);
            showPage("tasks");
            loadTasks();
        } else {
            alert("Login gagal");
        }
    })
    .catch(err => console.error(err));
}


function logout() {
    localStorage.removeItem("token");
    showPage("login");
}


function addTask() {
    const title = document.getElementById("taskTitle").value;
    const category = document.getElementById("taskCategory").value;
    const deadline = document.getElementById("taskDeadline").value;
    const token = localStorage.getItem("token");

    fetch("/tasks", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title, category, deadline, status: "Belum Selesai" }),
    })
    .then(res => res.json())
    .then(() => loadTasks())
    .catch(err => console.error(err));
}

function loadTasks() {
    const token = localStorage.getItem("token");
    
    fetch("/tasks", {
        headers: { "Authorization": `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(tasks => {
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";

        tasks.forEach(task => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${task.title} - ${task.category} - ${task.deadline} - ${task.status}</span>
                <button onclick="editTask(${task.id}, '${task.title}', '${task.category}', '${task.deadline}', '${task.status}')">Edit</button>
                <button onclick="deleteTask(${task.id})">Hapus</button>
            `;
            taskList.appendChild(li);
        });
    })
    .catch(err => console.error(err));
}


function editTask(id, title, category, deadline, status) {
    const newTitle = prompt("Judul baru:", title);
    const newCategory = prompt("Kategori baru (Kuliah/Organisasi/Pribadi):", category);
    const newDeadline = prompt("Deadline baru (YYYY-MM-DD):", deadline);
    const newStatus = prompt("Status baru (Belum Selesai/Selesai):", status);
    const token = localStorage.getItem("token");

    if (newTitle && newCategory && newDeadline && newStatus) {
        fetch(`/tasks/${id}`, {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ title: newTitle, category: newCategory, deadline: newDeadline, status: newStatus }),
        })
        .then(() => loadTasks())
        .catch(err => console.error(err));
    }
}


function deleteTask(id) {
    const token = localStorage.getItem("token");

    if (confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
        fetch(`/tasks/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then(() => loadTasks())
        .catch(err => console.error(err));
    }
}
