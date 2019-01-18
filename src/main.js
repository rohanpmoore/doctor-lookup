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
      displayData(response);
    }, function(error) {
      $("#error").text(`${error.message}`)
    });
  });

  $("#searchByName").submit(function(event) {
    event.preventDefault();
    reset();
    let promise = doctor.findByName($("#name").val());
    promise.then(function(response) {
      displayData(response);
    }, function(error) {
      $("#error").text(`${error.message}`)
    });
  });

  function displayData(response) {
    let body = JSON.parse(response);
    if(body.data.length < 1) {
      $("#error").text(`I'm sorry, there are no doctors in your area matching your search query.`)
    } else {
      body.data.forEach(function(data){
        $("#doctorList").append(`<li>${data.practices[0].name}, ${data.practices[0].visit_address.street}</li>`)
      });
    }
  }
});
