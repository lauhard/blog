<script lang="ts">
    let app_verson = import.meta.env.VITE_VERSION ?? "local.dev";
</script>

<footer>
    <p>&copy; {new Date().getFullYear()} alau.at</p>
</footer>

<style>
    footer {
        width: 100%;
        height: 100%;
        margin-top: auto;
        min-height: 120px;
        text-align: center;
        border-top: 1px solid var(--color-ld-white-500);
        display: flex;
        align-items: center;
        justify-content: center;
        p {
            display: flex;
            height: 3rem;
            padding: 0;
            margin: 0;
        }
    }
</style>
