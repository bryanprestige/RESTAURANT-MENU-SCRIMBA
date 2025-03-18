import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';
import css from '../../css/main.css' with { type: 'css' }

/**
 * Oldagram Post Web Component
 * @class Oldagram Post
 * @emits 'oldagram-post'
 */

export class OldagramPost extends LitElement {
    
    static styles = [css];
    static properties = {
        name: { type: String },
        username: { type: String },
        location: { type: String },
        avatar: { type: String },
        post: { type: String },
        comment: { type: String },
        likes: { type: Number }
    }

    constructor() {
        super();
    }
    
    connectedCallback() {
        super.connectedCallback();
    }   
   
    render() {    
    return html`
        <div id="post">
            <div id="profile-info">
                <img id="user-picture" src="./${this.avatar}">
                <div id="user-text">
                    <h1>${this.name}</h1>
                    <h2>${this.location}</h1>
                </div>
            </div>
            <img class="post-image" src="./${this.post}" alt="post-image">
            <div id="icons-container">
                <button>
                    <img class="icons" src="./assets/hearth-logo.png" alt="hearth-logo">
                </button>
                <button>
                    <img class="icons" id="comment-logo" src="./assets/comment-logo.png" alt="comment-logo">
                </button>
                <button>
                    <img class="icons" id ="send-logo" src="./assets/send-logo.png" alt="send-logo">
                </button>
            </div>
            <h3>${this.likes} likes</h3>
            <h4><strong>${this.username}</strong>     ${this.comment}</h4>
        </div>
        `
    }
}
customElements.define('oldagram-post', OldagramPost)