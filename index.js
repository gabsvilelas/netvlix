// Pega o botão com id 'theme-toggle' do HTML
const themeToggleButton = document.getElementById('theme-toggle');

// Pega a referência ao elemento <body>, para alternar classes de tema
const rootBody = document.body;

// Aplica o tema (dark ou light) no corpo da página e atualiza o texto do botão
function setTheme(theme) {
    if (theme === 'light') {
        // Tema claro: adiciona classe específica ao body
        rootBody.classList.add('theme-light');
    } else {
        // Tema escuro: remove a classe do body
        rootBody.classList.remove('theme-light');
    }

    // Salva a escolha do usuário em localStorage para manter após reload
    localStorage.setItem('netflixTheme', theme);
}

// Alterna entre dark e light, verificando o tema atual
function toggleTheme() {
    const activeTheme = rootBody.classList.contains('theme-light') ? 'light' : 'dark';
    setTheme(activeTheme === 'dark' ? 'light' : 'dark');
}

// Configura o evento de clique do botão para executar a alternância
themeToggleButton.addEventListener('click', toggleTheme);

// Recupera o tema salvo no localStorage ou usa dark como padrão
const savedTheme = localStorage.getItem('netflixTheme') || 'dark';
setTheme(savedTheme);

// Salva o perfil ativo no localStorage para uso em catalogo.html
function handleProfileSelection(event) {
    const profileLink = event.currentTarget;
    const img = profileLink.querySelector('img');
    const nameElement = profileLink.querySelector('figcaption');

    const profileName = nameElement ? nameElement.textContent.trim() : null;
    const profileImage = img ? img.src : null;

    if (profileName) {
        localStorage.setItem('perfilAtivoNome', profileName);
    }
    if (profileImage) {
        localStorage.setItem('perfilAtivoImagem', profileImage);
    }
}

const profileLinks = document.querySelectorAll('.profile');
profileLinks.forEach(link => link.addEventListener('click', handleProfileSelection));

// Caso não existam dados de perfil em localStorage, salva o primeiro perfil como padrão
if (!localStorage.getItem('perfilAtivoNome') || !localStorage.getItem('perfilAtivoImagem')) {
    const firstProfile = document.querySelector('.profile');
    if (firstProfile) {
        const firstImg = firstProfile.querySelector('img');
        const firstName = firstProfile.querySelector('figcaption');
        if (firstName) localStorage.setItem('perfilAtivoNome', firstName.textContent.trim());
        if (firstImg) localStorage.setItem('perfilAtivoImagem', firstImg.src);
    }
}
