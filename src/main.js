import { Doctor } from './doctor.js'
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function() {
  const doctor = new Doctor();

  function reset() {
    $("#doctorList").html("");
    $("#error").html("");
  }

  $("#searchByMalady").submit(function(event) {
    event.preventDefault();
    reset();
    let promise = doctor.findForIssue($("#malady").val());
    promise.then(function(response) {
      let body = JSON.parse(response);
      body.data.forEach(function(data){
        $("#doctorList").append(`<li>${data.practices.name}, ${data.practices.visit_address.street}</li>`)
      });
    }, function(error) {
      $("#error").text(`${error.message}`)
    });
  });
});
