<div class="text_field">
  <input placeholder=" " bind:value="{username}" required minlength="4" id="username" type="text">
  <span></span>
  <label for="username">          
    <PersonFill></PersonFill>
    Username
  </label>
  <div class="error">{errorText}</div>
</div>