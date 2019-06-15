<template>
  <div class="social-contacts">
    <a href class="icon icon-instagram"></a>
    <a href class="icon icon-vk"></a>
    <a href class="icon icon-fb"></a>
    <a href class="icon icon-youtube"></a>
    <a href class="icon icon-ya"></a>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">

.social-contacts {
  display: flex;
  align-items: center;

  .icon-vk {
    background: url(~assets/img/icons/socials/vk-colored.png);
  }
  .icon-wa {
    background: url(~assets/img/icons/socials/wa-colored.png);
  }
  .icon-fb {
    background: url(~assets/img/icons/socials/fb-colored.png);
  }
  .icon-instagram {
    background: url(~assets/img/icons/socials/insta-colored.png);
  }
  .icon-youtube {
    background: url(~assets/img/icons/socials/youtube-colored.png);
  }
  .icon-ya {
    background: url(~assets/img/icons/socials/ya-colored.png);
  }

  .icon {
    width: 3.5rem;
    height: 3.5rem;
    background-size: cover;
  }
}
</style>

