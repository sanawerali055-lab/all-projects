// array

// index 

let userdata = [
     {

     username: "hassnain",
     useremail: "hassnainriaz@gmail.com",
     usercontact:"03202450759",
     userpassword:"hassnain shaadi krle"
     },

    {
       username:"sheroz",
        useremail:"sherozkhan@gmail.com",
       usercontact:"03173209644",
       userpassword:"sheroz1234",
    },

    {
       username:"saboor",
        useremail:"saboormughal@gmail.com",
       usercontact:"03170185897",
       userpassword:"mughal1234",
    },

    {
       username:"sanawer",
       useremail:"sanawerali055@gmail.com",
       usercontact:"03203101407",
       userpassword:"chiku pie",
    },

    {
       username:"hassnain khumbati",
       useremail:"hkhumabti@gmail.com",
       usercontact:"03177683435",
       userpassword:"hkhumbati1234",
    },

   ]
    
   let num1 = 200
   let num2 = 300
   
   function Addition(){
      let result =num1 + num2;
      alert("the sum is " + result)
   }
    
   function substraction(){
      let result = num1 - num2;
      alert("the subtraction is " + result)
   }

   function multiplication(){
      let result = num1 * num2;
      alert("the product is " + result)
   }

   function division(){
      let result =num1 / num2;
      alert("the divide is " + result)
   }

   // function invokation 
   Addition();
   substraction();
   multiplication();
   division();

   function squaremaaloomkaro(num) {
      let result = num * num 
      alert("the square of " + num + " is " + result)
   }

   function cubemaaloomkaro(num){
      let result = num * num * num
      alert("the cube of " + num + " is "+ result)
   }

   totalvaluemaaloomkaro(4,7)

   // console.log(function result)
   // dom (document object model)

   let button = document.getElementById("hamburger.button")
   
   let closebtn = document.getElementById("close-button")
   let list = document.getElementById("nav-list") 

   button.addEventListener("click", function (){
        list.classList.add("active")
        closebtn.style.display = "block"
   })

   closebtn.addEventListener("click", function () {
       list.classList.remove("active")
       closebtn.style.display = "none"
   })

   