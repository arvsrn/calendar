<script>
    import Button from "../Primitives/Button.svelte";
    import Popup from "../Primitives/Popup.svelte";
</script>

<Popup>
    <h1 style="font-size:14px;color:var(--text1);font-weight:bold;">Are you sure?</h1>
    <p style="margin-bottom:8px;color:var(--text2);font-size:12px;">This task will be deleted from its corresponding event.</p>
    <div style="margin-left:auto;display:flex;flex-direction:row;gap:4px;">
        <Button appearance="link">Cancel</Button>
        <Button appearance="danger">Delete</Button>
    </div>
</Popup>