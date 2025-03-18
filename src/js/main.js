
import USERS from '../api/users.json' with { type: 'json' }

document.addEventListener('DOMContentLoaded', () => {
    showFeed()
})

function showFeed() {
    const feedContainer = document.getElementById('feed-container')
    const users = Object.values(USERS)
    
    users.forEach(user => {
        const oldagramPost = document.createElement('oldagram-post')
        oldagramPost.setAttribute('name', user.name)
        oldagramPost.setAttribute('username', user.username)
        oldagramPost.setAttribute('location', user.location)
        oldagramPost.setAttribute('avatar', user.avatar)
        oldagramPost.setAttribute('post', user.post)
        oldagramPost.setAttribute('comment', user.comment)
        oldagramPost.setAttribute('likes', user.likes)
        feedContainer.appendChild(oldagramPost)
    })
    console.log(users, 'users')
}




