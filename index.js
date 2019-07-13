var result = null
var http_req = new XMLHttpRequest()
function get_result(fun_name) {
	var url = 'https://raw.githubusercontent.com/masai-school/assignments-data/master/data/dummy/json/employee_salaries.json'
	http_req.open('GET', url)
	http_req.send()
  if (fun_name == "search") {
  	http_req.onload = function(){
  		if(http_req.status === 200){
  			result = http_req.response
  			print_gender_data(result)
  		}
  		else{
  			 console.log("Error Code is:" + http_req.status);
  		}
  	}
  }
  if (fun_name == "sort") {
    http_req.onload = function(){
      if(http_req.status === 200){
        result = http_req.response
        print_sort_data(result)
      }
      else{
         console.log("Error Code is:" + http_req.status);
      }
    }
  }
}

var print_gender_data = function(input){
	//console.log("print")
	//console.log(input)
  if(input == null){
		display.textContent = 'Error! No  data received or invalid request'
	}
	else{
		//console.log("else")
		var json_val = JSON.parse(input)
    var gender_ar = []
    var name_value = document.getElementById('search').value
    console.log(name_value)
    for (var i = 0; i < json_val.length; i++) {
      if(name_value == json_val[i].gender ){
        gender_ar.push(json_val[i])
      }
    }
    grid_creation(gender_ar)
  }
	//body.append(display);
  document.getElementById('search').value = ""
}

var displayBtn = document.querySelector('#search_btn')
displayBtn.addEventListener('click',function(){
var input_value = document.getElementById("search").value
//console.log(lat)
var function_name = "search"
  if (input_value == "Male" || input_value == "Female" ) {
    get_result(function_name);
  }
  else{
    alert("Please type correct value like Male/Female")
    document.querySelector(".grid").innerHTML = ""
  }
});

var print_sort_data = function(input){
  //console.log("print")
  //console.log(input)
  if(input == null){
    alert('Error! No data received or invalid request')
  }
  else{
    //console.log("else")
    var json_val = JSON.parse(input)
    var name_value = document.getElementById('sort').value
    if (name_value == "asc_age_sort" || name_value == "asc_income_sort") {
      sorting_ascending(json_val,name_value)    
    }
    if (name_value == "dec_age_sort" || name_value == "dec_income_sort") {
      sorting_decending(json_val,name_value)    
    }
    //console.log(json_val)
    grid_creation(json_val)
  }
  //body.append(display);
  document.getElementById('sort').value = ""
}

var displayBtn1 = document.querySelector('#sort_btn')
displayBtn1.addEventListener('click',function(){
  //console.log(lat)
var input_value = document.getElementById("sort").value
console.log(input_value)
var function_name = "sort"
  if (input_value == "asc_age_sort" || input_value == "dec_age_sort" || input_value == "asc_income_sort" || input_value == "dec_income_sort" ) {
    get_result(function_name)
  }
  else{
    alert("Please type correct value like age/income")
    document.querySelector(".grid").innerHTML = "" 
  }
});

function sorting_ascending(arr,name){
  for (var i = 0; i < arr.length-1; i++) {
    for (var j = 0; j < arr.length-1; j++) {
      var temp =[]
      var temp1 =[]
      if (name == "asc_age_sort") {
        if (arr[j].age > arr[j+1].age) {
          temp[0] = arr[j]
          arr[j] = arr[j+1]
          arr[j+1] = temp[0]
        }
      }
      if (name == "asc_income_sort") {
        if (arr[j].income > arr[j+1].income) {
          temp1[0] = arr[j]
          arr[j] = arr[j+1]
          arr[j+1] = temp1[0]
        }
      }
    }       
  } return arr
}

function sorting_decending(arr,name){
  for (var i = 0; i < arr.length-1; i++) {
    for (var j = 0; j < arr.length-1; j++) {
      var temp =[]
      var temp1 =[]
      if (name == "dec_age_sort") {
        if (arr[j].age < arr[j+1].age) {
          temp[0] = arr[j]
          arr[j] = arr[j+1]
          arr[j+1] = temp[0]
        }
      }
      if (name == "dec_income_sort") {
        if (arr[j].income < arr[j+1].income) {
          temp1[0] = arr[j]
          arr[j] = arr[j+1]
          arr[j+1] = temp1[0]
        }
      }
    }       
  } return arr
}

function grid_creation(arr){
  for (var i = 0; i < arr.length; i++) {
    if(i==0){
      var div1 = document.querySelector(".grid")
      div1.innerHTML= ""  
      var new_div2 = document.createElement("div")
      div1.appendChild(new_div2)
      var img_vale = document.createElement("img")
      if(arr[i].gender == "Male"){
        new_div2.appendChild(img_vale)
        img_vale.setAttribute("src" ,"resources/male2.png")
      }
      if(arr[i].gender == "Female"){
        new_div2.appendChild(img_vale)
        img_vale.setAttribute("src" ,"resources/female1.png")
      }
      var new_div3 = document.createElement("div")
      new_div2.appendChild(new_div3)
      new_div3.setAttribute("class","text")
      var h3_ele = document.createElement("h3")
      var p2_ele = document.createElement("p")
      var p3_ele = document.createElement("p")
      var p4_ele = document.createElement("p")
      var p5_ele = document.createElement("p")
      new_div3.appendChild(h3_ele)
      new_div3.appendChild(p2_ele)
      new_div3.appendChild(p3_ele)
      new_div3.appendChild(p4_ele)
      new_div3.appendChild(p5_ele)
      h3_ele.textContent= arr[i].first_name + " " + arr[i].last_name
      p2_ele.textContent = "Age :" + " " + arr[i].age
      p3_ele.textContent = "Salary :" + " " + arr[i].income
      p4_ele.textContent= "Gender :" + " " + arr[i].gender 
      //new_div1.innerHTML = ""
    }
    else{
      var new_div2 = document.createElement("div")
      div1.appendChild(new_div2)
      var img_vale = document.createElement("img")
      if(arr[i].gender == "Male"){
        new_div2.appendChild(img_vale)
        img_vale.setAttribute("src" ,"resources/male2.png")
        }
      if(arr[i].gender == "Female"){
        new_div2.appendChild(img_vale)
        img_vale.setAttribute("src" ,"resources/female1.png")
        }
        var new_div3 = document.createElement("div")
        new_div2.appendChild(new_div3)
        new_div3.setAttribute("class","text")
        var h3_ele = document.createElement("h3")
        var p2_ele = document.createElement("p")
        var p3_ele = document.createElement("p")
        var p4_ele = document.createElement("p")
        var p5_ele = document.createElement("p")
        new_div3.appendChild(h3_ele)
        new_div3.appendChild(p2_ele)
        new_div3.appendChild(p3_ele)
        new_div3.appendChild(p4_ele)
        new_div3.appendChild(p5_ele)
        h3_ele.textContent= arr[i].first_name + " " + arr[i].last_name
        p2_ele.textContent = "Age :" + " " + arr[i].age
        p3_ele.textContent = "Salary :" + " " + arr[i].income
        p4_ele.textContent= "Gender :" + " " + arr[i].gender
    }
  }
}

