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
    console.log(body.data.length);
    if(body.data.length < 1) {
      $("#error").text(`I'm sorry, there are no doctors in your area matching your search query.`)
    } else {
      body.data.forEach(function(data){
        let dataString = `<li>${data.profile.first_name} ${data.profile.last_name}, ${data.practices[0].visit_address.street}, ${data.practices[0].phones[0].number}, `;
        if(data.practices[0].accepts_new_patients) {
          dataString += `accepting new patients</li>`;
        } else {
          dataString += `not accepting new patients</li>`;
        }
        $("#doctorList").append(dataString);
      });
    }
  }
});
