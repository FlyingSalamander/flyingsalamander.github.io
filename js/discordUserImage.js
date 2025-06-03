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
        
        // Update avatar decoration - NEW ROBUST METHOD
        const decorationElement = document.querySelector('.avatarDecoration');
        if (user.avatar_decoration_data) {
            const asset = user.avatar_decoration_data.asset;
            const decorationUrl = `https://cdn.discordapp.com/avatar-decoration-presets/${asset}.png?size=512`;
            
            // Use this reliable loading method
            const img = new Image();
            img.onload = () => {
                decorationElement.style.backgroundImage = `url('${decorationUrl}')`;
                decorationElement.style.display = 'block';
            };
            img.onerror = () => {
                console.error('Failed to load decoration');
                decorationElement.style.display = 'none';
            };
            img.src = decorationUrl;
        } else {
            decorationElement.style.display = 'none';
        }
    })
    .catch(error => {
        console.error('Erro ao buscar status:', error);
    });
}

// Rest of the file remains the same...
