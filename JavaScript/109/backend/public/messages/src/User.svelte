<script>

</script>



<a class="user" href="/">
  <img src="../images/no-user.jpg" alt="user-avatar">
  <div class="user-info">
    <p class="user-name">Shmuel</p>
    <p class="last-msg">Last message</p>
  </div>
</a>


<style>
  .user {
    display: block;
    height: 80px;
    display: flex;
    gap: 10px;
    width: 100%;
    align-items: center;
    padding: 0 10px;
    background-color: rgb(45, 45, 45);
  }

  .user:hover {
    background-color: rgb(60, 60, 60);
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
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    color: rgb(228, 228, 228);
    font-size: 12px;
  }

  p {
    margin: 0px;
  }

  .user-name {
    font-size: 16px;
    color: white;
  }

  .last-msg {
    font-size: 14px;
    color: rgb(186, 186, 186);
  }


</style>