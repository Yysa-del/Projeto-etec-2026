// Mockup de banco de dados de Cursos
const mockCourses = [
    { id: 1, title: "Desenvolvimento Web Completo", modules: ["Introdução ao HTML", "Estilizando com CSS", "Lógica com JavaScript"] },
    { id: 2, title: "Banco de Dados SQL e NoSQL", modules: ["Modelagem de Dados", "Comandos DML e DDL", "Introdução ao MongoDB"] },
    { id: 3, title: "Interface de Usuário (UI) com Figma", modules: ["Princípios do Design", "Componentes e Variantes", "Prototipagem Alta Fidelidade"] }
];

// Mockup de banco de dados de Usuários cadastrados
const mockUsers = [
    {
        email: "adm@email.com",
        password: "123",
        name: "admin",
        myCourses: [{ id: 1, progress: 75 }] // Relaciona com o ID do curso e salva o progresso individual
    }
];

// Variável para guardar o usuário logado na sessão atual
let currentUser = null;

// Elementos de Telas
const authScreen = document.getElementById("auth-screen");
const appScreen = document.getElementById("app-screen");
const loginBox = document.getElementById("login-box");
const registerBox = document.getElementById("register-box");

// Elementos de Cursos e Modal
const container = document.getElementById("courses-container");
const modal = document.getElementById("course-modal");
const modalTitle = document.getElementById("modal-title");
const modalModules = document.getElementById("modal-modules");
const closeBtn = document.getElementById("close-btn");
const selectCourse = document.getElementById("reg-course");

// Preencher o campo de seleção de cursos no cadastro
function populateCourseSelect() {
    selectCourse.innerHTML = mockCourses.map(course => `
        <option value="${course.id}">${course.title}</option>
    `).join('');
}

// Alternar entre telas de login e cadastro
document.getElementById("btn-go-register").addEventListener("click", () => {
    loginBox.classList.add("hidden");
    registerBox.classList.remove("hidden");
});

document.getElementById("btn-go-login").addEventListener("click", () => {
    registerBox.classList.add("hidden");
    loginBox.classList.remove("hidden");
});

// Processar Cadastro de Novo Aluno
document.getElementById("register-form").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const name = document.getElementById("reg-name").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;
    const courseId = parseInt(document.getElementById("reg-course").value);

    // Verificar se o e-mail já existe
    if (mockUsers.some(user => user.email === email)) {
        alert("Este e-mail já está cadastrado!");
        return;
    }

    // Criar e salvar novo usuário no array (mockup)
    const newUser = {
        name: name,
        email: email,
        password: password,
        myCourses: [{ id: courseId, progress: 0 }] // Inicia o curso escolhido com 0%
    };
    
    mockUsers.push(newUser);
    alert("Conta criada com sucesso! Faça seu login.");
    
    // Limpar formulário e voltar para tela de login
    document.getElementById("register-form").reset();
    registerBox.classList.add("hidden");
    loginBox.classList.remove("hidden");
});

// Processar Login
document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    // Procurar usuário no banco simulado
    const user = mockUsers.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = user;
        startApp();
    } else {
        alert("E-mail ou senha incorretos.");
    }
});

// Iniciar o AVA após autenticação válida
function startApp() {
    authScreen.classList.add("hidden");
    appScreen.classList.remove("hidden");
    document.getElementById("user-info").innerText = `Olá, ${currentUser.name}!`;
    renderMyCourses();
}

// Renderizar apenas os cursos que o usuário logado possui
function renderMyCourses() {
    container.innerHTML = currentUser.myCourses.map(userCourse => {
        // Busca os detalhes do curso original pelo ID
        const originalCourse = mockCourses.find(c => c.id === userCourse.id);
        
        return `
            <div class="course-card">
                <h3>${originalCourse.title}</h3>
                <p>Progresso: ${userCourse.progress}%</p>
                <div class="progress-bar">
                    <div class="progress" style="width: ${userCourse.progress}%"></div>
                </div>
                <button onclick="openCourse(${originalCourse.id})">Acessar Conteúdo</button>
            </div>
        `;
    }).join('');
}

// Abrir modal do curso
function openCourse(id) {
    const course = mockCourses.find(c => c.id === id);
    if (!course) return;

    modalTitle.innerText = course.title;
    modalModules.innerHTML = course.modules.map(mod => `
        <div class="module-item">📄 ${mod}</div>
    `).join('');

    modal.classList.remove("hidden");
}

// Eventos de Fechar Modal
closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
window.addEventListener("click", (e) => { if (e.target === modal) modal.classList.add("hidden"); });

// Processar Logout
document.getElementById("btn-logout").addEventListener("click", () => {
    currentUser = null;
    document.getElementById("login-form").reset();
    appScreen.classList.add("hidden");
    authScreen.classList.remove("hidden");
});

// Inicialização
populateCourseSelect();
