<script>
  export let message;
  export let userid;
  const self = String(userid) === String(message.fromUserId || message.userId);
  const date = new Date(message.datetime);
</script>

<div class="bubble {self ? 'self': 'other'}">
  <div class="txt">
    <p class="name">{self ? 'Me': message.fromUsername || message.username}</p>
    <p class="message">{message.text}</p>
    <span class="timestamp">{new Date(message.datetime).toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'})}</span>
  </div>
  <div 
    class="arrow {self ? 'arrow-self': 'arrow-other'}"
  ></div>
</div>

<style>
  .bubble {
    width: 240px;
    height: auto;
    display: block;
    border-radius: 4px;
    box-shadow: 2px 8px 5px #000;
    position: relative;
  }

  .self {
    align-self: end;
    background: #00705b;
  }

  .other {
    align-self: start;
    background: #374e5a;
  }

  .txt {
    width: 100%;
    padding: 8px 55px 8px 14px;
    text-overflow: clip;
  }

  .txt p {
    overflow-wrap: break-word;
  }

  .name {
    font-weight: 600;
    font-size: 14px;
    margin: 0 0 4px;
    color: #48a8e8;
  }

  .message{
    font-size: 14px;
    margin: 0;
    color: #e3e3e3;
  }

  .timestamp{
    font-size: 12px;
    position: absolute;
    bottom: 8px;
    right: 10px;
    text-transform: uppercase; color: #d2d2d2
  }

  .arrow {
    position: absolute;
    width: 0;
    bottom:42px;
    left: -16px;
    height: 0;
  }

  .arrow-self {
    right: -2px;      
    bottom: 40px;
    left: auto;
  }

  .arrow:after {
    content: "";
    position: absolute;
    border: 0 solid transparent;
    border-radius: 0 20px 0;
    width: 15px;
    height: 30px;
    transform: rotate(145deg);
  }

  .arrow-other:after {
    border-top: 9px solid #374e5a;
  }

  .arrow-self:after {
    transform: rotate(45deg) scaleY(-1);
    border-top: 9px solid #00705b;
  }


</style>