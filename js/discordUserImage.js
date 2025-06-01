function atualizarPerfilDiscord(userId) {
    // Se nenhum userId for especificado, usar o ID da Bia por padrão
    const targetUserId = userId || '504586268781576202';
    
    // URL atualizada para usar Lanyard API
    fetch(`https://api.lanyard.rest/v1/users/${targetUserId}`)
    .then(response => response.json())
    .then(data => {
        if (!data.success) {
            throw new Error('Lanyard API request failed');
        }
        
        const discordData = data.data;
        const user = discordData.discord_user;
        const status = discordData.discord_status;
        
        // Atualizar a foto do perfil (se disponível)
        const avatarImg = document.querySelector('.avatarImage');
        if (avatarImg && user.avatar) {
            // Gerar URL do avatar com cache busting (mantendo sua lógica original)
            const avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${user.avatar.startsWith("a_") ? "gif" : "png"}?size=2048`;
            const avatarSrc = avatarUrl.includes('?') ? 
                avatarUrl + '&t=' + Date.now() : 
                avatarUrl + '?t=' + Date.now();
            
            avatarImg.src = avatarSrc;
            console.log(`Avatar do usuário ${targetUserId} atualizado:`, avatarSrc);
        }
        
        // Atualizar o status (mantendo sua lógica original)
        const statusImg = document.querySelector('.discordStatus');
        if (statusImg) {
            // Usar o caminho correto da imagem baseado no status
            switch(status) {
                case 'online': statusImg.src = '/img/online.png'; break;
                case 'idle': statusImg.src = '/img/idle.png'; break;
                case 'dnd': statusImg.src = '/img/dnd.png'; break;
                default: statusImg.src = '/img/offline.png';
            }
            console.log(`Status do usuário ${targetUserId} atualizado para:`, status);
        } else {
            console.error('Elemento .discordStatus não encontrado no DOM');
        }
        
        // Se você quiser mostrar o nome de usuário também
        const usernameElement = document.querySelector('.username');
        if (usernameElement && user.username) {
            usernameElement.textContent = `${user.username}${user.discriminator !== "0" ? `#${user.discriminator}` : ''}`;
        }
    })
    .catch(error => {
        console.error('Erro ao buscar status:', error);
        // Adicionar tratamento de erro mais visível para debugging
        const statusElement = document.querySelector('.status-debugging');
        if (statusElement) {
            statusElement.textContent = 'Erro ao conectar: ' + error.message;
            statusElement.style.color = 'red';
        }
    });
}

// Determinar qual usuário monitorar com base na página (mantido igual)
function determinarUsuarioPagina() {
    const currentPath = window.location.pathname;
    if (currentPath.includes('meuperfil') || currentPath.includes('perfil2')) {
        return '504586268781576202';
    }
    return '504586268781576202';
}

// Forçar atualização completa quando o documento carrega (mantido igual)
document.addEventListener('DOMContentLoaded', function() {
    const avatarImg = document.querySelector('.avatarImage');
    if (avatarImg) {
        avatarImg.src = '';
    }
    
    const userId = determinarUsuarioPagina();
    atualizarPerfilDiscord(userId);
    setInterval(() => atualizarPerfilDiscord(userId), 5000); // 5sec
});

// Adicionar evento de clique manual para forçar atualização (mantido igual)
const avatarImg = document.querySelector('.avatarImage');
if (avatarImg) {
    avatarImg.addEventListener('click', function() {
        console.log('Atualizando avatar manualmente...');
        const userId = determinarUsuarioPagina();
        atualizarPerfilDiscord(userId);
    });
}
