<script lang="ts">
    let {children} = $props()
</script>

<div class="posts">
    {@render children()}
</div>
<style>
.posts{
    width: 100%;
    display: flex;
    flex-direction: column;
}
</style>