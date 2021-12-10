import '@splidejs/splide/dist/css/themes/splide-default.min.css';

import { extend } from "vee-validate";
import { required, alpha, email, numeric, alpha_num, min, min_value } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "inputan harus diisi..!"
});

extend("alpha", {
  ...alpha,
  message: "Tolong input huruf saja..!"
});

extend('email', {
  ...email,
  message: 'Format email salah'
});

extend('numeric', {
  ...numeric,
  message: 'Isi dengan angka saja..!'
});

extend('min', {
  ...min,
  message: 'Isi minimal 4 karakter'
});

extend('min_value', {
  ...min_value,
  message: 'Inputan harus ribuan rupiah'
});