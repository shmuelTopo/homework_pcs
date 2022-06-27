<script>
  export let user;
  export let click;
</script>

<div on:click={click} class="user">
  <img src="{user.img || "../images/no-user.jpg"}" alt="user-avatar">
  <div class="user-info">
    <div class="nameTime">
      <p class="user-name">{user.username || user.phone || 'Unknown'}</p>
    </div>
    <div class="description">
      <p>{user.description || ''}</p>
    </div>
  </div>
</div>

<style>
  .user {
    display: block;
    height: 80px;
    min-height: 80px;
    display: flex;
    gap: 10px;
    width: 100%;
    align-items: center;
    padding: 0 10px;
    border: none;
    cursor: pointer;
    background-color: rgb(100, 100, 100);
  }

  .user:hover {
    background-color: rgb(90, 90, 90);
  }

  * {
    user-select: none;
  }

  img {
    border-radius:  50%;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
  }

  .user-info {
    display: flex;
    width: 70%;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    color: rgb(228, 228, 228);
    font-size: 12px;
    gap: 5px;
  }

  p {
    margin: 0px;
  }

  .user-name {
    font-size: 16px;
    color: white;
  }

  .description {
    font-size: 14px;
    color: rgb(186, 186, 186);    
  }

  .description p {
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgba(255, 255, 255, 0.4);
  }


</style>