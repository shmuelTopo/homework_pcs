<script>
  import User from './User.svelte';
  const users = ['Shmuel', 'Rachel', 'Esti'];

  const hnadleClick = () => {
    ('hi');
  }
</script>


<div class=users>
  <div class="hr"></div>
  {#each users as user}
    <User></User>
    <div class="hr"></div>
  {/each}
</div>


<style>
  .hr {
    border-top: 1px solid rgb(72, 72, 72);
  }

  .users {
    display: flex;
    flex-direction: column;
  }

</style>