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
        if (user.avatar_decoration_data) {
            const decorationUrl = `https://cdn.discordapp.com/avatar-decoration-presets/${user.avatar_decoration_data.asset}.png?size=512`;
            decorationElement.style.backgroundImage = `url('${decorationUrl}')`;
            
            // Discord's exact decoration positioning logic
            const applyDecorationStyle = () => {
                decorationElement.style.width = '110%';
                decorationElement.style.height = '110%';
                
                // Special handling for specific decoration types
                if (user.avatar_decoration_data.asset.includes('halo')) {
                    decorationElement.style.top = '48%';
                    decorationElement.style.transform = 'translate(-50%, -50%) scale(1.25)';
                }
                // Add more special cases as needed
            };
            
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
