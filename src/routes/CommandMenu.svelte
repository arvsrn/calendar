<!--how and why should this exist????-->
<main>
    <input type="text" placeholder="Search users...">
    
    <div class="scroll-container">
        <div class="element">
            <img src="https://res.cloudinary.com/read-cv/image/upload/c_fill,h_92,w_92/dpr_1.0/v1/1/profilePhotos/UmuuDwC2ozQnJxRRFIiBSGsMhg62/647f7013-3b34-460e-8fe3-664ab0560d82.jpg?_a=ATO2BAA0" alt="">
            Jesse Pinkman
            <span>jesse@bakingbread.mp4</span>
        </div>
        <div class="element">
            <img src="https://res.cloudinary.com/read-cv/image/upload/c_fill,h_92,w_92/dpr_1.0/v1/1/profilePhotos/UmuuDwC2ozQnJxRRFIiBSGsMhg62/647f7013-3b34-460e-8fe3-664ab0560d82.jpg?_a=ATO2BAA0" alt="">
            Walter Hartwell White
            <span>waltuh@bakingbread.mp4</span>
        </div>
        <div class="element">
            <img src="https://res.cloudinary.com/read-cv/image/upload/c_fill,h_92,w_92/dpr_1.0/v1/1/profilePhotos/UmuuDwC2ozQnJxRRFIiBSGsMhg62/647f7013-3b34-460e-8fe3-664ab0560d82.jpg?_a=ATO2BAA0" alt="">
            Jimmy McGill
            <span>saul@bakingbread.mp4</span>
        </div>
    </div>
</main>

<style>
    main {
        width: 90vw;
        max-width: 600px;
        height: 90vh;
        max-height: 450px;

        border-radius: 16px;
        border: 1px solid var(--border3);
        background: var(--gray3);

        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 8px;

        overflow-y: auto;
    }

    div.scroll-container {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    div.element {
        width: 100%;
        height: 48px;

        border-radius: 8px;
        transition: background 0.15s var(--ease);
        cursor: pointer;

        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 8px;
        gap: 8px;

        font-size: 14px;
        font-weight: 500;
        color: var(--text1);
    }

    div.element:hover {
        background: var(--border2);
    }

    div.element > img {
        width: 32px;
        height: 32px;
        border-radius: 16px;
        user-select: none;
    }

    span {
        font-size: 14px;
        font-weight: 400;
        color: var(--text2);
    }

    input[type="text"] {
        width: calc(100% + 16px);
        height: 48px;

        border: none;
        background: none;
        transition: background 0.15s var(--ease);

        font-size: 14px;
        color: var(--text1);

        outline: none;
        padding-left: 16px;
        padding-top: 0px;
        padding-bottom: 8px;
        border-bottom: 1px solid var(--border2);

        transform: translateX(-8px);
        margin-bottom: 4px;
    }

    input[type="text"]::placeholder {
        color: var(--text2);
    }
</style>