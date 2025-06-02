function atualizarPerfilDiscord(userId) {
    const targetUserId = userId || '504586268781576202';
    
    fetch(`https://api.lanyard.rest/v1/users/${targetUserId}`)
    .then(response => response.json())
    .then(data => {
        if (!data.success) {
            throw new Error('Lanyard API request failed');
        }
        
        const discordData = data.data;
        const user = discordData.discord_user;
        const status = discordData.discord_status;
        
        // Update avatar
        const avatarImg = document.querySelector('.avatarImage');
        if (avatarImg && user.avatar) {
            const avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${user.avatar.startsWith("a_") ? "gif" : "png"}?size=2048`;
            const avatarSrc = avatarUrl.includes('?') ? 
                avatarUrl + '&t=' + Date.now() : 
                avatarUrl + '?t=' + Date.now();
            
            avatarImg.src = avatarSrc;
        }
        
        // Update status
        const statusImg = document.querySelector('.discordStatus');
        if (statusImg) {
            switch(status) {
                case 'online': statusImg.src = '/img/online.png'; break;
                case 'idle': statusImg.src = '/img/idle.png'; break;
                case 'dnd': statusImg.src = '/img/dnd.png'; break;
                default: statusImg.src = '/img/offline.png';
            }
        }
        
        // Update avatar decoration
        const decorationElement = document.querySelector('.avatarDecoration');
// Inside your API response handling:
        // Inside your API response handler:
        // Inside the API response handler:
// Replace the decoration handling section with:
        if (user.avatar_decoration_data) {
            const decorationUrl = `https://cdn.discordapp.com/avatar-decoration-presets/${user.avatar_decoration_data.asset}.png?size=240&passthrough=false`;
            decorationElement.style.backgroundImage = `url('${decorationUrl}')`;
            decorationElement.style.display = 'block';
        } else {
            decorationElement.style.display = 'none';
        }
            
            applyDecorationStyle();
        } else {
            decorationElement.style.backgroundImage = '';
        }
                
        // Update username if element exists
        const usernameElement = document.querySelector('.username');
        if (usernameElement && user.username) {
            usernameElement.textContent = `${user.username}${user.discriminator !== "0" ? `#${user.discriminator}` : ''}`;
        }
    })
    .catch(error => {
        console.error('Erro ao buscar status:', error);
        const statusElement = document.querySelector('.status-debugging');
        if (statusElement) {
            statusElement.textContent = 'Erro ao conectar: ' + error.message;
            statusElement.style.color = 'red';
        }
    });
}
