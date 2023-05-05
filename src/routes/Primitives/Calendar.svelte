<div class="calendar-container">
    <main>
        <div class="row">
            <div class="label dark static">Su</div>
            <div class="label dark static">Mo</div>
            <div class="label dark static">Tu</div>
            <div class="label dark static">We</div>
            <div class="label dark static">Th</div>
            <div class="label dark static">Fr</div>
            <div class="label dark static">Sa</div>
        </div>
        <div class="row">
            <div class="label dark">30</div>
            <div class="label active">1</div>
            <div class="label">2</div>
            <div class="label">3</div>
            <div class="label">4</div>
            <div class="label">5</div>
            <div class="label">6</div>
        </div>
        <div class="row">
            <div class="label">7</div>
            <div class="label">8</div>
            <div class="label">9</div>
            <div class="label">10</div>
            <div class="label">11</div>
            <div class="label">12</div>
            <div class="label">13</div>
        </div>
        <div class="row">
            <div class="label">14</div>
            <div class="label">15</div>
            <div class="label">16</div>
            <div class="label">17</div>
            <div class="label">18</div>
            <div class="label">19</div>
            <div class="label">20</div>
        </div>
        <div class="row">
            <div class="label">21</div>
            <div class="label">22</div>
            <div class="label">23</div>
            <div class="label">24</div>
            <div class="label">25</div>
            <div class="label">26</div>
            <div class="label">27</div>
        </div>
        <div class="row">
            <div class="label">28</div>
            <div class="label">29</div>
            <div class="label">30</div>
            <div class="label">31</div>
            <div class="label dark">1</div>
            <div class="label dark">2</div>
            <div class="label dark">3</div>
        </div>
    </main>

    <!-- TODO: try and not hardcode the div height -->
    <div style="width:fit-content;height:188px;display:flex;flex-direction:column;gap:4px;padding:4px 0px;">
        <button>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.18179 8.81819C4.00605 8.64245 4.00605 8.35753 4.18179 8.18179L7.18179 5.18179C7.26618 5.0974 7.38064 5.04999 7.49999 5.04999C7.61933 5.04999 7.73379 5.0974 7.81819 5.18179L10.8182 8.18179C10.9939 8.35753 10.9939 8.64245 10.8182 8.81819C10.6424 8.99392 10.3575 8.99392 10.1818 8.81819L7.49999 6.13638L4.81819 8.81819C4.64245 8.99392 4.35753 8.99392 4.18179 8.81819Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        </button>
        <button>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        </button>
        <button style:margin-top="auto">
            <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 3.5C2.5 3.5 5 3.5 7 3.5C9 3.5 9.5 5.16667 9.5 6V6.5C9.5 7.16667 9.1 8.5 7.5 8.5H6.5M1.5 3.5L4.5 0.5M1.5 3.5L4.5 6.5" stroke="currentColor"/>
            </svg>                
        </button>
    </div>
</div>

<style>
    main {
        display: flex;
        flex-direction: column;
        gap: 3px;
        width: 100%;
        height: fit-content;
    }

    div.row {
        display: flex;
        flex-direction: row;
        gap: 2px;
    }

    div.label {
        width: 100%;
        aspect-ratio: 1/1;

        font-size: 12px;
        font-family: var(--font-mono);
        color: white;

        user-select: none;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        cursor: pointer;
        border-radius: 6px;
    }

    div.label.dark {
        color: #7e7e7e;
    }

    div.label.static {
        cursor: default;
    }

    div.label:not(.static):hover {
        background: rgba(255, 255, 255, 0.1);
    }

    div.label:not(.static).active {
        background: rgba(255, 255, 255, 0.05);
        border: 2px solid rgba(255, 255, 255, 0.05);
        font-weight: bold;
    }

    div.calendar-container {
        width: 100%;
        height: fit-content;

        display: flex;
        flex-direction: row;
        gap: 4px;
    }

    button {
        outline: none;
        border: none;
        border-radius: 4px;

        width: 20px;
        height: 20px;

        background: transparent;
        cursor: pointer;
        color: #A0A0A0;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    button:hover {
        background: rgba(255, 255, 255, 0.06);
    }
</style>