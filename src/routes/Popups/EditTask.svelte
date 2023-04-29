<script>
    import Button from "../Primitives/Button.svelte";
    import Popup from "../Primitives/Popup.svelte";
    import TextInput from "../Primitives/TextInput.svelte";
</script>

<Popup>
    <h1 style="margin-bottom:8px;font-size:14px;color:#ededed;font-weight:bold;">Edit Task</h1>
    <TextInput placeholder="This is a normal task."></TextInput>
    <div style="margin-left:auto;display:flex;flex-direction:row;gap:4px;">
        <Button appearance="link">Cancel</Button>
        <Button appearance="secondary">Save</Button>
    </div>
</Popup>