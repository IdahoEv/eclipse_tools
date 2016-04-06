import $ from "jquery";
console.log('script loading');

$(function(){
  console.log('ready handler running');
  $('#randomize_trigger').click(()=>{
    console.log("Trigger clicked!");
  });
});
