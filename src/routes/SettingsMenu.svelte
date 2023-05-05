<main>
    <div class="sidebar">
        <div style="padding:0px 12px;margin:12px 0px;width:100%;height:fit-content;display:flex;flex-direction:row;gap:8px;align-items:center">
            <img draggable="false" src="https://api.cron.com/v1/image/https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FAGNmyxb6-ovGUY-Ua1JrUBtXxfSOzFdLQWj1lwFrKNU_%3Ds96-c?width=120" alt="">
            <div style="width:fit-content;height:fit-content;display:flex;flex-direction:column;gap:2px">
                <p style="font-size:13px;color:#ededed;font-weight:500;">Aarav</p>
                <p style="font-size:13px;color:#a0a0a0;font-weight:normal">duclit451@gmail.com</p>
            </div>
        </div>

        <button>Account</button>
        <button>Calendar</button>
        <button>Preferences</button>
    </div>
    <div class="content"></div>
</main>

<style>
    main {
        width: 80vw;
        height: 80vh;

        background: #1c1c1c;
        border: 1px solid rgba(255, 255, 255, 0.025);
        border-radius: 12px;
        box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.2) 0px 3px 6px, rgba(15, 15, 15, 0.4) 0px 9px 24px;

        display: flex;
        flex-direction: row;

        animation: 0.15s enter var(--ease);
        overflow: hidden;
    }

    div.sidebar {
        width: 250px;
        height: 100%;
        border-right: 1px solid rgba(255, 255, 255, 0.025);
        flex: none;
    }

    div.content {
        width: 100%;
        height: 100%;
        
        display: flex;
        flex-direction: column;
    }

    div.sidebar > button {
        width: 100%;
        height: 32px;
        
        background: transparent;
        outline: none;
        cursor: pointer;
        border: none;

        display: flex;
        flex-direction: row;
        gap: 8px;
        padding: 0px 12px;
        align-items: center;
        
        font-size: 13px;
        color: #ededed;
    }

    div.sidebar > button:hover {
        background: rgba(255, 255, 255, 0.05);
    }

    img {
        width: 24px;
        height: 24px;
        border-radius: 12px;
        cursor: pointer;
        user-select: none;
    }

    @keyframes enter {
        from {
            transform: translateY(5px);
            opacity: 50%;
            box-shadow: none;
        }

        to {
            transform: translateY(0px);
            opacity: 100%;
            box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.2) 0px 3px 6px, rgba(15, 15, 15, 0.4) 0px 9px 24px;
        }
    }
</style>