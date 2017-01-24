$(document).ready(() => {
  const brand = document.getElementById('logo-id');
  brand.className = 'attachment_upload';
  brand.onchange = () => {
    document.getElementById('fakeUploadLogo').value = this.value.substring(12);
  };

    // Source: http://stackoverflow.com/a/4459419/6396981
  function readURL(input) {
    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        $('.img-preview').attr('src', e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  $('#logo-id').change(() => {
    readURL(this);
  });
});
