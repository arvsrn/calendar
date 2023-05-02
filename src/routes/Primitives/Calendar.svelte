<main>
    <div class="row">
        <div class="label dark">Su</div>
        <div class="label dark">Mo</div>
        <div class="label dark">Tu</div>
        <div class="label dark">We</div>
        <div class="label dark">Th</div>
        <div class="label dark">Fr</div>
        <div class="label dark">Sa</div>
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

<style>
    main {
        display: flex;
        flex-direction: column;
        gap: 3px;
    }

    div.row {
        display: flex;
        flex-direction: row;
        gap: 2px;
    }

    div.label {
        width: 30px;
        height: 30px;

        font-size: 12px;
        font-family: var(--font-mono);
        color: white;

        user-select: none;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        cursor: pointer;
        border-radius: 4px;
    }

    div.label.dark {
        color: #7e7e7e;
    }

    div.label:hover {
        background: rgba(255, 255, 255, 0.05);
    }

    div.label.active {
        background: rgba(255, 255, 255, 0.05);
    }
</style>